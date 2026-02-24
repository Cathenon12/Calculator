import React, { useState } from 'react';

const FinancialMode: React.FC = () => {
  const [capital, setCapital] = useState('1000');
  const [rate, setRate] = useState('5');
  const [years, setYears] = useState('10');
  const [result, setResult] = useState('0');

  const calculate = () => {
    const p = parseFloat(capital);
    const r = parseFloat(rate) / 100;
    const t = parseFloat(years);
    const amount = p * Math.pow(1 + r, t);
    setResult(amount.toFixed(2));
  };

  return (
    <div className="space-y-4 animate-slide-in max-w-md">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Intérêt Composé</h3>
      
      <div>
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">Capital Initial (€)</label>
        <input
          type="number"
          value={capital}
          onChange={(e) => setCapital(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">Taux d'intérêt (%)</label>
        <input
          type="number"
          value={rate}
          onChange={(e) => setRate(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
        />
      </div>

      <div>
        <label className="block text-sm mb-2 text-gray-600 dark:text-gray-400">Durée (années)</label>
        <input
          type="number"
          value={years}
          onChange={(e) => setYears(e.target.value)}
          className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
        />
      </div>

      <button
        onClick={calculate}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition-all"
      >
        Calculer
      </button>

      <div className="p-6 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
        <p className="text-sm text-gray-600 dark:text-gray-400 mb-2">Montant Final</p>
        <p className="text-3xl font-bold text-primary">{result} €</p>
      </div>
    </div>
  );
};

export default FinancialMode;
