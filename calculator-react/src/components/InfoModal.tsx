import React from 'react';

interface InfoModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const InfoModal: React.FC<InfoModalProps> = ({ isOpen, onClose }) => {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 animate-fade-in">
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={onClose}></div>
      
      <div className="relative glass-card p-8 max-w-3xl w-full max-h-[90vh] overflow-y-auto custom-scrollbar animate-slide-up">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-3xl font-bold bg-gradient-to-r from-indigo-400 to-pink-400 bg-clip-text text-transparent flex items-center gap-3">
            <span>ℹ️</span>
            À propos
          </h2>
          <button
            onClick={onClose}
            className="p-2 rounded-xl glass-card hover:bg-red-500/20 hover:scale-110 transition-all duration-300"
          >
            <span className="text-2xl">✕</span>
          </button>
        </div>

        <div className="space-y-6">
          {/* Version */}
          <div className="glass-card p-6 rounded-xl text-center">
            <div className="text-6xl mb-4">🧮</div>
            <h3 className="text-2xl font-bold text-white/90 mb-2">Calculatrice Pro</h3>
            <p className="text-white/60 mb-4">Version 2.0 - Édition Avancée</p>
            <div className="flex gap-2 justify-center">
              <span className="px-3 py-1 rounded-full glass-card text-xs text-white/70">React 18</span>
              <span className="px-3 py-1 rounded-full glass-card text-xs text-white/70">TypeScript</span>
              <span className="px-3 py-1 rounded-full glass-card text-xs text-white/70">Tailwind CSS</span>
            </div>
          </div>

          {/* Fonctionnalités */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
              <span>✨</span>
              Fonctionnalités
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div className="flex items-center gap-2 text-white/70">
                <span>🔢</span>
                <span className="text-sm">Mode Basique</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>🔬</span>
                <span className="text-sm">Mode Scientifique</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>📊</span>
                <span className="text-sm">Graphiques</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>💻</span>
                <span className="text-sm">Programmation</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>🔄</span>
                <span className="text-sm">Convertisseur</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>💰</span>
                <span className="text-sm">Finance</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>📈</span>
                <span className="text-sm">Statistiques</span>
              </div>
              <div className="flex items-center gap-2 text-white/70">
                <span>🎓</span>
                <span className="text-sm">Démonstrations</span>
              </div>
            </div>
          </div>

          {/* Raccourcis clavier */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
              <span>⌨️</span>
              Raccourcis clavier
            </h3>
            <div className="space-y-2">
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Calculer</span>
                <kbd className="px-3 py-1 rounded-lg glass-card text-white/90 font-mono">Enter</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Effacer</span>
                <kbd className="px-3 py-1 rounded-lg glass-card text-white/90 font-mono">Escape</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Supprimer</span>
                <kbd className="px-3 py-1 rounded-lg glass-card text-white/90 font-mono">Backspace</kbd>
              </div>
              <div className="flex justify-between items-center text-sm">
                <span className="text-white/70">Opérations</span>
                <div className="flex gap-1">
                  <kbd className="px-2 py-1 rounded glass-card text-white/90 font-mono text-xs">+</kbd>
                  <kbd className="px-2 py-1 rounded glass-card text-white/90 font-mono text-xs">-</kbd>
                  <kbd className="px-2 py-1 rounded glass-card text-white/90 font-mono text-xs">*</kbd>
                  <kbd className="px-2 py-1 rounded glass-card text-white/90 font-mono text-xs">/</kbd>
                </div>
              </div>
            </div>
          </div>

          {/* Crédits */}
          <div className="glass-card p-6 rounded-xl">
            <h3 className="text-xl font-semibold text-white/90 mb-4 flex items-center gap-2">
              <span>👨‍💻</span>
              Développement
            </h3>
            <p className="text-white/70 text-sm mb-4">
              Développé avec ❤️ en utilisant les dernières technologies web
            </p>
            <div className="flex gap-3">
              <a href="https://github.com" target="_blank" rel="noopener noreferrer" 
                 className="flex-1 px-4 py-2 rounded-xl glass-card hover:scale-105 transition-all text-center text-sm text-white/80 hover:text-white">
                <span className="mr-2">🐙</span>GitHub
              </a>
              <a href="#" className="flex-1 px-4 py-2 rounded-xl glass-card hover:scale-105 transition-all text-center text-sm text-white/80 hover:text-white">
                <span className="mr-2">📖</span>Documentation
              </a>
            </div>
          </div>

          {/* Footer */}
          <div className="text-center text-white/50 text-xs">
            <p>© 2024 Calculatrice Pro - Tous droits réservés</p>
            <p className="mt-1">Dernière mise à jour: Février 2024</p>
          </div>
        </div>

        <button 
          onClick={onClose}
          className="w-full mt-6 px-6 py-3 rounded-xl bg-gradient-to-r from-indigo-500 to-pink-500 hover:scale-105 transition-all duration-300 text-white font-semibold shadow-glow"
        >
          Fermer
        </button>
      </div>
    </div>
  );
};

export default InfoModal;
