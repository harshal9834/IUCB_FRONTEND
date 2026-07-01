# IUCB Admin Dashboard MVP

This is the Enterprise Admin Dashboard MVP for IUCB (The Global Authority for Accreditation & Certification). 

## Technology Stack

### Frontend
- **Framework**: React 19 + TypeScript + Vite
- **Routing**: TanStack Router / TanStack Start
- **Styling**: Tailwind CSS + CSS Variables
- **UI Components**: Shadcn UI + Radix UI + Lucide Icons
- **State Management**: TanStack Query (React Query)
- **Forms & Validation**: React Hook Form + Zod
- **HTTP Client**: Axios with configured base instance and local storage interceptors

### Backend
- **Runtime & Web Framework**: Node.js + Express (ES Modules)
- **Database ORM**: Prisma ORM with PostgreSQL client
- **Validation & Security**: Express Validator, Helmet, CORS
- **Authentication**: JWT authentication baseline, bcrypt password hashing

---

## Directory Structure & Architecture

```
IUCB_INTERN/
├── backend/                   # Backend Express + TS Service Layer
│   ├── prisma/                # Prisma schema definition files
│   │   └── schema.prisma      # DB definitions and database engine targets
│   ├── src/
│   │   ├── config/            # DB configuration & initialization modules
│   │   ├── controllers/       # HTTP Request/Response controllers (MVC)
│   │   ├── repositories/      # Database abstraction access pattern layers
│   │   ├── services/          # Core Business logic layer
│   │   ├── routes/            # Router definitions mapping requests to controllers
│   │   ├── middlewares/       # JWT auth guards, logging, & request validation filters
│   │   ├── utils/             # Reusable formatters and cryptographic helper scripts
│   │   ├── app.ts             # Express main application configurations
│   │   └── server.ts          # Server listener configuration entry-point
│   ├── tsconfig.json          # Node Next configuration options
│   └── package.json           # Backend dependency manifests
│
├── frontend/                  # Frontend SPA Web Client
│   ├── src/
│   │   ├── components/        # Reusable UI component libraries
│   │   │   └── ui/            # Pre-configured core Shadcn primitive tags
│   │   ├── context/           # React Global context and authentication states
│   │   ├── lib/               # Custom system libs (Axios API Clients)
│   │   ├── routes/            # Page trees, layouts, and route definitions
│   │   ├── hooks/             # Reusable react hooks (API queries)
│   │   ├── config/            # Frontend core configurations
│   │   ├── styles.css         # Global tailwind styles
│   │   └── start.ts           # App setup entrypoint
│   ├── vite.config.ts         # Vite server settings and plugins
│   ├── tsconfig.json          # TS target environments for bundlers
│   └── package.json           # Frontend packages lists
```

### Explanation of Foldes and Why They Exist

#### Backend Folder Structure
- **`backend/src/config/`**: Houses all external service initialization modules (e.g., Prisma database connections). This separates connectivity concerns from request handlers.
- **`backend/src/repositories/`**: Implements the Repository Pattern, abstracting direct SQL or Prisma calls from the business logic. It provides a standard CRUD interface for databases.
- **`backend/src/services/`**: The core business logic layer. Ensures business constraints are met before database operations. This isolates rules from both controllers and repositories.
- **`backend/src/controllers/`**: Receives requests from routes, triggers services, and sends JSON response bodies. It contains no direct queries, maintaining single responsibility.
- **`backend/src/routes/`**: Bridges endpoints with their matching controller functions.
- **`backend/src/middlewares/`**: Houses request validators, JWT checks, CORS layers, and security policies that filter requests before execution.
- **`backend/src/utils/`**: Shared static utilities, email templates, and standard encryption helpers.

#### Frontend Folder Structure
- **`frontend/src/components/ui/`**: Base design system primitives (buttons, inputs, tables, dialogs) derived from Shadcn UI.
- **`frontend/src/context/`**: Manages shared states across pages (e.g. auth-context, theme, current session data).
- **`frontend/src/lib/`**: External module configuration instances, such as the `api-client` (Axios configuration with request & response interceptors).
- **`frontend/src/routes/`**: Holds route pages mapping to paths using file-based routing.

---

## Setup & Run Instructions

### Prerequisites
- Node.js (v18+)
- PostgreSQL database instance

### Backend Setup
1. Open a terminal and navigate to the backend directory:
   ```bash
   cd backend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment configuration:
   - Duplicate `.env.example` to `.env`.
   - Update `DATABASE_URL` with your PostgreSQL database connection string.
4. Run Prisma client generation:
   ```bash
   npx prisma generate
   ```
5. Run the backend development server:
   ```bash
   npm run dev
   ```

### Frontend Setup
1. Open a terminal and navigate to the frontend directory:
   ```bash
   cd frontend
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Setup environment configuration:
   - Duplicate `.env.example` to `.env` (maps local dev API endpoint).
4. Run the frontend development server:
   ```bash
   npm run dev
   ```
5. Open your browser and access [http://localhost:8080/](http://localhost:8080/).
