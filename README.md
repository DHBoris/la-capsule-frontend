# La Capsule — Frontend

Application web e-commerce de café artisanal avec personnalisation de boissons. L'utilisateur peut créer son café sur-mesure, gérer son panier et passer commande via Stripe.

> Projet full-stack personnel — frontend découplé, backend disponible séparément.

---

## Aperçu

- Création de café personnalisé (type, taille, lait, toppings, caféine...)
- Authentification complète avec JWT (access token + refresh token)
- Panier dynamique persisté avec Redux
- Paiement en ligne via Stripe
- Upload de photos vers Cloudinary
- Formulaire de contact
- Réinitialisation de mot de passe par email
- Interface responsive avec Tailwind CSS

---

## Stack technique

| Catégorie | Technologies |
|---|---|
| Framework | React 17 |
| State management | Redux Toolkit + Redux Persist |
| Routing | React Router v6 |
| Formulaires | Formik + Yup |
| Requêtes HTTP | Axios |
| Paiement | Stripe (@stripe/react-stripe-js) |
| Style | Tailwind CSS |
| Build | Vite |
| Auth | JWT (jsonwebtoken) |

---

## Prérequis

- Node.js >= 16
- Yarn 1.22.19
- Le backend doit être lancé sur `http://localhost:5500`

---

## Installation

```bash
# Installer yarn si nécessaire
npm install -g yarn@1.22.19

# Installer les dépendances
yarn

# Créer le fichier d'environnement
cp .env.example .env
```

Renseigner les variables dans `.env` :

```env
VITE_STRIPE_PUBLIC_KEY=pk_test_xxxxxxxxxxxxxxxxxxxx
```

---

## Lancer le projet

```bash
# Développement
yarn dev
# → http://localhost:5173

# Build production
yarn build

# Prévisualiser le build
yarn serve
```

---

## Structure du projet

```
src/
└── app/
    ├── api/          # Appels HTTP vers le backend (axios)
    ├── assets/       # Styles, images, fonts
    ├── components/   # Composants réutilisables
    ├── reducer/      # Redux slices (user, cart, coffee, history...)
    ├── utils/        # Fonctions utilitaires
    └── views/        # Pages de l'application
```

---

## Fonctionnalités principales

### Authentification
- Inscription avec vérification d'email
- Connexion avec gestion automatique du refresh token
- Réinitialisation de mot de passe

### Café personnalisé
- Sélection du type de café, taille, lait, toppings, niveau de caféine
- Visualisation en temps réel
- Ajout au panier

### Panier & Commande
- Panier persisté entre les sessions (Redux Persist)
- Paiement sécurisé via Stripe Checkout

### Profil
- Consultation et modification des informations personnelles
- Historique des commandes

---

## Backend

Ce frontend communique avec une API REST Node.js/Express.
Repo backend : [la-capsule-backend](https://github.com/DHBoris/la-capsule-backend)

---

## Auteur

**Boris Dhaene**
[GitHub](https://github.com/DHBoris)
