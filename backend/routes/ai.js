const express = require('express');
const router = express.Router();
const multer = require('multer');
const axios = require('axios');
const FormData = require('form-data');
const fs = require('fs');
const { simulateAIResponse } = require('../utils/aiSimulator');

const upload = multer({ dest: 'uploads/' });

// Configuration API (OpenAI ou Claude)
const AI_API_KEY = process.env.OPENAI_API_KEY || process.env.CLAUDE_API_KEY;
const AI_PROVIDER = process.env.AI_PROVIDER || 'test';

// Traitement avec OpenAI GPT-4 Vision
async function processWithOpenAI(question, imagePath) {
  const messages = [
    {
      role: 'system',
      content: 'Tu es un expert en mathématiques. Résous les problèmes étape par étape et fournis le résultat final. Si une image est fournie, analyse-la et résous le problème mathématique.'
    },
    {
      role: 'user',
      content: question
    }
  ];

  if (imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    messages[1].content = [
      { type: 'text', text: question || 'Résous ce problème mathématique' },
      { type: 'image_url', image_url: { url: `data:image/jpeg;base64,${base64Image}` } }
    ];
  }

  const response = await axios.post(
    'https://api.openai.com/v1/chat/completions',
    {
      model: 'gpt-4-vision-preview',
      messages: messages,
      max_tokens: 1000
    },
    {
      headers: {
        'Authorization': `Bearer ${AI_API_KEY}`,
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.choices[0].message.content;
}

// Traitement avec Claude (Anthropic)
async function processWithClaude(question, imagePath) {
  const messages = [
    {
      role: 'user',
      content: question || 'Résous ce problème mathématique'
    }
  ];

  if (imagePath) {
    const imageBuffer = fs.readFileSync(imagePath);
    const base64Image = imageBuffer.toString('base64');
    messages[0].content = [
      { type: 'text', text: question || 'Résous ce problème mathématique' },
      { type: 'image', source: { type: 'base64', media_type: 'image/jpeg', data: base64Image } }
    ];
  }

  const response = await axios.post(
    'https://api.anthropic.com/v1/messages',
    {
      model: 'claude-3-opus-20240229',
      max_tokens: 1024,
      messages: messages
    },
    {
      headers: {
        'x-api-key': AI_API_KEY,
        'anthropic-version': '2023-06-01',
        'Content-Type': 'application/json'
      }
    }
  );

  return response.data.content[0].text;
}

// Extraire le résultat numérique de la réponse
function extractResult(text) {
  const patterns = [
    /résultat[:\s]+([+-]?\d+\.?\d*)/i,
    /réponse[:\s]+([+-]?\d+\.?\d*)/i,
    /=\s*([+-]?\d+\.?\d*)/,
    /([+-]?\d+\.?\d*)$/
  ];

  for (const pattern of patterns) {
    const match = text.match(pattern);
    if (match) return match[1];
  }
  return null;
}

// Route principale
router.post('/process', upload.single('image'), async (req, res) => {
  try {
    const { question } = req.body;
    const imagePath = req.file?.path;

    if (!question && !imagePath) {
      return res.status(400).json({ error: 'Question ou image requise' });
    }

    let answer;
    
    // Traitement selon le provider
    if (AI_PROVIDER === 'openai' && AI_API_KEY) {
      answer = await processWithOpenAI(question, imagePath);
    } else if (AI_PROVIDER === 'claude' && AI_API_KEY) {
      answer = await processWithClaude(question, imagePath);
    } else {
      // Mode simulation
      const simResult = simulateAIResponse(question, !!imagePath);
      answer = simResult.answer;
      result = simResult.result;
    }

    if (!result) {
      result = extractResult(answer);
    }

    // Nettoyage
    if (imagePath) {
      fs.unlinkSync(imagePath);
    }

    res.json({
      answer,
      result,
      processingTime: '3s'
    });

  } catch (error) {
    console.error('Erreur IA:', error);
    res.status(500).json({ 
      error: 'Erreur de traitement',
      message: error.message 
    });
  }
});

module.exports = router;
