# 🧮 Calculatrice Pro Avancée - React + TailwindCSS

Une calculatrice web moderne et professionnelle construite avec **React**, **TypeScript** et **TailwindCSS**.

## ✨ Caractéristiques

### 📊 6 Modes de Calcul
- **Basique** 🔢 - Opérations mathématiques simples
- **Scientifique** 🔬 - Trigonométrie, logarithmes, puissances
- **Programmation** 💻 - Conversions binaires (BIN, OCT, DEC, HEX)
- **Convertisseur** 🔄 - Longueur, masse, température
- **Financier** 💰 - Intérêts composés, prêts
- **Statistiques** 📊 - Moyenne, médiane, écart-type

### 🎨 Interface Moderne
- Design avec **TailwindCSS**
- Mode sombre/clair
- Animations fluides
- Responsive (mobile, tablet, desktop)
- Glassmorphism effects

## 🚀 Installation

```bash
cd calculator-react
npm install
npm start
```

L'application sera disponible sur `http://localhost:3000`

## 🛠️ Technologies

- **React 19** avec TypeScript
- **TailwindCSS 4** pour le styling
- **LocalStorage** pour la persistance
- **React Hooks** (useState, useEffect)

## 📁 Structure

```
calculator-react/
├── src/
│   ├── components/
│   │   ├── modes/
│   │   │   ├── BasicMode.tsx
│   │   │   ├── ScientificMode.tsx
│   │   │   ├── ProgrammerMode.tsx
│   │   │   ├── ConverterMode.tsx
│   │   │   ├── FinancialMode.tsx
│   │   │   └── StatisticsMode.tsx
│   │   ├── Sidebar.tsx
│   │   ├── Display.tsx
│   │   └── History.tsx
│   ├── App.tsx
│   ├── index.tsx
│   └── index.css
├── tailwind.config.js
└── package.json
```

## 🎯 Fonctionnalités

✅ Calculs en temps réel
✅ Historique des calculs (50 derniers)
✅ Thème persistant (dark/light)
✅ Conversions multiples
✅ Calculs financiers
✅ Analyses statistiques

## 📝 Scripts

```bash
npm start      # Démarrer en mode développement
npm build      # Build pour production
npm test       # Lancer les tests
```

## 🔐 Sécurité

- Calculs côté client
- Pas de connexion serveur requise
- Données stockées localement
- Totalement privé

---

**Version**: 3.0 (React + TailwindCSS)
**Dernière mise à jour**: Février 2026
