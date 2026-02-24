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
      const decimal = parseInt(value, fromBase);
      return decimal.toString(toBase).toUpperCase();
    } catch {
      return '0';
    }
  };

  const num = parseInt(display, base) || 0;

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

      <div className="p-4 bg-gray-100 dark:bg-[#1a1a3f] rounded-xl space-y-2">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">BIN:</span>
          <span className="font-mono">{num.toString(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">OCT:</span>
          <span className="font-mono">{num.toString(8)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">DEC:</span>
          <span className="font-mono">{num.toString(10)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600 dark:text-gray-400">HEX:</span>
          <span className="font-mono">{num.toString(16).toUpperCase()}</span>
        </div>
      </div>
    </div>
  );
};

export default ProgrammerMode;
