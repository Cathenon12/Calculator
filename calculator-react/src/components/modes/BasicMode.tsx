import React from 'react';

interface BasicModeProps {
  display: string;
  setDisplay: (value: string) => void;
  addToHistory: (calculation: string) => void;
}

const BasicMode: React.FC<BasicModeProps> = ({ display, setDisplay, addToHistory }) => {
  const handleClick = (value: string) => {
    if (value === 'C') {
      setDisplay('0');
    } else if (value === '=') {
      try {
        const result = eval(display.replace('×', '*').replace('÷', '/'));
        addToHistory(`${display} = ${result}`);
        setDisplay(String(result));
      } catch {
        setDisplay('Erreur');
      }
    } else if (value === '⌫') {
      setDisplay(display.length > 1 ? display.slice(0, -1) : '0');
    } else {
      setDisplay(display === '0' ? value : display + value);
    }
  };

  const buttons = [
    ['C', '⌫', '%', '÷'],
    ['7', '8', '9', '×'],
    ['4', '5', '6', '-'],
    ['1', '2', '3', '+'],
    ['0', '.', '='],
  ];

  const getButtonStyle = (btn: string) => {
    if (btn === '=') {
      return 'col-span-2 bg-gradient-to-r from-pink-500 via-rose-500 to-pink-600 text-white shadow-glow-pink hover:from-pink-600 hover:via-rose-600 hover:to-pink-700';
    }
    if (['C', '⌫'].includes(btn)) {
      return 'bg-gradient-to-r from-orange-500 to-red-500 text-white shadow-lg hover:from-orange-600 hover:to-red-600';
    }
    if (['%', '÷', '×', '-', '+'].includes(btn)) {
      return 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-glow hover:shadow-glow-purple';
    }
    return 'glass-card text-white hover:bg-white/20 hover:shadow-glow-purple';
  };

  return (
    <div className="grid grid-cols-4 gap-4 p-4">
      {buttons.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((btn, j) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`p-6 rounded-2xl font-bold text-xl transition-all duration-300 hover:scale-110 active:scale-95 animate-slide-in ${getButtonStyle(btn)}`}
              style={{ animationDelay: `${i * 50 + j * 20}ms` }}
            >
              {btn}
            </button>
          ))}
        </React.Fragment>
      ))}
    </div>
  );
};

export default BasicMode;
