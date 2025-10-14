# Mindly (React + Tailwind)

A student mental awareness platform built with React, Vite, and Tailwind CSS.

## Features
- React Router pages: Home, Chatbot, Resources, About, Contact
- Tailwind CSS styling with dark mode (persisted)
- Daily quotes, local mood tracker, and placeholder chatbot

## Scripts
```bash
npm install
npm run dev     # start at http://localhost:5173
npm run build   # production build
npm run preview # preview build at http://localhost:5173
```

## Deploy
- Vercel/Netlify: import as a Vite app. Build: `npm run build`. Publish `dist/`.

## Structure
```
mindly-react/
├─ index.html
├─ package.json
├─ postcss.config.js
├─ tailwind.config.js
├─ tsconfig.json
├─ vite.config.ts
└─ src/
   ├─ index.css
   ├─ main.tsx
   ├─ pages/
   │  ├─ Home.tsx
   │  ├─ Chatbot.tsx
   │  ├─ Resources.tsx
   │  ├─ About.tsx
   │  └─ Contact.tsx
   └─ shared/
      ├─ RootLayout.tsx
      └─ ThemeToggle.tsx
```
