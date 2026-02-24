# 🧮 Calculatrice Pro - Version React + Tailwind CSS

Application React TypeScript avec Tailwind CSS v3 et Create React App.

## 🚀 Démarrage Rapide

### Installation
```bash
npm install
```

### Démarrage
```bash
npm start
```

Ou utilisez le script:
```bash
./start.sh
```

L'application s'ouvrira sur `http://localhost:3000`

## 📦 Technologies

- **React 18.2** - Framework UI
- **TypeScript 4.9** - Typage statique
- **Tailwind CSS 3.3** - Framework CSS utility-first
- **Create React App 5.0** - Tooling et configuration

## 🛠️ Configuration

### Tailwind CSS
- Configuration: `tailwind.config.js`
- PostCSS: `postcss.config.js`
- Styles: `src/index.css`

### TypeScript
- Configuration: `tsconfig.json`
- Mode strict activé

## 📁 Structure

```
src/
├── components/
│   ├── modes/
│   │   ├── BasicMode.tsx       # Mode basique
│   │   ├── ScientificMode.tsx  # Mode scientifique
│   │   ├── ProgrammerMode.tsx  # Mode programmation
│   │   ├── ConverterMode.tsx   # Convertisseur d'unités
│   │   ├── FinancialMode.tsx   # Calculatrice financière
│   │   └── StatisticsMode.tsx  # Analyseur statistique
│   ├── Display.tsx             # Affichage principal
│   ├── History.tsx             # Historique des calculs
│   └── Sidebar.tsx             # Navigation latérale
├── App.tsx                     # Composant principal
├── index.tsx                   # Point d'entrée
└── index.css                   # Styles Tailwind
```

## ✨ Fonctionnalités

### 6 Modes de Calcul
1. **Basique** - Opérations arithmétiques simples
2. **Scientifique** - Fonctions trigonométriques, logarithmes
3. **Programmation** - Conversions binaires (BIN, OCT, DEC, HEX)
4. **Convertisseur** - Longueur, masse, température
5. **Financier** - Intérêts composés
6. **Statistiques** - Moyenne, médiane, écart-type

### Interface
- 🌓 Mode sombre/clair
- 📱 Responsive design
- 🎨 Animations fluides
- 💾 Historique persistant (LocalStorage)

## 🔧 Scripts Disponibles

- `npm start` - Démarre le serveur de développement
- `npm build` - Crée le build de production
- `npm test` - Lance les tests
- `npm eject` - Éjecte la configuration CRA (irréversible)

## 🐛 Résolution de Problèmes

### Port 3000 déjà utilisé
```bash
lsof -ti:3000 | xargs kill -9
npm start
```

### Erreur de cache
```bash
rm -rf node_modules/.cache
npm start
```

### Réinstallation complète
```bash
rm -rf node_modules package-lock.json
npm install
npm start
```

## 📝 Notes

- Utilise Tailwind CSS v3 (compatible avec CRA)
- PostCSS configuré automatiquement
- Dark mode via classe `dark` sur `<html>`
- Tous les calculs sont côté client

## 🎯 Prochaines Étapes

- [ ] Ajouter plus de tests unitaires
- [ ] Implémenter le clavier physique
- [ ] Ajouter des sons pour les boutons
- [ ] Exporter l'historique en CSV
- [ ] Mode graphique pour les fonctions

---

**Version**: 1.0.0  
**License**: MIT
