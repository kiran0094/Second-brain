# 🧠 Second Brain

Second Brain is a full-stack bookmarking / content-curation app for saving and organizing links to **Tweets/X posts, YouTube videos, documents, and general links** in one place — tag them, browse them on a dashboard, and (optionally) share your whole collection via a public link.

It's built as a classic **MERN-style stack** (MongoDB + Express + React + Node), written entirely in **TypeScript**, and uses **JWT stored in an HttpOnly cookie** for authentication.

> ⚠️ This is a learning / portfolio project. It works end-to-end but has some rough edges — see [Known Issues](#-known-issues--suggested-fixes) below before using it in production.

---

## 📸 What it does

- Sign up / sign in with an email + username + password
- Save content with a **title, URL, type (`tweet`, `youtube`, `document`, `link`), and tags**
- View saved content on a dashboard as cards (YouTube links render as embedded video players, tweets render as embeds)
- Delete saved content
- Generate a shareable "brain" link so others can view your saved content read-only
- Log out (clears the auth cookie)

---

## 🏗️ Tech Stack

| Layer | Technology |
|---|---|
| **Frontend** | React 19, TypeScript, Vite, Tailwind CSS v4, React Router v7, Axios, react-icons |
| **Backend** | Node.js, Express 5, TypeScript |
| **Database** | MongoDB with Mongoose ODM |
| **Auth** | JWT (`jsonwebtoken`) signed and stored in an **HttpOnly cookie** (`cookie-parser`), passwords hashed with `bcryptjs` |
| **Validation** | Zod schemas on all write endpoints |

---

## 📂 Project Structure

```
Second-brain/
│
├── Backend/                       # Express + TypeScript API server
│   ├── src/
│   │   ├── index.ts               # App entry point — Express setup, middleware, DB connect, server start
│   │   ├── utils.ts                # random() — generates random alphanumeric share-link slugs
│   │   ├── model/                  # Mongoose schemas
│   │   │   ├── user.ts             # User: email, username, password (hashed)
│   │   │   ├── content.ts          # Content: link, type, title, tags[], userId
│   │   │   ├── tag.ts              # Tag: name (unique)
│   │   │   └── link.ts             # Link: share-link slug ↔ userId mapping
│   │   └── routes/
│   │       ├── user.ts             # All API routes (auth + content + sharing)
│   │       └── loginmiddleware.ts  # JWT verification middleware (reads cookie, sets req.headers.userId)
│   ├── package.json
│   └── tsconfig.json
│
└── frontend/                      # React + Vite SPA
    ├── index.html
    ├── vite.config.ts              # Vite + React + Tailwind plugin config
    ├── src/
    │   ├── main.tsx                 # React root render
    │   ├── App.tsx                  # Routes: /signup, /signin, / (protected Dashboard)
    │   ├── index.css                # Tailwind entry
    │   ├── lib/
    │   │   └── ProtectedRoute.tsx    # Route guard — pings /api/v1/me to check the auth cookie
    │   ├── pages/
    │   │   ├── Signup.tsx            # Sign-up form → POST /signup
    │   │   ├── Signin.tsx            # Sign-in form → POST /login
    │   │   └── Dashboard.tsx         # Main app screen — fetches & lists content, opens "Add content" modal
    │   ├── component/
    │   │   ├── sidebar.tsx           # Left nav (Tweets/YouTube/Settings filters, Logout)
    │   │   ├── model.tsx             # "Add content" modal/form → POST /content
    │   │   └── ui/
    │   │       ├── button.tsx
    │   │       ├── card.tsx          # Renders a single saved content item (embeds tweet/YouTube)
    │   │       ├── input.tsx
    │   │       └── sidebaritem.tsx
    │   ├── icons/                    # Hand-written SVG icon components (tweet, youtube, plus, share, delete, logout, document)
    │   └── assets/
    ├── public/
    └── package.json
```

---

## 🔐 Authentication Model

The app uses **JWT + HttpOnly cookies** (not `localStorage`/Bearer tokens), which is the safer pattern against XSS token theft:

1. **Sign up** (`POST /api/v1/signup`) — validates input with Zod, hashes the password with `bcryptjs` (10 salt rounds), and creates the `User` document.
2. **Login** (`POST /api/v1/login`) — accepts an `identifier` (email *or* username) + password, verifies the password hash, then signs a JWT (`{ id: user._id }`) and sets it as a cookie:
   ```ts
   res.cookie("token", token, {
     httpOnly: true,                              // not readable by client-side JS
     secure: process.env.NODE_ENV === "production", // HTTPS-only in prod
     sameSite: "lax",
     maxAge: 24 * 60 * 60 * 1000,                  // 1 day
   });
   ```
3. **Every protected route** goes through `loginmiddleware.ts`, which:
   - Reads `req.cookies.token`
   - Verifies it with `jwt.verify(token, process.env.JWTSECRAT)`
   - Attaches the decoded user id to `req.headers.userId` for downstream route handlers to use
4. **Frontend** sends `withCredentials: true` on every Axios call so the browser automatically attaches the cookie; there is no manual token handling in the frontend code at all.
5. **Session check**: `ProtectedRoute.tsx` pings `GET /api/v1/me` on mount — if it 200s, the cookie is valid and the Dashboard renders; if it fails, the user is redirected to `/signin`.
6. **Logout** (`POST /api/v1/logout`) simply clears the cookie server-side.

**Public (no-auth) routes:** `/signup`, `/login`, `GET /brain/:sharelink` (the public share view).
**Protected (JWT-required) routes:** everything registered *after* `userRouter.use(loginmiddleware)` in `user.ts` — `/me`, `/logout`, `/content` (GET/POST/PUT/DELETE), `/brain/share`.

---

## 📡 API Reference

Base URL: `http://localhost:3000/api/v1`

| Method | Endpoint | Auth | Description |
|---|---|---|---|
| `POST` | `/signup` | ❌ | Create a new user (`username`, `email`, `password`) |
| `POST` | `/login` | ❌ | Log in with `identifier` (email or username) + `password`; sets the JWT cookie |
| `GET` | `/brain/:sharelink` | ❌ | Public view of a user's shared content via their share slug |
| `POST` | `/logout` | ✅ | Clears the auth cookie |
| `GET` | `/me` | ✅ | Confirms the session is valid (used by `ProtectedRoute`) |
| `GET` | `/content` | ✅ | List all content saved by the logged-in user |
| `GET` | `/content/:id` | ✅ | Get a single content item by id |
| `POST` | `/content` | ✅ | Create content (`type`, `link`, `title`, `tags[]`) — auto-creates any new tags |
| `PUT` | `/content/:id` | ✅ | Update a content item |
| `DELETE` | `/content/:id` | ✅ | Delete a content item |
| `POST` | `/brain/share` | ✅ | Generate (or revoke) a public share link for the user's content |

---

## 🗄️ Data Models

```
User        { email (unique), username (unique), password (hashed) }
Content     { link, type: "document" | "tweet" | "youtube" | "link", title, tags: [Tag], userId: User }
Tag         { name (unique) }
Link        { link (share slug), useref: User }
```

---

## ⚙️ Getting Started

### Prerequisites
- Node.js (v18+ recommended)
- A running MongoDB instance (local or Atlas)

### 1. Clone the repo
```bash
git clone https://github.com/kiran0094/Second-brain.git
cd Second-brain
```

### 2. Backend setup
```bash
cd Backend
npm install
```

Create a `.env` file inside `Backend/`:
```env
MONGO_URI=mongodb://localhost:27017/brainly
JWTSECRAT=your_jwt_secret_here
NODE_ENV=development
```
> Note: the code reads `process.env.JWTSECRAT` (yes, that's the actual variable name used in the source — see [Known Issues](#-known-issues--suggested-fixes)).

Run the backend:
```bash
npm run dev      # nodemon, watches src/index.ts
# or
npm run build && npm start   # compiles with tsc then runs dist/index.js
```
The API starts on **`http://localhost:3000`**.

### 3. Frontend setup
```bash
cd ../frontend
npm install
npm run dev
```
The app starts on **`http://localhost:5173`** (Vite default) and is hard-coded to talk to the backend at `http://localhost:3000`.

---

## 🚧 Known Issues / Suggested Fixes

This is an honest list based on reading the current source — useful if you plan to extend or productionize this project:

- **`loginmiddleware.ts` doesn't stop the request on invalid tokens.** It calls `jwt.verify()` (which throws on an invalid/missing token rather than returning falsy) with no `try/catch`, and even if it returned falsy, `next()` is still called after the `401` response instead of `return`ing early. In practice, an invalid/missing token currently causes an unhandled exception/500 rather than a clean `401`.
- **Env variable naming typo:** `process.env.JWTSECRAT` is used instead of `JWTSECRET` throughout. Cosmetic, but easy to mistype in your own `.env`.
- **Dead/confusing code in `POST /login`:** the handler hashes the incoming plaintext password (`bcrypt.hash(password, 10)`) into an unused variable, then correctly compares against the stored hash with `bcrypt.compare`. The first hash call does nothing and can be removed.
- **Duplicate bcrypt import:** `user.ts` imports `bcryptjs` twice (`bycypt` and `bcrypt`), and only the second import is actually used.
- **Content `type` mismatch between frontend and backend.** The backend's Zod schema and Mongoose enum accept `"document" | "tweet" | "youtube" | "link"`, but the "Add Content" modal on the frontend offers `"youtube" | "tweet" | "article"` — `"article"` isn't a valid backend type, so submitting it will fail validation.
- **Hard-coded URLs.** Both the frontend (`http://localhost:3000/...` in every component) and the backend CORS config (`origin: 'http://localhost:5173'`) are hard-coded rather than driven by environment variables, so deploying anywhere other than localhost requires code changes.
- **`/brain/share` response on revoke:** when `share: false` is sent, the existing link is deleted but the response still says `"share link is updated"` with `link: undefined`, which is a bit misleading for API consumers.
- **No refresh tokens / rate limiting / password complexity rules** — fine for a learning project, but worth adding before any real deployment.

---

## 🗺️ Possible Roadmap

- [ ] Fix the middleware auth-guard bug above (return early + wrap `jwt.verify` in try/catch)
- [ ] Move all frontend API URLs into a single `axios` instance with `baseURL` from an env variable
- [ ] Add a proper "Share Brain" read-only page on the frontend that consumes `GET /brain/:sharelink`
- [ ] Add sidebar filtering by content type (currently just logs to console)
- [ ] Add pagination / search over saved content
- [ ] Add tests (currently `npm test` is a placeholder)

---

## 📄 License

No license file is currently included in this repository. Add a `LICENSE` file (e.g. MIT) if you intend for others to reuse this code.
