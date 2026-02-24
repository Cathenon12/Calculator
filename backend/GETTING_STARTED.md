# 🚀 Backend Node.js - Guide de Démarrage

Félicitations! 🎉 Le backend de votre calculatrice a été créé avec succès!

## ✅ Qu'est-ce qui a été créé?

### Structure du backend:
```
backend/
├── server.js              # Serveur Express principal
├── package.json           # Dépendances npm
├── .env                  # Variables d'environnement
├── start.sh              # Script de démarrage bash
├── test-api.js           # Tests de l'API
├── .gitignore            # Fichiers à ignorer dans git
├── README.md             # Documentation complète
├── EXAMPLES.md           # Exemples d'utilisation
└── routes/
    ├── calculator.js     # Endpoints: calculs simples/avancés
    ├── statistics.js     # Endpoints: analyses statistiques
    └── financial.js      # Endpoints: calculs financiers
```

### Fichiers créés au niveau du projet:
- `PROJECT_STRUCTURE.md` - Documentation de l'architecture globale

## 🎯 Endpoints disponibles

| Endpoint | Méthode | Fonction |
|----------|---------|----------|
| `/api/calculator/calculate` | POST | Calcul mathématique |
| `/api/calculator/advanced` | POST | Opérations avancées (sqrt, factorial, etc) |
| `/api/statistics/analyze` | POST | Analyse statistique complète |
| `/api/statistics/frequency` | POST | Distribution des fréquences |
| `/api/statistics/quartiles` | POST | Calcul des quartiles |
| `/api/financial/compound-interest` | POST | Intérêts composés |
| `/api/financial/mortgage` | POST | Calcul de prêt hypothécaire |
| `/api/financial/vat` | POST | Calcul de TVA |
| `/api/financial/investment` | POST | Rendement d'investissement |
| `/api/health` | GET | Vérifier l'état du serveur |

## 🚗 Démarrage rapide

### 1️⃣ Première utilisation

```bash
# Aller dans le dossier backend
cd backend

# Les dépendances sont déjà installées, mais on peut vérifier
npm install
```

### 2️⃣ Démarrer le serveur

**Option A - Mode production:**
```bash
npm start
```

**Option B - Mode développement (avec rechargement auto):**
```bash
npm run dev
```

**Option C - Utiliser le script bash:**
```bash
./start.sh           # Mode production
./start.sh dev       # Mode développement
```

### 3️⃣ Tester l'API

```bash
# Depuis le dossier backend
node test-api.js

# Ou avec curl (après avoir démarré le serveur)
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"expression": "2+3*4"}'
```

## 📝 Exemples d'utilisation

### Calculatrice
```bash
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"expression": "10+5*2"}'
```

### Statistiques
```bash
curl -X POST http://localhost:5000/api/statistics/analyze \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4, 5]}'
```

### Intérêts composés
```bash
curl -X POST http://localhost:5000/api/financial/compound-interest \
  -H "Content-Type: application/json" \
  -d '{"principal": 1000, "rate": 5, "years": 10}'
```

👉 **Voir `EXAMPLES.md` pour plus d'exemples!**

## 🔌 Connecter le Frontend

Pour connecter votre frontend (index.html) au backend, voici un exemple:

```javascript
// Dans script.js
async function calculateFromAPI(expression) {
  const response = await fetch('http://localhost:5000/api/calculator/calculate', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ expression })
  });
  
  const data = await response.json();
  return data.result;
}
```

## ⚙️ Configuration

Le serveur utilise les variables dans `.env`:
- `PORT=5000` - Port du serveur
- `NODE_ENV=development` - Environnement

Vous pouvez les modifier selon vos besoins.

## 🧪 Tests

Script de test intégré:
```bash
npm start &           # Démarrer le serveur en background
sleep 2              # Attendre que le serveur démarre
node test-api.js     # Lancer les tests
```

## 📚 Documentation complète

- **`backend/README.md`** - Documentation API détaillée
- **`backend/EXAMPLES.md`** - Exemples avec curl et JavaScript
- **`PROJECT_STRUCTURE.md`** - Vue d'ensemble du projet

## 🛠️ Dépendances

- `express` - Framework web
- `cors` - Gestion des CORS (pour accepter les requêtes du frontend)
- `body-parser` - Parser JSON
- `dotenv` - Variables d'environnement
- `nodemon` (dev) - Rechargement automatique en développement

## ⚠️ Problèmes courants

### "Port 5000 déjà utilisé"
```bash
# Trouver le processus
lsof -i :5000

# Tuer le processus
kill -9 <PID>
```

### "Cannot find module 'express'"
```bash
npm install
```

### CORS error depuis le frontend
Le CORS est déjà configuré (`npm install express cors`), mais assurez-vous que:
- Le frontend appelle `http://localhost:5000/api/...`
- Le server.js a `app.use(cors());`

## 🚀 Prochaines étapes

1. ✅ Backend créé et testé
2. ⬜ Connecter le frontend au backend
3. ⬜ Ajouter une base de données (MongoDB, PostgreSQL, etc)
4. ⬜ Ajouter l'authentification utilisateur
5. ⬜ Déployer en production (Heroku, Railway, Vercel, etc)

## 📞 Besoin d'aide?

Consultez:
1. Les exemples dans `EXAMPLES.md`
2. La documentation dans `README.md`
3. Les logs : `node server.js` (mode développement)

---

**Bon développement! 🎯**
