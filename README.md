# Sudhanshu Kumar — Developer Portfolio

Personal portfolio website for **Sudhanshu Kumar**, a MERN Full Stack Developer and B.Tech Computer Science student. Built with semantic **HTML5**, **Tailwind CSS v4** (compiled via CLI), and **Vanilla ES6+ JavaScript**.

🔗 **Live:** [sudhanshuukr.github.io/portfolio](https://sudhanshuukr.github.io/portfolio) *(update link once deployed)*

---

## 🧑‍💻 About the Portfolio

This is Sudhanshu Kumar's personal portfolio showcasing his skills, projects, and contact information. The site features a cinematic star-particle intro loader, smooth scroll-spy navigation, and a clean dark aesthetic with solid accent colors.

---

## 📄 Sections

| Section | Description |
|---|---|
| **Hero** | Full-name display with a typing-carousel subtitle, CTA buttons (Let's Talk, Resume), and a constellation canvas animation |
| **About** | Bio summary, B.Tech education card (AKTU, Expected July 2027), WCHL 2025 Qualifier achievement, and Hackathon Organizer activity |
| **Skills** | Four category tiles — Languages (C++, JS, HTML5, CSS3), Frontend (React, Next.js, Redux, Tailwind), Backend (Node.js, Express, REST APIs, MongoDB), Tools (Git, VS Code, Postman, DSA) |
| **Projects** | Two featured project cards with GitHub and Live Demo links |
| **What I Do** | Three service cards: Frontend Development, API Integration, Database Schemas |
| **Contact** | Email, LinkedIn, and GitHub contact cards |
| **Footer** | Navigation links and copyright |

---

## 🗂️ Featured Projects

### 1. FocusTask Manager
A task tracking web app built with vanilla JavaScript. Features dynamic DOM updates, localStorage persistence, and accessible UI.

- **GitHub:** [task-manager-js](https://github.com/Sudhanshuukr/task-manager-js)
- **Live Demo:** [sudhanshuukr.github.io/task-manager-js](https://sudhanshuukr.github.io/task-manager-js/)

### 2. Expense Tracker Console
A real-time financial tracking dashboard supporting full CRUD operations, live balance summaries, and browser localStorage state management.

- **GitHub:** [Expense-Tracker](https://github.com/Sudhanshuukr/Expense-Tracker)
- **Live Demo:** [sudhanshuukr.github.io/Expense-Tracker](https://sudhanshuukr.github.io/Expense-Tracker/)

---

## ✨ Key Features

- **Star Particle Intro Loader** — Canvas-based animation where stars assemble to spell "SUDHANSHU", then scatter as the page reveals. Only runs on the Home section; refreshing on other sections skips it.
- **Constellation Canvas** — Interactive hero-section canvas with a technical skill constellation graphic.
- **Typing Carousel** — Rotating subtitle phrases in the hero (MERN Developer, Full Stack Developer, etc.).
- **Scroll-Spy Navigation** — Active nav link updates live via `IntersectionObserver` as the user scrolls through sections.
- **Scroll-Reveal Cards** — Project cards animate in with a fade-up effect when entering the viewport.
- **Back-to-Top Button** — Appears after scrolling down, fades in/out smoothly.
- **Mobile Drawer** — Full-height slide-in navigation drawer for mobile viewports.
- **No Gradients** — Entire color system uses solid accent colors (2025 design trend): Electric Indigo · Vivid Purple · Emerald Green · Rose.
- **Performance Optimized** — Deferred JS, minified CSS, inline SVG icons, `requestAnimationFrame`-throttled scroll handlers.

---

## 🛠️ Tech Stack

| Layer | Technology |
|---|---|
| Markup | HTML5 (semantic elements: `<header>`, `<section>`, `<article>`, `<footer>`) |
| Styles | Tailwind CSS v4 — compiled via `@tailwindcss/cli` |
| Logic | Vanilla JavaScript ES6+ — no frameworks or heavy libraries |
| Icons | Inline SVGs — no external icon font dependencies |

---

## 🎨 Color Palette

All colors are solid — no gradients anywhere.

| Token | Hex | Role |
|---|---|---|
| `accent-indigo` | `#5b5bd6` | Primary buttons, CTA |
| `accent-violet` | `#9333ea` | Logo, section dividers, nav underlines |
| `accent-cyan` | `#10b981` | Labels, availability badge, skill icons |
| `accent-rose` | `#f43f5e` | Energy highlights |

---

## 📂 Project Structure

```
portfolio/
├── index.html          # Main HTML page (all sections)
├── css/
│   ├── input.css       # Source CSS — Tailwind @theme variables + custom classes
│   └── style.css       # Compiled & minified output (do not edit directly)
├── js/
│   └── script.js       # All client-side logic (loader, nav, scroll, canvas)
├── s logo.svg          # Favicon
├── package.json        # npm scripts for build/watch
└── README.md           # This file
```

---

## 💻 Local Setup

Requires **Node.js v18+** and **npm**.

```bash
# 1. Install dependencies
npm install

# 2. Watch mode (auto-recompiles CSS on changes)
npm run watch

# 3. Production build (minified CSS)
npm run build
```

Open `index.html` directly in a browser, or use a local server:

```bash
npx http-server ./
```

---

## 📬 Contact

| Method | Details |
|---|---|
| Email | sudhanshukr388@gmail.com |
| LinkedIn | [linkedin.com/in/sudhanshu-kumar-9a5687247](https://linkedin.com/in/sudhanshu-kumar-9a5687247) |
| GitHub | [github.com/sudhanshuukr](https://github.com/sudhanshuukr) |
| Location | Delhi, India |

---

## 📄 License

MIT License — free to use as a reference or template.
