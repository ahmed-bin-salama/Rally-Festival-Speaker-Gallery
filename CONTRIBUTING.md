# Contributing to Rally Speaker Gallery 2026

Thank you for contributing to the Rally Speaker Gallery 2026 project! This repository contains the speaker gallery and interview companion tool for Rally Festival 2026.

## Development Setup

1. **Clone the repository**:
   ```bash
   git clone https://github.com/ahmed-bin-salama/Rally-Speaker-Gallery-2026.git
   cd Rally-Speaker-Gallery-2026
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Start local development server**:
   ```bash
   npm run dev
   ```

## Source of Truth for Data

> **IMPORTANT RULE**: `src/data/speakersData.ts` is the canonical, immutable dataset for all 18 speakers and 180 interview questions.

- Do **not** manually edit, rephrase, or truncate speaker text or question wording.
- If generator scripts in `scripts/parse-speakers.js` are executed, ensure the canonical wording, Arabic typography, and question count invariants (18 speakers × 10 questions = 180 questions) are fully maintained.

## Testing & Quality Assurance

Before submitting any Pull Request or change, ensure all quality checks pass:

1. **Type Checking**:
   ```bash
   npx tsc --noEmit
   ```

2. **Production Build**:
   ```bash
   npm run build
   ```

3. **Manual Verification**:
   - Verify that all 18 speaker cards render on the gallery page.
   - Verify that navigating to `#speaker/<id>` displays all 10 questions and the introduction.
   - Verify that the Random Interview Wheel (`#random-interview`) spins, supports keyboard interaction (`Space`/`Enter`), and records drawn questions.
   - Verify that localStorage errors or invalid speaker route URLs degrade gracefully without crashing.

## Coding Guidelines

- **Architecture**: Keep components modular in `src/components/` and `src/random-interview/`.
- **Styling**: Use Tailwind CSS classes, preserving the Rally color palette (`#0d0e12` dark background, `#800020` burgundy, and `#D4AF37` gold accents).
- **Accessibility**: Use semantic HTML controls (e.g. `<button>`), include explicit `:focus-visible` styles, and supply ARIA attributes for interactive states (`aria-expanded`, `aria-live`, `aria-label`).
- **Dependencies**: Minimize external packages; prefer standard Web APIs and React state management.

## Deployment

Pushes to the `main` branch trigger automated build and deployment to GitHub Pages via `.github/workflows/deploy.yml`. Ensure `npm run build` succeeds locally before pushing changes to `main`.
