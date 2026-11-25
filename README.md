# Sudhanshu Kumar — Developer Portfolio

Personal developer portfolio for **Sudhanshu Kumar**, a Full-Stack Web Developer and Computer Science undergraduate ('27 Batch). This portfolio presents verified engineering projects, technical capabilities across modern frontend and backend architectures, categorized skill matrices, and direct communication channels.

🔗 **Live Website:** [https://sudhanshuworks.netlify.app/](https://sudhanshuworks.netlify.app/)  
📂 **Source Repository:** [https://github.com/Sudhanshuukr/portfolio](https://github.com/Sudhanshuukr/portfolio)

---

## Overview

The portfolio is designed as a focused, high-performance single-page application showcasing production web products, system architecture capabilities, and clean UI engineering. Built with semantic HTML5, modern Tailwind CSS v4, and vanilla JavaScript, it achieves fast load times, WCAG accessibility compliance, and strict defense-in-depth security standards without relying on heavy client frameworks.

---

## Tech Stack

| Domain | Technology | Implementation Details |
| :--- | :--- | :--- |
| **Markup** | **HTML5** | Semantic landmarks, accessible ARIA roles, responsive viewport meta |
| **Styling** | **Tailwind CSS v4** | Utility-first architecture compiled via `@tailwindcss/cli` v4.3.2, custom CSS variables, `@theme` design tokens |
| **Client Scripting** | **Vanilla JavaScript (ES6+)** | Accessible mobile drawer navigation, `IntersectionObserver` scroll-spy, header scroll transitions, interactive tech tooltips |
| **Typography** | **Self-Hosted WOFF2 Fonts** | High-performance Brotli-compressed variable fonts (Manrope, Inter, Playfair Display) |
| **Icons & Assets** | **Vector SVG** | Authentic brand logos for technologies, crisp scalable vector favicon |
| **Tooling & Build** | **Node.js & NPM** | Build pipeline using `@tailwindcss/cli` for zero-overhead minified production CSS |
| **Edge & Security** | **Netlify** | Production `_headers` configuration enforcing Content Security Policy (CSP), HSTS, frame protection, and MIME sniffing prevention |

---

## Typography System

The portfolio utilizes a premium three-font typographic hierarchy, self-hosted as local WOFF2 variable fonts to eliminate external network hops and font flicker:

1. **Manrope** (`assets/fonts/manrope-latin.woff2`): Primary typography for brand identity (`SK.`), navigation links, section titles (`h2`), project names, metric statistics, and the contact email.
2. **Inter** (`assets/fonts/inter-latin.woff2`): Supporting typography for paragraphs, biographies, project descriptions, button labels, tooltips, and footer details.
3. **Playfair Display** (`assets/fonts/playfair-display-italic-latin.woff2`): High-contrast editorial serif accents applied to italicized keywords (*"ship"* in the hero headline and *"useful"* in About Me).

---

## Features

- **Refined Warm Minimalist Design:** Curated palette featuring warm ivory (`#FDF6F0`), dark charcoal text (`#15191E`), warm card surfaces (`#FEFDFC`), subtle borders (`#F0ECE4`), and vibrant orange accents (`#F06D13`).
- **Interactive Navigation & Accessible Mobile Drawer:** Fixed desktop navbar with smooth section scrolling, active focal state indicators, and an accessible mobile overlay drawer supporting keyboard navigation (ESC key to dismiss) and screen-reader semantics.
- **Hero Section:** Personal identity badge (`SUDHANSHU KUMAR / FULL-STACK DEVELOPER`), value proposition headline with editorial serif accent, dual CTAs ("View Projects" and "Download Resume"), floating "Currently Building" card, and custom Windows-style code editor illustration.
- **Product Highlights Cards:** Quick metric tiles for `3+ Real Projects`, `Product Focused`, and `Open to Opportunities`.
- **Featured Projects Showcase:** Detailed project cards featuring verified production metrics, authentic UI previews, architecture badges, and direct links:
  - **gohyred:** AI-Powered Job Discovery Platform (`500+ Active Users`, `20K+ Jobs Indexed`, `1,200+ Delhi Startups Mapped`).
  - **Resumly:** AI-Powered Resume Summarizer & Analyzer built with full-stack serverless endpoints.
- **Categorized Technical Skills Toolkit:** Organized matrix displaying authentic brand SVG icons across Languages, Frontend, Backend, Database, and Tooling with responsive tap-and-hover technology labels.
- **About Me & Academic Profile:** Professional background, software engineering philosophy, B.Tech Computer Science profile ('27 Batch), and verified metrics (`3+ Projects`, `1K+ Active Users Across gohyred`, `End-to-End Product Ownership`).
- **Contact & Let's Connect:** Balanced two-column contact composition featuring a prominent headline, supporting copy, interactive email pill (`sudhanshukr388@gmail.com`), social channels (LinkedIn, GitHub, X), and live availability indicator.
- **Direct Resume Access:** One-click download of the developer resume from `assets/docs/resume.pdf`.

---

## Project Structure

```text
portfolio/
├── index.html              # Main HTML document & single-page layout
├── _headers                # Production HTTP security headers (CSP, HSTS)
├── package.json            # NPM scripts & devDependencies for Tailwind CLI
├── package-lock.json       # Exact dependency lockfile
├── README.md               # Project documentation
├── .gitignore              # Git ignore rules for clean repository hygiene
│
├── assets/                 # Production media, document, and font assets
│   ├── docs/
│   │   └── resume.pdf      # PDF resume asset for direct download
│   ├── fonts/              # Self-hosted WOFF2 variable fonts
│   │   ├── inter-latin.woff2
│   │   ├── inter-latin-ext.woff2
│   │   ├── manrope-latin.woff2
│   │   ├── manrope-latin-ext.woff2
│   │   ├── playfair-display-italic-latin.woff2
│   │   ├── playfair-display-italic-latin-ext.woff2
│   │   ├── playfair-display-latin.woff2
│   │   └── playfair-display-latin-ext.woff2
│   ├── icons/
│   │   ├── favicon.svg     # Clean vector brand favicon
│   │   └── skills/         # Authentic brand SVG logos for tech toolkit
│   │       ├── react.svg
│   │       ├── nextjs.svg
│   │       ├── nodejs.svg
│   │       ├── express.svg
│   │       ├── mongodb.svg
│   │       ├── postgresql.svg
│   │       ├── tailwindcss.svg
│   │       ├── typescript.svg
│   │       └── ...
│   └── images/             # Optimized web illustrations and project previews
│       ├── hero-laptop-windows.png
│       ├── hero_laptop_mockup.png
│       └── projects/
│           ├── gohyred_preview.png
│           └── resumly_preview.png
│
├── css/
│   ├── input.css           # Tailwind CSS v4 design tokens and utilities
│   └── style.css           # Compiled, minified production stylesheet
│
└── js/
    └── script.js           # Client runtime logic (mobile menu, scroll-spy)
```

---

## Getting Started

### Prerequisites

- **Node.js** (v18.0.0 or higher recommended)
- **npm** (bundled with Node.js)

### 1. Clone the Repository

```bash
git clone https://github.com/Sudhanshuukr/portfolio.git
cd portfolio
```

### 2. Install Build Dependencies

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

Open `index.html` directly in any modern browser, or launch a lightweight local HTTP server:

```bash
npx serve .
```

Navigate to `http://localhost:3000` in your web browser.

---

## Deployment

The portfolio is structured as a static website compatible with any modern edge CDN or static hosting provider:

- **Netlify:** Continuous deployment from GitHub with the included `_headers` file providing pre-configured HTTP security response headers (CSP, HSTS, frame protection, referrer policy).
  - Build command: `npm run build`
  - Publish directory: `.`
- **Vercel:** Static site deployment with zero configuration.
- **GitHub Pages:** Static branch publishing from `main`.

---

## Security Hardening

The repository enforces client-side defense-in-depth security headers via the Netlify `_headers` configuration:

- **Content Security Policy (CSP):** Strict policy specifying:
  - `default-src 'none'`
  - `script-src 'self'`
  - `style-src 'self' https://fonts.googleapis.com`
  - `font-src 'self' https://fonts.gstatic.com`
  - `img-src 'self'`
  - `connect-src 'none'`, `frame-src 'none'`, `object-src 'none'`, `form-action 'none'`
  - `frame-ancestors 'none'`, `base-uri 'self'`, `upgrade-insecure-requests`
- **Clickjacking Protection:** Enforced via `frame-ancestors 'none'` and `X-Frame-Options: DENY`.
- **MIME Sniffing Defense:** `X-Content-Type-Options: nosniff`.
- **Referrer Privacy:** `Referrer-Policy: strict-origin-when-cross-origin`.
- **Permissions Policy:** Restricts browser features: `camera=(), microphone=(), geolocation=(), browsing-topics=()`.
- **Transport Security (HSTS):** `Strict-Transport-Security: max-age=31536000; includeSubDomains`.

---

## Author

**Sudhanshu Kumar** — Full-Stack Developer ('27 Batch)

- **Portfolio:** [https://sudhanshuworks.netlify.app/](https://sudhanshuworks.netlify.app/)
- **Email:** [sudhanshukr388@gmail.com](mailto:sudhanshukr388@gmail.com)
- **LinkedIn:** [linkedin.com/in/sudhanshu-kumar-9a5687247](https://www.linkedin.com/in/sudhanshu-kumar-9a5687247)
- **GitHub:** [github.com/sudhanshuukr](https://github.com/sudhanshuukr)

---

## License & Proprietary Notice

&copy; 2026 Sudhanshu Kumar. All rights reserved.

### Proprietary Original Work

All original source code, website design, UI/UX layouts, custom animations, written content, personal branding, project media, and bespoke creative assets created for this portfolio are the exclusive intellectual property of **Sudhanshu Kumar**.

- **All Rights Reserved:** No permission is granted to copy, reproduce, modify, fork, redistribute, sublicense, publish, or commercially exploit any portion of the original work without prior explicit written authorization.
- **No License Granted by Public Access:** Viewing, starring, or accessing this public repository does not grant a license or transfer of rights to use its original contents as a template, clone, or baseline for personal or commercial projects.

### Third-Party Assets & Attribution

Third-party software, libraries, fonts, and trademarks referenced or utilized within this repository remain the property of their respective owners and are governed by their original licenses and terms:

- **Build Tools & Libraries:** Tailwind CSS is licensed under the [MIT License](https://github.com/tailwindlabs/tailwindcss/blob/main/LICENSE).
- **Typography:** Self-hosted web fonts ([Manrope](https://scripts.sil.org/OFL), [Inter](https://scripts.sil.org/OFL), and [Playfair Display](https://scripts.sil.org/OFL)) are licensed under the SIL Open Font License (OFL).
- **Icons & Brand Marks:** Open-source utility icons are provided via Lucide (licensed under the [ISC License](https://github.com/lucide-icons/lucide/blob/main/LICENSE)). All external technology, platform, and company trademarks or logos (e.g., React, Next.js, Node.js, MongoDB, Netlify) belong to their respective copyright and trademark holders.

For inquiries or permission requests regarding original work, contact [sudhanshukr388@gmail.com](mailto:sudhanshukr388@gmail.com).
