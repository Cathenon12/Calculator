import React from 'react';

interface DisplayProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
}

const Display: React.FC<DisplayProps> = ({ value, onChange, onEnter }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      onEnter();
    }
  };

  return (
    <div className="p-6 bg-gradient-to-r from-primary/95 to-primary-dark/95 rounded-2xl m-4 shadow-2xl">
      <div className="text-white/80 text-xs mb-2 font-medium">Calcul</div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-5 text-4xl font-bold bg-white/15 border-2 border-white/25 rounded-xl text-white text-right focus:outline-none focus:bg-white/20"
        placeholder="Tapez votre calcul..."
      />
      <div className="text-white/70 text-sm mt-3 text-right">Appuyez sur Entrée pour calculer</div>
    </div>
  );
};

export default Display;
