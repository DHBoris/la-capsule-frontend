# ARCHITECTURE.md — La Capsule (Frontend)

> Ce document décrit l'architecture complète du système La Capsule.
> Ce repo contient uniquement le **frontend**. Le backend est disponible ici : [la-capsule-backend](https://github.com/DHBoris/la-capsule-backend)

---

## 1. PROJECT STRUCTURE

### Frontend — `la-capsule-frontend/` *(ce repo)*

```
la-capsule-frontend/
├── src/
│   └── app/
│       ├── api/
│       │   ├── api.index.js    # Appels : panier, photo, contact, commande
│       │   ├── api.user.js     # Appels : auth, profil, reset password
│       │   └── api.stripe.js   # Appel : création session Stripe
│       ├── assets/
│       │   └── styles/         # CSS modules par composant
│       ├── components/
│       │   ├── Header.jsx       # Navigation principale
│       │   ├── Footer.jsx
│       │   ├── Cart.jsx         # Composant panier
│       │   ├── CafeNormal.jsx   # Carte café standard
│       │   ├── CafePerso.jsx    # Carte café personnalisé
│       │   ├── CheckoutForm.jsx # Formulaire paiement Stripe
│       │   ├── CheckoutSuccess.jsx
│       │   ├── Commande.jsx     # Page commande avec Stripe Elements
│       │   ├── Contact.jsx      # Formulaire de contact
│       │   ├── CreateCoffeeContent.jsx
│       │   ├── CreateCompte.jsx # Formulaire inscription
│       │   ├── History.jsx      # Historique des commandes
│       │   ├── Modal.jsx
│       │   ├── Profil.jsx       # Fiche profil utilisateur
│       │   ├── Select.jsx       # Composant select custom
│       │   ├── SignIn.jsx       # Formulaire connexion
│       │   ├── Upload.jsx       # Upload photo
│       │   ├── PopupContent.jsx # Popups (confirmation, suppression...)
│       │   └── ...              # Autres composants UI
│       ├── reducer/
│       │   ├── configureStore.jsx      # Redux store + persistance
│       │   ├── authAction.reducer.jsx  # Slice auth (user, token)
│       │   ├── coffee.reducer.jsx      # Slice café personnalisé
│       │   └── history.reducer.jsx     # Slice historique commandes
│       ├── utils/
│       │   └── functions.ts     # Utilitaires numériques (formatNumber...)
│       ├── views/
│       │   ├── Home.jsx
│       │   ├── CartPage.jsx
│       │   ├── CheckoutSuccessPage.jsx
│       │   ├── ConceptPage.jsx
│       │   ├── ContactPage.jsx
│       │   ├── CreateCoffePage.jsx
│       │   ├── CreateComptePage.jsx
│       │   ├── HistoryPage.jsx
│       │   ├── NewPassword.jsx
│       │   ├── NotFound.jsx
│       │   ├── ProfilPage.jsx
│       │   ├── SignInPage.jsx
│       │   ├── YourConceptionsPage.jsx
│       │   └── resetPassword.jsx
│       └── App.jsx              # Routeur principal + Provider Redux + Stripe
├── .env                         # Variables Vite (non committé)
├── .gitignore
├── index.html
├── vite.config.js
├── tailwind.config.js
└── package.json
```

### Backend — `la-capsule-backend/` *(repo séparé)*

```
la-capsule-backend/
├── controllers/      # Logique métier (user, cart, photo, stripe, message, order)
├── middleware/       # tokenVerifier (JWT), createMailTransporter
├── models/           # Schémas Mongoose (user, cart, message, photo...)
├── routes/           # index.js + users.js
├── utils/            # Envoi d'emails (vérification, reset, commande)
└── index.js          # Point d'entrée Express + MongoDB
```

---

## 2. HIGH-LEVEL SYSTEM DIAGRAM

```
┌─────────────────────────────────────────────────────────────┐
│                          UTILISATEUR                        │
│                    (Navigateur Web)                         │
└────────────────────────────┬────────────────────────────────┘
                             │ HTTP / HTTPS
                             ▼
┌─────────────────────────────────────────────────────────────┐
│              ★  FRONTEND (React + Vite)  ★                  │
│                    http://localhost:5173                      │
│                                                             │
│  ┌──────────────┐  ┌──────────────┐  ┌──────────────────┐  │
│  │ Redux Store  │  │  React Pages │  │   Stripe.js      │  │
│  │ (Persist)    │  │  & Components│  │   (client-side)  │  │
│  └──────────────┘  └──────────────┘  └──────────────────┘  │
└────────────────────────────┬────────────────────────────────┘
                             │ Axios (REST API)
                             │ Bearer Token + Cookies (JWT)
                             ▼
┌─────────────────────────────────────────────────────────────┐
│                   BACKEND (Express / Node.js)                │
│                    http://localhost:5500                      │
│                                                             │
│  ┌──────────────────┐   ┌──────────────────────────────┐   │
│  │  tokenVerifier   │   │         Controllers           │   │
│  │  (JWT Middleware)│──▶│  user / cart / photo /        │   │
│  └──────────────────┘   │  stripe / message / order     │   │
│                         └──────────────┬─────────────────┘  │
└────────────────────────────────────────┼────────────────────┘
                    ┌───────────────────┬┴──────────────────┐
                    ▼                   ▼                   ▼
        ┌───────────────┐   ┌─────────────────┐  ┌────────────────┐
        │   MongoDB     │   │    Cloudinary   │  │    Stripe      │
        │  (Base de     │   │  (Stockage      │  │  (Paiement)    │
        │   données)    │   │   d'images)     │  │                │
        └───────────────┘   └─────────────────┘  └────────────────┘
                                                          │
                                                          ▼
                                               ┌─────────────────┐
                                               │    Gmail        │
                                               │  (Nodemailer)   │
                                               │  Emails :       │
                                               │  - Vérif email  │
                                               │  - Reset mdp    │
                                               │  - Confirmation │
                                               └─────────────────┘
```

---

## 3. CORE COMPONENTS

### Frontend *(ce repo)*

| Attribut | Détail |
|---|---|
| **Purpose** | Interface utilisateur SPA pour naviguer, créer un café, gérer le panier et payer |
| **Framework** | React 17 |
| **State** | Redux Toolkit + Redux Persist (sessionStorage) |
| **Routing** | React Router v6 |
| **Formulaires** | Formik + Yup (validation schema) |
| **HTTP** | Axios avec headers `Authorization: Bearer <token>` |
| **Build** | Vite 3 |
| **Style** | Tailwind CSS 3 + CSS Modules |
| **Déploiement** | Build statique (`yarn build`) → Netlify / Vercel |

### Backend *(repo séparé)*

| Attribut | Détail |
|---|---|
| **Purpose** | API REST exposant les ressources métier (auth, panier, photos, paiement, emails) |
| **Runtime** | Node.js |
| **Framework** | Express 4 |
| **Auth** | JWT (access token 24h + refresh token 7j en cookie httpOnly) |
| **ORM** | Mongoose 7 |
| **Port** | 5500 |
| **Déploiement** | Node process → Railway / Render / VPS |

---

## 4. DATA STORES

### MongoDB (principale — gérée côté backend)

| Collection | Description | Champs clés |
|---|---|---|
| `users` | Comptes utilisateurs | `firstName`, `lastName`, `email`, `password` (bcrypt), `refreshToken`, `isVerified`, `cartList[]`, `userAddress[]` |
| `useraddresses` | Adresses postales | `detail_address`, `post_code`, `ville` |
| `carts` | Produits dans le panier | `id`, `name`, `origin`, `image`, `vegan`, `type`, `caffeine`, `size`, `price`, `quantity` |
| `messages` | Messages formulaire contact | `firstName`, `lastName`, `email`, `callNumber`, `message`, `politique` |
| `photos` | Images uploadées | `url` (Cloudinary), `public_id`, `filters` |
| `unifiedcoffees` | Cafés créés (perso + normal) | Schéma unifié des deux types |

### Cloudinary (stockage images — géré côté backend)

- Stockage et CDN des photos uploadées par les utilisateurs
- L'URL retournée (`secure_url`) est affichée côté frontend

### Redux Persist (état client — géré côté frontend)

- **Storage :** sessionStorage (navigateur)
- **Slices persistés :** auth (token), coffee (café en cours), history
- Vidé à la fermeture de l'onglet

---

## 5. EXTERNAL INTEGRATIONS

### Stripe

| Attribut | Détail |
|---|---|
| **Purpose** | Paiement sécurisé en ligne |
| **SDK Frontend** | `@stripe/react-stripe-js` + `@stripe/stripe-js` |
| **Flux** | Frontend envoie les articles → Backend crée la session → Frontend reçoit `sessionId` → Stripe Hosted Checkout |
| **Retour** | Stripe redirige vers `/checkout-success?session_id=...` (succès) ou `/cart` (annulation) |
| **Méthodes** | Carte bancaire + PayPal |
| **Config frontend** | `VITE_STRIPE_PUBLIC_KEY` dans `.env` |

### Cloudinary

| Attribut | Détail |
|---|---|
| **Purpose** | Hébergement et CDN des images utilisateurs |
| **Intégration frontend** | Upload via `FormData` → `POST /uploadPhoto` (backend gère Cloudinary) |

### Gmail / Nodemailer

| Attribut | Détail |
|---|---|
| **Purpose** | Emails transactionnels (vérification, reset mdp, confirmation commande) |
| **Intégration frontend** | Le frontend déclenche l'envoi via les endpoints backend (`/users/signUp`, `/users/requestPasswordReset`, `/order-confirmation`) |

---

## 6. DEPLOYMENT & INFRASTRUCTURE

### État actuel (développement local)

| Composant | URL | Commande |
|---|---|---|
| Frontend | `http://localhost:5173` | `yarn dev` |
| Backend | `http://localhost:5500` | `npm run dev` |

### Déploiement recommandé (production)

| Composant | Service recommandé |
|---|---|
| **Frontend** | Vercel / Netlify (build statique `yarn build`) |
| Backend | Railway / Render / VPS |
| Base de données | MongoDB Atlas |
| Images | Cloudinary (déjà en place) |

### CI/CD

Pas encore configuré. Recommandation : GitHub Actions → lint → build → deploy sur Vercel.

### Monitoring

Non configuré. Recommandation : Sentry pour les erreurs JavaScript frontend.

---

## 7. SECURITY CONSIDERATIONS

### Authentification côté frontend

| Mécanisme | Détail |
|---|---|
| **Access Token** | Stocké dans Redux (sessionStorage via Redux Persist), envoyé dans `Authorization: Bearer` |
| **Refresh Token** | Stocké en cookie `httpOnly` côté backend — invisible depuis le JS frontend |
| **Renouvellement** | Géré automatiquement par le middleware backend `tokenVerifier` |

### Autres mesures

| Mesure | Détail |
|---|---|
| **Secrets** | Clé Stripe via `VITE_STRIPE_PUBLIC_KEY` (jamais committée) |
| **withCredentials** | Activé sur toutes les requêtes authentifiées pour envoyer le cookie |
| **XSS** | Pas d'utilisation de `innerHTML` — `textContent` utilisé dans les composants custom |
| **CORS** | Contrôlé côté backend (origines `localhost:5173` et `localhost:4173`) |

---

## 8. DEVELOPMENT & TESTING

### Installation locale

```bash
# Cloner le repo
git clone https://github.com/DHBoris/la-capsule-frontend.git
cd la-capsule-frontend

# Installer les dépendances
yarn

# Configurer les variables d'environnement
cp .env.example .env
# Renseigner VITE_STRIPE_PUBLIC_KEY

# Lancer (le backend doit tourner sur localhost:5500)
yarn dev
```

### Scripts disponibles

| Commande | Action |
|---|---|
| `yarn dev` | Lancement en mode développement (port 5173) |
| `yarn build` | Build de production |
| `yarn serve` | Prévisualisation du build |

### Qualité du code

| Outil | Usage |
|---|---|
| **ESLint** | Linting JavaScript/JSX |
| **Prettier** | Formatage automatique (`.prettierrc` configuré) |
| **Tailwind IntelliSense** | Autocomplétion des classes dans VSCode |

### Tests

Aucun test automatisé en place actuellement (voir section 9).

---

## 9. FUTURE CONSIDERATIONS

### Dette technique

| Problème | Priorité |
|---|---|
| Aucun test unitaire ni d'intégration | Haute |
| URLs API hardcodées en `localhost:5500` — migrer vers `VITE_API_URL` | Haute |
| Pas de logging structuré des erreurs API | Moyenne |
| Historique des commandes non persisté en base de données | Moyenne |

### Roadmap

- Migration des URLs API vers variable d'environnement `VITE_API_URL`
- Ajout de tests (React Testing Library + Vitest)
- Déploiement sur Vercel avec CI/CD GitHub Actions
- Dashboard utilisateur enrichi (historique réel, gestion adresses)
- Internationalisation (i18n) FR / EN

---

## 10. GLOSSARY

| Terme | Définition |
|---|---|
| **JWT** | JSON Web Token — format de token signé utilisé pour l'authentification |
| **Access Token** | JWT de courte durée (24h) envoyé dans chaque requête authentifiée |
| **Refresh Token** | JWT de longue durée (7j) stocké en cookie httpOnly côté backend |
| **httpOnly** | Attribut de cookie empêchant la lecture par JavaScript (protection XSS) |
| **Redux Persist** | Librairie persistant l'état Redux dans sessionStorage entre les rechargements |
| **Stripe Checkout** | Page de paiement hébergée par Stripe, redirigée depuis l'application |
| **Cloudinary** | Service cloud de stockage, transformation et diffusion d'images |
| **SPA** | Single Page Application — routing géré côté client sans rechargement de page |
| **CORS** | Cross-Origin Resource Sharing — politique navigateur pour les requêtes cross-domain |
| **Formik** | Librairie de gestion de formulaires React |
| **Yup** | Librairie de validation de schémas utilisée avec Formik |
| **Vite** | Outil de build moderne et rapide pour applications frontend |
| **withCredentials** | Option Axios permettant l'envoi des cookies dans les requêtes cross-origin |

---

## 11. PROJECT IDENTIFICATION

| Attribut | Valeur |
|---|---|
| **Nom du projet** | La Capsule |
| **Type** | Application e-commerce full-stack (café artisanal) |
| **Repo Frontend** | https://github.com/DHBoris/la-capsule-frontend |
| **Repo Backend** | https://github.com/DHBoris/la-capsule-backend |
| **Auteur** | Boris Dhaene |
| **Contact** | https://github.com/DHBoris |
| **Dernière mise à jour** | 2026-03-26 |
| **Statut** | En développement — non déployé en production |
