#!/bin/bash

# Script pour démarrer le serveur backend

echo "🚀 Démarrage du serveur Calculatrice Pro..."
cd "$(dirname "$0")"

# Vérifier si node est installé
if ! command -v node &> /dev/null; then
    echo "❌ Node.js n'est pas installé. Veuillez installer Node.js."
    exit 1
fi

# Vérifier si les dépendances sont installées
if [ ! -d "node_modules" ]; then
    echo "📦 Installation des dépendances..."
    npm install
fi

# Vérifier le mode de démarrage
if [ "$1" = "dev" ]; then
    echo "🔄 Mode développement avec nodemon..."
    npm run dev
else
    echo "🚀 Mode production..."
    npm start
fi
