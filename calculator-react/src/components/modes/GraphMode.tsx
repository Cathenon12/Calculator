import React, { useState } from 'react';
import GraphPlotter from '../GraphPlotter';

interface GraphModeProp {
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const GraphMode: React.FC<GraphModeProp> = ({ display, setDisplay, addToHistory }) => {
  const [functionInput, setFunctionInput] = useState('x^2');
  const [showGraph, setShowGraph] = useState(false);

  const exampleFunctions = [
    { label: 'Parabole', func: 'x^2', desc: 'Fonction quadratique' },
    { label: 'Sinus', func: 'sin(x)', desc: 'Fonction trigonométrique' },
    { label: 'Cosinus', func: 'cos(x)', desc: 'Fonction trigonométrique' },
    { label: 'Exponentielle', func: 'exp(x)', desc: 'Croissance exponentielle' },
    { label: 'Logarithme', func: 'ln(x)', desc: 'Fonction logarithmique' },
    { label: 'Racine', func: 'sqrt(x)', desc: 'Racine carrée' },
    { label: 'Cubique', func: 'x^3', desc: 'Fonction cubique' },
    { label: 'Tangente', func: 'tan(x)', desc: 'Fonction trigonométrique' },
    { label: 'Abs', func: 'abs(x)', desc: 'Valeur absolue' },
    { label: '1/x', func: '1/x', desc: 'Fonction inverse' },
    { label: 'sin(x)/x', func: 'sin(x)/x', desc: 'Fonction sinc' },
    { label: 'x*sin(x)', func: 'x*sin(x)', desc: 'Produit' },
  ];

  const handlePlot = () => {
    setShowGraph(true);
    addToHistory(`Graphique: f(x) = ${functionInput}`);
  };

  const loadExample = (func: string) => {
    setFunctionInput(func);
    setShowGraph(true);
  };

  return (
    <div className="space-y-4 animate-slide-in">
      {/* Input de fonction */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          📈 Traceur de Fonctions
        </h3>
        
        <div className="space-y-3">
          <div>
            <label className="block text-sm font-semibold mb-2">Fonction f(x) :</label>
            <input
              type="text"
              value={functionInput}
              onChange={(e) => setFunctionInput(e.target.value)}
              placeholder="Ex: x^2, sin(x), x^3 + 2*x"
              className="w-full p-3 rounded-lg border-2 border-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white focus:border-purple-400 outline-none font-mono"
            />
          </div>

          <button
            onClick={handlePlot}
            className="w-full py-3 rounded-xl font-bold text-white bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105 transition-all"
          >
            📊 Tracer le Graphique
          </button>
        </div>
      </div>

      {/* Exemples rapides */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h4 className="font-semibold mb-3 flex items-center gap-2">
          ⚡ Exemples Rapides
        </h4>
        <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
          {exampleFunctions.map((ex) => (
            <button
              key={ex.func}
              onClick={() => loadExample(ex.func)}
              className="p-3 rounded-lg bg-white dark:bg-gray-700 hover:bg-purple-100 dark:hover:bg-gray-600 transition-all text-left border-2 border-transparent hover:border-purple-300"
              title={ex.desc}
            >
              <div className="font-bold text-sm text-purple-600 dark:text-purple-400">{ex.label}</div>
              <div className="text-xs text-gray-600 dark:text-gray-400 font-mono">{ex.func}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Graphique */}
      {showGraph && (
        <div className="animate-slide-in">
          <GraphPlotter functionStr={functionInput} />
        </div>
      )}

      {/* Aide */}
      <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          💡 Syntaxe Supportée
        </h4>
        <div className="grid grid-cols-2 gap-2 text-sm">
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">x^2</span> - Puissance
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">sin(x)</span> - Sinus
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">cos(x)</span> - Cosinus
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">tan(x)</span> - Tangente
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">sqrt(x)</span> - Racine
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">ln(x)</span> - Log naturel
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">exp(x)</span> - Exponentielle
          </div>
          <div>
            <span className="font-mono bg-white dark:bg-gray-700 px-2 py-1 rounded">abs(x)</span> - Valeur absolue
          </div>
        </div>
      </div>
    </div>
  );
};

export default GraphMode;
