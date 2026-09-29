# Rally Speaker Gallery 2026

A responsive web application and interview companion for Rally Festival 2026. Featuring 18 speakers, complete professional backgrounds, introductions, and 180 structured interview questions (10 questions per speaker), alongside a thematic 60-question Random Interview Wheel.

## Features

- **Speaker Gallery**: Filterable, priority-sorted index of 18 speakers with status tracking (Unprocessed → Postponed → Failed → Completed).
- **Speaker Detail Pages**: Comprehensive view displaying speaker identity, status controls, Arabic interview introductions, and 10 structured questions with persistent note taking.
- **Random Interview Wheel**: An interactive 60-question thematic wheel across 6 core segments with single-draw tracking, session progress, undo step, and reset capabilities.
- **LocalStorage Persistence**: Persistent client-side saving for speaker interview statuses and individual question notes, built with fallback resilience.
- **Rally Visual Identity**: Customized dark-mode theme utilizing Rally's color palette (`#0d0e12` background, `#800020` burgundy, and `#D4AF37` gold).
- **Accessibility & Keyboard Support**: Full keyboard accessibility, visible focus states (`:focus-visible`), ARIA attributes, and `aria-live` polite region announcements.
- **Resilient SPA Routing**: Hash-based routing (`#speaker/<id>` and `#random-interview`) with safe URI decoding and invalid route safeguards.

## Tech Stack

- **React**: 18.2.0
- **TypeScript**: 5.3.3
- **Vite**: 6.0.0
- **Tailwind CSS**: 3.4.1
- **Icons**: lucide-react

## Prerequisites

- **Node.js**: v18.x or higher
- **npm**: v9.x or higher

## Getting Started

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open your browser at `http://localhost:5173`.

3. **Build for Production**:
   ```bash
   npm run build
   ```
   Generates optimized production assets in the `dist/` directory.

4. **Preview Production Build**:
   ```bash
   npm run preview
   ```

## Project Structure

```text
.
├── .github/
│   └── workflows/          # GitHub Actions deployment workflows
├── public/
│   └── assets/             # Brand logos, diagrams, and static assets
├── scripts/
│   └── parse-speakers.js   # Generator script for compiling Markdown data
├── src/
│   ├── components/         # React components (GalleryHeader, SpeakerCard, etc.)
│   ├── data/
│   │   └── speakersData.ts # Canonical speaker and question dataset
│   ├── random-interview/   # 60-question Random Interview Wheel module
│   ├── types/              # TypeScript interfaces and status types
│   ├── utils/              # Sorting and local storage resilience helpers
│   ├── App.tsx             # Main Application shell and hash router
│   ├── index.css           # Tailwind directives and focus styles
│   └── main.tsx            # React entrypoint wrapped in ErrorBoundary
├── index.html              # Entry HTML template
├── package.json            # Project dependencies and npm scripts
├── tailwind.config.js      # Tailwind styling configuration
├── tsconfig.json           # TypeScript configuration
└── vite.config.ts          # Vite build configuration (base: './')
```

## Data Model & Source of Truth

- `src/data/speakersData.ts` is the canonical source of truth for all 18 speakers and 180 interview questions.
- Each speaker object includes 10 structured questions, an introduction, role, and avatar path reference.

## Deployment

The application is configured with `base: './'` in `vite.config.ts` for static hosting compatibility (e.g. GitHub Pages or Cloudflare Pages). Automated build and deployment to GitHub Pages is configured via `.github/workflows/deploy.yml`.
