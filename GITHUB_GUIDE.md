# 🚀 Héberger le Projet sur GitHub

## Étape 1 : Créer un dépôt GitHub

1. Allez sur https://github.com
2. Cliquez sur **"New repository"** (bouton vert)
3. Nom du dépôt : `calculator-pro`
4. Description : `Calculatrice professionnelle avec 7 modes mathématiques`
5. Choisissez **Public** ou **Private**
6. **NE PAS** cocher "Initialize with README"
7. Cliquez sur **"Create repository"**

## Étape 2 : Initialiser Git localement

```bash
cd /home/cathenon/Desktop/Project/Calculator
git init
git add .
git commit -m "Initial commit: Calculatrice Pro avec modes scientifique, graphique et IA"
```

## Étape 3 : Connecter au dépôt GitHub

```bash
git remote add origin https://github.com/VOTRE_USERNAME/calculator-pro.git
git branch -M main
git push -u origin main
```

Remplacez `VOTRE_USERNAME` par votre nom d'utilisateur GitHub.

## Étape 4 : Créer un .gitignore

```bash
cat > .gitignore << 'EOF'
# Dependencies
node_modules/
*/node_modules/

# Production
build/
dist/
*/build/
*/dist/

# Environment
.env
*/.env
.env.local

# Logs
*.log
npm-debug.log*
backend.log
frontend.log

# OS
.DS_Store
Thumbs.db

# IDE
.vscode/
.idea/

# Uploads
backend/uploads/*
!backend/uploads/.gitkeep

# Process IDs
*.pid
EOF
```

## Étape 5 : Créer un README.md principal

```bash
cat > README.md << 'EOF'
# 🧮 Calculatrice Pro Avancée

Une calculatrice web professionnelle avec 7 modes différents, interface moderne et fonctionnalités IA.

## ✨ Fonctionnalités

- 🔢 **Mode Basique** - Opérations simples
- 🔬 **Mode Scientifique** - 7 branches mathématiques
- 📊 **Mode Graphique** - Tracé de fonctions
- 💻 **Mode Programmation** - Conversions binaires
- 🔄 **Convertisseur** - Unités multiples
- 💰 **Mode Financier** - Calculs financiers
- 📈 **Statistiques** - Analyse de données

## 🚀 Installation

### Frontend
```bash
cd calculator-react
npm install
npm start
```

### Backend
```bash
cd backend
npm install
npm run dev
```

## 🌐 Démo

Visitez : [Votre lien de démo]

## 📖 Documentation

- [Guide de démarrage](QUICKSTART_AI.md)
- [Mode Graphique](GRAPH_MODE_DOCS.md)
- [Cerveau IA](AI_BRAIN_DOCS.md)

## 🛠️ Technologies

- React + TypeScript
- Node.js + Express
- Chart.js
- Tailwind CSS
- MySQL

## 📝 License

MIT
EOF
```

## Étape 6 : Pousser les changements

```bash
git add .gitignore README.md
git commit -m "Add .gitignore and README"
git push
```

## 🌐 Héberger en ligne (GitHub Pages)

### Pour le Frontend uniquement :

```bash
cd calculator-react
npm install gh-pages --save-dev
```

Ajoutez dans `package.json` :
```json
{
  "homepage": "https://VOTRE_USERNAME.github.io/calculator-pro",
  "scripts": {
    "predeploy": "npm run build",
    "deploy": "gh-pages -d build"
  }
}
```

Déployez :
```bash
npm run deploy
```

## 🔐 Sécurité

**IMPORTANT** : Ne jamais commiter :
- ❌ Clés API (`.env`)
- ❌ `node_modules/`
- ❌ Fichiers de logs
- ❌ Données sensibles

## 📋 Commandes Git utiles

```bash
# Voir le statut
git status

# Ajouter des fichiers
git add .

# Commit
git commit -m "Description des changements"

# Pousser vers GitHub
git push

# Récupérer les changements
git pull

# Voir l'historique
git log --oneline

# Créer une branche
git checkout -b nouvelle-branche

# Fusionner une branche
git merge nom-branche
```

## 🎯 Structure du dépôt

```
calculator-pro/
├── calculator-react/     # Frontend React
├── backend/             # Backend Node.js
├── README.md           # Documentation principale
├── .gitignore          # Fichiers à ignorer
└── docs/               # Documentation supplémentaire
```

## 🤝 Contribuer

1. Fork le projet
2. Créez une branche (`git checkout -b feature/AmazingFeature`)
3. Commit (`git commit -m 'Add AmazingFeature'`)
4. Push (`git push origin feature/AmazingFeature`)
5. Ouvrez une Pull Request

## 📞 Support

Pour toute question, ouvrez une issue sur GitHub.

---

**Auteur** : Votre Nom  
**License** : MIT  
**Version** : 2.0
