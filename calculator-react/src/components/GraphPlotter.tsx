import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend,
  Filler
} from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, PointElement, LineElement, Title, Tooltip, Legend, Filler);

interface GraphPlotterProps {
  functionStr: string;
}

const GraphPlotter: React.FC<GraphPlotterProps> = ({ functionStr }) => {
  const [data, setData] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!functionStr) return;
    
    try {
      const xValues: number[] = [];
      const yValues: number[] = [];
      
      // Déterminer la plage en fonction de la fonction
      let range = { min: -10, max: 10, step: 0.1 };
      
      // Ajuster la plage pour ln(x) et exp(x)
      if (functionStr.includes('ln') || functionStr.includes('log')) {
        range = { min: 0.01, max: 10, step: 0.1 };
      } else if (functionStr.includes('exp')) {
        range = { min: -3, max: 3, step: 0.05 };
      } else if (functionStr.includes('1/x')) {
        range = { min: -10, max: 10, step: 0.1 };
      }
      
      for (let x = range.min; x <= range.max; x += range.step) {
        const xVal = parseFloat(x.toFixed(3));
        
        try {
          const y = evaluateFunction(functionStr, xVal);
          console.log(`x=${xVal}, y=${y}, isFinite=${isFinite(y)}, isNaN=${isNaN(y)}`);
          // Filtrer les valeurs invalides
          if (isFinite(y) && !isNaN(y)) {
            xValues.push(xVal);
            yValues.push(y);
          }
        } catch (e) {
          console.error(`Error at x=${xVal}:`, e);
        }
      }
      
      console.log('Function:', functionStr);
      console.log('Points:', xValues.length);
      console.log('Sample values:', xValues.slice(0, 5), yValues.slice(0, 5));

      setData({
        labels: xValues,
        datasets: [{
          label: `f(x) = ${functionStr}`,
          data: xValues.map((x, i) => ({ x, y: yValues[i] })),
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: false
        }]
      });
      setError('');
    } catch (err) {
      console.error('Error:', err);
      setError('Fonction invalide');
    }
  }, [functionStr]);

  const evaluateFunction = (func: string, x: number): number => {
    // Créer un contexte sécurisé avec toutes les fonctions Math
    const context = {
      sin: Math.sin,
      cos: Math.cos,
      tan: Math.tan,
      sqrt: Math.sqrt,
      ln: Math.log,
      log: Math.log10,
      exp: Math.exp,
      abs: Math.abs,
      PI: Math.PI,
      E: Math.E,
      x: x
    };
    
    let expression = func
      .replace(/\^/g, '**')
      .replace(/π/g, 'PI')
      .replace(/\be\b(?!xp)/g, 'E');

    // Créer une fonction avec le contexte
    const keys = Object.keys(context);
    const values = Object.values(context);
    return new Function(...keys, `return ${expression}`)(...values);
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: {
        display: true,
        position: 'top' as const,
        labels: {
          color: '#667eea',
          font: { size: 12, weight: 'bold' as const }
        }
      },
      tooltip: {
        mode: 'index' as const,
        intersect: false,
        callbacks: {
          label: (context: any) => `y = ${context.parsed.y.toFixed(3)}`
        }
      }
    },
    scales: {
      x: {
        type: 'linear' as const,
        display: true,
        title: { display: true, text: 'x', color: '#667eea', font: { size: 14, weight: 'bold' as const } },
        grid: { 
          color: (context: any) => context.tick.value === 0 ? 'rgba(102, 126, 234, 0.8)' : 'rgba(102, 126, 234, 0.1)',
          lineWidth: (context: any) => context.tick.value === 0 ? 2 : 1,
          drawBorder: true
        },
        ticks: { 
          color: '#667eea',
          crossAlign: 'far' as const
        },
        grace: '10%'
      },
      y: {
        type: 'linear' as const,
        display: true,
        title: { display: true, text: 'y', color: '#667eea', font: { size: 14, weight: 'bold' as const } },
        grid: { 
          color: (context: any) => context.tick.value === 0 ? 'rgba(102, 126, 234, 0.8)' : 'rgba(102, 126, 234, 0.1)',
          lineWidth: (context: any) => context.tick.value === 0 ? 2 : 1,
          drawBorder: true
        },
        ticks: { 
          color: '#667eea',
          crossAlign: 'far' as const
        },
        beginAtZero: false,
        grace: '10%'
      }
    },
    interaction: {
      mode: 'nearest' as const,
      axis: 'x' as const,
      intersect: false
    }
  };

  if (error) {
    return (
      <div className="p-4 bg-red-100 dark:bg-red-900 rounded-xl text-red-700 dark:text-red-200">
        ⚠️ {error}
      </div>
    );
  }

  if (!data) {
    return (
      <div className="p-4 bg-blue-100 dark:bg-blue-900 rounded-xl text-blue-700 dark:text-blue-200">
        📊 Entrez une fonction pour voir le graphique
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-gray-800 p-4 rounded-xl shadow-lg" style={{ height: '400px' }}>
      <Line data={data} options={options} />
    </div>
  );
};

export default GraphPlotter;
