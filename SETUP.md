# 📦 Setup Complet - Frontend + Backend

Guide complet pour mettre en place la Calculatrice Pro avec le frontend et le backend.

## 📋 Prérequis

- **Node.js** v14+ ([Télécharger](https://nodejs.org/))
- **npm** (inclus avec Node.js)
- Un navigateur moderne (Chrome, Firefox, Safari, Edge)

Vérifier l'installation:
```bash
node --version
npm --version
```

## 1️⃣ Configuration du Backend

### Étape 1: Accéder au dossier backend
```bash
cd Calculator/backend
```

### Étape 2: Installer les dépendances
```bash
npm install
```

### Étape 3: Vérifier la configuration
```bash
cat .env
```

Devrait afficher:
```
PORT=5000
NODE_ENV=development
```

### Étape 4: Démarrer le serveur
```bash
# Mode production
npm start

# OU Mode développement (avec rechargement auto)
npm run dev
```

**Résultat attendu:**
```
🚀 Serveur démarré sur http://localhost:5000
📊 API Calculatrice disponible sur http://localhost:5000/api
```

### Étape 5: Tester l'API (dans un autre terminal)
```bash
cd Calculator/backend
node test-api.js
```

## 2️⃣ Configuration du Frontend

### Étape 1: Ouvrir le fichier frontend
```bash
# Depuis le dossier Calculator
open index.html

# Ou sur Linux
xdg-open index.html

# Ou sur Windows
start index.html
```

### Étape 2: Tester les fonctionnalités locales

La calculatrice fonctionne en standalone sans backend requis pour:
- ✅ Calculs basiques, scientifiques, programmation
- ✅ Conversions d'unités
- ✅ Statistiques
- ✅ Calculs financiers
- ✅ Thème sombre/clair
- ✅ Historique

### Étape 3: Connecter au backend (Optionnel)

Pour utiliser l'API backend, modifier `script.js`:

```javascript
// Ajouter après la création de la calculatrice
window.apiUrl = 'http://localhost:5000/api';

// Modifier la fonction de calcul
async function useBackendCalculate(expression) {
  try {
    const response = await fetch(window.apiUrl + '/calculator/calculate', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ expression })
    });
    
    const data = await response.json();
    return data.result;
  } catch (error) {
    console.error('Erreur API:', error);
    return null;
  }
}
```

## 🎯 Architecture

### Frontend (index.html + script.js)
```
localhost:3000 ou file://
├── Mode Basique
├── Mode Scientifique
├── Mode Programmation
├── Conversions
├── Financier
└── Statistiques
```

### Backend (Node.js + Express)
```
http://localhost:5000/api
├── /calculator/calculate
├── /calculator/advanced
├── /statistics/analyze
├── /statistics/frequency
├── /statistics/quartiles
├── /financial/compound-interest
├── /financial/mortgage
├── /financial/vat
├── /financial/investment
└── /health
```

## 🔄 Workflow de développement

### Terminal 1: Backend
```bash
cd Calculator/backend
npm run dev           # Mode développement avec rechargement auto
```

### Terminal 2: Frontend
```bash
# Option A: Ouvrir index.html directement
open Calculator/index.html

# Option B: Serveur local simple (optionnel)
cd Calculator
python -m http.server 8000
# Puis ouvrir http://localhost:8000
```

### Terminal 3: Tests
```bash
cd Calculator/backend
node test-api.js
```

## 📁 Structure complète

```
Calculator/
├── index.html              # Page principale
├── index2.html            # Page alternative
├── script.js              # Logique JavaScript
├── style.css              # Styles CSS
├── README.md              # Documentation frontend
├── TODO.md                # Liste des tâches
├── PROJECT_STRUCTURE.md   # Aperçu du projet
│
└── backend/               # 🆕 API Node.js
    ├── server.js
    ├── package.json
    ├── .env
    ├── .gitignore
    ├── test-api.js
    ├── start.sh
    ├── README.md
    ├── EXAMPLES.md
    ├── GETTING_STARTED.md
    └── routes/
        ├── calculator.js
        ├── statistics.js
        └── financial.js
```

## ✅ Checklist d'installation

- [ ] Node.js installé
- [ ] Backend: `npm install` effectué
- [ ] Backend: `.env` configuré
- [ ] Backend: `npm start` fonctionne
- [ ] Backend: Tests passent (`node test-api.js`)
- [ ] Frontend: `index.html` s'ouvre dans le navigateur
- [ ] Frontend: Calculatrice fonctionne en local
- [ ] (Optionnel) Frontend connecté au backend

## 🚀 Déploiement

### Backend (Heroku exemple)
```bash
# Sans base de données ni authentification, c'est très simple
heroku create mon-api-calculatrice
git init
git add .
git commit -m "Initial commit"
git push heroku main
```

### Frontend (Vercel/Netlify)
```bash
# Vercel
vercel

# Netlify
netlify deploy --prod
```

## 🔧 Dépannage

### Le backend ne démarre pas
```bash
# Vérifier les erreurs
npm start

# Vérifier le port 5000
lsof -i :5000

# Changer de port dans .env
PORT=3001
```

### CORS error depuis le frontend
- Vérifier que le backend est démarré
- Vérifier l'URL dans le code: `http://localhost:5000`
- Vérifier que CORS est activé dans `server.js`

### Module not found
```bash
cd backend
rm -rf node_modules package-lock.json
npm install
```

### Port en conflit
```bash
# Voir quel processus utilise le port
lsof -i :5000

# Arrêter le processus
kill -9 <PID>

# Ou utiliser un port différent dans .env
PORT=5001
```

## 📚 Documentation

- [Frontend README](./README.md) - Détails du frontend
- [Backend README](./backend/README.md) - Détails de l'API
- [Exemples API](./backend/EXAMPLES.md) - Exemples d'utilisation
- [Getting Started Backend](./backend/GETTING_STARTED.md) - Guide backend
- [Project Structure](./PROJECT_STRUCTURE.md) - Vue d'ensemble

## 🎓 Apprentissage

### Concepts couverts

**Frontend:**
- HTML5
- CSS3 (Variables, Grid, Flexbox)
- JavaScript ES6+ (Classes, Async/Await)
- LocalStorage
- DOM manipulation
- Event handling

**Backend:**
- Node.js
- Express.js
- Middleware
- Routing
- REST API
- Error handling

## 💡 Prochains projets

1. **Authentification**: Ajouter login/signup
2. **Base de données**: MongoDB/PostgreSQL pour l'historique
3. **Tests**: Jest/Mocha pour tester l'API
4. **Docker**: Containeriser l'application
5. **CI/CD**: GitHub Actions
6. **GraphQL**: Alternative à REST
7. **WebSockets**: Calculs en temps réel

## 📞 Support

Pour les questions:
1. Consulter les README fournis
2. Vérifier les exemples dans `EXAMPLES.md`
3. Lire les logs d'erreur attentivement
4. Vérifier que le backend est bien démarré

---

**Prêt à développer? 🚀**
