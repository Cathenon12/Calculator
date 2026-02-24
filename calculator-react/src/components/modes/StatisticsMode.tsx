import React, { useState } from 'react';

const StatisticsMode: React.FC = () => {
  const [numbers, setNumbers] = useState('1, 2, 3, 4, 5');
  const [stats, setStats] = useState<any>({});

  const calculate = () => {
    const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
    
    if (nums.length === 0) return;

    const sum = nums.reduce((a, b) => a + b, 0);
    const mean = sum / nums.length;
    const sorted = [...nums].sort((a, b) => a - b);
    const median = nums.length % 2 === 0
      ? (sorted[nums.length / 2 - 1] + sorted[nums.length / 2]) / 2
      : sorted[Math.floor(nums.length / 2)];
    
    const variance = nums.reduce((acc, val) => acc + Math.pow(val - mean, 2), 0) / nums.length;
    const stdDev = Math.sqrt(variance);

    setStats({
      count: nums.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      min: Math.min(...nums).toFixed(2),
      max: Math.max(...nums).toFixed(2),
      stdDev: stdDev.toFixed(2),
      variance: variance.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 animate-slide-in max-w-md">
      <h3 className="text-xl font-bold text-gray-800 dark:text-gray-200">Analyse Statistique</h3>
      
      <textarea
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        placeholder="Entrez les nombres séparés par des virgules"
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700 h-24"
      />

      <button
        onClick={calculate}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition-all"
      >
        Analyser
      </button>

      {stats.count && (
        <div className="grid grid-cols-2 gap-3">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="p-4 bg-gray-100 dark:bg-[#1a1a3f] rounded-xl">
              <p className="text-xs text-gray-600 dark:text-gray-400 uppercase">{key}</p>
              <p className="text-xl font-bold text-primary">{value as string}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default StatisticsMode;
