import React, { useState } from 'react';

interface ProgrammerModeProps {
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const ProgrammerMode: React.FC<ProgrammerModeProps> = ({ display, setDisplay }) => {
  const [base, setBase] = useState<number>(10);

  const convert = (value: string, fromBase: number, toBase: number) => {
    try {
      if (!value || value === '0') return '0';
      const decimal = parseInt(value, fromBase);
      if (isNaN(decimal)) return '0';
      return decimal.toString(toBase).toUpperCase();
    } catch {
      return '0';
    }
  };

  const parseValue = (value: string, currentBase: number): number => {
    if (!value || value === '0') return 0;
    const parsed = parseInt(value, currentBase);
    return isNaN(parsed) ? 0 : parsed;
  };

  const isButtonDisabled = (btn: string): boolean => {
    if (base === 2) return !['0', '1'].includes(btn);
    if (base === 8) {
      const val = parseInt(btn, 16);
      return isNaN(val) || val >= 8;
    }
    if (base === 10) return isNaN(parseInt(btn, 10));
    return false;
  };

  const num = parseValue(display, base);

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="grid grid-cols-4 gap-3">
        {[2, 8, 10, 16].map((b) => (
          <button
            key={b}
            onClick={() => {
              setDisplay(convert(display, base, b));
              setBase(b);
            }}
            className={`p-3 rounded-xl font-bold transition-all ${
              base === b
                ? 'bg-gradient-to-r from-primary to-accent text-white'
                : 'bg-gray-100 dark:bg-[#1a1a3f] text-gray-700 dark:text-gray-300'
            }`}
          >
            {b === 2 ? 'BIN' : b === 8 ? 'OCT' : b === 10 ? 'DEC' : 'HEX'}
          </button>
        ))}
      </div>

      <div className="p-4 bg-gray-100 dark:bg-[#1a1a3f] rounded-xl space-y-3">
        <div className="text-xs text-gray-500 dark:text-gray-400 mb-2 font-semibold">Conversions automatiques:</div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">BIN:</span>
          <span className="font-mono text-blue-600 dark:text-blue-400 font-semibold">{num.toString(2)}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">OCT:</span>
          <span className="font-mono text-green-600 dark:text-green-400 font-semibold">{num.toString(8)}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">DEC:</span>
          <span className="font-mono text-purple-600 dark:text-purple-400 font-semibold">{num.toString(10)}</span>
        </div>
        <div className="flex justify-between items-center p-2 bg-white dark:bg-gray-800 rounded-lg">
          <span className="text-sm font-bold text-gray-700 dark:text-gray-300">HEX:</span>
          <span className="font-mono text-orange-600 dark:text-orange-400 font-semibold">{num.toString(16).toUpperCase()}</span>
        </div>
      </div>

      <div className="grid grid-cols-4 gap-2">
        {['7', '8', '9', 'A'].map((btn) => (
          <button
            key={btn}
            onClick={() => setDisplay(display === '0' ? btn : display + btn)}
            disabled={isButtonDisabled(btn)}
            className="p-4 rounded-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:text-white hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {btn}
          </button>
        ))}
        {['4', '5', '6', 'B'].map((btn) => (
          <button
            key={btn}
            onClick={() => setDisplay(display === '0' ? btn : display + btn)}
            disabled={isButtonDisabled(btn)}
            className="p-4 rounded-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:text-white hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {btn}
          </button>
        ))}
        {['1', '2', '3', 'C'].map((btn) => (
          <button
            key={btn}
            onClick={() => setDisplay(display === '0' ? btn : display + btn)}
            disabled={isButtonDisabled(btn)}
            className="p-4 rounded-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:text-white hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {btn}
          </button>
        ))}
        {['0', 'D', 'E', 'F'].map((btn) => (
          <button
            key={btn}
            onClick={() => setDisplay(display === '0' ? btn : display + btn)}
            disabled={isButtonDisabled(btn)}
            className="p-4 rounded-xl font-bold bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:text-white hover:scale-105 transition-all disabled:opacity-30 disabled:cursor-not-allowed"
          >
            {btn}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-2 gap-2 mt-4">
        <button
          onClick={() => setDisplay('0')}
          className="p-3 rounded-xl font-bold bg-red-500 text-white hover:bg-red-600 transition-all"
        >
          Clear
        </button>
        <button
          onClick={() => setDisplay(display.length > 1 ? display.slice(0, -1) : '0')}
          className="p-3 rounded-xl font-bold bg-gray-500 text-white hover:bg-gray-600 transition-all"
        >
          ⌫
        </button>
      </div>
    </div>
  );
};

export default ProgrammerMode;
