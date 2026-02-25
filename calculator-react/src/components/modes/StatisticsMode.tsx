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

    const frequency: { [key: number]: number } = {};
    nums.forEach(n => frequency[n] = (frequency[n] || 0) + 1);
    const maxFreq = Math.max(...Object.values(frequency));
    const mode = Object.keys(frequency).filter(k => frequency[Number(k)] === maxFreq).map(Number);

    setStats({
      count: nums.length,
      sum: sum.toFixed(2),
      mean: mean.toFixed(2),
      median: median.toFixed(2),
      mode: mode.length === nums.length ? 'Aucun' : mode.join(', '),
      min: Math.min(...nums).toFixed(2),
      max: Math.max(...nums).toFixed(2),
      range: (Math.max(...nums) - Math.min(...nums)).toFixed(2),
      stdDev: stdDev.toFixed(2),
      variance: variance.toFixed(2),
    });
  };

  return (
    <div className="space-y-4 animate-slide-in max-w-4xl">
      <h3 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">Analyse Statistique</h3>
      
      <textarea
        value={numbers}
        onChange={(e) => setNumbers(e.target.value)}
        placeholder="Entrez les nombres séparés par des virgules (ex: 1, 2, 3, 4, 5)"
        className="w-full p-4 rounded-xl glass-card text-white border-2 border-white/20 focus:border-indigo-400 transition-all h-24 font-mono"
      />

      <button
        onClick={calculate}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 text-white font-bold hover:scale-105 transition-all shadow-lg"
      >
        Analyser
      </button>

      {stats.count && (
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-3">
          {Object.entries(stats).map(([key, value]) => (
            <div key={key} className="p-4 glass-card rounded-xl hover:scale-105 transition-all">
              <p className="text-xs text-white/60 uppercase mb-1">{key}</p>
              <p className="text-2xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent">{value as string}</p>
            </div>
          ))}
        </div>
      )}

      {stats.count && (
        <div className="p-6 glass-card rounded-xl border-2 border-indigo-400/30">
          <h4 className="text-xl font-bold text-white mb-4">Visualisation</h4>
          <div className="h-64 bg-black/40 rounded-lg p-4 relative">
            <svg width="100%" height="100%" viewBox="0 0 100 100" preserveAspectRatio="none">
              <defs>
                <pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse">
                  <path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.05)" strokeWidth="0.1"/>
                </pattern>
              </defs>
              <rect width="100" height="100" fill="url(#grid)" />
              
              {(() => {
                const nums = numbers.split(',').map(n => parseFloat(n.trim())).filter(n => !isNaN(n));
                if (nums.length === 0) return null;
                
                const min = Math.min(...nums);
                const max = Math.max(...nums);
                const range = max - min || 1;
                
                return nums.map((num, idx) => {
                  const x = (idx / (nums.length - 1 || 1)) * 90 + 5;
                  const height = ((num - min) / range) * 80 + 5;
                  const y = 95 - height;
                  
                  return (
                    <g key={idx}>
                      <rect
                        x={x - 2}
                        y={y}
                        width="4"
                        height={height}
                        fill="url(#gradient)"
                        opacity="0.8"
                      />
                      <circle
                        cx={x}
                        cy={y}
                        r="1.5"
                        fill="#ec4899"
                      />
                    </g>
                  );
                });
              })()}
              
              <defs>
                <linearGradient id="gradient" x1="0%" y1="0%" x2="0%" y2="100%">
                  <stop offset="0%" stopColor="#6366f1" />
                  <stop offset="100%" stopColor="#ec4899" />
                </linearGradient>
              </defs>
            </svg>
          </div>
        </div>
      )}
    </div>
  );
};

export default StatisticsMode;
