// Simulateur IA pour tests sans clé API
const simulateAIResponse = (question, hasImage) => {
  const responses = {
    equation: {
      pattern: /résoudre|équation|x\^2|x²|solve/i,
      answer: `Résolution de l'équation:\n\nÉtape 1: Identification du type d'équation\nÉtape 2: Application de la formule appropriée\nÉtape 3: Calcul des solutions\n\nRésultat: x = 2 ou x = 3`
    },
    derivative: {
      pattern: /dérivée|dériver|derivative|d\/dx/i,
      answer: `Calcul de la dérivée:\n\nÉtape 1: Identification de la fonction\nÉtape 2: Application des règles de dérivation\nÉtape 3: Simplification\n\nRésultat: f'(x) = 2x + 5`
    },
    integral: {
      pattern: /intégrale|intégrer|integral|∫/i,
      answer: `Calcul de l'intégrale:\n\nÉtape 1: Identification de la fonction\nÉtape 2: Application des règles d'intégration\nÉtape 3: Ajout de la constante\n\nRésultat: F(x) = x²/2 + 5x + C`
    },
    limit: {
      pattern: /limite|limit|lim/i,
      answer: `Calcul de la limite:\n\nÉtape 1: Analyse du comportement\nÉtape 2: Application des théorèmes\nÉtape 3: Conclusion\n\nRésultat: lim = 1`
    },
    geometry: {
      pattern: /aire|périmètre|volume|surface|area|perimeter/i,
      answer: `Calcul géométrique:\n\nÉtape 1: Identification de la forme\nÉtape 2: Application de la formule\nÉtape 3: Calcul numérique\n\nRésultat: 78.54 unités²`
    },
    probability: {
      pattern: /probabilité|chance|probability|random/i,
      answer: `Calcul de probabilité:\n\nÉtape 1: Définition de l'espace des possibles\nÉtape 2: Comptage des cas favorables\nÉtape 3: Calcul du ratio\n\nRésultat: P = 0.25 (25%)`
    },
    default: {
      pattern: /.*/,
      answer: `Analyse mathématique:\n\nÉtape 1: Compréhension du problème\nÉtape 2: Choix de la méthode\nÉtape 3: Résolution\nÉtape 4: Vérification\n\nRésultat: 42`
    }
  };

  if (hasImage) {
    return {
      answer: `📸 Analyse de l'image détectée:\n\nÉtape 1: Reconnaissance optique (OCR)\nÉtape 2: Identification des symboles mathématiques\nÉtape 3: Interprétation du problème\nÉtape 4: Résolution\n\nProblème détecté: Équation du second degré\nRésultat: x = 3 ou x = -2`,
      result: '3'
    };
  }

  for (const [key, value] of Object.entries(responses)) {
    if (value.pattern.test(question)) {
      const match = question.match(/[-+]?\d+\.?\d*/);
      const result = match ? match[0] : '42';
      return {
        answer: value.answer,
        result: result
      };
    }
  }

  return {
    answer: responses.default.answer,
    result: '42'
  };
};

module.exports = { simulateAIResponse };
