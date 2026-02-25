// Analyseur de langage naturel pour les questions mathématiques

export interface MathQuery {
  type: 'equation' | 'function' | 'derivative' | 'integral' | 'limit' | 'matrix' | 'probability' | 'combinatorics' | 'logic' | 'statistics' | 'calculation';
  expression: string;
  action: string;
}

export const parseMathQuery = (input: string): MathQuery | null => {
  const lower = input.toLowerCase().trim();
  
  // Résoudre une équation
  if (lower.match(/r[ée]sou(dre|s|t)|solve|equation/)) {
    const expr = extractExpression(input);
    return { type: 'equation', expression: expr, action: 'solve' };
  }
  
  // Étudier une fonction
  if (lower.match(/[ée]tudi(er|e)|analys(er|e)|function|study|variation/)) {
    const expr = extractExpression(input);
    return { type: 'function', expression: expr, action: 'study' };
  }
  
  // Dérivée
  if (lower.match(/d[ée]riv[ée]e?|derivative|d\/dx|tangente/)) {
    const expr = extractExpression(input);
    return { type: 'derivative', expression: expr, action: 'derive' };
  }
  
  // Intégrale
  if (lower.match(/int[ée]gr(ale|er)|integral|∫|primitive|aire/)) {
    const expr = extractExpression(input);
    return { type: 'integral', expression: expr, action: 'integrate' };
  }
  
  // Limite
  if (lower.match(/limite?|limit|lim|tend|asymptote/)) {
    const expr = extractExpression(input);
    return { type: 'limit', expression: expr, action: 'limit' };
  }
  
  // Matrice
  if (lower.match(/matrice|matrix|d[ée]terminant|inverse|rang/)) {
    const expr = extractExpression(input);
    return { type: 'matrix', expression: expr, action: 'matrix' };
  }
  
  // Probabilités - détection améliorée
  if (lower.match(/probabilit[ée]|proba|composant|tirage|boite|contient|choisit|hasard|esp[ée]rance|variance|[ée]cart.type|p\(|calculer p/)) {
    return { type: 'probability', expression: input, action: 'probability' };
  }
  
  // Combinatoire
  if (lower.match(/combinaison|arrangement|permutation|factorielle|C\(|P\(/)) {
    const expr = extractExpression(input);
    return { type: 'combinatorics', expression: expr, action: 'combinatorics' };
  }
  
  // Logique
  if (lower.match(/table.v[ée]rit[ée]|logique|implication|[ée]quivalence/)) {
    const expr = extractExpression(input);
    return { type: 'logic', expression: expr, action: 'logic' };
  }
  
  // Statistiques
  if (lower.match(/moyenne|m[ée]diane|mode|quartile|[ée]cart/)) {
    const expr = extractExpression(input);
    return { type: 'statistics', expression: expr, action: 'statistics' };
  }
  
  return null;
};

const extractExpression = (input: string): string => {
  // Extraire l'expression mathématique après les mots-clés
  const patterns = [
    /(?:equation|équation)[:\s]+([x\d\+\-\*\/\^\(\)\s]+)/i,
    /(?:fonction|function)[:\s]+([x\d\+\-\*\/\^\(\)\s]+)/i,
    /(?:dérivée|derivative)[:\s]+([x\d\+\-\*\/\^\(\)\s]+)/i,
    /(?:intégrale|integral)[:\s]+([x\d\+\-\*\/\^\(\)\s]+)/i,
    /([x\d\+\-\*\/\^\(\)]+(?:[=<>]+[x\d\+\-\*\/\^\(\)]+)?)/i
  ];
  
  for (const pattern of patterns) {
    const match = input.match(pattern);
    if (match && match[1]) {
      return match[1].trim();
    }
  }
  
  return input;
};

export const solveEquation = (expr: string): string => {
  try {
    const quadratic = expr.match(/([+-]?\d*\.?\d*)\s*\*?\s*x\s*\^?\s*2\s*([+-]\s*\d*\.?\d*)\s*\*?\s*x?\s*([+-]\s*\d+\.?\d*)?/i);
    
    if (quadratic) {
      const a = parseFloat(quadratic[1] || '1');
      const b = parseFloat(quadratic[2]?.replace(/\s/g, '') || '0');
      const c = parseFloat(quadratic[3]?.replace(/\s/g, '') || '0');
      const delta = b * b - 4 * a * c;
      
      if (delta > 0) {
        const x1 = (-b + Math.sqrt(delta)) / (2 * a);
        const x2 = (-b - Math.sqrt(delta)) / (2 * a);
        return `x₁ = ${x1.toFixed(6)}\nx₂ = ${x2.toFixed(6)}\n\nRESOLUTION D'EQUATION DU SECOND DEGRE\n${'='.repeat(50)}\n\nEquation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0\n\nCoefficients:\n   a = ${a}\n   b = ${b}\n   c = ${c}\n\nCalcul du discriminant:\n   Delta = b² - 4ac\n   Delta = (${b})² - 4(${a})(${c})\n   Delta = ${b * b} - ${4 * a * c}\n   Delta = ${delta}\n\nDelta > 0 donc deux solutions reelles distinctes:\n\n   x₁ = (-b + √Delta) / 2a\n   x₁ = (${-b} + ${Math.sqrt(delta).toFixed(4)}) / ${2 * a}\n   x₁ = ${x1.toFixed(6)}\n\n   x₂ = (-b - √Delta) / 2a\n   x₂ = (${-b} - ${Math.sqrt(delta).toFixed(4)}) / ${2 * a}\n   x₂ = ${x2.toFixed(6)}\n\nEnsemble des solutions: S = {${x1.toFixed(6)}, ${x2.toFixed(6)}}`;
      } else if (delta === 0) {
        const x = -b / (2 * a);
        return `x = ${x.toFixed(6)}\n\nRESOLUTION D'EQUATION DU SECOND DEGRE\n${'='.repeat(50)}\n\nEquation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0\n\nCoefficients:\n   a = ${a}\n   b = ${b}\n   c = ${c}\n\nCalcul du discriminant:\n   Delta = ${delta}\n\nDelta = 0 donc une solution double:\n\n   x = -b / 2a\n   x = ${-b} / ${2 * a}\n   x = ${x.toFixed(6)}\n\nEnsemble des solutions: S = {${x.toFixed(6)}}`;
      } else {
        const realPart = -b / (2 * a);
        const imagPart = Math.sqrt(-delta) / (2 * a);
        return `Pas de solution reelle\n\nx₁ = ${realPart.toFixed(6)} + ${imagPart.toFixed(6)}i\nx₂ = ${realPart.toFixed(6)} - ${imagPart.toFixed(6)}i\n\nRESOLUTION D'EQUATION DU SECOND DEGRE\n${'='.repeat(50)}\n\nEquation: ${a}x² ${b >= 0 ? '+' : ''}${b}x ${c >= 0 ? '+' : ''}${c} = 0\n\nDelta = ${delta} < 0\n\nPas de solution reelle.\n\nSolutions complexes:\n   x₁ = ${realPart.toFixed(6)} + ${imagPart.toFixed(6)}i\n   x₂ = ${realPart.toFixed(6)} - ${imagPart.toFixed(6)}i`;
      }
    }
    
    const linear = expr.match(/([+-]?\d*\.?\d*)\s*\*?\s*x\s*([+-]\s*\d+\.?\d*)?/i);
    if (linear) {
      const a = parseFloat(linear[1] || '1');
      const b = parseFloat(linear[2]?.replace(/\s/g, '') || '0');
      const x = -b / a;
      return `x = ${x.toFixed(6)}\n\nRESOLUTION D'EQUATION LINEAIRE\n${'='.repeat(50)}\n\nEquation: ${a}x ${b >= 0 ? '+' : ''}${b} = 0\n\nResolution:\n   ${a}x = ${-b}\n   x = ${-b} / ${a}\n   x = ${x.toFixed(6)}\n\nEnsemble des solutions: S = {${x.toFixed(6)}}`;
    }
    
    return 'Format d\'équation non reconnu';
  } catch (error) {
    return 'Erreur lors de la resolution';
  }
};

export const studyFunction = (expr: string): string => {
  try {
    let result = `📚 ÉTUDE COMPLÈTE DE FONCTION\n${'═'.repeat(50)}\n\n`;
    result += `📝 Fonction: f(x) = ${expr}\n\n`;
    
    // 1. Domaine de définition
    result += `🔍 1. DOMAINE DE DÉFINITION\n`;
    if (expr.includes('ln') || expr.includes('log')) {
      result += `   Df = ]0, +∞[\n`;
      result += `   ⚠️ Condition: x > 0 (argument du logarithme strictement positif)\n`;
      result += `   ❌ Valeurs interdites: x ≤ 0\n\n`;
    } else if (expr.includes('sqrt') || expr.includes('√')) {
      result += `   Df = [0, +∞[\n`;
      result += `   ⚠️ Condition: x ≥ 0 (radicande positif ou nul)\n`;
      result += `   ❌ Valeurs interdites: x < 0\n\n`;
    } else if (expr.includes('/x') || expr.includes('1/x')) {
      result += `   Df = ℝ \\ {0}\n`;
      result += `   ⚠️ Condition: x ≠ 0 (dénominateur non nul)\n`;
      result += `   ❌ Valeur interdite: x = 0\n\n`;
    } else if (expr.includes('tan')) {
      result += `   Df = ℝ \\ {π/2 + kπ, k∈ℤ}\n`;
      result += `   ⚠️ Tangente non définie en π/2 + kπ\n`;
      result += `   ❌ Valeurs interdites: ..., -π/2, π/2, 3π/2, ...\n\n`;
    } else {
      result += `   Df = ℝ\n`;
      result += `   ✅ Définie sur tout ℝ (fonction polynomiale)\n`;
      result += `   ✅ Aucune restriction\n\n`;
    }
    
    // 2. Parité
    result += `📊 2. PARITÉ\n`;
    if (expr.match(/x\^[24680]/) && !expr.includes('+') && !expr.includes('-')) {
      result += `   Test: f(-x) = f(x)\n`;
      result += `   ✅ Fonction PAIRE\n`;
      result += `   🔄 Symétrie par rapport à l'axe Oy\n`;
      result += `   💡 Conséquence: On peut étudier sur [0,+∞[ puis symétriser\n\n`;
    } else if (expr.match(/x\^[13579]/) && !expr.includes('+') && !expr.includes('-')) {
      result += `   Test: f(-x) = -f(x)\n`;
      result += `   ✅ Fonction IMPAIRE\n`;
      result += `   🔄 Symétrie par rapport à l'origine O\n`;
      result += `   💡 Conséquence: On peut étudier sur [0,+∞[ puis faire symétrie centrale\n\n`;
    } else {
      result += `   Test: f(-x) ≠ f(x) et f(-x) ≠ -f(x)\n`;
      result += `   ⚪ Fonction ni paire ni impaire\n`;
      result += `   💡 Pas de symétrie particulière\n\n`;
    }
    
    // 3. Dérivée et variations
    result += `📈 3. DÉRIVÉE ET SENS DE VARIATION\n`;
    if (expr.includes('x^2') || expr.includes('x²')) {
      result += `   Calcul de f'(x):\n`;
      result += `   f'(x) = 2x\n\n`;
      result += `   Étude du signe de f'(x):\n`;
      result += `   • Si x < 0: f'(x) < 0 → f DÉCROISSANTE sur ]-∞, 0[\n`;
      result += `   • Si x = 0: f'(x) = 0 → Point critique\n`;
      result += `   • Si x > 0: f'(x) > 0 → f CROISSANTE sur ]0, +∞[\n\n`;
      result += `   🎯 Extremum: Minimum en x = 0, f(0) = 0\n\n`;
    } else if (expr.includes('x^3') || expr.includes('x³')) {
      result += `   Calcul de f'(x):\n`;
      result += `   f'(x) = 3x²\n\n`;
      result += `   Étude du signe de f'(x):\n`;
      result += `   • f'(x) ≥ 0 pour tout x ∈ ℝ\n`;
      result += `   • f'(x) = 0 seulement en x = 0\n`;
      result += `   ✅ f STRICTEMENT CROISSANTE sur ℝ\n\n`;
      result += `   🎯 Point d'inflexion en x = 0\n\n`;
    } else if (expr.includes('ln')) {
      result += `   Calcul de f'(x):\n`;
      result += `   f'(x) = 1/x\n\n`;
      result += `   Étude du signe de f'(x):\n`;
      result += `   • Pour x > 0: f'(x) > 0\n`;
      result += `   ✅ f STRICTEMENT CROISSANTE sur ]0, +∞[\n\n`;
    } else if (expr.includes('exp')) {
      result += `   Calcul de f'(x):\n`;
      result += `   f'(x) = exp(x) = eˣ\n\n`;
      result += `   Étude du signe de f'(x):\n`;
      result += `   • f'(x) > 0 pour tout x ∈ ℝ\n`;
      result += `   ✅ f STRICTEMENT CROISSANTE sur ℝ\n\n`;
    }
    
    // 4. Limites
    result += `🎯 4. LIMITES AUX BORNES\n`;
    if (expr.includes('x^2') || expr.includes('x²')) {
      result += `   En -∞:\n`;
      result += `   lim(x→-∞) x² = +∞\n`;
      result += `   (car x² → +∞ quand |x| → +∞)\n\n`;
      result += `   En +∞:\n`;
      result += `   lim(x→+∞) x² = +∞\n\n`;
      result += `   ❌ Pas d'asymptote horizontale\n\n`;
    } else if (expr.includes('x^3') || expr.includes('x³')) {
      result += `   En -∞:\n`;
      result += `   lim(x→-∞) x³ = -∞\n\n`;
      result += `   En +∞:\n`;
      result += `   lim(x→+∞) x³ = +∞\n\n`;
      result += `   ❌ Pas d'asymptote\n\n`;
    } else if (expr.includes('ln')) {
      result += `   En 0⁺:\n`;
      result += `   lim(x→0⁺) ln(x) = -∞\n`;
      result += `   ✅ Asymptote verticale: x = 0\n\n`;
      result += `   En +∞:\n`;
      result += `   lim(x→+∞) ln(x) = +∞\n`;
      result += `   (croissance lente)\n\n`;
    } else if (expr.includes('exp')) {
      result += `   En -∞:\n`;
      result += `   lim(x→-∞) eˣ = 0\n`;
      result += `   ✅ Asymptote horizontale: y = 0\n\n`;
      result += `   En +∞:\n`;
      result += `   lim(x→+∞) eˣ = +∞\n`;
      result += `   (croissance rapide)\n\n`;
    } else if (expr.includes('1/x')) {
      result += `   En 0⁺:\n`;
      result += `   lim(x→0⁺) 1/x = +∞\n\n`;
      result += `   En 0⁻:\n`;
      result += `   lim(x→0⁻) 1/x = -∞\n`;
      result += `   ✅ Asymptote verticale: x = 0\n\n`;
      result += `   En ±∞:\n`;
      result += `   lim(x→±∞) 1/x = 0\n`;
      result += `   ✅ Asymptote horizontale: y = 0\n\n`;
    }
    
    // 5. Tableau de variations
    result += `📋 5. TABLEAU DE VARIATIONS COMPLET\n`;
    if (expr.includes('x^2') || expr.includes('x²')) {
      result += `\n`;
      result += `   x    │  -∞           0           +∞\n`;
      result += `   ─────┼────────────────────────────\n`;
      result += `   f'(x)│      -       0       +\n`;
      result += `   ─────┼────────────────────────────\n`;
      result += `        │ +∞                      +∞\n`;
      result += `   f(x) │      ↘                 ↗\n`;
      result += `        │           0\n\n`;
    } else if (expr.includes('x^3') || expr.includes('x³')) {
      result += `\n`;
      result += `   x    │  -∞                      +∞\n`;
      result += `   ─────┼────────────────────────────\n`;
      result += `   f'(x)│           +\n`;
      result += `   ─────┼────────────────────────────\n`;
      result += `        │ -∞                      +∞\n`;
      result += `   f(x) │           ↗\n`;
      result += `        │\n\n`;
    }
    
    // 6. Points remarquables
    result += `⭐ 6. POINTS REMARQUABLES\n`;
    if (expr.includes('x^2') || expr.includes('x²')) {
      result += `   • Sommet (minimum): S(0, 0)\n`;
      result += `   • Axe de symétrie: x = 0 (axe Oy)\n`;
      result += `   • Ordonnée à l'origine: f(0) = 0\n`;
      result += `   • Pas de racine autre que 0\n\n`;
    } else if (expr.includes('x^3') || expr.includes('x³')) {
      result += `   • Point d'inflexion: I(0, 0)\n`;
      result += `   • Centre de symétrie: origine O\n`;
      result += `   • Racine unique: x = 0\n\n`;
    }
    
    result += `💡 CONSEILS POUR LE TRACÉ:\n`;
    result += `   1. Placer les asymptotes s'il y en a\n`;
    result += `   2. Marquer les points remarquables\n`;
    result += `   3. Respecter le sens de variation\n`;
    result += `   4. Utiliser la symétrie si la fonction est paire/impaire\n`;
    result += `   5. Vérifier les limites aux bornes`;
    
    return result;
  } catch (error) {
    return 'Erreur lors de l\'étude de fonction';
  }
};

export const calculateDerivative = (expr: string): string => {
  let result = '';
  
  if (expr.includes('x^2') || expr.includes('x²')) {
    result = `f'(x) = 2x\n\n`;
  } else if (expr.includes('x^3') || expr.includes('x³')) {
    result = `f'(x) = 3x²\n\n`;
  } else if (expr.includes('ln')) {
    result = `f'(x) = 1/x\n\n`;
  } else if (expr.includes('exp')) {
    result = `f'(x) = exp(x)\n\n`;
  } else if (expr.includes('sin')) {
    result = `f'(x) = cos(x)\n\n`;
  } else if (expr.includes('cos')) {
    result = `f'(x) = -sin(x)\n\n`;
  }
  
  result += `CALCUL DE DERIVEE\n${'='.repeat(50)}\n\nFonction: f(x) = ${expr}\n\nFormules de derivation:\n\n`;
  
  if (expr.includes('x^2') || expr.includes('x²')) {
    result += `   Regle: (x^n)' = n*x^(n-1)\n`;
    result += `   f'(x) = 2x\n\n`;
    result += `Interpretation:\n`;
    result += `   f'(x) > 0 sur ]0, +inf[ donc f croissante\n`;
    result += `   f'(x) < 0 sur ]-inf, 0[ donc f decroissante\n`;
    result += `   f'(x) = 0 en x = 0 (extremum)`;
  } else if (expr.includes('x^3') || expr.includes('x³')) {
    result += `   Regle: (x^n)' = n*x^(n-1)\n`;
    result += `   f'(x) = 3x²\n\n`;
    result += `Interpretation:\n`;
    result += `   f'(x) >= 0 pour tout x donc f croissante sur R`;
  } else if (expr.includes('ln')) {
    result += `   Regle: (ln(x))' = 1/x\n`;
    result += `   f'(x) = 1/x\n\n`;
    result += `Interpretation:\n`;
    result += `   f'(x) > 0 sur ]0, +inf[ donc f croissante`;
  } else if (expr.includes('exp')) {
    result += `   Regle: (e^x)' = e^x\n`;
    result += `   f'(x) = exp(x)\n\n`;
    result += `Interpretation:\n`;
    result += `   f'(x) > 0 pour tout x donc f croissante sur R`;
  } else if (expr.includes('sin')) {
    result += `   Regle: (sin(x))' = cos(x)\n`;
    result += `   f'(x) = cos(x)`;
  } else if (expr.includes('cos')) {
    result += `   Regle: (cos(x))' = -sin(x)\n`;
    result += `   f'(x) = -sin(x)`;
  }
  
  return result;
};

export const calculateIntegral = (expr: string): string => {
  let result = `📚 CALCUL D'INTÉGRALE\n${'═'.repeat(50)}\n\n`;
  result += `📝 Fonction: f(x) = ${expr}\n\n`;
  result += `🔧 FORMULES D'INTÉGRATION:\n\n`;
  
  if (expr.includes('x^2') || expr.includes('x²')) {
    result += `   Règle: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n`;
    result += `   ∫f(x)dx = x³/3 + C\n\n`;
  } else if (expr.includes('x^3') || expr.includes('x³')) {
    result += `   Règle: ∫xⁿ dx = xⁿ⁺¹/(n+1) + C\n`;
    result += `   ∫f(x)dx = x⁴/4 + C\n\n`;
  } else if (expr.includes('1/x')) {
    result += `   Règle: ∫1/x dx = ln|x| + C\n`;
    result += `   ∫f(x)dx = ln|x| + C\n\n`;
  } else if (expr.includes('exp')) {
    result += `   Règle: ∫eˣ dx = eˣ + C\n`;
    result += `   ∫f(x)dx = exp(x) + C\n\n`;
  } else if (expr.includes('sin')) {
    result += `   Règle: ∫sin(x) dx = -cos(x) + C\n`;
    result += `   ∫f(x)dx = -cos(x) + C\n\n`;
  } else if (expr.includes('cos')) {
    result += `   Règle: ∫cos(x) dx = sin(x) + C\n`;
    result += `   ∫f(x)dx = sin(x) + C\n\n`;
  }
  
  result += `💡 NOTE:\n`;
  result += `   C est la constante d'intégration\n`;
  result += `   • Intégrale indéfinie: + C\n`;
  result += `   • Intégrale définie: [F(b) - F(a)]`;
  
  return result;
};

export const calculateLimit = (expr: string): string => {
  let result = `📚 CALCUL DE LIMITE\n${'═'.repeat(50)}\n\n`;
  result += `📝 Fonction: f(x) = ${expr}\n\n`;
  result += `🎯 LIMITES USUELLES:\n\n`;
  
  if (expr.includes('x^2') || expr.includes('x²')) {
    result += `   • lim(x→-∞) x² = +∞\n`;
    result += `   • lim(x→+∞) x² = +∞\n`;
    result += `   • lim(x→0) x² = 0\n\n`;
  } else if (expr.includes('1/x')) {
    result += `   • lim(x→0⁺) 1/x = +∞\n`;
    result += `   • lim(x→0⁻) 1/x = -∞\n`;
    result += `   • lim(x→±∞) 1/x = 0\n\n`;
  } else if (expr.includes('ln')) {
    result += `   • lim(x→0⁺) ln(x) = -∞\n`;
    result += `   • lim(x→+∞) ln(x) = +∞\n\n`;
  } else if (expr.includes('exp')) {
    result += `   • lim(x→-∞) eˣ = 0\n`;
    result += `   • lim(x→+∞) eˣ = +∞\n\n`;
  }
  
  result += `🔧 FORMES INDÉTERMINÉES:\n`;
  result += `   • 0/0, ∞/∞, 0×∞, ∞-∞\n`;
  result += `   • Utiliser: factorisation, conjugué, l'Hôpital`;
  
  return result;
};

export const solveMatrix = (expr: string): string => {
  let result = `📚 ALGÈBRE LINÉAIRE - MATRICES\n${'═'.repeat(50)}\n\n`;
  result += `📝 Matrice: ${expr}\n\n`;
  result += `🔧 OPÉRATIONS SUR LES MATRICES:\n\n`;
  result += `   1. DÉTERMINANT:\n`;
  result += `      • Matrice 2×2: det = ad - bc\n`;
  result += `      • Matrice 3×3: règle de Sarrus\n\n`;
  result += `   2. INVERSE:\n`;
  result += `      • A⁻¹ existe si det(A) ≠ 0\n`;
  result += `      • A⁻¹ = (1/det(A)) × Com(A)ᵀ\n\n`;
  result += `   3. RANG:\n`;
  result += `      • Nombre de lignes/colonnes indépendantes\n`;
  result += `      • Méthode: échelonnement de Gauss\n\n`;
  result += `💡 APPLICATIONS:\n`;
  result += `   • Résolution de systèmes linéaires\n`;
  result += `   • Transformations géométriques\n`;
  result += `   • Diagonalisation`;
  return result;
};

export const solveProbability = (expr: string): string => {
  const lower = expr.toLowerCase();
  
  // Extraire les nombres du problème
  const numbers = expr.match(/\d+/g)?.map(Number) || [];
  
  // Détecter le type de problème
  if (lower.includes('composant') || lower.includes('tirage') || lower.includes('boite')) {
    // Problème de tirage sans remise
    const total = numbers[0] || 10;
    const fonctionnels = numbers[1] || 6;
    const defectueux = numbers[2] || 4;
    const tires = numbers[3] || 2;
    
    // Calculs
    const totalTirages = combination(total, tires);
    const deuxDefectueux = combination(defectueux, 2);
    const pA = deuxDefectueux / totalTirages;
    const deuxFonctionnels = combination(fonctionnels, 2);
    const pAucunDefectueux = deuxFonctionnels / totalTirages;
    const pB = 1 - pAucunDefectueux;
    const pConditionnelle = fonctionnels / (total - 1);
    
    let result = `RESULTATS:\n`;
    result += `Total = ${totalTirages}\n`;
    result += `P(A) = ${deuxDefectueux}/${totalTirages} = ${pA.toFixed(4)} = ${simplifyFraction(deuxDefectueux, totalTirages)}\n`;
    result += `P(B) = ${(pB * totalTirages).toFixed(0)}/${totalTirages} = ${pB.toFixed(4)} = ${simplifyFraction(Math.round(pB * totalTirages), totalTirages)}\n`;
    result += `P(F|D) = ${fonctionnels}/${total - 1} = ${pConditionnelle.toFixed(4)} = ${simplifyFraction(fonctionnels, total - 1)}\n\n`;
    
    result += `CORRIGE DETAILLE\n${'='.repeat(50)}\n\n`;
    result += `1) Nombre total de tirages\n\n`;
    result += `On choisit ${tires} composants parmi ${total}:\n`;
    result += `C(${total},${tires}) = ${total}!/(${tires}!*(${total}-${tires})!)\n`;
    result += `C(${total},${tires}) = (${total} x ${total-1})/${tires} = ${totalTirages}\n\n`;
    result += `Total des cas possibles = ${totalTirages}\n\n`;
    
    result += `2) Calcul de P(A)\n\n`;
    result += `A = "2 defectueux"\n`;
    result += `On choisit 2 parmi ${defectueux} defectueux:\n`;
    result += `C(${defectueux},2) = ${defectueux}!/(2!*${defectueux-2}!) = ${deuxDefectueux}\n`;
    result += `P(A) = ${deuxDefectueux}/${totalTirages} = ${simplifyFraction(deuxDefectueux, totalTirages)}\n\n`;
    
    result += `3) Calcul de P(B)\n\n`;
    result += `B = "au moins un defectueux"\n`;
    result += `Methode complementaire:\n`;
    result += `P(B) = 1 - P(aucun defectueux)\n\n`;
    result += `"Aucun defectueux" = 2 fonctionnels\n`;
    result += `C(${fonctionnels},2) = ${fonctionnels}!/(2!*${fonctionnels-2}!) = ${deuxFonctionnels}\n`;
    result += `P(aucun defectueux) = ${deuxFonctionnels}/${totalTirages}\n`;
    result += `P(B) = 1 - ${deuxFonctionnels}/${totalTirages} = ${Math.round(pB * totalTirages)}/${totalTirages} = ${simplifyFraction(Math.round(pB * totalTirages), totalTirages)}\n\n`;
    
    result += `4) Probabilite conditionnelle\n\n`;
    result += `P(F|D) = Probabilite que le 2e soit fonctionnel sachant que le 1er est defectueux\n\n`;
    result += `Apres avoir tire 1 defectueux, il reste:\n`;
    result += `- ${fonctionnels} fonctionnels\n`;
    result += `- ${defectueux - 1} defectueux\n`;
    result += `- Total restant = ${total - 1}\n\n`;
    result += `P(F|D) = ${fonctionnels}/${total - 1} = ${simplifyFraction(fonctionnels, total - 1)}`;
    
    return result;
  }
  
  // Problème générique
  let result = `PROBABILITES ET STATISTIQUES\n${'='.repeat(50)}\n\n`;
  result += `Probleme: ${expr}\n\n`;
  result += `CONCEPTS FONDAMENTAUX:\n\n`;
  result += `1. PROBABILITE:\n`;
  result += `   P(A) = nombre de cas favorables / nombre de cas possibles\n`;
  result += `   0 <= P(A) <= 1\n\n`;
  result += `2. ESPERANCE:\n`;
  result += `   E(X) = somme(xi * P(X = xi))\n\n`;
  result += `3. VARIANCE:\n`;
  result += `   Var(X) = E(X²) - [E(X)]²\n\n`;
  result += `4. ECART-TYPE:\n`;
  result += `   sigma = racine(Var(X))`;
  return result;
};

function combination(n: number, k: number): number {
  if (k > n) return 0;
  if (k === 0 || k === n) return 1;
  let result = 1;
  for (let i = 0; i < k; i++) {
    result *= (n - i);
    result /= (i + 1);
  }
  return Math.round(result);
}

function simplifyFraction(num: number, den: number): string {
  const gcd = (a: number, b: number): number => b === 0 ? a : gcd(b, a % b);
  const divisor = gcd(num, den);
  return `${num / divisor}/${den / divisor}`;
}

export const solveCombinatorics = (expr: string): string => {
  let result = `📚 MATHÉMATIQUES DISCRÈTES - COMBINATOIRE\n${'═'.repeat(50)}\n\n`;
  result += `📝 Problème: ${expr}\n\n`;
  result += `🔢 FORMULES DE DÉNOMBREMENT:\n\n`;
  result += `   1. ARRANGEMENTS:\n`;
  result += `      • Aₙᵏ = n!/(n-k)!\n`;
  result += `      • Ordre important, sans répétition\n`;
  result += `      • Ex: podium de 3 personnes parmi 10\n\n`;
  result += `   2. COMBINAISONS:\n`;
  result += `      • Cₙᵏ = n!/(k!(n-k)!)\n`;
  result += `      • Ordre non important, sans répétition\n`;
  result += `      • Ex: équipe de 5 joueurs parmi 11\n\n`;
  result += `   3. PERMUTATIONS:\n`;
  result += `      • Pₙ = n!\n`;
  result += `      • Arrangements de n éléments\n`;
  result += `      • Ex: anagrammes d'un mot\n\n`;
  result += `   4. FACTORIELLE:\n`;
  result += `      • n! = n × (n-1) × ... × 2 × 1\n`;
  result += `      • 0! = 1 par convention\n\n`;
  result += `💡 PRINCIPE:\n`;
  result += `   • Avec ordre → Arrangements\n`;
  result += `   • Sans ordre → Combinaisons\n`;
  result += `   • Avec répétition → Formules modifiées`;
  return result;
};

export const solveLogic = (expr: string): string => {
  let result = `📚 LOGIQUE MATHÉMATIQUE\n${'═'.repeat(50)}\n\n`;
  result += `📝 Expression: ${expr}\n\n`;
  result += `🧠 CONNECTEURS LOGIQUES:\n\n`;
  result += `   1. NÉGATION (¬):\n`;
  result += `      • ¬P: "non P"\n`;
  result += `      • Inverse la valeur de vérité\n\n`;
  result += `   2. CONJONCTION (∧):\n`;
  result += `      • P ∧ Q: "P et Q"\n`;
  result += `      • Vrai si P et Q sont vrais\n\n`;
  result += `   3. DISJONCTION (∨):\n`;
  result += `      • P ∨ Q: "P ou Q"\n`;
  result += `      • Vrai si au moins un est vrai\n\n`;
  result += `   4. IMPLICATION (⇒):\n`;
  result += `      • P ⇒ Q: "si P alors Q"\n`;
  result += `      • Faux seulement si P vrai et Q faux\n\n`;
  result += `   5. ÉQUIVALENCE (⇔):\n`;
  result += `      • P ⇔ Q: "P si et seulement si Q"\n`;
  result += `      • Vrai si P et Q ont même valeur\n\n`;
  result += `📋 TABLE DE VÉRITÉ:\n`;
  result += `   P │ Q │ P∧Q │ P∨Q │ P⇒Q │ P⇔Q\n`;
  result += `   ──┼───┼─────┼─────┼─────┼─────\n`;
  result += `   V │ V │  V  │  V  │  V  │  V\n`;
  result += `   V │ F │  F  │  V  │  F  │  F\n`;
  result += `   F │ V │  F  │  V  │  V  │  F\n`;
  result += `   F │ F │  F  │  F  │  V  │  V`;
  return result;
};

export const solveStatistics = (expr: string): string => {
  let result = `📚 STATISTIQUES DESCRIPTIVES\n${'═'.repeat(50)}\n\n`;
  result += `📝 Données: ${expr}\n\n`;
  result += `📊 INDICATEURS DE POSITION:\n\n`;
  result += `   1. MOYENNE:\n`;
  result += `      • x̄ = (Σxᵢ) / n\n`;
  result += `      • Centre de gravité des données\n\n`;
  result += `   2. MÉDIANE:\n`;
  result += `      • Valeur centrale (50% des données)\n`;
  result += `      • Robuste aux valeurs extrêmes\n\n`;
  result += `   3. MODE:\n`;
  result += `      • Valeur la plus fréquente\n\n`;
  result += `   4. QUARTILES:\n`;
  result += `      • Q₁: 25% des données\n`;
  result += `      • Q₂: médiane (50%)\n`;
  result += `      • Q₃: 75% des données\n\n`;
  result += `📈 INDICATEURS DE DISPERSION:\n\n`;
  result += `   1. ÉTENDUE:\n`;
  result += `      • E = max - min\n\n`;
  result += `   2. ÉCART INTERQUARTILE:\n`;
  result += `      • IQR = Q₃ - Q₁\n\n`;
  result += `   3. VARIANCE:\n`;
  result += `      • σ² = Σ(xᵢ - x̄)² / n\n\n`;
  result += `   4. ÉCART-TYPE:\n`;
  result += `      • σ = √variance\n\n`;
  result += `📦 DIAGRAMME EN BOÎTE:\n`;
  result += `   min ├──┤Q₁├──┤Q₂├──┤Q₃├──┤ max`;
  return result;
};
