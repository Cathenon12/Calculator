import React from 'react';

interface SidebarProps {
  mode: string;
  setMode: (mode: any) => void;
  darkMode: boolean;
  toggleTheme: () => void;
}

const Sidebar: React.FC<SidebarProps> = ({ mode, setMode, darkMode, toggleTheme }) => {
  const modes = [
    { id: 'basic', label: 'Basique', icon: '🔢' },
    { id: 'scientific', label: 'Scientifique', icon: '🔬' },
    { id: 'graph', label: 'Graphique', icon: '📊' },
    { id: 'programmer', label: 'Programmation', icon: '💻' },
    { id: 'converter', label: 'Convertisseur', icon: '🔄' },
    { id: 'financial', label: 'Financier', icon: '💰' },
    { id: 'statistics', label: 'Statistiques', icon: '📊' },
  ];

  return (
    <aside className="w-56 bg-white/95 dark:bg-[#0f0f23]/98 backdrop-blur-lg border-r border-gray-200 dark:border-gray-800 flex flex-col p-6 shadow-xl">
      <div className="flex justify-between items-center mb-8">
        <h2 className="text-xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
          Modes
        </h2>
        <button
          onClick={toggleTheme}
          className="p-2 rounded-xl bg-primary/10 hover:bg-primary/20 transition-all hover:rotate-12"
        >
          {darkMode ? '🌙' : '☀️'}
        </button>
      </div>

      <nav className="flex flex-col gap-2 flex-1">
        {modes.map((m) => (
          <button
            key={m.id}
            onClick={() => setMode(m.id)}
            className={`px-4 py-3 rounded-xl font-semibold text-sm flex items-center gap-3 transition-all ${
              mode === m.id
                ? 'bg-gradient-to-r from-primary to-accent text-white shadow-lg'
                : 'bg-gray-100 dark:bg-[#1a1a3f] text-gray-700 dark:text-gray-300 hover:translate-x-1'
            }`}
          >
            <span className="text-lg">{m.icon}</span>
            {m.label}
          </button>
        ))}
      </nav>

      <div className="flex gap-2 mt-auto">
        <button className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all">
          ⚙️
        </button>
        <button className="flex-1 p-3 rounded-xl bg-gray-100 dark:bg-[#1a1a3f] hover:bg-gradient-to-r hover:from-primary hover:to-accent hover:text-white transition-all">
          ℹ️
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
