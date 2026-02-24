# API Backend Calculatrice Pro 🧮

Serveur API pour la Calculatrice Pro Avancée.

## Installation

```bash
npm install
```

## Démarrage du serveur

```bash
npm start
# ou
node server.js
```

Le serveur démarre sur `http://localhost:5000`

## Endpoints API

### Calculatrice

#### POST `/api/calculator/calculate`
Effectue un calcul mathématique.

**Exemple de requête:**
```json
{
  "expression": "2+3*4"
}
```

**Réponse:**
```json
{
  "expression": "2+3*4",
  "result": 14,
  "timestamp": "2026-02-24T10:30:00.000Z"
}
```

#### POST `/api/calculator/advanced`
Effectue une opération avancée (sqrt, pow2, factorial, etc).

**Exemple de requête:**
```json
{
  "operation": "sqrt",
  "value": 16
}
```

**Opérations supportées:**
- `sqrt` - Racine carrée
- `pow2` - Au carré
- `pow3` - Au cube
- `factorial` - Factorielle
- `reciprocal` - 1/x
- `percent` - Pourcentage
- `sin`, `cos`, `tan` - Fonctions trigonométriques
- `log`, `ln`, `exp` - Fonctions logarithmiques

### Statistiques

#### POST `/api/statistics/analyze`
Analyse statistique complète.

**Exemple de requête:**
```json
{
  "numbers": [1, 2, 3, 4, 5]
}
```

**Réponse:**
```json
{
  "count": 5,
  "sum": "15.00",
  "mean": "3.00",
  "median": "3.00",
  "mode": 3,
  "min": "1.00",
  "max": "5.00",
  "range": "4.00",
  "variance": "2.0000",
  "stdDev": "1.41",
  "timestamp": "2026-02-24T10:30:00.000Z"
}
```

#### POST `/api/statistics/frequency`
Distribution des fréquences.

**Exemple de requête:**
```json
{
  "numbers": [1, 1, 2, 2, 2, 3]
}
```

#### POST `/api/statistics/quartiles`
Calcul des quartiles et écart interquartile.

**Exemple de requête:**
```json
{
  "numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
}
```

### Financier

#### POST `/api/financial/compound-interest`
Calcul des intérêts composés.

**Exemple de requête:**
```json
{
  "principal": 1000,
  "rate": 5,
  "years": 10
}
```

#### POST `/api/financial/mortgage`
Calcul de prêt/hypothèque.

**Exemple de requête:**
```json
{
  "loanAmount": 200000,
  "annualRate": 3.5,
  "years": 20
}
```

#### POST `/api/financial/vat`
Calcul de TVA.

**Exemple de requête:**
```json
{
  "amountHT": 100,
  "vatRate": 20
}
```

#### POST `/api/financial/investment`
Calcul du rendement d'investissement.

**Exemple de requête:**
```json
{
  "investment": 1000,
  "annualReturn": 8,
  "years": 5
}
```

## Structure du projet

```
backend/
├── server.js           # Fichier principal du serveur
├── .env               # Variables d'environnement
├── package.json       # Dépendances
└── routes/
    ├── calculator.js  # Endpoints de calcul
    ├── statistics.js  # Endpoints de statistiques
    └── financial.js   # Endpoints financiers
```

## Dépendances

- **express** - Framework web
- **cors** - Gestion des CORS
- **body-parser** - Parser les requêtes JSON
- **dotenv** - Gestion des variables d'environnement

## Développement

```bash
npm install --save-dev nodemon
npm run dev
```

Ajouter à `package.json`:
```json
"scripts": {
  "start": "node server.js",
  "dev": "nodemon server.js"
}
```

## License

ISC
