# 🧠 Cerveau IA - Documentation

## Vue d'ensemble

Le **Cerveau IA** est une fonctionnalité avancée intégrée dans le mode scientifique de la calculatrice. Il permet aux utilisateurs de :

- ✍️ Poser des questions mathématiques en langage naturel
- 📸 Envoyer des images de problèmes mathématiques
- ⚡ Obtenir des réponses en 3 secondes
- 🎯 Résoudre automatiquement les équations

## Fonctionnalités

### 1. Questions en Langage Naturel

Posez vos questions comme vous parleriez à un professeur :

**Exemples :**
- "Résoudre x² + 5x + 6 = 0"
- "Calculer la dérivée de sin(x) * cos(x)"
- "Quelle est l'intégrale de e^x ?"
- "Factoriser x³ - 8"
- "Calculer la limite de (sin x)/x quand x tend vers 0"

### 2. Analyse d'Images

Envoyez une photo de :
- ✓ Équations écrites à la main
- ✓ Graphiques et diagrammes
- ✓ Problèmes de géométrie
- ✓ Tableaux de données
- ✓ Exercices de manuels scolaires

### 3. Traitement Rapide

- ⏱️ Analyse en **3 secondes**
- 🔄 Traitement en temps réel
- 📊 Résultats détaillés étape par étape

## Installation

### 1. Installer les dépendances backend

```bash
cd backend
npm install
```

Nouvelles dépendances ajoutées :
- `axios` - Pour les appels API
- `multer` - Pour l'upload d'images
- `form-data` - Pour l'envoi de données multipart

### 2. Configuration de l'API IA

Éditez le fichier `backend/.env` :

```env
# Choisir le provider : 'openai' ou 'claude'
AI_PROVIDER=openai

# Pour OpenAI GPT-4 Vision
OPENAI_API_KEY=sk-votre_clé_ici

# OU pour Claude (Anthropic)
CLAUDE_API_KEY=sk-ant-votre_clé_ici
```

### 3. Obtenir une clé API

#### Option A : OpenAI (GPT-4 Vision)
1. Allez sur https://platform.openai.com/
2. Créez un compte
3. Générez une clé API
4. Copiez-la dans `.env`

#### Option B : Claude (Anthropic)
1. Allez sur https://console.anthropic.com/
2. Créez un compte
3. Générez une clé API
4. Copiez-la dans `.env`

#### Option C : Mode Test (Sans API)
Laissez les clés commentées pour utiliser le mode simulation.

## Utilisation

### 1. Démarrer le backend

```bash
cd backend
npm run dev
```

Le serveur démarre sur `http://localhost:5000`

### 2. Démarrer le frontend

```bash
cd calculator-react
npm start
```

L'application s'ouvre sur `http://localhost:5173`

### 3. Utiliser le Cerveau IA

1. Cliquez sur **Mode Scientifique** dans la sidebar
2. Sélectionnez l'onglet **🧠 IA Cerveau**
3. Tapez votre question OU uploadez une image
4. Cliquez sur **🚀 Analyser avec l'IA**
5. Attendez 3 secondes
6. Consultez la réponse détaillée

## Exemples d'utilisation

### Exemple 1 : Équation du second degré

**Question :**
```
Résoudre x² - 5x + 6 = 0
```

**Réponse attendue :**
```
Résolution de l'équation x² - 5x + 6 = 0

Étape 1: Identification
- a = 1, b = -5, c = 6

Étape 2: Calcul du discriminant
Δ = b² - 4ac = 25 - 24 = 1

Étape 3: Solutions
x₁ = (5 + 1) / 2 = 3
x₂ = (5 - 1) / 2 = 2

Résultat: x = 2 ou x = 3
```

### Exemple 2 : Dérivée

**Question :**
```
Calculer la dérivée de f(x) = x³ + 2x² - 5x + 1
```

**Réponse attendue :**
```
Dérivée de f(x) = x³ + 2x² - 5x + 1

Application des règles:
- (x³)' = 3x²
- (2x²)' = 4x
- (-5x)' = -5
- (1)' = 0

Résultat: f'(x) = 3x² + 4x - 5
```

### Exemple 3 : Image d'équation

1. Prenez une photo d'une équation écrite
2. Uploadez l'image
3. L'IA reconnaît et résout automatiquement

## Architecture Technique

```
Frontend (React)
    ↓
AIBrain Component
    ↓
API Request (FormData)
    ↓
Backend Express
    ↓
AI Router (/api/ai/process)
    ↓
OpenAI/Claude API
    ↓
Response Processing
    ↓
Result Display
```

## API Endpoints

### POST /api/ai/process

**Request:**
```javascript
FormData {
  question: string,
  image?: File
}
```

**Response:**
```json
{
  "answer": "Réponse détaillée...",
  "result": "42",
  "processingTime": "3s"
}
```

## Sécurité

- 🔒 Les clés API sont stockées dans `.env` (non versionné)
- 🗑️ Les images uploadées sont supprimées après traitement
- ⚠️ Ne partagez jamais vos clés API
- 🔐 Utilisez HTTPS en production

## Limitations

- 📏 Taille max d'image : 10 MB
- ⏱️ Timeout : 30 secondes
- 💰 Coût selon l'API utilisée (OpenAI/Claude)
- 🌐 Nécessite une connexion internet

## Dépannage

### Erreur : "Erreur de connexion au cerveau IA"
- Vérifiez que le backend est démarré
- Vérifiez l'URL de l'API dans le code

### Erreur : "API Key invalide"
- Vérifiez votre clé dans `.env`
- Assurez-vous d'avoir des crédits sur votre compte

### Erreur : "Timeout"
- Vérifiez votre connexion internet
- Réduisez la taille de l'image

## Améliorations futures

- [ ] Support de LaTeX dans les réponses
- [ ] Historique des questions IA
- [ ] Export des solutions en PDF
- [ ] Mode vocal (speech-to-text)
- [ ] Graphiques interactifs
- [ ] Support multilingue

## Support

Pour toute question ou problème :
1. Consultez cette documentation
2. Vérifiez les logs du serveur
3. Testez en mode simulation (sans API)

---

**Version:** 1.0  
**Dernière mise à jour:** 2024  
**Auteur:** Calculator Pro Team
