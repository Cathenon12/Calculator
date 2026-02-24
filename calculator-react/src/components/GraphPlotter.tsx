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
      
      const range = { min: -10, max: 10, step: 0.1 };
      
      for (let x = range.min; x <= range.max; x += range.step) {
        xValues.push(parseFloat(x.toFixed(2)));
        
        try {
          const y = evaluateFunction(functionStr, x);
          yValues.push(y);
        } catch {
          yValues.push(NaN);
        }
      }

      setData({
        labels: xValues,
        datasets: [{
          label: `f(x) = ${functionStr}`,
          data: yValues,
          borderColor: 'rgb(102, 126, 234)',
          backgroundColor: 'rgba(102, 126, 234, 0.1)',
          borderWidth: 2,
          pointRadius: 0,
          tension: 0.4,
          fill: true
        }]
      });
      setError('');
    } catch (err) {
      setError('Fonction invalide');
    }
  }, [functionStr]);

  const evaluateFunction = (func: string, x: number): number => {
    let expression = func
      .replace(/x/g, `(${x})`)
      .replace(/\^/g, '**')
      .replace(/sin/g, 'Math.sin')
      .replace(/cos/g, 'Math.cos')
      .replace(/tan/g, 'Math.tan')
      .replace(/sqrt/g, 'Math.sqrt')
      .replace(/ln/g, 'Math.log')
      .replace(/log/g, 'Math.log10')
      .replace(/exp/g, 'Math.exp')
      .replace(/abs/g, 'Math.abs')
      .replace(/π/g, 'Math.PI')
      .replace(/e(?![a-z])/g, 'Math.E');

    return eval(expression);
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
        display: true,
        title: { display: true, text: 'x', color: '#667eea', font: { size: 14, weight: 'bold' as const } },
        grid: { color: 'rgba(102, 126, 234, 0.1)' },
        ticks: { color: '#667eea' }
      },
      y: {
        display: true,
        title: { display: true, text: 'y', color: '#667eea', font: { size: 14, weight: 'bold' as const } },
        grid: { color: 'rgba(102, 126, 234, 0.1)' },
        ticks: { color: '#667eea' }
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
