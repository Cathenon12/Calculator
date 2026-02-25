import React from 'react';

interface DisplayProps {
  value: string;
  onChange: (value: string) => void;
  onEnter: () => void;
  details?: string;
  mode?: string;
}

const Display: React.FC<DisplayProps> = ({ value, onChange, onEnter, details, mode = 'basic' }) => {
  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      onEnter();
    }
  };


  const placeholders: Record<string, string> = {
    basic: '0',
    scientific: '0',
    graph: 'Ex: x^2, sin(x), ln(x), exp(x)...',
    programmer: '0',
    converter: '0',
    financial: '0',
    statistics: '0'
  };

  return (
    <div className="p-6 glass-card m-4 shadow-glow-lg animate-slide-up">
      <div className="text-white/80 text-xs mb-2 font-medium uppercase tracking-wider flex items-center gap-2">
        <span className="w-2 h-2 bg-gradient-to-r from-blue-400 to-purple-500 rounded-full animate-pulse"></span>
        Affichage
      </div>
      <input
        type="text"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        onKeyDown={handleKeyDown}
        className="w-full p-6 text-4xl font-light bg-gradient-to-br from-white/5 to-white/10 border border-white/20 rounded-2xl text-white text-right focus:outline-none focus:border-blue-400 focus:bg-white/15 transition-all duration-300 placeholder-white/30 backdrop-blur-sm shadow-xl"
        placeholder={placeholders[mode]}
      />
      <div className="text-white/50 text-xs mt-3 text-right">
        <kbd className="px-2 py-1 bg-white/10 rounded text-white/70 text-xs">Entree</kbd>
        <span className="ml-2">pour calculer</span>
      </div>
      
      {details && (
        <div className="mt-4 p-6 bg-gradient-to-br from-gray-900/50 to-gray-800/50 backdrop-blur-md rounded-2xl border border-white/10 animate-fade-in shadow-2xl">
          <div className="text-white/90 text-sm mb-4 font-medium flex items-center gap-2 pb-3 border-b border-white/10">
            <div className="w-1 h-6 bg-gradient-to-b from-blue-400 to-purple-500 rounded-full"></div>
            <span>Solution detaillee</span>
          </div>
          <div className="text-white/95 text-sm font-mono whitespace-pre-wrap leading-relaxed bg-black/20 p-5 rounded-xl max-h-96 overflow-y-auto custom-scrollbar border border-white/5">
            {details}
          </div>
        </div>
      )}
    </div>
  );
};

export default Display;
