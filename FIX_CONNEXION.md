# 🔧 SOLUTION - Erreur de connexion au cerveau IA

## ✅ PROBLÈME RÉSOLU

L'erreur venait de :
1. ❌ URL incorrecte (port 3000 au lieu de 5000)
2. ❌ Dépendances manquantes
3. ❌ Backend non démarré

## 🚀 SOLUTION RAPIDE

### Méthode 1 : Script automatique (RECOMMANDÉ)

```bash
cd /home/cathenon/Desktop/Project/Calculator
./start.sh
```

Ouvrez http://localhost:5173

### Méthode 2 : Manuel

**Terminal 1 - Backend:**
```bash
cd /home/cathenon/Desktop/Project/Calculator/backend
npm run dev
```

**Terminal 2 - Frontend:**
```bash
cd /home/cathenon/Desktop/Project/Calculator/calculator-react
npm start
```

## ✅ CE QUI A ÉTÉ CORRIGÉ

1. ✅ URL API changée de `localhost:3000` → `localhost:5000`
2. ✅ Dépendances installées (axios, multer, form-data)
3. ✅ Message d'erreur amélioré
4. ✅ Scripts de démarrage créés

## 🧪 TESTER

1. Lancez `./start.sh`
2. Ouvrez http://localhost:5173
3. Mode Scientifique → 🧠 IA Cerveau
4. Tapez: "Résoudre x² + 5x + 6 = 0"
5. Cliquez sur "🚀 Analyser avec l'IA"
6. Attendez 3 secondes
7. Voir la réponse !

## 🛑 ARRÊTER

```bash
./stop.sh
```

## 📝 VÉRIFICATIONS

### Backend fonctionne ?
```bash
curl http://localhost:5000/api/health
```

Réponse attendue: `{"status":"OK","message":"Serveur actif"}`

### Frontend fonctionne ?
Ouvrir http://localhost:5173

## 🐛 SI ÇA NE MARCHE TOUJOURS PAS

### Erreur: Port déjà utilisé
```bash
# Tuer les processus sur le port 5000
lsof -ti:5000 | xargs kill -9

# Tuer les processus sur le port 5173
lsof -ti:5173 | xargs kill -9
```

### Erreur: Module non trouvé
```bash
cd backend
npm install
cd ../calculator-react
npm install
```

### Voir les logs
```bash
# Backend
tail -f backend.log

# Frontend
tail -f frontend.log
```

## 📊 ARCHITECTURE CORRIGÉE

```
Frontend (React)          Backend (Express)
Port 5173                 Port 5000
    │                          │
    │  POST /api/ai/process    │
    └──────────────────────────┘
              │
              ▼
        AI Simulator
     (Mode test actif)
```

## ✨ MAINTENANT ÇA MARCHE !

- ✅ Backend sur port 5000
- ✅ Frontend sur port 5173
- ✅ API IA fonctionnelle
- ✅ Mode test actif
- ✅ Scripts de démarrage

**Lancez `./start.sh` et testez ! 🚀**
