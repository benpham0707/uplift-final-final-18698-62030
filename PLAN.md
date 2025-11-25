# PIQ Workshop: Save, Caching, and Versioning System - Implementation Plan

## Executive Summary

The PIQ Workshop currently has a **fundamentally broken save and versioning system**. While the analysis backend works correctly, users cannot reliably persist their work across sessions or devices. This plan addresses critical database infrastructure issues, implements proper save flows, and builds a complete versioning system.

---

## Current System Analysis

### What Works ✅
- **Analysis Engine**: Full 4-stage surgical workshop analysis (voice fingerprint, experience fingerprint, 12-dimension rubric, workshop items)
- **Local Caching**: Analysis results cached in localStorage for 7 days
- **Auto-save Timer**: Triggers every 30 seconds when there are unsaved changes
- **UI/UX**: Score display, dimension cards, workshop chat, editor interface

### Critical Issues ❌

#### 1. **Missing Database Table** (BLOCKING)
- Code references `piq_essay_versions` table that doesn't exist in the database
- All cloud saves fail with "relation 'piq_essay_versions' does not exist" error
- No persistent storage across devices or sessions

#### 2. **Save Button Not Working**
- `handleSave()` only updates local state
- No database inserts
- No analysis result persistence
- Triggers re-analysis but doesn't save the results

#### 3. **Versioning Not Persisting**
- Versions stored only in React state + localStorage (max 10 versions)
- No cloud backup of version history
- Cannot view version history after browser clear
- No comparison between versions

#### 4. **Analysis Results Not Saved to Database**
- Analysis results cached locally but never inserted into `essay_analysis_reports` table
- Loss of historical analysis data
- Cannot track improvement over time

#### 5. **Authentication Mismatch**
- Code uses `supabase.auth.getUser()` but project uses Clerk authentication
- Recent commit: "Fix frontend using Supabase token instead of Clerk token" indicates known issue
- All Supabase calls will fail authentication

