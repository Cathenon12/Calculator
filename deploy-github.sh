#!/bin/bash

echo "🚀 Déploiement sur GitHub"
echo "========================="
echo ""

# Vérifier si Git est initialisé
if [ ! -d ".git" ]; then
    echo "📦 Initialisation de Git..."
    git init
fi

# Ajouter tous les fichiers
echo "📝 Ajout des fichiers..."
git add .

# Demander le message de commit
read -p "💬 Message de commit: " commit_msg
if [ -z "$commit_msg" ]; then
    commit_msg="Update project"
fi

# Commit
echo "✅ Commit..."
git commit -m "$commit_msg"

# Vérifier si le remote existe
if ! git remote | grep -q "origin"; then
    echo ""
    echo "🔗 Configuration du dépôt GitHub"
    read -p "📎 URL du dépôt GitHub (ex: https://github.com/user/repo.git): " repo_url
    git remote add origin "$repo_url"
fi

# Pousser vers GitHub
echo "🚀 Push vers GitHub..."
git branch -M main
git push -u origin main

echo ""
echo "✅ Déploiement terminé !"
echo "🌐 Votre projet est maintenant sur GitHub"
