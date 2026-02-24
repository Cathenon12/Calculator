# Calculatrice Pro Avancée 🧮

Structure complète du projet avec Frontend et Backend.

## 📁 Structure du projet

```
Calculator/
├── index.html           # Page principale
├── index2.html         # Page alternative
├── script.js           # Logique frontend
├── style.css           # Styles
├── README.md           # Documentation
├── TODO.md             # Liste des tâches
│
└── backend/            # 🆕 API Backend Node.js
    ├── server.js       # Serveur Express
    ├── .env            # Variables d'environnement
    ├── start.sh        # Script de démarrage
    ├── package.json    # Dépendances npm
    ├── README.md       # Documentation backend
    ├── EXAMPLES.md     # Exemples d'API
    │
    └── routes/
        ├── calculator.js     # Endpoints calcul
        ├── statistics.js     # Endpoints statistiques
        └── financial.js      # Endpoints financiers
```

## 🚀 Démarrage rapide

### Frontend
```bash
# Ouvrir index.html dans un navigateur
open index.html
```

### Backend
```bash
cd backend

# Installation (première fois)
npm install

# Démarrage serveur
npm start

# Mode développement avec rechargement auto
npm run dev

# Ou utiliser le script fourni
./start.sh dev
```

Le serveur démarre sur: `http://localhost:5000`

## 📡 API Endpoints

### Calculatrice
- **POST** `/api/calculator/calculate` - Calcul mathématique
- **POST** `/api/calculator/advanced` - Opérations avancées

### Statistiques
- **POST** `/api/statistics/analyze` - Analyse statistique
- **POST** `/api/statistics/frequency` - Distribution des fréquences
- **POST** `/api/statistics/quartiles` - Calcul des quartiles

### Financier
- **POST** `/api/financial/compound-interest` - Intérêts composés
- **POST** `/api/financial/mortgage` - Prêt hypothécaire
- **POST** `/api/financial/vat` - Calcul TVA
- **POST** `/api/financial/investment` - Rendement investissement

## 🔧 Technologies

### Frontend
- HTML5
- CSS3 (avec Variables CSS pour thèmes)
- JavaScript ES6+
- LocalStorage pour persistance

### Backend
- **Node.js** - Runtime
- **Express.js** - Framework web
- **CORS** - Gestion des requêtes cross-origin
- **Body-parser** - Parser JSON
- **Dotenv** - Gestion variables d'environnement

## 📝 Documentation

- [Frontend README](./README.md)
- [Backend README](./backend/README.md)
- [Exemples API](./backend/EXAMPLES.md)
- [TODO](./TODO.md)

## 🎵 Fonctionnalités

### Modes de Calcul
- ✅ **Basique** - Opérations simples
- ✅ **Scientifique** - Fonctions avancées, trigonométrie
- ✅ **Programmation** - Conversions binaire/hex/octal
- ✅ **Conversions** - Unités diverses (longueur, masse, etc)
- ✅ **Financier** - Intérêts, prêts, TVA
- ✅ **Statistiques** - Analyse, fréquences, quartiles

### Interface
- 🌙 **Thème sombre/clair** - Basculage automatique
- ⌨️ **Support clavier** complet
- 📱 **Responsive** - Adapté à tous les écrans
- 🎨 **Design moderne** - Sidebar + affichage principal

## 🔒 Sécurité

- **Sanitisation** des expressions mathématiques
- **Validation** des entrées côté serveur
- **CORS** configuré
- **Gestion d'erreurs** appropriée

## 📦 Taille

- Frontend: ~150 KB (HTML/CSS/JS combinés)
- Backend: Node modules > 100 MB (peut être optimisé avec production build)

## 🎯 Prochaines étapes

- [ ] Connecter le frontend au backend API
- [ ] Ajouter tests unitaires
- [ ] Déploiement (Heroku, Vercel, etc)
- [ ] Base de données pour historique
- [ ] Authentification utilisateur

## 👨‍💻 Utilisation

1. **Cloner/télécharger** le projet
2. **Installer backend**: `cd backend && npm install`
3. **Démarrer backend**: `npm start`
4. **Ouvrir frontend**: `open index.html`
5. **Consulter exemples**: Voir `backend/EXAMPLES.md`

## 📄 License

ISC
