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

  return (
    <div className="grid grid-cols-4 gap-3 animate-slide-in">
      {buttons.map((row, i) => (
        <React.Fragment key={i}>
          {row.map((btn) => (
            <button
              key={btn}
              onClick={() => handleClick(btn)}
              className={`p-4 rounded-xl font-bold text-lg transition-all hover:scale-105 active:scale-95 ${
                btn === '=' 
                  ? 'col-span-2 bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                  : ['C', '⌫', '%', '÷', '×', '-', '+'].includes(btn)
                  ? 'bg-primary/20 dark:bg-primary/30 text-primary dark:text-white'
                  : 'bg-gray-100 dark:bg-[#1a1a3f] text-gray-800 dark:text-gray-200'
              }`}
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
