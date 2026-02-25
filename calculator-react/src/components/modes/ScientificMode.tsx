import React, { useState } from 'react';

interface ScientificModeProps {
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const ScientificMode: React.FC<ScientificModeProps> = ({ display, setDisplay, addToHistory }) => {
  const [angleMode, setAngleMode] = useState<'DEG' | 'RAD'>('DEG');
  const [secondFunction, setSecondFunction] = useState(false);

  const evaluateExpression = (expr: string): number => {
    const toRad = angleMode === 'DEG' ? Math.PI / 180 : 1;
    const context = {
      sin: (x: number) => Math.sin(x * toRad),
      cos: (x: number) => Math.cos(x * toRad),
      tan: (x: number) => Math.tan(x * toRad),
      asin: (x: number) => Math.asin(x) / toRad,
      acos: (x: number) => Math.acos(x) / toRad,
      atan: (x: number) => Math.atan(x) / toRad,
      sinh: Math.sinh,
      cosh: Math.cosh,
      tanh: Math.tanh,
      sqrt: Math.sqrt,
      cbrt: Math.cbrt,
      ln: Math.log,
      log: Math.log10,
      exp: Math.exp,
      abs: Math.abs,
      pow: Math.pow,
      factorial: (n: number) => {
        if (n < 0) return NaN;
        if (n === 0 || n === 1) return 1;
        let result = 1;
        for (let i = 2; i <= n; i++) result *= i;
        return result;
      },
      PI: Math.PI,
      E: Math.E
    };
    
    let expression = expr
      .replace(/π/g, 'PI')
      .replace(/\^/g, '**')
      .replace(/√/g, 'sqrt')
      .replace(/(\d+)!/g, 'factorial($1)');

    const keys = Object.keys(context);
    const values = Object.values(context);
    return new Function(...keys, `return ${expression}`)(...values);
  };

  const handleButton = (btn: string) => {
    try {
      if (/^[0-9.]$/.test(btn)) {
        setDisplay(display === '0' ? btn : display + btn);
        return;
      }
      
      if (['+', '-', '*', '/', '(', ')'].includes(btn)) {
        setDisplay(display + btn);
        return;
      }
      
      if (btn === 'C') {
        setDisplay('0');
        return;
      }
      
      if (btn === '⌫') {
        setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
        return;
      }
      
      if (btn === '=') {
        const result = evaluateExpression(display);
        addToHistory(`${display} = ${result}`);
        setDisplay(String(result));
        return;
      }
      
      if (btn === '2nd') {
        setSecondFunction(!secondFunction);
        return;
      }
      
      if (btn === 'DEG/RAD') {
        setAngleMode(angleMode === 'DEG' ? 'RAD' : 'DEG');
        return;
      }
      
      const num = parseFloat(display);
      let result: number;
      
      switch(btn) {
        case 'sin': result = Math.sin(num * (angleMode === 'DEG' ? Math.PI / 180 : 1)); break;
        case 'cos': result = Math.cos(num * (angleMode === 'DEG' ? Math.PI / 180 : 1)); break;
        case 'tan': result = Math.tan(num * (angleMode === 'DEG' ? Math.PI / 180 : 1)); break;
        case 'asin': result = Math.asin(num) * (angleMode === 'DEG' ? 180 / Math.PI : 1); break;
        case 'acos': result = Math.acos(num) * (angleMode === 'DEG' ? 180 / Math.PI : 1); break;
        case 'atan': result = Math.atan(num) * (angleMode === 'DEG' ? 180 / Math.PI : 1); break;
        case 'sinh': result = Math.sinh(num); break;
        case 'cosh': result = Math.cosh(num); break;
        case 'tanh': result = Math.tanh(num); break;
        case 'ln': result = Math.log(num); break;
        case 'log': result = Math.log10(num); break;
        case 'exp': result = Math.exp(num); break;
        case '√': result = Math.sqrt(num); break;
        case '∛': result = Math.cbrt(num); break;
        case 'x²': result = num * num; break;
        case 'x³': result = num * num * num; break;
        case '1/x': result = 1 / num; break;
        case 'n!': 
          let fact = 1;
          for (let i = 2; i <= Math.floor(num); i++) fact *= i;
          result = fact;
          break;
        case '|x|': result = Math.abs(num); break;
        case 'π': result = Math.PI; break;
        case 'e': result = Math.E; break;
        case 'x^y': setDisplay(display + '^'); return;
        case '10^x': result = Math.pow(10, num); break;
        case 'e^x': result = Math.exp(num); break;
        case '%': result = num / 100; break;
        default: return;
      }
      
      addToHistory(`${btn}(${display}) = ${result}`);
      setDisplay(String(result));
    } catch {
      setDisplay('Erreur');
    }
  };

  const buttons = [
    ['2nd', 'DEG/RAD', 'C', '⌫'],
    [secondFunction ? 'asin' : 'sin', secondFunction ? 'acos' : 'cos', secondFunction ? 'atan' : 'tan', secondFunction ? 'sinh' : 'ln'],
    [secondFunction ? 'cosh' : 'log', secondFunction ? 'tanh' : 'exp', secondFunction ? 'x³' : 'x²', secondFunction ? '∛' : '√'],
    [secondFunction ? 'e^x' : 'x^y', secondFunction ? '10^x' : '1/x', 'n!', '|x|'],
    ['π', 'e', '%', '/'],
    ['7', '8', '9', '*'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '=', '=']
  ];

  return (
    <div className="space-y-4 animate-slide-in">
      <div className="flex gap-2 p-3 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-xl">
        <div className={`px-4 py-2 rounded-lg font-bold ${angleMode === 'DEG' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
          DEG
        </div>
        <div className={`px-4 py-2 rounded-lg font-bold ${angleMode === 'RAD' ? 'bg-blue-500 text-white' : 'bg-gray-300 dark:bg-gray-700 text-gray-600 dark:text-gray-400'}`}>
          RAD
        </div>
        {secondFunction && (
          <div className="px-4 py-2 rounded-lg font-bold bg-orange-500 text-white ml-auto">
            2nd
          </div>
        )}
      </div>

      <div className="grid grid-cols-4 gap-2">
        {buttons.map((row, i) => (
          <React.Fragment key={i}>
            {row.map((btn) => (
              <button
                key={btn}
                onClick={() => handleButton(btn)}
                className={`p-4 rounded-xl font-bold transition-all ${
                  btn === '=' ? 'bg-gradient-to-r from-green-500 to-green-600 text-white col-span-1' :
                  btn === 'C' ? 'bg-gradient-to-r from-red-500 to-red-600 text-white' :
                  btn === '2nd' ? `${secondFunction ? 'bg-orange-500' : 'bg-gray-400'} text-white` :
                  btn === 'DEG/RAD' ? 'bg-blue-500 text-white' :
                  ['+', '-', '*', '/'].includes(btn) ? 'bg-gradient-to-br from-orange-400 to-orange-500 text-white' :
                  'bg-gradient-to-br from-primary/20 to-accent/20 text-primary dark:text-white'
                } hover:scale-105 shadow-md`}
              >
                {btn}
              </button>
            ))}
          </React.Fragment>
        ))}
      </div>
    </div>
  );
};

export default ScientificMode;
