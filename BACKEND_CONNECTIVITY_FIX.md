# Backend Connectivity Issue - Complete Design Document

## Executive Summary

**Problem**: Frontend shows "Analysis server not reachable" error despite backend running successfully on port 8789.

**Root Cause**: Frontend health check (`/api/v1/health`) is failing through Vite proxy, blocking all analysis requests.

**Impact**: All 11 rubric dimensions work when called directly via curl, but frontend UI cannot reach the backend.

**Status**: Backend is functional, frontend-to-backend communication is broken.

---

## Current System Architecture

### Backend (Port 8789)
**File**: `src/http/server.ts`
```typescript
app.use("/api/v1", routes);  // Legacy backend routes
app.use("/api", routes);      // Frontend workshop routes
```

**Available Endpoints**:
- `POST http://localhost:8789/api/analyze-entry` ✅ WORKING (tested with curl)
- `GET http://localhost:8789/api/health` ✅ WORKING
- `GET http://localhost:8789/api/v1/health` ✅ WORKING
- Returns all 11 rubric dimensions correctly

### Frontend (Port 8080)
**File**: `vite.config.ts`
```typescript
server: {
  host: "::",
  port: 8080,
  proxy: {
    "/api": {
      target: "http://localhost:8789",
      changeOrigin: true,
    }
  }
}
```

**Frontend API Client**: `src/components/portfolio/extracurricular/workshop/workshopApi.ts`
- Calls: `POST /api/analyze-entry`
- Expected to proxy to: `http://localhost:8789/api/analyze-entry`

**Health Check Service**: `src/services/workshopAnalysisService.ts`
```typescript
const healthRes = await fetch('/api/v1/health', {
  signal: AbortSignal.timeout(3000)
});
```
- This check FAILS, blocking all API calls
- Error message: "Analysis server not reachable. Start it with 'npm run server' or use 'npm run dev:full'."

---

## Diagnostic Evidence

### What Works ✅
1. **Backend server runs**:
   ```bash
   npx tsx src/http/server.ts
   # Output: API server listening on :8789
   ```

2. **Direct backend access**:
   ```bash
   curl http://localhost:8789/api/health
   # Returns: {"ok":true,"service":"analysis-api",...}

   curl http://localhost:8789/api/v1/health
   # Returns: {"ok":true,"service":"analysis-api",...}

   curl -X POST http://localhost:8789/api/analyze-entry \
     -H "Content-Type: application/json" \
     -d '{"description":"test","activity":{"id":"1","title":"Test"}}'
   # Returns: All 11 rubric dimensions ✅
   ```

3. **Frontend dev server runs**:
   ```bash
   npm run dev
   # Output: Local: http://localhost:8080/
   ```

### What Fails ❌
1. **Frontend health check through proxy**:
   ```bash
   curl http://localhost:8080/api/v1/health
   # Returns: Connection refused OR hangs
   ```

2. **User reports**: "Backend analysis failed: Analysis server not reachable"

3. **Vite console shows**:
   ```
   http proxy error: /api/v1/health
   AggregateError [ECONNREFUSED]
   ```

---

## Root Cause Analysis

### Issue 1: Vite Proxy Not Forwarding Requests
**Symptom**: Requests to `http://localhost:8080/api/*` don't reach backend

**Possible Causes**:
1. **Vite proxy configuration issue**
   - Current config forwards `/api` to `http://localhost:8789`
   - May not be forwarding `/api/v1/*` properly
   - `changeOrigin: true` should handle CORS but might not be enough

2. **Backend not accepting proxied requests**
   - CORS configuration might be rejecting proxy requests
   - Express server might need additional middleware

3. **Port binding issue**
   - Backend might not be listening on correct interface (IPv4 vs IPv6)
   - Vite server uses `host: "::"` (IPv6), backend uses default
   - Could cause localhost resolution issues

### Issue 2: Health Check Timeout
**File**: `src/services/workshopAnalysisService.ts:153`
```typescript
const healthRes = await fetch('/api/v1/health', {
  signal: AbortSignal.timeout(3000)
});
```

**Problem**: 3-second timeout is too aggressive if:
- Backend is cold-starting
- API key validation is slow
- Network latency exists

