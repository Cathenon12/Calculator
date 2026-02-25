import React from 'react';

interface SettingsModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const SettingsModal: React.FC<SettingsModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative glass-card p-8 max-w-2xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
            <span>⚙️</span>
            Paramètres
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-card hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Thème */}
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
              <span>🎨</span>
              Apparence
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white/70 group-hover:text-white/90 transition-colors">Mode sombre automatique</span>
                <input type="checkbox" className="w-5 h-5 rounded accent-primary" />
              </label>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white/70 group-hover:text-white/90 transition-colors">Animations</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
              </label>
            </div>
          </div>

          {/* Calculs */}
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
              <span>🔢</span>
              Calculs
            </h3>
            <div className="space-y-3">
              <div>
                <label className="text-white/70 text-sm mb-2 block">Précision décimale</label>
                <input 
                  type="range" 
                  min="0" 
                  max="15" 
                  defaultValue="10"
                  className="w-full accent-primary"
                />
                <div className="flex justify-between text-xs text-white/50 mt-1">
                  <span>0</span>
                  <span>15</span>
                </div>
              </div>
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white/70 group-hover:text-white/90 transition-colors">Séparateur de milliers</span>
                <select className="glass-card px-3 py-2 rounded-lg text-white/90 text-sm">
                  <option>Espace</option>
                  <option>Virgule</option>
                  <option>Aucun</option>
                </select>
              </label>
            </div>
          </div>

          {/* Sons */}
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
              <span>🔊</span>
              Audio
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white/70 group-hover:text-white/90 transition-colors">Sons des boutons</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
              </label>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Volume</label>
                <input 
                  type="range" 
                  min="0" 
                  max="100" 
                  defaultValue="50"
                  className="w-full accent-primary"
                />
              </div>
            </div>
          </div>

          {/* Historique */}
          <div className="glass-card p-5 rounded-xl">
            <h3 className="text-lg font-semibold text-white/90 mb-3 flex items-center gap-2">
              <span>📜</span>
              Historique
            </h3>
            <div className="space-y-3">
              <label className="flex items-center justify-between cursor-pointer group">
                <span className="text-white/70 group-hover:text-white/90 transition-colors">Sauvegarder l'historique</span>
                <input type="checkbox" defaultChecked className="w-5 h-5 rounded accent-primary" />
              </label>
              <div>
                <label className="text-white/70 text-sm mb-2 block">Nombre max d'entrées</label>
                <input 
                  type="number" 
                  defaultValue="50"
                  className="glass-card px-3 py-2 rounded-lg text-white/90 w-full"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex gap-3 mt-8">
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl glass-card hover:scale-105 transition-all duration-300 text-white/90 font-semibold"
          >
            Annuler
          </button>
          <button 
            onClick={onClose}
            className="flex-1 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-glow"
          >
            Enregistrer
          </button>
        </div>
      </div>
    </div>
  );
};

export default SettingsModal;
