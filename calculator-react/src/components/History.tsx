import React from 'react';

interface HistoryProps {
  history: string[];
  setDisplay: (value: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, setDisplay }) => {
  return (
    <aside className="w-72 glass-card border-l border-white/10 p-5 overflow-y-auto custom-scrollbar">
      <div className="flex items-center justify-between mb-6">
        <h3 className="text-xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-2">
          <span>📜</span>
          Historique
        </h3>
        <span className="px-3 py-1 rounded-full glass-card text-xs font-semibold text-white/80">
          {history.length}
        </span>
      </div>
      
      <div className="space-y-3">
        {history.length === 0 ? (
          <div className="text-center py-12 animate-fade-in">
            <div className="text-6xl mb-4 opacity-20">🧐</div>
            <p className="text-sm text-white/50">Aucun calcul pour le moment</p>
            <p className="text-xs text-white/30 mt-2">Vos calculs apparaîtront ici</p>
          </div>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              onClick={() => setDisplay(item.split('=')[1]?.trim() || item)}
              style={{ animationDelay: `${index * 30}ms` }}
              className="p-4 glass-card rounded-xl text-sm cursor-pointer hover:scale-105 hover:shadow-glow transition-all duration-300 group animate-slide-in"
            >
              <div className="flex items-start justify-between gap-2">
                <p className="text-white/90 break-words flex-1 font-mono group-hover:text-white transition-colors">
                  {item}
                </p>
                <span className="text-pink-400 opacity-0 group-hover:opacity-100 transition-opacity">
                  ↻
                </span>
              </div>
              <div className="text-xs text-white/40 mt-2 flex items-center gap-1">
                <span className="w-1.5 h-1.5 bg-pink-400 rounded-full"></span>
                Calcul #{history.length - index}
              </div>
            </div>
          ))
        )}
      </div>
      
      {history.length > 0 && (
        <button 
          onClick={() => window.location.reload()}
          className="w-full mt-6 p-3 rounded-xl glass-card hover:bg-red-500/20 hover:border-red-500/30 transition-all duration-300 text-white/70 hover:text-red-400 text-sm font-semibold group"
        >
          <span className="group-hover:scale-110 inline-block transition-transform">🗑️</span>
          {' '}Effacer l'historique
        </button>
      )}
    </aside>
  );
};

export default History;
