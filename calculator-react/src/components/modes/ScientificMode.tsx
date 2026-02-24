import React, { useState } from 'react';

interface ScientificModeProps {
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

type MathCategory = 'analyse' | 'algebre' | 'geometrie' | 'probabilites' | 'discretes' | 'appliquees' | 'logique';

const ScientificMode: React.FC<ScientificModeProps> = ({ display, setDisplay, addToHistory }) => {
  const [activeCategory, setActiveCategory] = useState<MathCategory>('analyse');

  const factorial = (n: number): number => {
    if (n < 0) return NaN;
    if (n === 0 || n === 1) return 1;
    return n * factorial(n - 1);
  };

  const combination = (n: number, k: number): number => {
    return factorial(n) / (factorial(k) * factorial(n - k));
  };

  const permutation = (n: number, k: number): number => {
    return factorial(n) / factorial(n - k);
  };

  const fibonacci = (n: number): number => {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
  };

  const handleFunction = (fn: string) => {
    try {
      // Si c'est un chiffre ou un opérateur, l'ajouter à l'affichage
      if (/^[0-9.]$/.test(fn)) {
        setDisplay(display === '0' ? fn : display + fn);
        return;
      }
      
      if (['+', '-', '*', '/', '(', ')'].includes(fn)) {
        setDisplay(display + fn);
        return;
      }
      
      if (fn === 'C') {
        setDisplay('0');
        return;
      }
      
      if (fn === '⌫') {
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        return;
      }
      
      if (fn === '=') {
        try {
          const result = eval(display);
          addToHistory(`${display} = ${result}`);
          setDisplay(String(result));
        } catch {
          setDisplay('Erreur');
        }
        return;
      }
      
      const num = parseFloat(display);
      let result: number | string;
      
      switch(fn) {
        // Analyse
        case 'sin': result = Math.sin(num * Math.PI / 180); break;
        case 'cos': result = Math.cos(num * Math.PI / 180); break;
        case 'tan': result = Math.tan(num * Math.PI / 180); break;
        case 'asin': result = Math.asin(num) * 180 / Math.PI; break;
        case 'acos': result = Math.acos(num) * 180 / Math.PI; break;
        case 'atan': result = Math.atan(num) * 180 / Math.PI; break;
        case 'sinh': result = Math.sinh(num); break;
        case 'cosh': result = Math.cosh(num); break;
        case 'tanh': result = Math.tanh(num); break;
        case 'ln': result = Math.log(num); break;
        case 'log': result = Math.log10(num); break;
        case 'log2': result = Math.log2(num); break;
        case 'exp': result = Math.exp(num); break;
        case 'abs': result = Math.abs(num); break;
        
        // Algèbre
        case '√': result = Math.sqrt(num); break;
        case '∛': result = Math.cbrt(num); break;
        case 'x²': result = num * num; break;
        case 'x³': result = num * num * num; break;
        case '1/x': result = 1 / num; break;
        case 'n!': result = factorial(Math.floor(num)); break;
        case '|x|': result = Math.abs(num); break;
        case 'mod': setDisplay(display + ' % '); return;
        case 'GCD': setDisplay('GCD('); return;
        case 'LCM': setDisplay('LCM('); return;
        case 'φ': result = (1 + Math.sqrt(5)) / 2; break;
        case '√2': result = Math.sqrt(2); break;
        case '√3': result = Math.sqrt(3); break;
        
        // Géométrie
        case 'π': result = Math.PI; break;
        case '2π': result = 2 * Math.PI; break;
        case 'π/2': result = Math.PI / 2; break;
        case 'π/4': result = Math.PI / 4; break;
        case 'deg→rad': result = num * Math.PI / 180; break;
        case 'rad→deg': result = num * 180 / Math.PI; break;
        case 'norm': result = Math.abs(num); break;
        
        // Probabilités
        case 'rand': result = Math.random(); break;
        case 'rand(0,1)': result = Math.random(); break;
        case 'rand(0,n)': result = Math.floor(Math.random() * num); break;
        
        // Discrètes
        case 'C(n,k)': setDisplay('C('); return;
        case 'P(n,k)': setDisplay('P('); return;
        case 'Fib(n)': result = fibonacci(Math.floor(num)); break;
        case 'div': setDisplay(display + ' / '); return;
        case 'AND': result = Math.floor(num) & Math.floor(num); break;
        case 'OR': result = Math.floor(num) | Math.floor(num); break;
        case 'XOR': result = Math.floor(num) ^ Math.floor(num); break;
        case 'NOT': result = ~Math.floor(num); break;
        
        // Constantes
        case 'e': result = Math.E; break;
        case '∅': result = '∅'; break;
        case 'ℕ': result = 'ℕ'; break;
        case 'ℤ': result = 'ℤ'; break;
        case 'ℝ': result = 'ℝ'; break;
        
        default: return;
      }
      
      addToHistory(`${fn}(${display}) = ${result}`);
      setDisplay(String(result));
    } catch {
      setDisplay('Erreur');
    }
  };

  const categories = [
    { id: 'analyse' as MathCategory, name: '📊 Analyse', icon: '∫' },
    { id: 'algebre' as MathCategory, name: '🔢 Algèbre', icon: 'x²' },
    { id: 'geometrie' as MathCategory, name: '📐 Géométrie', icon: '∠' },
    { id: 'probabilites' as MathCategory, name: '🎲 Probabilités', icon: 'P' },
    { id: 'discretes' as MathCategory, name: '🔗 Discrètes', icon: 'C' },
    { id: 'appliquees' as MathCategory, name: '⚙️ Appliquées', icon: 'f' },
    { id: 'logique' as MathCategory, name: '🧠 Logique', icon: '∀' },
  ];

  const functionsByCategory: Record<MathCategory, string[][]> = {
    analyse: [
      ['sin', 'cos', 'tan', 'asin'],
      ['acos', 'atan', 'sinh', 'cosh'],
      ['tanh', 'ln', 'log', 'log2'],
      ['exp', 'abs', 'π', 'e'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    algebre: [
      ['x²', 'x³', '√', '∛'],
      ['1/x', 'n!', '|x|', 'mod'],
      ['φ', '√2', '√3', 'GCD'],
      ['LCM', 'det', 'inv', 'rank'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    geometrie: [
      ['π', '2π', 'π/2', 'π/4'],
      ['deg→rad', 'rad→deg', 'sin', 'cos'],
      ['tan', 'norm', 'aire', 'périm'],
      ['vol', 'dist', 'angle', 'dot'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    probabilites: [
      ['rand', 'rand(0,1)', 'rand(0,n)', 'μ'],
      ['σ', 'σ²', 'P(A)', 'P(B|A)'],
      ['E(X)', 'Var(X)', 'Cov', 'ρ'],
      ['norm', 'binom', 'poisson', 'exp'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    discretes: [
      ['C(n,k)', 'P(n,k)', 'n!', 'Fib(n)'],
      ['GCD', 'LCM', 'mod', 'div'],
      ['AND', 'OR', 'XOR', 'NOT'],
      ['⇒', '⇔', '∀', '∃'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    appliquees: [
      ['min', 'max', 'opt', 'grad'],
      ['∂/∂x', '∫', '∑', '∏'],
      ['lim', 'Δ', '∇', 'rot'],
      ['NPV', 'IRR', 'FV', 'PV'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
    logique: [
      ['∧', '∨', '¬', '⇒'],
      ['⇔', '∀', '∃', '∈'],
      ['⊂', '⊃', '∪', '∩'],
      ['∅', 'ℕ', 'ℤ', 'ℝ'],
      ['7', '8', '9', '+'],
      ['4', '5', '6', '-'],
      ['1', '2', '3', '*'],
      ['0', '.', '=', '/'],
      ['C', '⌫', '(', ')'],
    ],
  };

  return (
    <div className="space-y-4 animate-slide-in">
      {/* Onglets des catégories */}
      <div className="flex overflow-x-auto gap-2 pb-2">
        {categories.map((cat) => (
          <button
            key={cat.id}
            onClick={() => setActiveCategory(cat.id)}
            className={`px-4 py-2 rounded-lg font-semibold text-sm whitespace-nowrap transition-all ${
              activeCategory === cat.id
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg scale-105'
                : 'bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-600'
            }`}
          >
            {cat.name}
          </button>
        ))}
      </div>

      {/* Grille de boutons */}
      <div className="grid grid-cols-4 gap-3">
        {functionsByCategory[activeCategory].map((row, i) => (
          <React.Fragment key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleFunction(btn)}
                className="p-4 rounded-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 dark:from-primary/30 dark:to-accent/30 text-primary dark:text-white hover:scale-105 transition-all shadow-md hover:shadow-xl"
              >
                {btn}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>

      {/* Légende */}
      <div className="mt-4 p-4 bg-gradient-to-r from-blue-50 to-purple-50 dark:from-gray-800 dark:to-gray-700 rounded-xl">
        <h3 className="font-bold text-sm mb-2 text-gray-800 dark:text-white">
          {categories.find(c => c.id === activeCategory)?.name}
        </h3>
        <p className="text-xs text-gray-600 dark:text-gray-300">
          {activeCategory === 'analyse' && 'Calcul différentiel, intégral, fonctions trigonométriques et logarithmiques'}
          {activeCategory === 'algebre' && 'Structures algébriques, matrices, polynômes et théorie des nombres'}
          {activeCategory === 'geometrie' && 'Géométrie euclidienne, analytique et transformations'}
          {activeCategory === 'probabilites' && 'Probabilités, statistiques et distributions'}
          {activeCategory === 'discretes' && 'Combinatoire, graphes, logique et cryptographie'}
          {activeCategory === 'appliquees' && 'Optimisation, modélisation et mathématiques financières'}
          {activeCategory === 'logique' && 'Logique formelle, théorie des ensembles et fondements'}
        </p>
      </div>
    </div>
  );
};

export default ScientificMode;
