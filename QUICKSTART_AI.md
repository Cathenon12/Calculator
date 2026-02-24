# 🚀 Démarrage Rapide - Cerveau IA

## Installation Express (3 minutes)

### Étape 1 : Installer les dépendances

```bash
# Méthode automatique
./install-ai.sh

# OU méthode manuelle
cd backend
npm install axios multer form-data
mkdir uploads
cd ..
```

### Étape 2 : Configurer l'API (Optionnel)

Éditez `backend/.env` :

```env
# Pour utiliser OpenAI
AI_PROVIDER=openai
OPENAI_API_KEY=sk-votre_clé_ici

# OU pour utiliser Claude
AI_PROVIDER=claude
CLAUDE_API_KEY=sk-ant-votre_clé_ici

# OU laissez vide pour le mode test
AI_PROVIDER=test
```

### Étape 3 : Démarrer l'application

**Terminal 1 - Backend:**
```bash
cd backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd calculator-react
npm start
```

### Étape 4 : Utiliser le Cerveau IA

1. Ouvrez http://localhost:5173
2. Cliquez sur **Mode Scientifique**
3. Sélectionnez **🧠 IA Cerveau**
4. Posez votre question ou uploadez une image
5. Cliquez sur **🚀 Analyser avec l'IA**

## Exemples de Questions

### Algèbre
```
Résoudre x² + 5x + 6 = 0
Factoriser x³ - 27
Simplifier (x² - 4) / (x - 2)
```

### Analyse
```
Calculer la dérivée de sin(x) * cos(x)
Intégrer x² + 2x + 1
Limite de (sin x)/x quand x → 0
```

### Géométrie
```
Aire d'un cercle de rayon 5
Volume d'une sphère de rayon 3
Théorème de Pythagore pour a=3, b=4
```

### Probabilités
```
Probabilité de tirer un as dans un jeu de 52 cartes
Espérance d'un dé à 6 faces
Variance de [1, 2, 3, 4, 5]
```

## Mode Test (Sans API)

Si vous n'avez pas de clé API, le mode test fonctionne automatiquement :
- ✓ Simule une réponse IA
- ✓ Délai de 3 secondes
- ✓ Parfait pour tester l'interface

## Obtenir une Clé API

### OpenAI (Recommandé)
1. https://platform.openai.com/signup
2. Créer un compte
3. Ajouter un moyen de paiement
4. Générer une clé API
5. Coût : ~$0.01 par question

### Claude (Alternative)
1. https://console.anthropic.com/
2. Créer un compte
3. Générer une clé API
4. Coût : ~$0.015 par question

## Dépannage Rapide

### Le backend ne démarre pas
```bash
cd backend
npm install
npm run dev
```

### Le frontend ne se connecte pas
Vérifiez que le backend tourne sur http://localhost:5000

### Erreur "API Key invalide"
- Vérifiez votre clé dans `backend/.env`
- Assurez-vous d'avoir des crédits

### L'image ne s'upload pas
- Vérifiez que le dossier `backend/uploads/` existe
- Taille max : 10 MB

## Fonctionnalités

✅ Questions en langage naturel  
✅ Upload et analyse d'images  
✅ Réponse en 3 secondes  
✅ Résolution étape par étape  
✅ Support de toutes les branches mathématiques  
✅ Mode sombre/clair  
✅ Historique des calculs  

## Architecture

```
┌─────────────────┐
│   React App     │
│  (Port 5173)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  Express API    │
│  (Port 5000)    │
└────────┬────────┘
         │
         ▼
┌─────────────────┐
│  OpenAI/Claude  │
│   Vision API    │
└─────────────────┘
```

## Prochaines Étapes

📖 Lisez la documentation complète : `AI_BRAIN_DOCS.md`  
🧪 Testez avec différentes questions  
📸 Essayez l'upload d'images  
⚙️ Personnalisez les paramètres  

---

**Besoin d'aide ?** Consultez `AI_BRAIN_DOCS.md`
