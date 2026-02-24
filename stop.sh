#!/bin/bash

echo "🛑 Arrêt de la Calculatrice"
echo "============================"

if [ -f backend.pid ]; then
    BACKEND_PID=$(cat backend.pid)
    if ps -p $BACKEND_PID > /dev/null; then
        kill $BACKEND_PID
        echo "✓ Backend arrêté"
    fi
    rm backend.pid
fi

if [ -f frontend.pid ]; then
    FRONTEND_PID=$(cat frontend.pid)
    if ps -p $FRONTEND_PID > /dev/null; then
        kill $FRONTEND_PID
        echo "✓ Frontend arrêté"
    fi
    rm frontend.pid
fi

echo "✅ Application arrêtée"
