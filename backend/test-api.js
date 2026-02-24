#!/usr/bin/env node

/**
 * Script de test de l'API Calculatrice Pro
 * Utilisation: node test-api.js
 */

const http = require('http');

const BASE_URL = 'http://localhost:5000/api';

// Couleurs pour le terminal
const colors = {
  reset: '\x1b[0m',
  green: '\x1b[32m',
  red: '\x1b[31m',
  blue: '\x1b[34m',
  yellow: '\x1b[33m'
};

// Fonction pour faire des requêtes HTTP
function makeRequest(method, path, data) {
  return new Promise((resolve, reject) => {
    const url = new URL(BASE_URL + path);
    const options = {
      hostname: url.hostname,
      port: url.port,
      path: url.pathname,
      method: method,
      headers: {
        'Content-Type': 'application/json'
      }
    };

    const req = http.request(options, (res) => {
      let responseData = '';

      res.on('data', (chunk) => {
        responseData += chunk;
      });

      res.on('end', () => {
        try {
          resolve(JSON.parse(responseData));
        } catch (e) {
          resolve(responseData);
        }
      });
    });

    req.on('error', (error) => {
      reject(error);
    });

    if (data) {
      req.write(JSON.stringify(data));
    }
    req.end();
  });
}

// Tests
async function runTests() {
  console.log(`\n${colors.blue}🧪 TESTS API Calculatrice Pro${colors.reset}\n`);

  try {
    // Test 1: Health Check
    console.log(`${colors.yellow}Test 1: Health Check${colors.reset}`);
    const health = await makeRequest('GET', '/health');
    console.log(`${colors.green}✓ Réussi${colors.reset}`, health);

    // Test 2: Calcul simple
    console.log(`\n${colors.yellow}Test 2: Calcul simple (2+3*4)${colors.reset}`);
    const calc1 = await makeRequest('POST', '/calculator/calculate', {
      expression: '2+3*4'
    });
    console.log(`${colors.green}✓ Résultat${colors.reset}:`, calc1.result);

    // Test 3: Racine carrée
    console.log(`\n${colors.yellow}Test 3: Racine carrée de 16${colors.reset}`);
    const calc2 = await makeRequest('POST', '/calculator/advanced', {
      operation: 'sqrt',
      value: 16
    });
    console.log(`${colors.green}✓ Résultat${colors.reset}:`, calc2.result);

    // Test 4: Statistiques
    console.log(`\n${colors.yellow}Test 4: Analyse statistique [1,2,3,4,5]${colors.reset}`);
    const stats = await makeRequest('POST', '/statistics/analyze', {
      numbers: [1, 2, 3, 4, 5]
    });
    console.log(`${colors.green}✓ Moyenne${colors.reset}:`, stats.mean);
    console.log(`${colors.green}✓ Écart-type${colors.reset}:`, stats.stdDev);

    // Test 5: Intérêts composés
    console.log(`\n${colors.yellow}Test 5: Intérêts composés (1000€ à 5% pendant 10 ans)${colors.reset}`);
    const finance = await makeRequest('POST', '/financial/compound-interest', {
      principal: 1000,
      rate: 5,
      years: 10
    });
    console.log(`${colors.green}✓ Montant final${colors.reset}:`, finance.amount, '€');
    console.log(`${colors.green}✓ Intérêt gagné${colors.reset}:`, finance.interest, '€');

    // Test 6: Fréquences
    console.log(`\n${colors.yellow}Test 6: Distribution fréquences [1,1,2,2,2,3]${colors.reset}`);
    const freq = await makeRequest('POST', '/statistics/frequency', {
      numbers: [1, 1, 2, 2, 2, 3]
    });
    console.log(`${colors.green}✓ Distribution${colors.reset}:`);
    freq.distribution.forEach(item => {
      console.log(`  - ${item.value}: ${item.frequency} fois (${item.percentage}%)`);
    });

    // Test 7: TVA
    console.log(`\n${colors.yellow}Test 7: Calcul TVA (100€ HT à 20%)${colors.reset}`);
    const vat = await makeRequest('POST', '/financial/vat', {
      amountHT: 100,
      vatRate: 20
    });
    console.log(`${colors.green}✓ TVA${colors.reset}:`, vat.vat, '€');
    console.log(`${colors.green}✓ Montant TTC${colors.reset}:`, vat.amountTTC, '€');

    console.log(`\n${colors.green}✅ Tous les tests réussis!${colors.reset}\n`);

  } catch (error) {
    console.error(`${colors.red}❌ Erreur:${colors.reset}`, error.message);
    console.log(`\n${colors.yellow}📝 Assurez-vous que le serveur est démarré:${colors.reset}`);
    console.log(`   cd backend && npm start`);
  }
}

runTests();
