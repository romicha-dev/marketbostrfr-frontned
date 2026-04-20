
# ⚡ React + TypeScript + Redux Starter

A modern starter template for building scalable React applications with **TypeScript** and **Redux Toolkit**.  
This boilerplate includes pre-configured state management, project structure, and UI-ready setup — so you can focus on building features faster.

---

## ✨ Features

- ⚛️ **React 18** with **TypeScript** for type-safety
- 🎯 **Redux Toolkit** for state management
- 🔐 **Auth Slice** with demo user & token handling
- 🛠️ Pre-configured **React Router**
- 🎨 **TailwindCSS** ready for styling
- ✅ ESLint & Prettier setup for clean code
- 📂 Scalable project structure

---

## 📂 Project Structure

````

src/
│── app/
│   
│── store/
│   ├── store.ts                # Redux store setup
│   ├── hook.ts                 # Typed hooks for dispatch & selector
│   └── features/
│       └── auth/
│           ├── auth.slice.ts   # Auth slice (user, token, logout)
│
│── components/
│   └── ui/                     # Reusable UI components from ShadCN UI (Avatar, Button, etc.)
│
│── pages/
│   ├── Home.tsx
│   ├── About.tsx
│   └── ...
│
│── types/
│   └── user.ts                  # User type definitions
│
└── main.tsx              # App entry point

````

---

## 🚀 Getting Started

### 1️⃣ Clone the repository
```bash
git clone https://github.com/your-username/react-ts-redux-starter.git
cd react-ts-redux-starter
````

### 2️⃣ Install dependencies

```bash
npm install
# or
yarn install
```

### 3️⃣ Start the development server

```bash
npm run dev
```

### 4️⃣ Build for production

```bash
npm run build
```

### 5️⃣ CI/CD to cPanel (GitHub Actions)

This repo includes an automatic deployment workflow at [.github/workflows/deploy-cpanel.yml](.github/workflows/deploy-cpanel.yml).

On each push to `main`, GitHub Actions will:

1. Install dependencies
2. Build the app (`npm run build`)
3. Upload the `dist` output to cPanel via SSH (rsync)

Add these repository secrets in GitHub:

| Secret Name            | Example Value                               |
| ---------------------- | ------------------------------------------- |
| `CPANEL_SSH_HOST`      | `yourdomain.com`                            |
| `CPANEL_SSH_PORT`      | `22`                                        |
| `CPANEL_SSH_USERNAME`  | `cpanel-ssh-username`                       |
| `CPANEL_SSH_PRIVATE_KEY` | Multi-line private key text               |
| `CPANEL_REMOTE_DIR`    | `/public_html/` or `/public_html/api/`     |
| `VITE_BASE_PATH`       | `/` or `/api/`                              |

Notes:

- Use `/public_html/` when deploying to `https://yourdomain.com`.
- Use `/public_html/api/` when deploying to `https://yourdomain.com/api`.
- Use `VITE_BASE_PATH=/` for root-domain deploys, and `VITE_BASE_PATH=/api/` for `/api` deploys.
- Ensure your `.htaccess` is in `public/.htaccess` so it is copied into `dist/.htaccess` during build.
- For `CPANEL_SSH_PRIVATE_KEY`, paste the full private key including the `BEGIN` and `END` lines.

---

## 🔑 Auth Slice Example

The starter includes an **auth slice** with a static demo user:

```ts
const demoUser: TUser = {
  id: "12345",
  email: "demo.user@example.com",
  fullName: "Demo User",
  role: "USER",
  isVerified: true,
  isActive: true,
  isDeleted: false,
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  deletedAt: null,
  profilePhoto: "https://ui-avatars.com/api/?name=Demo+User&background=random",
};
```

👉 You can use `useAppSelector((state) => state.auth.user)` to access the logged-in user anywhere in your app.

---

## 🛠️ Available Scripts

| Script            | Description                      |
| ----------------- | -------------------------------- |
| `npm run dev`     | Start development server         |
| `npm run build`   | Build for production             |
| `npm run lint`    | Run ESLint checks                |
| `npm run preview` | Preview production build locally |

---

## 🌟 Future Improvements

* 🔄 Add **RTK Query** for API integration
* 🔑 JWT-based **Authentication flow**
* 🌍 Dark/Light theme support
* 🧪 Unit testing with Jest + React Testing Library

---

## 🤝 Contributing

1. Fork this repo
2. Create a new branch (`feature/your-feature`)
3. Commit your changes
4. Push to your branch and open a PR 🎉

---

## 📜 License

This project is licensed under the **MIT License** – feel free to use and modify for your projects.

---

### 💡 Quick Start

```bash
npx create-react-app my-app --template typescript
```

Or simply clone this starter and start building 🚀



