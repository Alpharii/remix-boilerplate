# Remix Boilerplate ⚛️

A starter kit using Remix with HTTP-only cookie authentication (preauth/postauth), flat routes, and Axios as the HTTP client. Great for building secure web apps with a complete login/logout flow.

## 🚀 Key Features

- **Flat Routes** — clean and simple Remix route structure.
- **HTTP-only JWT Cookie Auth** — secure against XSS attacks.
- **Axios instance** ready to use (`~/lib/Axios`) with `withCredentials: true` to ensure cookies are always sent.
- **Preauth & Postauth Layouting**:
  - `__preauth+/login.tsx` — for public login pages.
  - `__postauth+/dashboard.tsx` in postauth area — for authenticated users only.
- **Routing with Access Protection** — layout loader checks token from cookie; redirects to `/login` if invalid.

## 🎯 Project Purpose

To speed up Remix app development with:
1. Secure and ready-to-use authentication (login using HTTP-only cookie).
2. Simple flat routing.
3. Automatic layout separation for public and authenticated pages.
4. Preconfigured Axios for stable communication with a separate backend.

## 🛠️ Installation

```bash
npx create-remix-boilerplate ./my-app
```

Or

```bash
git clone https://github.com/Alpharii/remix-boilerplate.git
cd remix-boilerplate
npm install
```

Copy `.env.example` to `.env` and fill in the variables:

```env
VITE_API_URL=https://api.example.com
NODE_ENV=development
```

## ▶️ Run the App

- Development Mode:  
  ```bash
  npm run dev
  ```
  
- Production Build & Preview:  
  ```bash
  npm run build
  npm run start
  ```

## 🔍 Project Structure

```
app/
├─ routes/
│  ├─ __preauth+/
│  │    └─ login.tsx       # Public login page
│  ├─ __postauth+/         # Authenticated/protected routes
│  │    └─ dashboard.tsx   # Example authenticated page  
│  ├─ __preauth.tsx        # Main layout after login
│  ├─ __postauth.tsx       # Main layout before login
│  └─ index.tsx            # Redirect to login or dashboard
lib/
└─ Axios.ts                # Axios instance with credentials
```

## 🧩 How Auth Works

1. User logs in via the `POST /login` form. The server sets a HTTP-only cookie `token`.
2. Axios is used both in client and Remix loaders, always sending the cookie.
3. Postauth layout (`__postauth.tsx`) runs a loader:
   - Parses the `token` cookie.
   - Calls an api. If it fails, redirects to `/login`.
4. If successful, renders the layout + `Outlet()` for page content.

## 🔧 Customization

- **Add sidebar or toolbar** in `__postauth.tsx`.
- **Add new protected pages** under `__postauth+`.
- **Change backend API** by editing `VITE_API_URL` and login/me response format.
- **Increase security** by enabling SameSite + Secure on cookies.

## 📚 Tips & Best Practices

- Make sure your backend allows cross-site cookies (`CORS`, `SameSite=None`, `Secure`).
- Always use `withCredentials: true` in Axios to send cookies.
- Never store tokens in localStorage; always use HTTP-only cookies.

## 📝 Contributing

1. Fork and create a new branch.
2. Add your features or bug fixes.
3. Open a Pull Request.

## 📄 License

MIT License. See [LICENSE](LICENSE) for details.
