# 🔐 Mini Project — Authentication JWT

Une API REST d'authentification avec Node.js, Express et JSON Web Tokens (JWT).

---

## 📋 Description

Ce projet implémente un système d'authentification complet avec :
- Inscription d'un utilisateur avec mot de passe hashé
- Connexion avec génération d'un token JWT
- Protection de routes via un middleware JWT

---

## 🛠️ Technologies utilisées

| Outil | Rôle |
|---|---|
| Node.js | Environnement d'exécution JavaScript |
| Express 4 | Framework web pour créer l'API |
| jsonwebtoken | Génération et vérification des tokens JWT |
| bcryptjs | Hashage des mots de passe |
| dotenv | Gestion des variables d'environnement |

---

## 📁 Structure du projet

```
auth-jwt/
├── src/
│   ├── middleware/
│   │   └── auth.js        # Middleware de vérification JWT
│   ├── routes/
│   │   └── auth.js        # Routes register et login
│   └── server.js          # Point d'entrée du serveur
├── .env                   # Variables d'environnement (ne pas commiter)
├── .gitignore
└── package.json
```

---

## ⚙️ Installation

### Prérequis

- Node.js >= 14
- npm

### Étapes

```bash
# Cloner le repo
git clone https://github.com/sam99-web/miniproject-authjwt.git
cd miniproject-authjwt

# Installer les dépendances
npm install

# Créer le fichier .env
cp .env.example .env
```

### Configurer le `.env`

```env
PORT=3000
JWT_SECRET=mon_secret_super_long_et_random_123
JWT_EXPIRES_IN=15m
```

> ⚠️ Ne jamais commiter le fichier `.env` sur GitHub.

---

## 🚀 Lancer le serveur

```bash
npm start
```

Tu devrais voir :
```
Server running on port 3000
```

---

## 📡 Routes de l'API

### POST `/auth/register` — Créer un compte

**Body (JSON) :**
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

**Réponse (201) :**
```json
{
  "message": "Utilisateur cree"
}
```

---

### POST `/auth/login` — Se connecter

**Body (JSON) :**
```json
{
  "email": "test@test.com",
  "password": "123456"
}
```

**Réponse (200) :**
```json
{
  "token": "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9..."
}
```

---

### GET `/profile` — Route protégée

**Header requis :**
```
Authorization: Bearer <ton_token>
```

**Réponse (200) :**
```json
{
  "message": "Accès autorisé",
  "user": {
    "id": 1234567890,
    "email": "test@test.com"
  }
}
```

**Réponse si token manquant ou invalide (401) :**
```json
{
  "error": "Token manquant"
}
```

---

## 🧪 Tester avec curl

```bash
# 1. Register
curl -X POST http://localhost:3000/auth/register \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# 2. Login — récupère le token
curl -X POST http://localhost:3000/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@test.com","password":"123456"}'

# 3. Route protégée — colle ton token
curl http://localhost:3000/profile \
  -H "Authorization: Bearer TON_TOKEN_ICI"
```

---

## 🔒 Comment fonctionne JWT ?

```
1. Client envoie email + password
2. Serveur vérifie le password avec bcrypt
3. Serveur génère un token JWT signé avec JWT_SECRET
4. Client reçoit le token
5. Client envoie le token dans chaque requête protégée
6. Middleware vérifie la signature du token
7. Si valide → accès autorisé
```

---

## 🔧 Explication des fichiers

### `.env`
Contient les variables secrètes du projet. Ne jamais les mettre directement dans le code.

### `server.js`
Point d'entrée. Crée l'application Express, charge les routes et démarre le serveur.

### `routes/auth.js`
- `/register` → hash le mot de passe avec bcrypt, sauvegarde le user
- `/login` → vérifie le mot de passe, génère le token JWT

### `middleware/auth.js`
Intercepte les requêtes sur les routes protégées. Vérifie le token JWT dans le header `Authorization`. Si valide → laisse passer. Sinon → retourne 401.

---

## 📌 Prochaines étapes possibles

- [ ] Connecter une vraie base de données (PostgreSQL ou MongoDB)
- [ ] Ajouter un refresh token
- [ ] Valider les inputs (email valide, mot de passe minimum 8 caractères)
- [ ] Ajouter une route logout avec blacklist de token

---

## 👤 Auteur

**sam99-web** — [GitHub](https://github.com/sam99-web)
