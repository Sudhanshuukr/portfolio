# Sudhanshu Kumar — Developer Portfolio

Personal developer portfolio for **Sudhanshu Kumar**, Full-Stack Developer and Computer Science undergraduate ('27 Batch). This portfolio showcases real-world web products, engineering capabilities across frontend and backend stacks, technical skills, and contact channels.

🔗 **Live Website:** [https://sudhanshuworks.netlify.app/](https://sudhanshuworks.netlify.app/)  
📂 **Source Repository:** [https://github.com/Sudhanshuukr/portfolio](https://github.com/Sudhanshuukr/portfolio)

---

## Overview

This portfolio serves as a central hub presenting engineering work, production web applications, technical proficiencies, and contact information. Built with semantic HTML5, modern Tailwind CSS v4, and lightweight vanilla JavaScript, it delivers high performance, responsive design, and strict security standards.

---

## Features

- **Modern Warm Ivory & Dark Charcoal Aesthetic** — Distinctive visual identity featuring a warm ivory palette (`#FDF6F0`), dark charcoal typography (`#15191E`), and vibrant orange accents (`#F06D13`).
- **Interactive Navbar & Accessible Mobile Drawer** — Desktop navigation with active section indicator and external contact link, paired with an accessible full-screen mobile menu with keyboard (ESC) and screen-reader support.
- **Hero Showcase** — Prominent value proposition with italicized highlight, interactive dual CTAs, a 3D perspective code-editor laptop visual with file tree and floating "Currently Building" card, and professional highlight badges.
- **Featured Projects Showcase** — Dedicated product showcases with authentic live screenshots:
  - **gohyred** — AI-Powered Job Discovery Engine with verified metrics (500+ Active Users, 20K+ Jobs Indexed, 1,200+ Delhi Startups Mapped) and comprehensive technology stack logos.
  - **Resumly** — AI-Powered Resume Summarizer & Analyzer featuring Grok API summary capabilities and full-stack architecture badges.
- **Categorized Skills Matrix** — Technical skills across Languages, Frontend, Backend, Database, AI/ML, and Tooling.
- **About & Academic Profile** — Educational background (B.Tech in Computer Science, AKTU) and hackathon achievements.
- **Direct Resume PDF Download** — Direct download of `Sudhanshu-Kumar-Resume.pdf` from the organized assets directory.
- **Scroll-Spy & Smooth Navigation** — Active section tracking powered by `IntersectionObserver` with synchronized URL hash handling.

---

## Tech Stack

| Technology | Purpose |
| :--- | :--- |
| **HTML5** | Semantic structure, accessibility landmarks, and accessible ARIA attributes |
| **Tailwind CSS v4** | Modern utility-first styling compiled via `@tailwindcss/cli` v4 |
| **Vanilla JavaScript (ES6+)** | Client runtime, mobile drawer state, scroll-spy, and smooth navigation |
| **Netlify** | Edge CDN hosting with strict Content Security Policy HTTP headers |

---

## Project Structure

```text
portfolio/
├── index.html              # Main HTML document and single-page layout
├── _headers                # Netlify edge HTTP security response headers
├── package.json            # NPM scripts and devDependencies for Tailwind CLI
├── package-lock.json       # Exact dependency lockfile
├── README.md               # Project documentation
│
├── assets/                 # Static media and document assets
│   ├── docs/
│   │   └── resume.pdf      # Local resume PDF asset for direct download
│   ├── icons/
│   │   └── favicon.svg     # Clean vector favicon and logo asset
│   └── images/
│       └── projects/
│           ├── gohyred_preview.png   # Authentic gohyred interface preview
│           └── resumly_preview.png   # Authentic Resumly interface preview
│
├── css/
│   ├── input.css           # Tailwind CSS v4 source styles and theme tokens
│   └── style.css           # Compiled, minified production stylesheet
│
└── js/
    └── script.js           # Client runtime logic, mobile menu, and scroll-spy
```

### Key Files & Directories

* **[`index.html`](index.html)** — Semantic single-page application containing all sections (`#home`, `#about`, `#skills`, `#projects`, `#services`, `#contact`, `footer`).
* **[`assets/`](assets/)** — Cleanly categorized subdirectories for images, icons, and document downloads.
* **[`css/input.css`](css/input.css)** — Tailwind `@theme` design tokens, base layer overrides, and custom utility classes.
* **[`css/style.css`](css/style.css)** — Minified production stylesheet built by Tailwind CLI v4.
* **[`js/script.js`](js/script.js)** — Lean vanilla JavaScript managing mobile navigation, scroll-spy focal tracking, and header scroll effects.
* **[`_headers`](_headers)** — Production HTTP security response headers delivered by Netlify.

---

## Security Hardening

The portfolio incorporates defense-in-depth security headers and client-side best practices:

* **Content Security Policy (CSP)** — Strict policy delivered via `_headers` restricting script, style, font, and image execution to whitelisted origins (`'self'`, Google Fonts).
* **Clickjacking Protection** — Enforced via `frame-ancestors 'none'` (CSP) and `X-Frame-Options: DENY`.
* **MIME Sniffing Defense** — `X-Content-Type-Options: nosniff` enforced across all responses.
* **Referrer Control** — `Referrer-Policy: strict-origin-when-cross-origin` protects sensitive URL paths during outbound navigation.
* **Permissions Policy** — Restricts unused browser features (camera, microphone, geolocation, browsing topics).
* **Transport Security (HSTS)** — `Strict-Transport-Security: max-age=31536000; includeSubDomains` enforces HTTPS.
* **Isolated Outbound Links** — All external links enforce `rel="noopener noreferrer"`.
* **Zero Secret Exposure** — Static client-side architecture with zero exposed credentials or environment keys.

---

## Getting Started

Follow these steps to set up and run the portfolio locally.

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

Open `index.html` directly in any modern browser, or run a local HTTP server:

```bash
npx http-server ./
```

Open `http://localhost:8080` in your browser.

---

## Contact

* **Email:** [sudhanshukr388@gmail.com](mailto:sudhanshukr388@gmail.com)
* **LinkedIn:** [linkedin.com/in/sudhanshu-kumar-9a5687247](https://www.linkedin.com/in/sudhanshu-kumar-9a5687247)
* **GitHub:** [github.com/sudhanshuukr](https://github.com/sudhanshuukr)

---

## License

This project is open source and available under the [MIT License](LICENSE).
