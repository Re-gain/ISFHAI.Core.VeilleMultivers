# ISFHAI.Core.VeilleMultivers

**ISFHAI – Système de Veille Technologique Multiverselle**  
Ce dépôt contient l'interface et les données de la galaxie de veille technologique du projet ISFHAI, organisé en 15 axes stratégiques.

---

## 🌌 Arbre de Veille Technologique

L’application web permet la visualisation dynamique des branches de veille, structurées depuis un fichier `veilleData.js` :

- **Veille 01 : Technologies IA Générales**
- **Veille 02 : Interfaces homme-machine et neurotechnologies**
- **Veille 03 : Matériaux avancés et lumière**
- **Veille 04 : Jumeaux numériques et simulations**
- *(... jusqu’à Veille 15)*

Toutes les données sont chargées dynamiquement dans l'interface `index.html` via `veille.js`.

---

## 🔧 Structure du dépôt

├── index.html # Page principale HTML
├── veille.js # Script de génération d’arbre interactif
├── veilleData.js # Données JSON formatées pour l’arbre (15 branches)
├── vercel.json # Configuration de déploiement Vercel
├── LICENSE # Licence GNU GPL v3
└── README.md # Ce fichier

yaml
Copier
Modifier

---

## 🚀 Déploiement

Ce projet est automatiquement déployé via **Vercel** à chaque mise à jour de la branche `main`.

### 🔗 Accès :
- https://isfhai-core-veille-multivers.vercel.app

---

## 📜 Licence

Ce projet est distribué sous licence **GNU General Public License v3.0**.  
Voir le fichier [LICENSE](./LICENSE) pour plus d’informations.

---

## 🙌 Contributeur principal

- **Alban Lambert** – _Auteur du projet ISFHAI_  
  [Site principal à venir](https://isfhai.science) (WIP)

---

Pour toute suggestion ou collaboration : n'hésitez pas à ouvrir une *issue* ou à proposer une *pull request*.
