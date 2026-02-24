# 📦 Calculatrice Pro - Structure du Projet

Structure complète et organisée du projet avec Frontend et Backend séparés.

## 🗂️ Arborescence

```
Calculator/
├── 📁 frontend/                # 🎨 Interface web
│   ├── index.html              # Page principale
│   ├── index2.html            # Page alternative
│   ├── script.js              # Logique JavaScript (31 KB)
│   ├── style.css              # Styles CSS (13 KB)
│   └── README.md              # Documentation frontend
│
├── 📁 backend/                 # 🔧 API Node.js + MySQL
│   ├── server.js              # Serveur Express principal
│   ├── package.json           # Dépendances npm
│   ├── .env                   # Configuration (DB + PORT)
│   ├── .gitignore             # Fichiers à ignorer
│   ├── database.sql           # Schéma SQL
│   ├── start.sh               # Script de démarrage
│   ├── test-api.js            # Tests de l'API
│   ├── Dockerfile             # Configuration Docker
│   ├── README.md              # Documentation API
│   ├── EXAMPLES.md            # Exemples d'utilisation
│   ├── GETTING_STARTED.md     # Guide de démarrage
│   ├── MYSQL_SETUP.md         # Configuration MySQL
│   │
│   ├── 📁 config/
│   │   └── database.js        # Connexion MySQL
│   │
│   └── 📁 routes/
│       ├── calculator.js      # Routes calcul
│       ├── statistics.js      # Routes statistiques
│       ├── financial.js       # Routes financier
│       └── database.js        # Routes base de données
│
├── 📄 README.md               # Documentation générale
├── 📄 SETUP.md                # Guide installation complet
├── 📄 PROJECT_STRUCTURE.md    # Vue d'ensemble architecture
├── 📄 BACKEND_CREATED.txt     # Résumé du backend créé
├── 📄 TODO.md                 # Liste des tâches
├── 📄 docker-compose.yml      # Configuration Docker Compose
└── 📄 .gitignore              # Fichiers à ignorer (git)
```

## 🎯 Séparation Frontend/Backend

### Frontend 🎨
```
frontend/
├── index.html          # Page web
├── script.js          # Logique client
├── style.css          # Styles visuels
└── index2.html        # Alternative
```
**Technologie**: HTML5, CSS3, JavaScript ES6+  
**Stockage**: LocalStorage (avant connecté au backend)  
**Taille**: ~68 KB total

### Backend 🔧
```
backend/
├── server.js          # Serveur Node.js
├── config/database.js # Connexion MySQL
├── routes/            # Endpoints API
│   ├── calculator.js
│   ├── statistics.js
│   ├── financial.js
│   └── database.js    # NEW: Stockage persistant
└── database.sql       # Schéma MySQL
```
**Technologie**: Node.js + Express + MySQL  
**API Port**: 5000  
**Base de données**: MySQL (3306)

---

## 🚀 Démarrage Rapide

### 1️⃣ Fronted (Calculatrice)

**Option A - Ouvrir directement:**
```bash
open frontend/index.html
```

**Option B - Serveur local:**
```bash
cd frontend
python -m http.server 8000
# Ouvrir: http://localhost:8000
```

### 2️⃣ Backend (API + Base de données)

**Terminal - Démarrer le serveur:**
```bash
cd backend
npm install    # Première fois
npm start      # Lancer le serveur
```

Le serveur démarre sur `http://localhost:5000`

**Vérifier la connexion MySQL:**
```bash
sudo mysql calculatrice_db -e "SHOW TABLES;"
```

---

## 📊 Architecture Complète

```
Client (Frontend)                Server (Backend)
┌─────────────────┐             ┌──────────────────┐
│  index.html     │             │  Express Server  │
│  script.js      │  ──HTTP──>  │  Port 5000       │
│  style.css      │  <──JSON──  │                  │
│                 │             │  Routes:         │
└─────────────────┘             │  ├─ /calculator  │
                                │  ├─ /statistics │
     Browser                    │  ├─ /financial   │
  (LocalStorage)                │  └─ /database    │
                                └──────────────────┘
                                        │
                                        │ SQL Query
                                        ▼
                                  ┌──────────────┐
                                  │  MySQL BD    │
                                  │  :3306       │
                                  │              │
                                  │ Tables:      │
                                  │ ├─ history   │
                                  │ ├─ statistics│
                                  │ ├─ financial │
                                  │ ├─ expressions
                                  │ └─ users     │
                                  └──────────────┘
```

---

## 🔌 Endpoints API

### Calculatrice
- `POST /api/calculator/calculate` - Calcul mathématique
- `POST /api/calculator/advanced` - Opérations avancées

### Statistiques
- `GET /api/statistics/analyze` - Analyse complète
- `POST /api/statistics/frequency` - Fréquences
- `POST /api/statistics/quartiles` - Quartiles

### Financier
- `POST /api/financial/compound-interest` - Intérêts
- `POST /api/financial/mortgage` - Prêt
- `POST /api/financial/vat` - TVA
- `POST /api/financial/investment` - Investissement

