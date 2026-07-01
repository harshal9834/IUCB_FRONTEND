# Frontend Project Structure

## Overview
Clean, scalable TypeScript + React project using TanStack Router and Tailwind CSS.

## Directory Structure

```
frontend/
├── src/
│   ├── components/          # Reusable UI components
│   │   ├── ui/             # Shadcn/ui component library
│   │   ├── page-hero.tsx
│   │   ├── site-header.tsx
│   │   └── site-footer.tsx
│   │
│   ├── routes/             # Page components (TanStack Router)
│   │   ├── __root.tsx      # Root layout
│   │   ├── index.tsx       # Home page
│   │   ├── about.tsx
│   │   ├── contact.tsx
│   │   ├── directory.tsx
│   │   ├── documentation.tsx
│   │   ├── governance.tsx
│   │   ├── process.tsx
│   │   ├── services.tsx
│   │   └── verify.tsx
│   │
│   ├── hooks/              # Custom React hooks
│   │   └── use-mobile.tsx
│   │
│   ├── lib/                # Utility libraries and helpers
│   │   ├── api/            # API functions
│   │   │   └── example.functions.ts
│   │   ├── certificate-pdf.ts
│   │   ├── config.server.ts
│   │   └── error-page.ts
│   │
│   ├── config/             # Application configuration
│   │   └── app.config.ts   # App & SEO config
│   │
│   ├── utils/              # Utility functions
│   │   ├── classnames.ts   # cn() utility
│   │   └── index.ts
│   │
│   ├── types/              # TypeScript type definitions
│   │   └── index.ts
│   │
│   ├── constants/          # Application constants
│   │   └── index.ts
│   │
│   ├── router.tsx          # Router configuration
│   ├── routeTree.gen.ts    # Auto-generated route tree
│   ├── server.ts           # SSR server entry
│   ├── start.ts            # App entry point
│   └── styles.css          # Global styles
│
├── public/                 # Static assets
├── vite.config.ts          # Vite configuration
├── tsconfig.json           # TypeScript configuration
├── package.json            # Dependencies
└── PROJECT_STRUCTURE.md    # This file
```

## Key Directories

### `/components`
Reusable UI components built with React and Tailwind CSS.
- **ui/**: Shadcn/ui component library
- Layout components (header, footer, hero)

### `/routes`
Page components using TanStack Router file-based routing.
- Each `.tsx` file maps to a route
- `__root.tsx` is the root layout

### `/hooks`
Custom React hooks for reusable logic.

### `/lib`
Library functions and utilities.
- **api/**: API integration functions
- Certificate generation, server config, error handling

### `/config`
Centralized application configuration.
- App metadata, SEO configuration

### `/utils`
Helper utility functions.
- Tailwind className merging

### `/types`
TypeScript type definitions and interfaces.

### `/constants`
Application-wide constants and environment variables.

## Getting Started

### Install Dependencies
```bash
bun install
```

### Development
```bash
bun run dev
```

### Build
```bash
bun run build
```

### Lint & Format
```bash
bun run lint
bun run format
```

## Tech Stack
- **Framework**: React 19 + TanStack Start
- **Routing**: TanStack Router
- **Styling**: Tailwind CSS
- **UI Components**: Shadcn/ui + Radix UI
- **Forms**: React Hook Form
- **Type Safety**: TypeScript
- **Build Tool**: Vite