#### 6. **Auto-save Not Triggering Re-analysis**
- Auto-save correctly doesn't trigger analysis ✅
- But manually clicking "Save" should save to database (currently doesn't)

---

## Solution Architecture

### Three-Tier Storage System

```
┌─────────────────────────────────────────────────────────────────┐
│                    1. REACT STATE (Immediate)                    │
│  currentDraft, analysisResult, dimensions, draftVersions         │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│            2. LOCALSTORAGE (Auto-save every 30s)                 │
│  - Quick resume on refresh                                       │
│  - Keep last 10 versions                                         │
│  - Cache analysis results (7 days)                               │
└─────────────────────────────────────────────────────────────────┘
                              ↓
┌─────────────────────────────────────────────────────────────────┐
│           3. SUPABASE CLOUD (Manual "Save" button)               │
│  - essays table: current draft                                   │
│  - essay_revision_history: full version history                  │
│  - essay_analysis_reports: analysis snapshots                    │
└─────────────────────────────────────────────────────────────────┘
```

---

## Database Schema Design

### Option A: Use Existing Tables (RECOMMENDED)

**Rationale**: The existing `essay_revision_history` table already provides versioning functionality. We should use it instead of creating a separate `piq_essay_versions` table.

#### Tables to Use:

**1. `essays` table** (already exists)
```sql
-- Store current PIQ draft
- essay_type = 'uc_piq'
- prompt_text = selected PIQ prompt
- draft_original = initial draft
- draft_current = current working draft
- version = auto-incremented on update (via trigger)
```

**2. `essay_revision_history` table** (already exists)
```sql
-- Automatically populated by trigger when essay.draft_current changes
- essay_id
- version (incremented)
- draft_content (snapshot)
- word_count
- created_at
```

**3. `essay_analysis_reports` table** (already exists)
```sql
-- Store analysis results linked to essay
- essay_id
- essay_quality_index (maps to narrative_quality_index)
- dimension_scores (JSONB: store full rubricDimensionDetails)
- flags (store workshop items)
- created_at
```

#### New Fields Needed:

Add to `essay_analysis_reports`:
```sql
ALTER TABLE essay_analysis_reports
ADD COLUMN voice_fingerprint JSONB,
ADD COLUMN experience_fingerprint JSONB,
ADD COLUMN workshop_items JSONB,
ADD COLUMN full_analysis_result JSONB;
```

### Option B: Create New PIQ-Specific Table

Only if we need PIQ-specific features not covered by existing schema:

```sql
CREATE TABLE piq_essay_versions (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES auth.users(id),
  prompt_id TEXT NOT NULL,  -- 'piq1', 'piq2', etc.
  prompt_title TEXT NOT NULL,
  essay_text TEXT NOT NULL,
  word_count INTEGER NOT NULL,
  analysis_snapshot JSONB,
  narrative_quality_index NUMERIC(5,2),
  version_number INTEGER NOT NULL,
  is_current BOOLEAN DEFAULT TRUE,
  created_at TIMESTAMPTZ DEFAULT NOW(),
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

CREATE INDEX idx_piq_versions_user_prompt ON piq_essay_versions(user_id, prompt_id);
CREATE INDEX idx_piq_versions_current ON piq_essay_versions(user_id, prompt_id, is_current) WHERE is_current = TRUE;
```

**Decision**: Use **Option A** (existing tables) to reduce complexity and leverage existing infrastructure.

---

## Implementation Plan

### Phase 1: Database Infrastructure (CRITICAL - Must be first)

#### Task 1.1: Add Missing Columns to `essay_analysis_reports`
```sql
ALTER TABLE essay_analysis_reports
ADD COLUMN voice_fingerprint JSONB,
ADD COLUMN experience_fingerprint JSONB,
ADD COLUMN workshop_items JSONB,
ADD COLUMN full_analysis_result JSONB;
```

#### Task 1.2: Fix Authentication Integration
- **Problem**: Code uses Supabase Auth, but app uses Clerk
- **Solution**: Create helper function to get Clerk user ID and use it for Supabase RLS

**File**: `src/services/auth/clerkSupabaseAdapter.ts` (NEW)
```typescript
/**
 * Adapter to bridge Clerk auth with Supabase RLS
 */
export async function getCurrentUserId(): Promise<string | null> {
  // Get Clerk user ID
  const { userId } = useAuth(); // Clerk hook

  // Map to Supabase user_id (may need user mapping table)
  return userId;
}

export async function getSupabaseAuthHeaders(): Promise<{ 'Authorization': string }> {
  // Get Clerk JWT token
  const { getToken } = useAuth();
  const token = await getToken({ template: 'supabase' });

  return { 'Authorization': `Bearer ${token}` };
}
```

#### Task 1.3: Update Supabase Service to Use Clerk Auth
**File**: `src/services/piqWorkshop/supabaseService.ts`

Replace all instances of:
```typescript
const { data: { user } } = await supabase.auth.getUser();
```

With:
```typescript
const userId = await getCurrentUserId();
if (!userId) {
  return { success: false, error: 'User not authenticated' };
}
```

#### Task 1.4: Create Database Migration Script
**File**: `supabase/migrations/2025-11-25_add_piq_analysis_fields.sql`

---

### Phase 2: Save Flow Implementation

#### Task 2.1: Create PIQ Database Service
**File**: `src/services/piqWorkshop/piqDatabaseService.ts` (NEW)

Functions to implement:
```typescript
/**
 * Save or update PIQ essay in database
 */
export async function saveOrUpdatePIQEssay(
  promptId: string,
  promptText: string,
  currentDraft: string,
  analysisResult: AnalysisResult | null
): Promise<{ success: boolean; essayId?: string; error?: string }>

/**
 * Save analysis result to database
 */
export async function saveAnalysisReport(
  essayId: string,
  analysisResult: AnalysisResult
): Promise<{ success: boolean; reportId?: string; error?: string }>

/**
 * Load PIQ essay and latest analysis from database
 */
export async function loadPIQEssay(
  promptId: string
): Promise<{
  success: boolean;
  essay?: Essay;
  analysis?: AnalysisResult;
  error?: string
}>

/**
 * Get version history for PIQ essay
 */
export async function getVersionHistory(
  essayId: string
): Promise<{ success: boolean; versions?: EssayVersion[]; error?: string }>
```

#### Task 2.2: Fix `handleSave()` in PIQWorkshop.tsx

**Current code** (line 638-652):
```typescript
const handleSave = useCallback(() => {
  const newVersion: DraftVersion = {
    text: currentDraft,
    timestamp: Date.now(),
    score: analysisResult?.analysis?.narrative_quality_index || 73
  };
  const newVersions = draftVersions.slice(0, currentVersionIndex + 1);
  newVersions.push(newVersion);
  setDraftVersions(newVersions);
  setCurrentVersionIndex(newVersions.length - 1);

  if (needsReanalysis) {
    performFullAnalysis();
  }
}, [currentDraft, draftVersions, currentVersionIndex, needsReanalysis, performFullAnalysis, analysisResult]);
```

**New implementation**:
```typescript
const handleSave = useCallback(async () => {
  // 1. Update local state (keep existing logic)
  const newVersion: DraftVersion = {
    text: currentDraft,
    timestamp: Date.now(),
    score: analysisResult?.analysis?.narrative_quality_index || 73
  };
  const newVersions = draftVersions.slice(0, currentVersionIndex + 1);
  newVersions.push(newVersion);
  setDraftVersions(newVersions);
  setCurrentVersionIndex(newVersions.length - 1);

  // 2. Save to database
  if (!selectedPromptId) return;

  const selectedPrompt = UC_PIQ_PROMPTS.find(p => p.id === selectedPromptId);
  if (!selectedPrompt) return;

  setSaveStatus('saving');

  // Save essay to database
  const { success, essayId, error } = await saveOrUpdatePIQEssay(
    selectedPromptId,
    selectedPrompt.prompt,
    currentDraft,
    analysisResult
  );

  if (!success) {
    console.error('Failed to save essay:', error);
    setSaveStatus('error');
    setLastSaveError(error);
    return;
  }

  // Save analysis result if present
  if (analysisResult && essayId) {
    await saveAnalysisReport(essayId, analysisResult);
  }

  setSaveStatus('saved');
  setLastSaveTime(new Date());
  setHasUnsavedChanges(false);

  // 3. Re-analyze if needed (but don't trigger auto-save during analysis)
  if (needsReanalysis) {
    await performFullAnalysis();
  }
}, [currentDraft, selectedPromptId, analysisResult, needsReanalysis]);
```

#### Task 2.3: Update `performFullAnalysis()` to Auto-Save Results

After analysis completes, automatically save to database:

```typescript
// Add to performFullAnalysis() after setAnalysisResult(result)
if (currentEssayId) {
  await saveAnalysisReport(currentEssayId, result);
  console.log('✅ Analysis result auto-saved to database');
}
```

#### Task 2.4: Add Save Status Indicators

Add state for save status:
```typescript
const [saveStatus, setSaveStatus] = useState<'idle' | 'saving' | 'saved' | 'error'>('idle');
const [lastSaveError, setLastSaveError] = useState<string | null>(null);
```

Update header to show status:
```tsx
{saveStatus === 'saving' && <Loader2 className="w-4 h-4 animate-spin text-blue-500" />}
{saveStatus === 'saved' && <CheckCircle className="w-4 h-4 text-green-500" />}
{saveStatus === 'error' && (
  <Tooltip>
    <TooltipTrigger>
      <XCircle className="w-4 h-4 text-red-500" />
    </TooltipTrigger>
    <TooltipContent>{lastSaveError}</TooltipContent>
  </Tooltip>
)}
```

---

### Phase 3: Versioning System

#### Task 3.1: Create Version History Component
**File**: `src/components/portfolio/piq/workshop/PIQVersionHistory.tsx` (NEW)

Features:
- Display all versions from `essay_revision_history`
- Show score for each version (from `essay_analysis_reports` at that timestamp)
- Visual diff between versions
- Restore previous version
- Compare any two versions side-by-side
- Filter by score improvement/decline

#### Task 3.2: Integrate Version History into UI

Add "Version History" button to PIQWorkshop:
```tsx
<Button
  variant="outline"
  onClick={() => setShowVersionHistory(true)}
  className="gap-2"
>
  <History className="w-4 h-4" />
  Version History ({versionCount})
</Button>
```

#### Task 3.3: Implement Version Comparison

Show score delta between versions:
```tsx
<div className="flex items-center gap-2">
  <span>Version {version.version_number}</span>
  <Badge variant={scoreDelta > 0 ? 'success' : 'destructive'}>
    {scoreDelta > 0 ? '+' : ''}{scoreDelta} points
  </Badge>
</div>
```

#### Task 3.4: Version Restore Flow

When user restores a version:
1. Load version content from `essay_revision_history`
2. Set as `currentDraft`
3. Create new version in history (don't delete newer versions)
4. Mark as `needsReanalysis`
5. Show banner: "Restored version X from [date]"

---

### Phase 4: Auto-Save Improvements

#### Task 4.1: Fix Auto-Save to Not Trigger Re-Analysis ✅
**Already correct** - auto-save timer only saves to localStorage, doesn't call `performFullAnalysis()`

#### Task 4.2: Add Debounced Local Save

Replace 30-second timer with debounced save (save 2 seconds after user stops typing):

```typescript
const debouncedSave = useMemo(
  () => debounce(() => {
    if (!selectedPromptId || !currentDraft) return;

    const cache: PIQWorkshopCache = {
      promptId: selectedPromptId,
      promptTitle: selectedPrompt.title,
      currentDraft,
      lastSaved: Date.now(),
      analysisResult,
      versions: [...],
      autoSaveEnabled: true
    };

    saveToLocalStorage(cache);
    setLastSaveTime(new Date());
    console.log('✅ Auto-saved (debounced)');
  }, 2000),
  [selectedPromptId, currentDraft, analysisResult]
);

// Trigger on draft change
useEffect(() => {
  if (hasUnsavedChanges) {
    debouncedSave();
  }
}, [currentDraft, hasUnsavedChanges, debouncedSave]);
```

#### Task 4.3: Keep 30-Second Cloud Backup

Keep the 30-second timer for cloud saves (optional):

```typescript
// Optional: Auto-save to cloud every 30 seconds in addition to localStorage
autoSaveTimerRef.current = setInterval(async () => {
  if (hasUnsavedChanges && currentDraft && enableCloudAutoSave) {
    await saveOrUpdatePIQEssay(selectedPromptId, promptText, currentDraft, analysisResult);
    console.log('✅ Auto-saved to cloud');
  }
}, 30000);
```

---

### Phase 5: Load Flow & Resume Session

#### Task 5.1: Load from Database on Mount

```typescript
useEffect(() => {
  async function loadInitialData() {
    if (!selectedPromptId) return;

    // Try loading from database first
    const { success, essay, analysis } = await loadPIQEssay(selectedPromptId);

    if (success && essay) {
      setCurrentDraft(essay.draft_current || essay.draft_original);
      if (analysis) {
        setAnalysisResult(analysis);
        // Transform to UI dimensions...
      }
      console.log('✅ Loaded from database');
      return;
    }

    // Fallback to localStorage
    const cache = loadFromLocalStorage(selectedPromptId);
    if (cache) {
      setCurrentDraft(cache.currentDraft);
      setAnalysisResult(cache.analysisResult);
      console.log('✅ Loaded from localStorage');
    }
  }

  loadInitialData();
}, [selectedPromptId]);
```

#### Task 5.2: Resume Session Banner

Update banner to prioritize database over localStorage:
```tsx
{showResumeSessionBanner && (
  <div className="banner">
    <p>Found draft from {formatTime}</p>
    <Button onClick={handleResumeFromCloud}>Resume from Cloud</Button>
    <Button onClick={handleResumeFromLocal}>Resume Local</Button>
    <Button onClick={handleStartFresh}>Start Fresh</Button>
  </div>
)}
```

---

### Phase 6: Remove "Save to Cloud" Button

#### Task 6.1: Remove `handleSaveToCloud` Function
**File**: `src/pages/PIQWorkshop.tsx` (line 596-626)

Delete the `handleSaveToCloud` callback entirely.

#### Task 6.2: Remove `onSaveToCloud` Prop from EditorView
**File**: `src/pages/PIQWorkshop.tsx` (line 1268)

Remove: `onSaveToCloud={handleSaveToCloud}`

#### Task 6.3: Update EditorView Component
**File**: `src/components/portfolio/extracurricular/workshop/views/EditorView.tsx`

Remove any UI rendering of "Save to Cloud" button.

#### Task 6.4: Update supabaseService.ts
**File**: `src/services/piqWorkshop/supabaseService.ts`

Delete or deprecate the old cloud-specific functions:
- `saveVersionToCloud()` (replace with new service)
- `loadVersionsFromCloud()` (replace with new service)

---

## Testing Plan

### Test Cases

#### 1. Save Flow
- [ ] User edits essay → clicks Save → essay saved to database
- [ ] User clicks Save with analysis → analysis saved to `essay_analysis_reports`
- [ ] User clicks Save without analysis → only essay saved
- [ ] Save status indicator shows "Saving..." → "Saved"
- [ ] Save failure shows error message

#### 2. Auto-Save
- [ ] User types → auto-save triggers after 2 seconds
- [ ] Auto-save does NOT trigger re-analysis
- [ ] Auto-save updates localStorage
- [ ] Auto-save shows timestamp in UI

#### 3. Analysis & Save
- [ ] User clicks Analyze → analysis runs → results auto-saved to database
- [ ] Analysis result cached in localStorage
- [ ] Analysis result linked to essay in `essay_analysis_reports`

#### 4. Versioning
- [ ] Each save creates new version in `essay_revision_history`
- [ ] Version history shows all versions with timestamps
- [ ] Version history shows score for each version
- [ ] User can restore previous version
- [ ] Restoring version creates new version (doesn't overwrite)

#### 5. Load/Resume
- [ ] User refreshes page → data loaded from database
- [ ] User switches devices → data loaded from database
- [ ] User sees resume banner if draft exists
- [ ] Resume banner prioritizes cloud over local

#### 6. Authentication
- [ ] Clerk user can save essays
- [ ] Clerk user can only see their own essays
- [ ] Supabase RLS enforces user isolation

---

## Success Criteria

### Must Have (MVP)
1. ✅ Save button saves to database
2. ✅ Analysis results persisted to database
3. ✅ Version history accessible and restorable
4. ✅ Auto-save works without triggering re-analysis
5. ✅ Authentication works with Clerk
6. ✅ Data persists across sessions/devices

### Should Have
1. ✅ Version comparison UI
2. ✅ Score tracking over versions
3. ✅ Save status indicators
4. ✅ Resume session banner

### Nice to Have
1. Version tagging/notes
2. Export version history
3. Share version with others
4. Batch operations on versions

---

## Risk Assessment

### High Risk
1. **Authentication integration** - Clerk → Supabase mapping may be complex
   - Mitigation: Create adapter layer, test thoroughly
2. **Data migration** - Existing localStorage data needs migration
   - Mitigation: Keep localStorage as fallback, gradual migration

### Medium Risk
1. **Performance** - Saving on every analysis may be slow
   - Mitigation: Async saves, optimistic UI updates
2. **Version bloat** - Many versions may slow queries
   - Mitigation: Archive old versions, pagination

### Low Risk
1. **UI changes** - Removing "Save to Cloud" button
   - Mitigation: Simple removal, low impact

---

## Implementation Timeline

### Day 1: Database & Auth (4-6 hours)
- [ ] Task 1.1: Add columns to `essay_analysis_reports`
- [ ] Task 1.2: Create Clerk-Supabase adapter
- [ ] Task 1.3: Update supabaseService.ts
- [ ] Task 1.4: Create and run migration

### Day 2: Save Flow (6-8 hours)
- [ ] Task 2.1: Create piqDatabaseService.ts
- [ ] Task 2.2: Fix handleSave()
- [ ] Task 2.3: Update performFullAnalysis()
- [ ] Task 2.4: Add save status indicators
- [ ] Testing: Basic save flow

### Day 3: Versioning (6-8 hours)
- [ ] Task 3.1: Create PIQVersionHistory component
- [ ] Task 3.2: Integrate into UI
- [ ] Task 3.3: Implement comparison
- [ ] Task 3.4: Version restore flow
- [ ] Testing: Version operations

### Day 4: Auto-Save & Load (4-6 hours)
- [ ] Task 4.2: Debounced local save
- [ ] Task 5.1: Load from database on mount
- [ ] Task 5.2: Resume session banner
- [ ] Testing: Auto-save and load flows

### Day 5: Cleanup & Polish (4-6 hours)
- [ ] Task 6: Remove "Save to Cloud" button
- [ ] Integration testing
- [ ] Bug fixes
- [ ] Documentation

**Total Estimated Time: 24-34 hours**

---

## Open Questions

1. **Clerk-Supabase Integration**
   - How is the Clerk user ID mapped to Supabase user_id?
   - Is there a `user_mappings` table?
   - Do we need to create Supabase users for Clerk users?

2. **Existing Data**
   - Are there users with localStorage data that needs migration?
   - Should we migrate automatically or prompt users?

3. **Essay Ownership**
   - Can PIQ essays be shared/transferred?
   - Do counselors need read access?

4. **Version Limits**
   - Should we limit versions per essay?
   - Archive vs delete old versions?

5. **Performance**
   - Should we debounce database saves?
   - Use optimistic updates?

---

## Dependencies

### Required
- Clerk authentication already configured
- Supabase client initialized
- Database migration tools available
- Existing essay system tables (`essays`, `essay_revision_history`, `essay_analysis_reports`)

### Optional
- Lodash debounce (for auto-save)
- diff library (for version comparison)
- date-fns (for timestamp formatting)

---

## Rollback Plan

If issues arise during implementation:

1. **Phase 1 (Database)**: Revert migration
   ```sql
   ALTER TABLE essay_analysis_reports
   DROP COLUMN voice_fingerprint,
   DROP COLUMN experience_fingerprint,
   DROP COLUMN workshop_items,
   DROP COLUMN full_analysis_result;
   ```

2. **Phase 2-5 (Code)**: Feature flag to disable new save flow
   ```typescript
   const USE_NEW_SAVE_FLOW = false; // Toggle to revert
   ```

3. **Fallback**: Keep localStorage as primary storage until cloud saves proven stable

---

## Next Steps

**Before Implementation:**
1. ✅ Review this plan with team
2. ✅ Get approval on architecture decisions
3. ✅ Clarify Clerk-Supabase auth integration
4. ✅ Set up test environment

**After Approval:**
1. Create feature branch: `feature/piq-save-versioning`
2. Begin Phase 1: Database Infrastructure
3. Test each phase thoroughly before proceeding
4. Document any deviations from plan

---

## Notes

- This plan assumes existing essay system infrastructure is production-ready
- Clerk authentication integration details may require adjustment based on actual implementation
- LocalStorage will remain as a performance cache even after cloud saves implemented
- Consider adding analytics to track save success rates and performance