---

## Solution Design

### Solution 1: Fix Vite Proxy Configuration (RECOMMENDED)

**File**: `vite.config.ts`

**Current**:
```typescript
proxy: {
  "/api": {
    target: "http://localhost:8789",
    changeOrigin: true,
  }
}
```

**Proposed Fix**:
```typescript
proxy: {
  "/api": {
    target: "http://localhost:8789",
    changeOrigin: true,
    secure: false,
    ws: true,
    configure: (proxy, options) => {
      proxy.on('error', (err, req, res) => {
        console.log('proxy error', err);
      });
      proxy.on('proxyReq', (proxyReq, req, res) => {
        console.log('Proxying:', req.method, req.url, '->', options.target + req.url);
      });
      proxy.on('proxyRes', (proxyRes, req, res) => {
        console.log('Proxy response:', proxyRes.statusCode, req.url);
      });
    }
  }
}
```

**Why This Works**:
- Adds debug logging to see exactly what's being proxied
- `secure: false` allows self-signed certificates
- `ws: true` enables WebSocket proxying (future-proofing)
- Error handlers will reveal the exact failure point

### Solution 2: Fix Backend CORS and Host Binding

**File**: `src/http/server.ts`

**Current**:
```typescript
app.use(cors({ origin: true, credentials: true }));

const port = process.env.PORT || 8789;
app.listen(port, () => {
  console.log(`API server listening on :${port}`);
});
```

**Proposed Fix**:
```typescript
// More permissive CORS for local development
app.use(cors({
  origin: ['http://localhost:8080', 'http://localhost:8789', 'http://127.0.0.1:8080', 'http://127.0.0.1:8789'],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
}));

const port = process.env.PORT || 8789;
// Listen on all interfaces (0.0.0.0) not just localhost
app.listen(port, '0.0.0.0', () => {
  console.log(`API server listening on 0.0.0.0:${port}`);
  console.log(`  - Local:   http://localhost:${port}`);
  console.log(`  - Network: http://0.0.0.0:${port}`);
});
```

**Why This Works**:
- Explicit CORS origins prevent proxy rejection
- Binding to `0.0.0.0` ensures IPv4/IPv6 compatibility
- Better logging shows exactly where server is listening

### Solution 3: Increase Health Check Timeout

**File**: `src/services/workshopAnalysisService.ts`

**Current**:
```typescript
const healthRes = await fetch('/api/v1/health', {
  signal: AbortSignal.timeout(3000)
});
```

**Proposed Fix**:
```typescript
const healthRes = await fetch('/api/v1/health', {
  signal: AbortSignal.timeout(10000) // Increase to 10 seconds
});

// Add more specific error handling
if (!healthRes.ok) {
  console.error('Health check failed:', healthRes.status, healthRes.statusText);
  throw new Error(
    `Analysis server unhealthy (HTTP ${healthRes.status}). Check backend logs.`
  );
}
```

**Why This Works**:
- Gives backend more time to respond during cold starts
- Better error messages for debugging
- Doesn't block user if backend is slow but functional

### Solution 4: Add Fallback Health Check Path

**File**: `src/services/workshopAnalysisService.ts`

**Proposed Addition**:
```typescript
async function checkBackendHealth(): Promise<boolean> {
  // Try multiple health check paths
  const paths = ['/api/v1/health', '/api/health'];

  for (const path of paths) {
    try {
      const res = await fetch(path, { signal: AbortSignal.timeout(5000) });
      if (res.ok) {
        console.log(`✓ Backend reachable at ${path}`);
        return true;
      }
    } catch (err) {
      console.warn(`✗ Health check failed for ${path}:`, err.message);
    }
  }

  return false;
}
```

**Why This Works**:
- Tries multiple endpoints to find working path
- Provides detailed logging for troubleshooting
- More resilient to routing changes

---

## Implementation Steps

### Step 1: Add Debug Logging
1. Update `vite.config.ts` with proxy logging
2. Update `src/http/server.ts` with better startup logging
3. Restart both servers and observe logs

**Expected Output**:
```
[Vite] Proxying: GET /api/v1/health -> http://localhost:8789/api/v1/health
[Backend] GET /api/v1/health 200 2ms
```

### Step 2: Fix CORS and Binding
1. Update `src/http/server.ts` with explicit CORS and `0.0.0.0` binding
2. Restart backend server
3. Test: `curl http://localhost:8080/api/v1/health`

