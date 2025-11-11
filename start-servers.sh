#!/bin/bash

# Uplift Analysis Platform - Server Startup Script
# This script helps you verify both servers are running correctly

echo "================================================"
echo "🚀 Uplift Analysis Platform - Server Check"
echo "================================================"
echo ""

# Check if backend is running
echo "🔍 Checking Backend Server (Port 8789)..."
if curl -s http://localhost:8789/api/v1/health > /dev/null 2>&1; then
    echo "✅ Backend server is running on port 8789"
    curl -s http://localhost:8789/api/v1/health | python3 -m json.tool
else
    echo "❌ Backend server NOT running on port 8789"
    echo ""
    echo "To start backend, run in a new terminal:"
    echo "  npx tsx src/http/server.ts"
fi

echo ""
echo "------------------------------------------------"
echo ""

# Check if Vite dev server is running
echo "🔍 Checking Vite Dev Server (Port 8080)..."
if curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "✅ Vite dev server is running on port 8080"
else
    echo "❌ Vite dev server NOT running on port 8080"
    echo ""
    echo "To start Vite, run in a new terminal:"
    echo "  npm run dev"
fi

echo ""
echo "------------------------------------------------"
echo ""

# Test proxy connectivity if both are running
if curl -s http://localhost:8789/api/v1/health > /dev/null 2>&1 && curl -s http://localhost:8080 > /dev/null 2>&1; then
    echo "🔗 Testing Vite Proxy Connectivity..."
    if curl -s http://localhost:8080/api/v1/health > /dev/null 2>&1; then
        echo "✅ Vite proxy is working correctly!"
        echo ""
        echo "🎉 All systems operational!"
        echo ""
        echo "Open your browser to: http://localhost:8080"
    else
        echo "❌ Vite proxy is NOT working"
        echo ""
        echo "Debug steps:"
        echo "1. Check Vite terminal for [Vite Proxy] logs"
        echo "2. Verify vite.config.ts has target: 'http://127.0.0.1:8789'"
        echo "3. Check backend CORS configuration in src/http/server.ts"
    fi
else
    echo "⚠️  Cannot test proxy - both servers must be running"
fi

echo ""
echo "================================================"
echo ""
