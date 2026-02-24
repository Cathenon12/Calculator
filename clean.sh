#!/bin/bash

echo "🧹 Nettoyage des fichiers inutiles"
echo "==================================="
echo ""

# Supprimer les logs
echo "📝 Suppression des logs..."
find . -name "*.log" -type f -delete 2>/dev/null
rm -f backend.log frontend.log

# Supprimer les PIDs
echo "🔢 Suppression des PIDs..."
find . -name "*.pid" -type f -delete 2>/dev/null

# Supprimer les fichiers OS
echo "💻 Suppression des fichiers OS..."
find . -name ".DS_Store" -type f -delete 2>/dev/null
find . -name "Thumbs.db" -type f -delete 2>/dev/null

# Supprimer les fichiers temporaires
echo "🗑️  Suppression des fichiers temporaires..."
find . -name "*~" -type f -delete 2>/dev/null
find . -name "*.swp" -type f -delete 2>/dev/null
find . -name "*.swo" -type f -delete 2>/dev/null

# Supprimer les dossiers de cache
echo "📦 Suppression des caches..."
find . -name ".cache" -type d -exec rm -rf {} + 2>/dev/null
find . -name ".temp" -type d -exec rm -rf {} + 2>/dev/null

# Nettoyer les uploads (garder le dossier)
echo "📁 Nettoyage des uploads..."
if [ -d "backend/uploads" ]; then
    find backend/uploads -type f -delete 2>/dev/null
    touch backend/uploads/.gitkeep
fi

# Supprimer les node_modules inutiles (optionnel)
read -p "❓ Supprimer node_modules ? (y/N): " answer
if [ "$answer" = "y" ] || [ "$answer" = "Y" ]; then
    echo "🗑️  Suppression de node_modules..."
    rm -rf calculator-react/node_modules
    rm -rf backend/node_modules
    echo "✅ node_modules supprimés (relancez npm install)"
fi

echo ""
echo "✅ Nettoyage terminé !"
echo ""
echo "📊 Espace libéré:"
du -sh . 2>/dev/null
