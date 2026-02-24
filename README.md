# 🧮 Calculatrice Pro Avancée

Une calculatrice web professionnelle et moderne avec 6 modes différents, interface sombre/claire, et fonctionnalités complètes pour tous types de calculs.

## ✨ Caractéristiques

### 📊 6 Modes de Calcul

#### 1. **Mode Basique** 🔢
- Opérations mathématiques simples (+, -, ×, ÷)
- Fonctions rapides (pourcentage, racine carrée, carré)
- Interface épurée et intuitive

#### 2. **Mode Scientifique** 🔬
- **Trigonométrie**: sin, cos, tan + fonctions inverses (asin, acos, atan)
- **Logarithmes**: ln, log, log₂
- **Puissances**: x², x³, xʸ, factorielle
- **Fonctions**: √, ∛, 1/x, eˣ
- **Modes d'angles**: Degrés, Radians, Grades
- **Constantes**: π, e

#### 3. **Mode Programmation** 💻
- **Conversions de bases** en temps réel:
  - Binaire (2)
  - Octal (8)
  - Décimal (10)
  - Hexadécimal (16)
- **Opérations binaires**:
  - AND, OR, XOR, NOT
  - Décalage gauche (<<), décalage droit (>>)
- Affichage simultané dans tous les formats

#### 4. **Convertisseur d'Unités** 🔄
**Types supportés:**
- Longueur: m, km, cm, mm, mi, yd, ft, in
- Masse: kg, g, mg, t, lb, oz
- Volume: m³, l, ml, gal, pt
- Vitesse: m/s, km/h, mph, nœud
- Surface: m², km², cm², ha, mi², ft², acre
- Température: °C, °F, K

#### 5. **Calculatrice Financière** 💰
- **Intérêt composé**: Capital, taux, années → montant final
- **Prêt/Hypothèque**: Calcul des mensualités et intérêts
- **TVA**: Calcul automatique HT ↔ TTC

#### 6. **Analyseur Statistique** 📊
- Somme, moyenne, médiane
- Min/Max
- Écart-type & variance
- Support pour listes de nombres

## 🎨 Interface

### Thèmes
- 🌞 **Mode Clair**: Design épuré et professionnel
- 🌙 **Mode Sombre**: Réduction de la fatigue oculaire

### Navigation
- Sidebar avec raccourcis rapides
- Panneau d'historique persistant
- Horloge en temps réel

## ⌨️ Clavier Support

| Touche | Action |
|--------|--------|
| `0-9` | Chiffres |
| `+`, `-`, `*`, `/` | Opérateurs |
| `Enter` ou `=` | Résultat |
| `Backspace` | Supprimer |
| `Escape` | Effacer tout |
| `.` | Point décimal |

## ⚙️ Paramètres

- ✓ Activer/Désactiver les sons
- ✓ Animations (marche/arrêt)
- ✓ Précision décimale (0-15 chiffres)
- ✓ Séparateur de milliers (aucun/espace/virgule)

## 💾 Stockage

- **Historique**: Jusqu'à 50 derniers calculs sauvegardés
- **Paramètres**: Préférences utilisateur
- **Thème**: Choix persistant (clair/sombre)

## 🚀 Utilisation

1. Ouvrez `index.html` dans votre navigateur
2. Choisissez le mode désiré via la sidebar
3. Effectuez vos calculs
4. Consultez l'historique à droite
5. Personnalisez via les paramètres ⚙️

## 📁 Structure des Fichiers

```
Calculator/
├── index.html      # Structure HTML
├── style.css       # Styles CSS (thème clair/sombre)
├── script.js       # Logique JavaScript
├── README.md       # Documentation
└── TODO.md         # Tâches en cours
```

## 🛠️ Technologies

- **HTML5**: Structure sémantique
- **CSS3**: Flexbox, Grid, Variables CSS
- **JavaScript ES6+**: Classe Calculator, LocalStorage
- **SVG**: Icônes (soleil/lune pour thème)

## 📋 Fonctionnalités Avancées

### Conversion Intelligente
- Support des bases multiples
- Affichage simultané (BIN, OCT, DEC, HEX)
- Input hexadécimal

### Calculs Spécialisés
- Intérêti composés avec formules financières
- Statistiques avancées
- Conversions d'unités précises

### Expérience Utilisateur
- Réponse instantanée aux clics
- Historique cliquable
- Affichage secondaire pour opérations
- Messages d'erreur clairs

## 🎯 Cas d'Usage

✅ Étudiants en mathématiques/physique/finance
✅ Programmeurs (conversions binaires)
✅ Professionnels (calculs financiers)
✅ Tous les utilisateurs (calculs généraux)

## 📝 Notes

- Les calculs sont effectués côté client (pas de serveur)
- Les données restent sur le navigateur (LocalStorage)
- Compatible avec tous les navigateurs modernes
- Responsive sur mobile/tablet/desktop

## 🔐 Sécurité

- Pas de connexion internet requise
- Pas d'envoi de données
- Totalement privé et local

## 📞 Support

Pour toute suggestion ou bug, consultez le fichier TODO.md

---

**Version**: 2.0  
**Dernière mise à jour**: Février 2026  
**License**: Libre d'utilisation
