# Ganesh NexGen Solutions — Official Enterprise Platform

**Tagline**: *"Your Growth. Our Technology."*  
**Location**: India  
**Platform**: Next.js 16 App Router + ASP.NET Core 9 Web API + PostgreSQL + Prisma ORM + Resend Email + OpenAI Copilot + Meta WhatsApp Cloud API

---

## Technical Stack Overview

- **Frontend**: Next.js 16 App Router, React 19, TypeScript, Tailwind CSS, Framer Motion, Lucide React, React Hook Form, Zod.
- **Design System**: Brand Palette (`#2563EB` Dominant Blue, `#0F172A` Enterprise Navy, `#10B981` Growth Green), Poppins (Headings) + Inter (Body).
- **Backend API**: ASP.NET Core 9 Web API (Clean Architecture CQRS) + Next.js App Router API endpoints.
- **Database**: PostgreSQL with Prisma ORM schema (`Lead`, `User`, `Service`, `PortfolioProject`, `BlogPost`, `ContactMessage`).
- **Integrations**: Resend Email API, Meta WhatsApp Cloud API, Razorpay Payment Gateway, OpenAI API.

---

## Directory Architecture

```
frontend/
├── prisma/
│   └── schema.prisma         # PostgreSQL schema (Leads, Users, Services, Blogs)
├── app/
│   ├── page.tsx               # High-converting Homepage
│   ├── about/page.tsx         # Company story, mission, vision, core values
│   ├── services/              # Detailed service subpages (01 to 08)
│   ├── solutions/             # Business Growth & AI Automation solutions
│   ├── industries/page.tsx    # Solutions for Startups, Retail, Healthcare, etc.
│   ├── portfolio/page.tsx     # Concept & demo project case studies
│   ├── pricing/page.tsx       # Transparent starting packages (₹10,000 to Custom)
│   ├── contact/page.tsx       # Zod-validated lead ingestion form
│   ├── admin/page.tsx         # Secure CRM Lead Management workspace
│   ├── portal/page.tsx        # Future-ready Client Portal shell
│   ├── sitemap.ts             # Dynamic XML sitemap generator
│   └── robots.ts              # Search engine directives
├── components/
│   ├── layout/                # BrandHeader, Footer, MegaMenu, MobileDrawer
│   ├── ChatBot.tsx            # Global interactive AI assistant widget
│   └── InteractiveProposalCalculator.tsx # Instant project cost estimator
└── lib/
    ├── db.ts                  # Prisma Client singleton
    ├── validation.ts          # Zod validation schemas
    └── email.ts               # Resend email dispatcher
```

---

## Local Development & Setup

1. **Install Dependencies**:
   ```bash
   npm install
   ```

2. **Configure Environment Variables**:
   Copy `.env.example` to `.env`:
   ```bash
   cp .env.example .env
   ```

3. **PostgreSQL & Prisma Migration**:
   ```bash
   npx prisma db push
   ```

4. **Run Development Server**:
   ```bash
   npm run dev
   ```
   Open `http://localhost:3000` in your browser.

5. **Production Build**:
   ```bash
   npm run build
   npm run start
   ```

---

© 2026 Ganesh NexGen Solutions. All Rights Reserved.  
*Your Growth. Our Technology.*