**Success Criteria**: Returns `{"ok":true,...}`

### Step 3: Update Health Check
1. Increase timeout to 10 seconds in `workshopAnalysisService.ts`
2. Add fallback health check paths
3. Add better error logging

**Success Criteria**: Frontend no longer shows "server not reachable" error

### Step 4: End-to-End Test
1. Open frontend at `http://localhost:8080`
2. Navigate to Extracurricular Workshop
3. Enter activity description and click analyze
4. Verify all 11 rubric dimensions display

**Success Criteria**: Analysis completes with all 11 categories visible

---

## Testing Checklist

- [ ] Backend starts successfully on port 8789
- [ ] Direct curl to `http://localhost:8789/api/health` works
- [ ] Direct curl to `http://localhost:8789/api/v1/health` works
- [ ] Proxied curl to `http://localhost:8080/api/health` works
- [ ] Proxied curl to `http://localhost:8080/api/v1/health` works
- [ ] Frontend health check succeeds (check browser console)
- [ ] Frontend analysis request completes
- [ ] All 11 rubric dimensions display in UI
- [ ] No CORS errors in browser console
- [ ] No proxy errors in Vite terminal

---

## Debugging Commands

### Check if backend is running
```bash
lsof -i :8789
# Should show: node/tsx process listening
```

### Test backend directly
```bash
curl -v http://localhost:8789/api/v1/health
# Should return: 200 OK with JSON
```

### Test through Vite proxy
```bash
curl -v http://localhost:8080/api/v1/health
# Should return: 200 OK with JSON (same as above)
```

### Test full analysis flow
```bash
curl -X POST http://localhost:8080/api/analyze-entry \
  -H "Content-Type: application/json" \
  -d '{"description":"I led the robotics team","activity":{"id":"1","title":"Robotics"}}'
# Should return: JSON with 11 categories
```

### Check browser console
Open browser DevTools (F12) and look for:
- Network tab: Check if `/api/v1/health` returns 200
- Console tab: Check for CORS or connection errors

---

## Known Working State

### Backend
- **Port**: 8789
- **Status**: ✅ Running
- **Health**: `GET /api/v1/health` returns `{"ok":true}`
- **Analysis**: `POST /api/analyze-entry` returns all 11 dimensions
- **API Key**: Present in `.env` (ANTHROPIC_API_KEY)

### Frontend
- **Port**: 8080
- **Status**: ✅ Running
- **Issue**: Cannot reach backend through proxy

### Network Flow (Expected)
```
User Browser
    ↓ http://localhost:8080/api/v1/health
Vite Dev Server (Port 8080)
    ↓ Proxy to http://localhost:8789/api/v1/health
Backend Server (Port 8789)
    ↓ Routes through /api/v1 mount
routes.ts → r.get('/health')
    ↓ Returns JSON
{"ok":true,"service":"analysis-api",...}
```

### Network Flow (Current - BROKEN)
```
User Browser
    ↓ http://localhost:8080/api/v1/health
Vite Dev Server (Port 8080)
    ↓ ❌ Proxy fails with ECONNREFUSED
(Never reaches backend)
```

---

## Alternative Approaches

### Option A: Skip Proxy, Call Backend Directly
**Pros**: Simple, bypasses proxy issues
**Cons**: CORS errors, hardcoded URLs, not production-ready

**Implementation**:
```typescript
// workshopApi.ts
const API_BASE_URL = import.meta.env.DEV
  ? 'http://localhost:8789/api'  // Direct in dev
  : '/api';                        // Proxied in prod
```

### Option B: Use Different Backend Port
**Pros**: Avoids port conflicts
**Cons**: Doesn't fix root cause

**Implementation**:
```bash
PORT=3001 npx tsx src/http/server.ts
```

Update `vite.config.ts`:
```typescript
proxy: {
  "/api": {
    target: "http://localhost:3001",
    changeOrigin: true,
  }
}
```

### Option C: Run Everything on One Server
**Pros**: No proxy needed
**Cons**: More complex setup, loses hot-reload

