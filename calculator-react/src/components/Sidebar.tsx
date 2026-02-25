import React from 'react';

interface SidebarProps {
  mode: string;
  setMode: (mode: any) => void;
  darkMode: boolean;
  toggleTheme: () => void;
  onSettingsClick: () => void;
  onInfoClick: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mode, setMode, darkMode, toggleTheme, onSettingsClick, onInfoClick }) => {
  const modes = [
    { id: 'basic', label: 'Basique', icon: '🔢' },
    { id: 'scientific', label: 'Scientifique', icon: '🔬' },
    { id: 'graph', label: 'Graphique', icon: '📊' },
    { id: 'programmer', label: 'Programmation', icon: '💻' },
    { id: 'converter', label: 'Convertisseur', icon: '🔄' },
    { id: 'financial', label: 'Financier', icon: '💰' },
    { id: 'statistics', label: 'Statistiques', icon: '💹' },
  ];

  return (
    <nav className="glass-card border-b border-white/10 shadow-2xl">
      <div className="flex items-center justify-between px-6 py-4">
        {/* Logo */}
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-indigo-500 via-purple-500 to-pink-500 flex items-center justify-center shadow-lg">
            <span className="text-2xl">🧮</span>
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
            Calculatrice Pro
          </h1>
        </div>

        {/* Modes - Navigation horizontale */}
        <div className="flex items-center gap-2">
          {modes.map((m) => (
            <button
              key={m.id}
              onClick={() => setMode(m.id)}
              className={`px-4 py-2 rounded-lg font-semibold text-sm flex items-center gap-2 transition-all duration-300 ${
                mode === m.id
                  ? 'bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 text-white shadow-lg scale-105'
                  : 'glass-card text-gray-700 dark:text-gray-200 hover:scale-105 hover:bg-white/10'
              }`}
            >
              <span className="text-lg">{m.icon}</span>
              <span className="hidden lg:inline">{m.label}</span>
            </button>
          ))}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <button
            onClick={toggleTheme}
            className="p-3 rounded-lg glass-card hover:scale-110 transition-all duration-300 hover:rotate-12"
            title={darkMode ? 'Mode clair' : 'Mode sombre'}
          >
            <span className="text-xl">{darkMode ? '🌙' : '☀️'}</span>
          </button>
          <button 
            onClick={onSettingsClick}
            className="p-3 rounded-lg glass-card hover:scale-110 transition-all duration-300 group"
            title="Paramètres"
          >
            <span className="text-xl group-hover:rotate-90 transition-transform duration-300 inline-block">⚙️</span>
          </button>
          <button 
            onClick={onInfoClick}
            className="p-3 rounded-lg glass-card hover:scale-110 transition-all duration-300 group"
            title="Informations"
          >
            <span className="text-xl group-hover:scale-125 transition-transform duration-300 inline-block">ℹ️</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Sidebar;
