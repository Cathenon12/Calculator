#!/bin/bash

echo "🧠 Installation du Cerveau IA pour Calculator Pro"
echo "=================================================="
echo ""

# Couleurs
GREEN='\033[0;32m'
BLUE='\033[0;34m'
YELLOW='\033[1;33m'
NC='\033[0m' # No Color

# Installation des dépendances backend
echo -e "${BLUE}📦 Installation des dépendances backend...${NC}"
cd backend
npm install axios multer form-data
echo -e "${GREEN}✓ Dépendances backend installées${NC}"
echo ""

# Création du dossier uploads
echo -e "${BLUE}📁 Création du dossier uploads...${NC}"
mkdir -p uploads
echo -e "${GREEN}✓ Dossier uploads créé${NC}"
echo ""

# Configuration
echo -e "${YELLOW}⚙️  Configuration de l'API IA${NC}"
echo ""
echo "Choisissez votre provider IA:"
echo "1) OpenAI (GPT-4 Vision)"
echo "2) Claude (Anthropic)"
echo "3) Mode Test (sans API)"
read -p "Votre choix (1-3): " choice

case $choice in
  1)
    echo ""
    read -p "Entrez votre clé API OpenAI (ou laissez vide): " api_key
    if [ ! -z "$api_key" ]; then
      echo "" >> .env
      echo "# AI Configuration" >> .env
      echo "AI_PROVIDER=openai" >> .env
      echo "OPENAI_API_KEY=$api_key" >> .env
      echo -e "${GREEN}✓ Configuration OpenAI enregistrée${NC}"
    fi
    ;;
  2)
    echo ""
    read -p "Entrez votre clé API Claude (ou laissez vide): " api_key
    if [ ! -z "$api_key" ]; then
      echo "" >> .env
      echo "# AI Configuration" >> .env
      echo "AI_PROVIDER=claude" >> .env
      echo "CLAUDE_API_KEY=$api_key" >> .env
      echo -e "${GREEN}✓ Configuration Claude enregistrée${NC}"
    fi
    ;;
  3)
    echo "" >> .env
    echo "# AI Configuration" >> .env
    echo "AI_PROVIDER=test" >> .env
    echo -e "${GREEN}✓ Mode test activé${NC}"
    ;;
esac

cd ..

echo ""
echo -e "${GREEN}✅ Installation terminée !${NC}"
echo ""
echo "Pour démarrer:"
echo "1. Backend:  cd backend && npm run dev"
echo "2. Frontend: cd calculator-react && npm start"
echo ""
echo "📖 Consultez AI_BRAIN_DOCS.md pour plus d'informations"
