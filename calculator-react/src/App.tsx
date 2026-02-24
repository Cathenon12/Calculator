import React, { useState, useEffect } from 'react';
import Sidebar from './components/Sidebar';
import Display from './components/Display';
import BasicMode from './components/modes/BasicMode';
import ScientificMode from './components/modes/ScientificMode';
import GraphMode from './components/modes/GraphMode';
import ProgrammerMode from './components/modes/ProgrammerMode';
import ConverterMode from './components/modes/ConverterMode';
import FinancialMode from './components/modes/FinancialMode';
import StatisticsMode from './components/modes/StatisticsMode';
import History from './components/History';

type Mode = 'basic' | 'scientific' | 'graph' | 'programmer' | 'converter' | 'financial' | 'statistics';

function App() {
  const [mode, setMode] = useState<Mode>('basic');
  const [darkMode, setDarkMode] = useState(false);
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      setDarkMode(true);
      document.documentElement.classList.add('dark');
    }
  }, []);

  const toggleTheme = () => {
    setDarkMode(!darkMode);
    document.documentElement.classList.toggle('dark');
    localStorage.setItem('theme', !darkMode ? 'dark' : 'light');
  };

  const addToHistory = (calculation: string) => {
    setHistory(prev => [calculation, ...prev].slice(0, 50));
  };

  const handleCalculate = () => {
    try {
      const result = eval(display.replace(/×/g, '*').replace(/÷/g, '/'));
      addToHistory(`${display} = ${result}`);
      setDisplay(String(result));
    } catch {
      setDisplay('Erreur');
    }
  };

  return (
    <div className="flex h-screen">
      <Sidebar mode={mode} setMode={setMode} darkMode={darkMode} toggleTheme={toggleTheme} />
      
      <main className="flex-1 flex flex-col bg-white/95 dark:bg-[#0f0f23]/95 backdrop-blur-lg">
        <header className="px-8 py-6 border-b border-gray-200 dark:border-gray-800 bg-white/70 dark:bg-[#1a1a3f]/70 backdrop-blur-lg">
          <h1 className="text-3xl font-bold bg-gradient-to-r from-primary to-accent bg-clip-text text-transparent">
            Calculatrice Pro
          </h1>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col p-4">
            <Display value={display} onChange={setDisplay} onEnter={handleCalculate} />
            
            <div className="flex-1 overflow-y-auto p-4">
              {mode === 'basic' && <BasicMode display={display} setDisplay={setDisplay} addToHistory={addToHistory} />}
              {mode === 'scientific' && <ScientificMode display={display} setDisplay={setDisplay} addToHistory={addToHistory} />}
              {mode === 'graph' && <GraphMode display={display} setDisplay={setDisplay} addToHistory={addToHistory} />}
              {mode === 'programmer' && <ProgrammerMode display={display} setDisplay={setDisplay} addToHistory={addToHistory} />}
              {mode === 'converter' && <ConverterMode />}
              {mode === 'financial' && <FinancialMode />}
              {mode === 'statistics' && <StatisticsMode />}
            </div>
          </div>

          <History history={history} setDisplay={setDisplay} />
        </div>
      </main>
    </div>
  );
}

export default App;
