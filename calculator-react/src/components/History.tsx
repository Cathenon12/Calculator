import React from 'react';

interface HistoryProps {
  history: string[];
  setDisplay: (value: string) => void;
}

const History: React.FC<HistoryProps> = ({ history, setDisplay }) => {
  return (
    <aside className="w-64 bg-white/90 dark:bg-[#0f0f23]/90 backdrop-blur-lg border-l border-gray-200 dark:border-gray-800 p-4 overflow-y-auto">
      <h3 className="text-lg font-bold mb-4 text-gray-800 dark:text-gray-200">Historique</h3>
      <div className="space-y-2">
        {history.length === 0 ? (
          <p className="text-sm text-gray-500 dark:text-gray-400">Aucun calcul</p>
        ) : (
          history.map((item, index) => (
            <div
              key={index}
              onClick={() => setDisplay(item.split('=')[1]?.trim() || item)}
              className="p-3 bg-gray-100 dark:bg-[#1a1a3f] rounded-lg text-sm cursor-pointer hover:bg-primary/10 transition-all"
            >
              <p className="text-gray-700 dark:text-gray-300 break-words">{item}</p>
            </div>
          ))
        )}
      </div>
    </aside>
  );
};

export default History;
