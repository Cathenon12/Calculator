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
import SettingsModal from './components/SettingsModal';
import InfoModal from './components/InfoModal';


type Mode = 'basic' | 'scientific' | 'graph' | 'programmer' | 'converter' | 'financial' | 'statistics';

function App() {
  const [mode, setMode] = useState<Mode>('basic');
  const [darkMode, setDarkMode] = useState(false);
  const [display, setDisplay] = useState('0');
  const [history, setHistory] = useState<string[]>([]);
  const [calculationDetails, setCalculationDetails] = useState('');
  const [showSettings, setShowSettings] = useState(false);
  const [showInfo, setShowInfo] = useState(false);

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
      const expression = display.replace(/×/g, '*').replace(/÷/g, '/');
      const result = eval(expression);
      const steps = generateCalculationSteps(display, expression, result);
      
      setCalculationDetails(steps);
      addToHistory(`${display} = ${result}`);
      setDisplay(String(result));
    } catch (error) {
      setCalculationDetails(`❌ Erreur: ${error instanceof Error ? error.message : 'Calcul invalide'}`);
      setDisplay('Erreur');
    }
  };

  const generateCalculationSteps = (original: string, expression: string, result: any): string => {
    let steps = 'DEMONSTRATION DU CALCUL\n';
    steps += '='.repeat(40) + '\n\n';
    
    steps += 'Etape 1: Probleme donne\n';
    steps += `   ${original}\n\n`;
    
    if (original !== expression) {
      steps += 'Etape 2: Conversion des symboles\n';
      steps += `   ${original}\n`;
      steps += `   -> ${expression}\n\n`;
    }
    
    const parts = expression.match(/\d+\.?\d*|[+\-*/()]/g) || [];
    
    if (parts.length > 1) {
      steps += 'Etape 3: Analyse de l\'expression\n';
      
      const operations = [];
      for (let i = 0; i < parts.length; i++) {
        if (['+', '-', '*', '/'].includes(parts[i])) {
          const left = parts[i-1];
          const op = parts[i];
          const right = parts[i+1];
          const opName = {
            '+': 'Addition',
            '-': 'Soustraction', 
            '*': 'Multiplication',
            '/': 'Division'
          }[op];
          operations.push(`   ${opName}: ${left} ${op} ${right}`);
        }
      }
      
      if (operations.length > 0) {
        steps += operations.join('\n') + '\n\n';
      }
      
      if (expression.includes('*') || expression.includes('/')) {
        steps += 'Etape 4: Priorite des operations\n';
        steps += '   Regle: x et / avant + et -\n';
        
        const multDivRegex = /(\d+\.?\d*)\s*([*/])\s*(\d+\.?\d*)/;
        let tempExpr = expression;
        let stepNum = 1;
        
        while (multDivRegex.test(tempExpr)) {
          const match = tempExpr.match(multDivRegex);
          if (match) {
            const [full, a, op, b] = match;
            const subResult = op === '*' ? parseFloat(a) * parseFloat(b) : parseFloat(a) / parseFloat(b);
            steps += `   ${stepNum}. ${a} ${op} ${b} = ${subResult}\n`;
            tempExpr = tempExpr.replace(full, String(subResult));
            stepNum++;
          }
        }
        
        if (tempExpr !== expression) {
          steps += `   -> ${tempExpr}\n\n`;
        }
      }
    }
    
    steps += 'Etape finale: Resultat\n';
    steps += `   ${expression} = ${result}\n\n`;
    
    steps += '='.repeat(40) + '\n';
    steps += `REPONSE: ${result}`;
    
    return steps;
  };

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      <Sidebar 
        mode={mode} 
        setMode={setMode} 
        darkMode={darkMode} 
        toggleTheme={toggleTheme}
        onSettingsClick={() => setShowSettings(true)}
        onInfoClick={() => setShowInfo(true)}
      />
      
      <main className="flex-1 flex flex-col bg-transparent overflow-hidden">
        <header className="px-8 py-4 glass-card border-b border-white/10 backdrop-blur-xl">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-indigo-400 via-purple-400 to-pink-400 bg-clip-text text-transparent">
                {mode === 'basic' ? 'Mode Basique' :
                 mode === 'scientific' ? 'Mode Scientifique' :
                 mode === 'graph' ? 'Mode Graphique' :
                 mode === 'programmer' ? 'Mode Programmation' :
                 mode === 'converter' ? 'Convertisseur d\'Unités' :
                 mode === 'financial' ? 'Calculatrice Financière' :
                 'Statistiques & Trading'}
              </h1>
              <p className="text-sm text-white/60 mt-1">Calculs avancés et analyses professionnelles</p>
            </div>
            <div className="flex items-center gap-3">
              <div className="px-4 py-2 rounded-full glass-card text-sm text-white/80 flex items-center gap-2">
                <span className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></span>
                En ligne
              </div>
            </div>
          </div>
        </header>

        <div className="flex-1 flex overflow-hidden">
          <div className="flex-1 flex flex-col p-4 overflow-y-auto custom-scrollbar">
            {mode !== 'financial' && mode !== 'statistics' && (
              <Display value={display} onChange={setDisplay} onEnter={handleCalculate} details={calculationDetails} mode={mode} />
            )}
            
            <div className="flex-1 p-4">
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

      <SettingsModal isOpen={showSettings} onClose={() => setShowSettings(false)} />
      <InfoModal isOpen={showInfo} onClose={() => setShowInfo(false)} />
    </div>
  );
}

export default App;
