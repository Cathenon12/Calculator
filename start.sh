#!/bin/bash

echo "🚀 Démarrage de la Calculatrice avec IA"
echo "========================================"
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
RED='\033[0;31m'
NC='\033[0m'

# Vérifier si on est dans le bon dossier
if [ ! -d "backend" ] || [ ! -d "calculator-react" ]; then
    echo -e "${RED}❌ Erreur: Lancez ce script depuis /home/cathenon/Desktop/Project/Calculator${NC}"
    exit 1
fi

# Démarrer le backend
echo -e "${BLUE}📡 Démarrage du backend (port 5000)...${NC}"
cd backend
npm run dev > ../backend.log 2>&1 &
BACKEND_PID=$!
echo $BACKEND_PID > ../backend.pid
cd ..

sleep 3

# Vérifier si le backend est démarré
if ps -p $BACKEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Backend démarré (PID: $BACKEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur de démarrage du backend${NC}"
    cat backend.log
    exit 1
fi

# Démarrer le frontend
echo -e "${BLUE}🎨 Démarrage du frontend (port 5173)...${NC}"
cd calculator-react
npm start > ../frontend.log 2>&1 &
FRONTEND_PID=$!
echo $FRONTEND_PID > ../frontend.pid
cd ..

sleep 2

if ps -p $FRONTEND_PID > /dev/null; then
    echo -e "${GREEN}✓ Frontend démarré (PID: $FRONTEND_PID)${NC}"
else
    echo -e "${RED}❌ Erreur de démarrage du frontend${NC}"
    cat frontend.log
    exit 1
fi

echo ""
echo -e "${GREEN}✅ Application démarrée avec succès !${NC}"
echo ""
echo "📍 URLs:"
echo "   Frontend: http://localhost:5173"
echo "   Backend:  http://localhost:5000"
echo ""
echo "📝 Logs:"
echo "   Backend:  tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "🛑 Pour arrêter:"
echo "   ./stop.sh"
echo ""
