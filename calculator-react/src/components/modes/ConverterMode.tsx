import React, { useState } from 'react';

const ConverterMode: React.FC = () => {
  const [type, setType] = useState('length');
  const [from, setFrom] = useState('m');
  const [to, setTo] = useState('km');
  const [value, setValue] = useState('1');
  const [result, setResult] = useState('0.001');

  const conversions: any = {
    length: { m: 1, km: 0.001, cm: 100, mm: 1000, mi: 0.000621371, ft: 3.28084 },
    mass: { kg: 1, g: 1000, mg: 1000000, t: 0.001, lb: 2.20462, oz: 35.274 },
    temperature: { C: 1, F: 1, K: 1 },
  };

  const convert = () => {
    const val = parseFloat(value) || 0;
    if (type === 'temperature') {
      let celsius = from === 'C' ? val : from === 'F' ? (val - 32) * 5/9 : val - 273.15;
      let res = to === 'C' ? celsius : to === 'F' ? celsius * 9/5 + 32 : celsius + 273.15;
      setResult(res.toFixed(4));
    } else {
      const base = val / conversions[type][from];
      setResult((base * conversions[type][to]).toFixed(4));
    }
  };

  return (
    <div className="space-y-4 animate-slide-in max-w-md">
      <select
        value={type}
        onChange={(e) => setType(e.target.value)}
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
      >
        <option value="length">Longueur</option>
        <option value="mass">Masse</option>
        <option value="temperature">Température</option>
      </select>

      <input
        type="number"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        className="w-full p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
      />

      <div className="grid grid-cols-2 gap-3">
        <select
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
        >
          {Object.keys(conversions[type] || {}).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>

        <select
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] border-2 border-gray-200 dark:border-gray-700"
        >
          {Object.keys(conversions[type] || {}).map((unit) => (
            <option key={unit} value={unit}>{unit}</option>
          ))}
        </select>
      </div>

      <button
        onClick={convert}
        className="w-full p-4 rounded-xl bg-gradient-to-r from-primary to-accent text-white font-bold hover:scale-105 transition-all"
      >
        Convertir
      </button>

      <div className="p-4 bg-gradient-to-r from-primary/10 to-accent/10 rounded-xl">
        <p className="text-2xl font-bold text-center">{result} {to}</p>
      </div>
    </div>
  );
};

export default ConverterMode;
