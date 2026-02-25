import React from 'react';

interface StepByStepProps {
  steps: string;
  title?: string;
}

const StepByStepDemo: React.FC<StepByStepProps> = ({ steps, title = "Démonstration du professeur" }) => {
  if (!steps) return null;

  return (
    <div className="mt-4 p-5 glass-card backdrop-blur-sm animate-fade-in">
      <div className="text-white/90 text-sm mb-3 font-semibold flex items-center gap-2">
        <span className="text-2xl">🎓</span>
        <span className="bg-gradient-to-r from-pink-400 to-purple-500 bg-clip-text text-transparent">
          {title}
        </span>
      </div>
      <div className="text-white/95 text-sm font-mono whitespace-pre-wrap leading-relaxed bg-black/30 p-4 rounded-lg max-h-96 overflow-y-auto custom-scrollbar border border-white/10">
        {steps}
      </div>
    </div>
  );
};

export default StepByStepDemo;