**Implementation**: Use `express.static()` to serve Vite build from backend

---

## Environment Variables Check

### Required in `.env`
```bash
# Anthropic Claude API (for Analysis & Coaching Engine)
ANTHROPIC_API_KEY=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

# Supabase Configuration
VITE_SUPABASE_PROJECT_ID=zclaplpkuvxkrdwsgrul
VITE_SUPABASE_URL=https://zclaplpkuvxkrdwsgrul.supabase.co
SUPABASE_URL=https://zclaplpkuvxkrdwsgrul.supabase.co

# Supabase Keys
VITE_SUPABASE_PUBLISHABLE_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
VITE_SUPABASE_ANON_KEY=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9...
```

**Status**: ✅ All present and correct

---

## Files to Modify

1. **vite.config.ts** (Priority: HIGH)
   - Add proxy debugging
   - Ensure correct target

2. **src/http/server.ts** (Priority: HIGH)
   - Fix CORS configuration
   - Bind to 0.0.0.0
   - Add better logging

3. **src/services/workshopAnalysisService.ts** (Priority: MEDIUM)
   - Increase health check timeout
   - Add fallback paths
   - Better error messages

4. **src/components/portfolio/extracurricular/workshop/workshopApi.ts** (Priority: LOW)
   - Add retry logic improvements
   - Better error handling

---

## Success Metrics

### Must Have ✅
- Frontend health check succeeds
- All 11 rubric dimensions display in UI
- No "server not reachable" errors
- Backend and frontend communicate successfully

### Nice to Have 🎯
- < 1 second health check response time
- Detailed error messages for troubleshooting
- Fallback health check paths working
- Production-ready proxy configuration

---

## Next Steps for New Session

### Quick Merge Note
There's a documentation PR pending at:
```
https://github.com/benpham0707/uplift-final-final-18698-62030/pull/new/claude/add-critical-docs-011CUxLj5vDXcFY6SciNVNXR
```
Merge this first to get the critical comments in the codebase, then proceed with connectivity fixes.

### Priority Order
1. **IMMEDIATE**: Fix Vite proxy configuration (Solution 1)
2. **IMMEDIATE**: Fix backend CORS and binding (Solution 2)
3. **HIGH**: Test end-to-end connectivity
4. **MEDIUM**: Improve health check resilience (Solutions 3 & 4)
5. **LOW**: Add comprehensive error handling

### First Commands to Run
```bash
# Terminal 1: Start backend with logging
npx tsx src/http/server.ts

# Terminal 2: Start frontend
npm run dev

# Terminal 3: Test connectivity
curl http://localhost:8789/api/v1/health  # Should work
curl http://localhost:8080/api/v1/health  # Currently fails - this is what we fix
```

---

## References

- **Backend Routes**: `src/http/routes.ts:32-626`
- **Server Setup**: `src/http/server.ts:1-23`
- **Frontend API Client**: `src/components/portfolio/extracurricular/workshop/workshopApi.ts:1-120`
- **Health Check Service**: `src/services/workshopAnalysisService.ts:153`
- **Vite Config**: `vite.config.ts:1-29`
- **Environment Variables**: `.env:1-10`

---

## Appendix: Full System Context

### The 11 Rubric Dimensions (All Working in Backend)
1. voice_integrity
2. specificity_evidence
3. transformative_impact
4. role_clarity_ownership
5. narrative_arc_stakes
6. initiative_leadership
7. community_collaboration
8. reflection_meaning
9. craft_language_quality
10. fit_trajectory
11. time_investment_consistency

### Three Heuristic Fallback Paths (All Fixed)
1. Quick depth (intentional - saves API credits) ✅
2. No API key (emergency fallback) ✅
3. API error/timeout (catches auth errors, credit issues, timeouts) ✅

**All paths now return 11 dimensions** - this was the bug we just fixed!

### Current Branch Status
- **Main branch**: Has all 11-dimension fixes merged
- **Local changes**: Documentation improvements pending
- **Servers**: Both running, but not communicating

---

**Document Version**: 1.0
**Created**: 2025-11-11
**Last Updated**: 2025-11-11
**Status**: Ready for Implementation
