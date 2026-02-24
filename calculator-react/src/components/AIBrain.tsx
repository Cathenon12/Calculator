import React, { useState } from 'react';

interface AIBrainProps {
  onResult: (result: string) => void;
}

const AIBrain: React.FC<AIBrainProps> = ({ onResult }) => {
  const [question, setQuestion] = useState('');
  const [image, setImage] = useState<File | null>(null);
  const [loading, setLoading] = useState(false);
  const [response, setResponse] = useState('');
  const [imagePreview, setImagePreview] = useState<string>('');

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const processWithAI = async () => {
    setLoading(true);
    setResponse('');

    try {
      const formData = new FormData();
      formData.append('question', question);
      if (image) {
        formData.append('image', image);
      }

      const res = await fetch('http://localhost:5000/api/ai/process', {
        method: 'POST',
        body: formData,
      });

      if (!res.ok) {
        throw new Error('Erreur serveur');
      }

      const data = await res.json();
      
      setTimeout(() => {
        setResponse(data.answer);
        if (data.result) {
          onResult(data.result);
        }
        setLoading(false);
      }, 3000);
    } catch (error) {
      console.error('Erreur:', error);
      setResponse('⚠️ Backend non démarré. Lancez: cd backend && npm run dev');
      setLoading(false);
    }
  };

  return (
    <div className="space-y-4">
      {/* Zone de question */}
      <div className="bg-gradient-to-r from-purple-50 to-blue-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h3 className="font-bold text-lg mb-3 flex items-center gap-2">
          🧠 Cerveau IA Mathématique
        </h3>
        
        <textarea
          value={question}
          onChange={(e) => setQuestion(e.target.value)}
          placeholder="Posez votre question mathématique... Ex: Résoudre x² + 5x + 6 = 0"
          className="w-full p-3 rounded-lg border-2 border-purple-200 dark:border-gray-600 dark:bg-gray-800 dark:text-white resize-none focus:border-purple-400 outline-none"
          rows={3}
        />
      </div>

      {/* Upload d'image */}
      <div className="bg-gradient-to-r from-blue-50 to-indigo-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl">
        <h4 className="font-semibold mb-2 flex items-center gap-2">
          📸 Envoyer une image
        </h4>
        
        <label className="flex items-center justify-center w-full p-4 border-2 border-dashed border-blue-300 dark:border-gray-600 rounded-lg cursor-pointer hover:bg-blue-100 dark:hover:bg-gray-600 transition-all">
          <input
            type="file"
            accept="image/*"
            onChange={handleImageUpload}
            className="hidden"
          />
          <span className="text-sm text-gray-600 dark:text-gray-300">
            {image ? '✓ Image chargée' : '📁 Cliquez pour charger une image'}
          </span>
        </label>

        {imagePreview && (
          <div className="mt-3">
            <img
              src={imagePreview}
              alt="Preview"
              className="max-h-40 rounded-lg mx-auto border-2 border-purple-200"
            />
          </div>
        )}
      </div>

      {/* Bouton de traitement */}
      <button
        onClick={processWithAI}
        disabled={loading || (!question && !image)}
        className={`w-full py-4 rounded-xl font-bold text-white transition-all ${
          loading
            ? 'bg-gray-400 cursor-not-allowed'
            : 'bg-gradient-to-r from-purple-500 to-blue-500 hover:from-purple-600 hover:to-blue-600 shadow-lg hover:shadow-xl transform hover:scale-105'
        }`}
      >
        {loading ? (
          <span className="flex items-center justify-center gap-2">
            <span className="animate-spin">⚙️</span>
            Traitement en cours... (3s)
          </span>
        ) : (
          '🚀 Analyser avec l\'IA'
        )}
      </button>

      {/* Réponse */}
      {response && (
        <div className="bg-gradient-to-r from-green-50 to-emerald-50 dark:from-gray-800 dark:to-gray-700 p-4 rounded-xl animate-slide-in">
          <h4 className="font-bold mb-2 flex items-center gap-2">
            💡 Réponse de l'IA
          </h4>
          <div className="text-sm text-gray-700 dark:text-gray-200 whitespace-pre-wrap">
            {response}
          </div>
        </div>
      )}
    </div>
  );
};

export default AIBrain;
