# 📊 Mode Graphique - Documentation

## Vue d'ensemble

Le **Mode Graphique** permet de visualiser des fonctions mathématiques en temps réel avec des graphiques interactifs et animés.

## ✨ Fonctionnalités

### 1. Tracé de Fonctions
- ✅ Entrée de fonction en notation mathématique
- ✅ Graphique interactif avec zoom
- ✅ Affichage en temps réel
- ✅ Plage de -10 à +10 sur l'axe X

### 2. Exemples Rapides
12 fonctions pré-configurées :
- **Parabole** : x²
- **Sinus** : sin(x)
- **Cosinus** : cos(x)
- **Exponentielle** : exp(x)
- **Logarithme** : ln(x)
- **Racine** : sqrt(x)
- **Cubique** : x³
- **Tangente** : tan(x)
- **Valeur absolue** : abs(x)
- **Inverse** : 1/x
- **Sinc** : sin(x)/x
- **Produit** : x*sin(x)

### 3. Syntaxe Supportée

| Opération | Syntaxe | Exemple |
|-----------|---------|---------|
| Puissance | `x^n` | `x^2`, `x^3` |
| Multiplication | `*` | `2*x`, `x*sin(x)` |
| Division | `/` | `1/x`, `sin(x)/x` |
| Addition | `+` | `x + 2` |
| Soustraction | `-` | `x - 5` |
| Sinus | `sin(x)` | `sin(x)`, `sin(2*x)` |
| Cosinus | `cos(x)` | `cos(x)` |
| Tangente | `tan(x)` | `tan(x)` |
| Racine carrée | `sqrt(x)` | `sqrt(x)`, `sqrt(x+1)` |
| Logarithme naturel | `ln(x)` | `ln(x)` |
| Logarithme base 10 | `log(x)` | `log(x)` |
| Exponentielle | `exp(x)` | `exp(x)`, `exp(-x)` |
| Valeur absolue | `abs(x)` | `abs(x)` |
| Pi | `π` | `π*x` |
| Euler | `e` | `e^x` |

## 📝 Exemples d'Utilisation

### Fonctions Simples

#### Parabole
```
x^2
```
Graphique d'une parabole classique

#### Fonction linéaire
```
2*x + 3
```
Droite avec pente 2 et ordonnée à l'origine 3

#### Fonction cubique
```
x^3 - 3*x
```
Fonction cubique avec points d'inflexion

### Fonctions Trigonométriques

#### Sinus
```
sin(x)
```
Onde sinusoïdale classique

#### Cosinus décalé
```
cos(x - π/2)
```
Cosinus avec décalage de phase

#### Tangente
```
tan(x)
```
Fonction tangente avec asymptotes

### Fonctions Composées

#### Produit sinus
```
x * sin(x)
```
Oscillations avec amplitude croissante

#### Fonction sinc
```
sin(x) / x
```
Fonction sinc (cardinal sinus)

#### Exponentielle décroissante
```
exp(-x)
```
Décroissance exponentielle

### Fonctions Complexes

#### Gaussienne
```
exp(-x^2)
```
Courbe en cloche

#### Polynôme
```
x^3 - 2*x^2 + x - 1
```
Polynôme de degré 3

#### Fonction rationnelle
```
1 / (1 + x^2)
```
Fonction de Lorentz

## 🎨 Interface

### Zone de Saisie
- Input texte pour entrer la fonction
- Validation en temps réel
- Placeholder avec exemple

### Bouton de Tracé
- Bouton "📊 Tracer le Graphique"
- Animation au survol
- Feedback visuel

### Exemples Rapides
- Grille de 12 boutons
- Clic pour charger instantanément
- Tooltip avec description

### Graphique
- Axes X et Y gradués
- Grille de fond
- Légende avec formule
- Tooltip interactif au survol
- Zoom et pan (glisser)

### Aide
- Syntaxe supportée
- Exemples de notation
- Guide rapide

