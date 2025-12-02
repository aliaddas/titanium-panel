# Titanium Panel

Admin dashboard for managing e-commerce stores. Built with Next.js 16.

![Dashboard Screenshot](docs/screenshot-panel.png)

## Getting Started

```bash
yarn install
cp .env.example .env  # fill in your values
yarn prisma generate
yarn prisma db push
yarn dev
```

Open [http://localhost:3000](http://localhost:3000), sign in with Clerk, and create your first store.

## Environment Variables

```env
# Database
DATABASE_URL_DEV_LOCAL="postgresql://..."

# Clerk Auth
NEXT_PUBLIC_CLERK_PUBLISHABLE_KEY="pk_..."
CLERK_SECRET_KEY="sk_..."

# Supabase Storage
NEXT_PUBLIC_SUPABASE_URL="https://..."
NEXT_PUBLIC_SUPABASE_ANON_KEY="..."
```

## Project Structure

```
app/
├── (auth)/           # Sign in/up pages
├── (onboarding)/     # Store creation flow
├── (panel)/          
│   └── [storeID]/    # Store-specific pages
│       ├── products/ # Product management
│       ├── orders/   # Order management
│       └── settings/ # Store settings
└── api/              # API routes

components/
├── ui/shadcn/        # Base components
├── modals/           # Dialogs
└── products/         # Product-specific UI

prisma/
└── schema/           # Split Prisma schemas
```

## Key Features

**Products & Variants**

The variant system is flexible - you can create lists like "Size" or "Color", add options, and track inventory per combination:

```
Product: T-Shirt ($29.99)
├── Size: [S, M, L, XL]
├── Color: [Black, White, Navy]
└── Inventory: S+Black=25, M+Black=50, ...
```

**Multi-Store**

Each user can create multiple stores. The URL structure is `/:storeID/products`, `/:storeID/orders`, etc.

**Real-time Chat**

The Client Hub connects to the WebSocket server for customer support messaging.

## Prisma

This project uses [split Prisma schemas](https://www.prisma.io/docs/concepts/components/prisma-schema/multi-file-schema) in `prisma/schema/`:

```bash
yarn prisma generate          # Generate client
yarn prisma db push           # Push schema to DB
yarn prisma studio            # Open Prisma Studio
yarn prisma migrate dev       # Create migration
```

## Scripts

```bash
yarn dev          # Start dev server
yarn build        # Production build
yarn lint         # Run ESLint
```

---

Back to [main README](../README.md)
