# Demant Newsletter Signup

A newsletter signup modal for Demant A/S, built with React 19, TypeScript, and Vite. Features a two-panel layout with a signup form and a product image.

## Prerequisites

- [Node.js](https://nodejs.org/) v18 or higher
- npm v9 or higher

## Getting Started

**Install dependencies:**

```bash
npm install
```

**Start the development server:**

```bash
npm run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser and click **Show modal** to view the signup form.

## Available Scripts

| Script            | Description                                  |
| ----------------- | -------------------------------------------- |
| `npm run dev`     | Start dev server with hot module replacement |
| `npm run build`   | Type-check and build for production          |
| `npm run preview` | Preview the production build locally         |
| `npm run lint`    | Run ESLint across all source files           |

## Project Structure

```
src/
├── App.tsx                  # Page wrapper with modal trigger
├── App.css                  # Page-level styles
├── main.tsx                 # Entry point
└── components/
    ├── SignupModal.tsx       # Modal shell (portal, ESC, scroll lock, layout)
    ├── SignupModal.css       # Modal shell styles
    ├── SignupForm.tsx        # Form state, validation, and JSX
    └── SignupForm.css        # Form-specific styles

public/
└── assets/
    ├── modalImage.jpg        # Right panel product image
    ├── trashIcon.png         # Remove address line icon
    └── addIcon.png           # Add address line icon
```

## Form Fields

- **E-mail** (required) — validated on submit
- **Clinic address lines** (optional) — 1 to 3 lines, dynamically added/removed
- **Terms & Conditions checkbox** (required)

## Building for Production

```bash
npm run build
```

Output is written to `dist/`. Serve it with any static file host or preview locally:

```bash
npm run preview
```
