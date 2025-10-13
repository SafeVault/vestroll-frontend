# VestRoll Payroll System - Web Application

Enterprise Payroll management web platform built with React, TypeScript and Next.js featuring real-time analytics, cryptocurrency integration, and AI insights.

## Technology Stack

- **Framework**: Next.js 14+ (App Router)
- **Language**: TypeScript 5+
- **UI Library**: React 18+
- **Styling**: Tailwind CSS 3+
- **State Management**: Zustand / Redux Toolkit
- **Data Fetching**: React Query (TanStack Query)
- **Forms**: React Hook Form + Zod validation
- **Charts**: Recharts / Chart.js
- **Blockchain**: ethers.js / web3.js
- **Authentication**: NextAuth.js
- **Testing**: Jest + React Testing Library + Playwright



## Installation

```bash
# Clone repository
git clone https://github.com/SafeVault/vestroll-frontend.git
cd vestroll-frontend

# Install dependencies
npm install
# or
yarn install
# or
pnpm install

# Copy environment variables
cp .env.example .env.local
# Edit .env.local with your values

# Run development server
npm run dev
# or
yarn dev
# or
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

```bash
# Development
npm run dev              # Start dev server (hot reload enabled)
npm run build            # Build production bundle
npm run start            # Start production server
npm run lint             # Run ESLint
npm run lint:fix         # Fix linting issues
npm run type-check       # Run TypeScript type checking

# Testing
npm run test             # Run all tests
npm run test:watch       # Run tests in watch mode
npm run test:coverage    # Generate coverage report
npm run test:e2e         # Run end-to-end tests
npm run test:unit        # Run unit tests only

# Code Quality
npm run format           # Format code with Prettier
npm run format:check     # Check code formatting
npm run analyze          # Analyze bundle size
npm run prepare          # Setup Husky git hooks

# Database (if using Prisma)
npm run db:generate      # Generate Prisma client
npm run db:push          # Push schema changes
npm run db:migrate       # Run migrations
npm run db:studio        # Open Prisma Studio
```