### Base de Données (NEW) 🆕
- `GET /api/database/history` - Historique
- `POST /api/database/history` - Ajouter historique
- `GET /api/database/statistics` - Analyses sauvegardées
- `POST /api/database/statistics` - Sauvegarder analyse
- `GET /api/database/financial` - Calculs sauvegardés
- `POST /api/database/financial` - Sauvegarder calcul
- `GET/POST /api/database/expressions` - Expressions
- `GET /api/database/stats` - Statistiques BD

---

## 💾 Base de Données

### Tables MySQL
```sql
-- history: Stocke tous les calculs
-- statistics_data: Analyses statistiques
-- financial_calculations: Calculs financiers
-- saved_expressions: Expressions personnalisées
-- users: Authentification (futur)
```

### Configuration
```env
DB_HOST=localhost
DB_USER=calc_user
DB_PASSWORD=calc_password_123
DB_NAME=calculatrice_db
```

---

## 📚 Documentation par section

| Fichier | Contenu |
|---------|---------|
| `frontend/README.md` | Fonctionnalités et utilisation frontend |
| `backend/README.md` | Documentation API complète |
| `backend/EXAMPLES.md` | Exemples curl et JavaScript |
| `backend/GETTING_STARTED.md` | Guide démarrage backend |
| `backend/MYSQL_SETUP.md` | Configuration MySQL détaillée |
| `SETUP.md` | Installation complète frontend + backend |
| `PROJECT_STRUCTURE.md` | Vue d'ensemble du projet |

---

## 🛠️ Technologies

### Frontend
- HTML5 + CSS3 + JavaScript ES6+
- LocalStorage pour persistance
- Pas de dépendances externes

### Backend
- Node.js v14+
- Express.js 4.x
- MySQL 8.0
- dotenv, cors, body-parser

### DevOps
- Docker & Docker Compose
- Git/GitHub
- npm

---

## 📝 Fichiers de Configuration

### `.env` (Backend)
```
PORT=5000
NODE_ENV=development
DB_HOST=localhost
DB_USER=calc_user
DB_PASSWORD=calc_password_123
DB_NAME=calculatrice_db
```

### `package.json` (Backend)
```json
{
  "name": "backend",
  "version": "1.0.0",
  "scripts": {
    "start": "node server.js",
    "dev": "nodemon server.js",
    "test": "node test-api.js"
  },
  "dependencies": {
    "express": "^4.18.2",
    "cors": "^2.8.5",
    "body-parser": "^1.20.2",
    "mysql2": "^3.6.5",
    "dotenv": "^16.3.1"
  },
  "devDependencies": {
    "nodemon": "^3.0.2"
  }
}
```

---

## 🚀 Workflows

### Développement Local
```bash
# Terminal 1: Backend
cd backend
npm run dev              # Rechargement auto avec nodemon

# Terminal 2: Frontend
cd frontend
python -m http.server    # Ou ouvrir index.html

# Terminal 3: Tests
cd backend
node test-api.js
```

### Déploiement Production
```bash
# Build Docker
docker-compose up --build

# Ou déploiement traditionnel
# Backend: Heroku, Railway, etc
# Frontend: Vercel, Netlify, etc
```

---

## ✅ Checklist Installation

- [ ] Frontend: `frontend/index.html` s'ouvre
- [ ] Frontend: Calculatrice fonctionne en local
- [ ] Backend: `npm install` réussi
- [ ] Backend: MySQL installé et actif
- [ ] Backend: Base de données `calculatrice_db` créée
- [ ] Backend: `npm start` fonctionne
- [ ] Backend: `node test-api.js` passe tous les tests
- [ ] Frontend & Backend: Connectés (optionnel)
- [ ] Docker: `docker-compose up` fonctionne
- [ ] Git: Dépôt initialisé et .gitignore configuré

---

## 📊 Tailles

| Composant | Taille |
|-----------|--------|
| `frontend/index.html` | 25 KB |
| `frontend/script.js` | 31 KB |
| `frontend/style.css` | 13 KB |
| **Frontend Total** | **69 KB** |
| `backend/` source | ~100 KB |
| `node_modules/` | 100+ MB |
| **Total avec dépendances** | 100+ MB |

---

## 🔐 Sécurité

- ✅ Entrées valides serveur
- ✅ CORS configuré
- ✅ SQL préparé (pas d'injection)
- ✅ Mot de passe BD changeable
- ⚠️ À ajouter: Authentification utilisateur
- ⚠️ À ajouter: HTTPS en production

---

## 🎯 Prochaines étapes

1. ✅ **Frontend créé et fonctionnel**
2. ✅ **Backend Node.js + Express créé**
3. ✅ **MySQL configuré avec tables**
4. ⬜ Connecter Frontend → Backend API
5. ⬜ Ajouter authentification utilisateur
6. ⬜ Déployer en production
7. ⬜ Ajouter tests unitaires
8. ⬜ Optimiser performance

---

**🎉 Votre projet est bien organisé et prêt à se développer!**
