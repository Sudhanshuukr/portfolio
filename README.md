# Sudhanshu Kumar — Portfolio

Personal developer portfolio for **Sudhanshu Kumar**, a Full Stack MERN Developer and Computer Science undergraduate. This project showcases my technical skills, featured web applications, open-source work, and contact information through a modern, high-performance web experience.

🔗 **Live Website:** [https://sudhanshuworks.netlify.app/](https://sudhanshuworks.netlify.app/)  
📂 **Source Repository:** [https://github.com/Sudhanshuukr/portfolio](https://github.com/Sudhanshuukr/portfolio)

---

## Overview

This portfolio serves as a central hub presenting my engineering background, technical proficiency across modern web stacks, and active project builds. Visitors can explore detailed breakdowns of my featured projects, examine my core capabilities across frontend and backend engineering, directly download my resume, and connect with me across professional platforms.

---

## Features

- **Dark-Themed Obsidian Interface** — Clean visual aesthetic with carefully balanced indigo and cyan accent highlights.
- **Star Constellation Intro Loader** — Canvas-driven intro animation where particles assemble to spell "SUDHANSHU" on the home section before smoothly revealing the site.
- **Interactive Tech Constellation** — Interactive hero-section canvas rendering connected technology nodes that respond to cursor movement.
- **Typing Subtitle Carousel** — Dynamic typing effect rotating across engineering specializations.
- **About & Academic Profile** — Education background (B.Tech in Computer Science, AKTU, CGPA: 8.2), hackathon qualifier recognition (WCHL 2025), and leadership activities.
- **Categorized Skills Matrix** — Organized capability tiles spanning Languages, Frontend, Backend, Databases, AI/ML Integrations, and Developer Tooling.
- **Featured Projects Showcase** — In-depth project cards highlighting production platforms including **Gohyred** (AI-powered job discovery engine) and **Resumly** (AI resume summarizer).
- **Direct Resume PDF Download** — The Resume CTA button directly downloads `Sudhanshu-Kumar-Resume.pdf` locally via native HTML5 download behavior without external redirects.
- **Responsive Dual Navigation** — Desktop sticky glassmorphism header paired with an accessible floating navigation bar for mobile viewports.
- **Scroll-Spy & Smooth Navigation** — Dynamic active section tracking powered by `IntersectionObserver` with sanitized URL hash handling.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic document structure and accessible markup |
| **Tailwind CSS v4** | Modern utility-first styling compiled via `@tailwindcss/cli` |
| **Vanilla JavaScript (ES6+)** | Client-side interactivity, DOM lifecycle, and scroll management |
| **HTML5 Canvas API** | Particle intro loader and interactive node constellation graphics |
| **Netlify** | Edge CDN hosting and authoritative HTTP security response header delivery |

---

## Project Structure

```text
portfolio/
├── index.html          # Main HTML document and single-page layout
├── resume.pdf          # Local resume PDF asset for direct download
├── _headers            # Netlify edge HTTP security response headers
├── css/
│   ├── input.css       # Tailwind CSS v4 source styles and custom theme tokens
│   └── style.css       # Compiled, minified production stylesheet
├── js/
│   └── script.js       # Client runtime logic, canvas animations, and navigation
├── s logo.svg          # Vector logo and favicon asset
├── package.json        # NPM scripts and devDependencies for Tailwind CLI
├── package-lock.json   # Exact dependency lockfile
└── README.md           # Project documentation
```

### Key Files & Directories

* **[`index.html`](index.html)** — Semantic single-page application containing all sections (Hero, About, Skills, Projects, Services, Contact, Footer).
* **[`_headers`](_headers)** — Production HTTP response header rules delivered by Netlify's edge CDN.
* **[`resume.pdf`](resume.pdf)** — Binary PDF served directly when visitors click the Resume download action.
* **[`css/input.css`](css/input.css)** — Tailwind `@theme` definitions, obsidian palette variables, and component utility classes.
* **[`css/style.css`](css/style.css)** — Minified output stylesheet built by the Tailwind CLI.
* **[`js/script.js`](js/script.js)** — Pure JavaScript managing canvas particle rendering, scroll-spy intersection observers, safe hash navigation, and UI transitions.

---

## Security

Security hardening has been applied, and the deployed site has been tested for common client-side and configuration issues:

* **Content Security Policy (CSP)** — Strict policy delivered via HTTP response headers restricting script, style, font, and image execution to whitelisted origins (`'self'`, Google Fonts).
* **Frame Protections** — Clickjacking and UI redressing mitigated using both `frame-ancestors 'none'` (CSP) and `X-Frame-Options: DENY`.
* **MIME Sniffing Defense** — `X-Content-Type-Options: nosniff` enforced across all document and asset responses.
* **Referrer Control** — `Referrer-Policy: strict-origin-when-cross-origin` protects sensitive URL paths during outbound navigation.
* **Hardware API Lockdown** — `Permissions-Policy` restricts unused browser features (camera, microphone, geolocation, tracking topics).
* **Transport Security (HSTS)** — `Strict-Transport-Security` enforces HTTPS across all connections.
* **Safe Client-Side Routing** — URL fragment/hash resolution uses sanitized element ID lookups (`document.getElementById`) to prevent DOM selector injection or client-side denial of service.
* **Isolated External Links** — Outbound links enforce `rel="noopener noreferrer"` to prevent reverse tabnabbing.
* **Zero Secret Exposure** — Pure client-side static architecture with no exposed environment variables or API keys.

---

## Getting Started

Follow these steps to set up and run the portfolio locally on your machine.

### Prerequisites

* **Node.js** (v18.0.0 or higher)
* **npm** (bundled with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/Sudhanshuukr/portfolio.git
cd portfolio
```

### 2. Install Dependencies

```bash
npm install
```

### 3. Build & Watch Styles (Tailwind CSS v4)

To watch for CSS changes during development:

```bash
npm run watch
```

To compile and minify the production stylesheet:

```bash
npm run build
```

### 4. Run Locally

You can open `index.html` directly in any modern web browser, or serve it using a local HTTP server:

```bash
npx http-server ./
```

Open `http://localhost:8080` in your browser to view the site.

---

## Contact

* **Email:** [sudhanshukr388@gmail.com](mailto:sudhanshukr388@gmail.com)
* **LinkedIn:** [linkedin.com/in/sudhanshu-kumar-9a5687247](https://www.linkedin.com/in/sudhanshu-kumar-9a5687247)
* **GitHub:** [github.com/sudhanshuukr](https://github.com/sudhanshuukr)

---

## License

This project is open source and available under the [MIT License](LICENSE).