## 🔧 Fonctionnalités Avancées

### Graphique Interactif
- **Zoom** : Molette de la souris
- **Pan** : Cliquer-glisser
- **Tooltip** : Survol pour voir les valeurs
- **Légende** : Affiche la formule

### Personnalisation
- Couleur : Dégradé violet-bleu
- Remplissage : Zone sous la courbe
- Lissage : Courbe de Bézier
- Points : Masqués pour fluidité

### Performance
- Calcul optimisé (200 points)
- Rendu fluide avec Chart.js
- Gestion des erreurs (NaN, Infinity)
- Mise à jour en temps réel

## 📐 Plage et Précision

- **Plage X** : -10 à +10
- **Pas** : 0.1
- **Points** : ~200 points calculés
- **Précision** : 2 décimales pour X, 3 pour Y

## ⚠️ Gestion des Erreurs

### Fonction Invalide
```
Message: "Fonction invalide"
Couleur: Rouge
```

### Division par zéro
Les points invalides sont ignorés (NaN)

### Asymptotes
Gérées automatiquement (tan, 1/x)

## 🎯 Cas d'Usage

### Éducation
- Visualiser des concepts mathématiques
- Comprendre les transformations
- Étudier les dérivées et intégrales

### Analyse
- Trouver les zéros d'une fonction
- Identifier les extrema
- Observer le comportement asymptotique

### Comparaison
- Superposer plusieurs fonctions (à venir)
- Comparer des modèles
- Valider des hypothèses

## 🚀 Utilisation

### Étape 1 : Accéder au Mode
1. Ouvrir la calculatrice
2. Cliquer sur **📈 Graphique** dans la sidebar

### Étape 2 : Entrer une Fonction
1. Taper dans le champ "Fonction f(x)"
2. Utiliser la syntaxe supportée
3. Exemple : `x^2 + 2*x - 1`

### Étape 3 : Tracer
1. Cliquer sur "📊 Tracer le Graphique"
2. Le graphique s'affiche instantanément
3. Interagir avec le graphique

### Étape 4 : Explorer
1. Essayer les exemples rapides
2. Modifier la fonction
3. Observer les changements

## 💡 Astuces

### Combiner des Fonctions
```
sin(x) + cos(x)
x^2 * exp(-x)
sqrt(abs(x))
```

### Utiliser des Constantes
```
π * x
e^x
2*π*sin(x)
```

### Fonctions Paires/Impaires
```
x^2        (paire)
x^3        (impaire)
abs(x)     (paire)
```

## 🔮 Améliorations Futures

- [ ] Superposition de plusieurs fonctions
- [ ] Export en image (PNG, SVG)
- [ ] Calcul de dérivée graphique
- [ ] Calcul d'intégrale (aire sous courbe)
- [ ] Zoom personnalisé (plage X/Y)
- [ ] Tangente en un point
- [ ] Table de valeurs
- [ ] Animation de paramètres
- [ ] Mode 3D pour f(x,y)
- [ ] Équations paramétriques

## 📊 Technologies

- **Chart.js** : Bibliothèque de graphiques
- **React-ChartJS-2** : Wrapper React
- **TypeScript** : Typage fort
- **Tailwind CSS** : Styles

## 🐛 Dépannage

### Le graphique ne s'affiche pas
- Vérifier la syntaxe de la fonction
- S'assurer que Chart.js est installé
- Recharger la page

### Erreur "Fonction invalide"
- Vérifier l'orthographe (sin, cos, etc.)
- Utiliser `*` pour la multiplication
- Utiliser `^` pour les puissances

### Graphique coupé
- Normal pour les asymptotes (tan, 1/x)
- Ajuster la plage (à venir)

## 📖 Ressources

- Documentation Chart.js : https://www.chartjs.org/
- Fonctions mathématiques JS : https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/Math

---

**Version** : 1.0  
**Dernière mise à jour** : 2024  
**Auteur** : Calculator Pro Team
