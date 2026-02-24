# Exemples d'utilisation de l'API Calculatrice Pro

## 1. CALCULATRICE

### Calcul simple
```bash
curl -X POST http://localhost:5000/api/calculator/calculate \
  -H "Content-Type: application/json" \
  -d '{"expression": "2+3*4"}'
```

### Opération avancée (Racine carrée)
```bash
curl -X POST http://localhost:5000/api/calculator/advanced \
  -H "Content-Type: application/json" \
  -d '{"operation": "sqrt", "value": 16}'
```

### Autres opérations
```bash
# Factorielle
curl -X POST http://localhost:5000/api/calculator/advanced \
  -H "Content-Type: application/json" \
  -d '{"operation": "factorial", "value": 5}'

# Sin
curl -X POST http://localhost:5000/api/calculator/advanced \
  -H "Content-Type: application/json" \
  -d '{"operation": "sin", "value": 0.5}'

# Logarithme
curl -X POST http://localhost:5000/api/calculator/advanced \
  -H "Content-Type: application/json" \
  -d '{"operation": "log", "value": 100}'
```

## 2. STATISTIQUES

### Analyse complète
```bash
curl -X POST http://localhost:5000/api/statistics/analyze \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}'
```

### Distribution des fréquences
```bash
curl -X POST http://localhost:5000/api/statistics/frequency \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 1, 1, 2, 2, 3, 3, 3, 3, 4]}'
```

### Quartiles
```bash
curl -X POST http://localhost:5000/api/statistics/quartiles \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]}'
```

## 3. CALCULS FINANCIERS

### Intérêts composés
```bash
curl -X POST http://localhost:5000/api/financial/compound-interest \
  -H "Content-Type: application/json" \
  -d '{"principal": 1000, "rate": 5, "years": 10}'
```

### Prêt hypothécaire
```bash
curl -X POST http://localhost:5000/api/financial/mortgage \
  -H "Content-Type: application/json" \
  -d '{"loanAmount": 200000, "annualRate": 3.5, "years": 20}'
```

### TVA
```bash
curl -X POST http://localhost:5000/api/financial/vat \
  -H "Content-Type: application/json" \
  -d '{"amountHT": 100, "vatRate": 20}'
```

### Rendement d'investissement
```bash
curl -X POST http://localhost:5000/api/financial/investment \
  -H "Content-Type: application/json" \
  -d '{"investment": 1000, "annualReturn": 8, "years": 5}'
```

## 4. HEALTH CHECK

```bash
curl http://localhost:5000/api/health
```

---

## Exemples avec JavaScript/Fetch

### Calculatrice
```javascript
const response = await fetch('http://localhost:5000/api/calculator/calculate', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    expression: '2+3*4'
  })
});

const data = await response.json();
console.log(data);
```

### Statistiques
```javascript
const response = await fetch('http://localhost:5000/api/statistics/analyze', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    numbers: [1, 2, 3, 4, 5]
  })
});

const data = await response.json();
console.log(data);
```

### Intérêts composés
```javascript
const response = await fetch('http://localhost:5000/api/financial/compound-interest', {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    principal: 1000,
    rate: 5,
    years: 10
  })
});

const data = await response.json();
console.log(data);
```
