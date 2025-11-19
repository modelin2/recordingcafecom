# Recording Café - K-pop Entertainment Space

## Overview

Recording Café is a premium content creation space that combines café ambiance with professional entertainment industry facilities. The platform targets everyday people who want to become content creators through recording studios, professional photography, and live broadcasting services. The business model draws inspiration from K-pop entertainment leaders (HYBE, SM Entertainment) while maintaining accessibility for general consumers.

The application serves as a marketing and booking platform for a franchise business with 10+ years of entertainment industry experience, featuring patented technology for AI-powered photography and multi-channel live broadcasting capabilities.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework**: React 18+ with TypeScript running on Vite for fast development and optimized production builds.

**Routing**: Wouter for lightweight client-side routing, currently implementing a single-page application with Home and 404 pages.

**UI Component Library**: Shadcn/ui with Radix UI primitives, providing accessible, customizable components styled with Tailwind CSS. The design system follows a "New York" style variant with custom color schemes emphasizing gold accents (#D4AF37) for premium branding.

**Styling Strategy**: 
- Tailwind CSS with custom configuration for brand-specific colors and spacing
- Custom CSS variables for theming (light/dark mode support)
- Typography hierarchy using Inter and Space Grotesk fonts
- Mobile-first responsive design with breakpoints at 768px (md) and 1024px (lg)

**State Management**: TanStack Query (React Query) for server state management with custom query client configuration. No global client state management library - relies on React hooks and component state.

**Design System**: 
- Component-based architecture with reusable UI components
- Hover and active elevation effects for interactive elements
- Consistent spacing using Tailwind's spacing scale (4, 6, 8, 12, 16, 20, 24)
- Card-based layouts with subtle shadows and borders

### Backend Architecture

**Server Framework**: Express.js with TypeScript, configured as an ES module.

**Development Setup**: 
- Vite middleware integration for HMR during development
- Custom logging middleware for API request tracking
- Raw body parsing for webhook/payment integrations

**API Structure**: RESTful API with routes prefixed with `/api`. Currently implements a minimal route setup with placeholder for CRUD operations.

**Session Management**: Uses `connect-pg-simple` for PostgreSQL-based session storage, though sessions are not yet fully implemented.

**Storage Layer**: Currently implements an in-memory storage interface (`MemStorage`) with methods for user CRUD operations. This abstraction allows easy swap to database-backed storage.

### Data Storage

**Database**: PostgreSQL configured via `@neondatabase/serverless` for serverless PostgreSQL connections.

**ORM**: Drizzle ORM with:
- Schema definitions in `shared/schema.ts`
- Type-safe database operations
- Zod integration for runtime validation
- Migration support via `drizzle-kit`

**Current Schema**: Minimal user table with UUID primary keys, username, and password fields. Schema uses `gen_random_uuid()` for automatic UUID generation.

**Data Validation**: Drizzle-zod integration creates Zod schemas from Drizzle table definitions, providing type-safe validation for inserts and updates.

### Authentication & Authorization

**Current State**: Not implemented. The schema includes user table with username/password fields, suggesting future password-based authentication.

**Session Storage**: Configured for PostgreSQL-backed sessions via `connect-pg-simple`, but not yet activated in middleware.

### Application Structure

**Monorepo Layout**:
- `/client` - React frontend application
- `/server` - Express backend application
- `/shared` - Shared TypeScript types and schemas
- `/attached_assets` - Static assets (images)

**Path Aliases**:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

**Build Process**:
- Frontend: Vite builds to `dist/public`
- Backend: esbuild bundles server to `dist/index.js`
- Production: Node.js serves built assets

### Key Features

**Service Offerings** (Marketing Pages):
1. **Recording Studio**: Professional audio recording with copyright registration and revenue sharing
2. **AI Photo Studio**: Patented mirror-camera technology with AI styling
3. **Multi-Channel Broadcasting**: BORA BOX system for simultaneous streaming to 4 platforms

**Booking System**: Form-based inquiry system with toast notifications (backend not yet connected).

**Franchise Information**: Legal notice section regarding patent protection and franchise conversion process.

**Responsive Design**: Mobile-first approach with hamburger menu navigation, optimized layouts for tablet and desktop.

## External Dependencies

### Core Infrastructure

- **Database**: Neon PostgreSQL serverless database
- **Session Store**: PostgreSQL via `connect-pg-simple`

### Frontend Libraries

- **UI Components**: Radix UI primitives (@radix-ui/react-*)
- **Forms**: React Hook Form with Zod resolver (@hookform/resolvers)
- **Routing**: Wouter for client-side routing
- **Date Handling**: date-fns for date formatting and manipulation
- **Carousel**: Embla Carousel React for image carousels
- **Icons**: Lucide React + React Icons (for social media)

### Development Tools

- **Build**: Vite with React plugin
- **TypeScript**: Strict mode enabled with path aliases
- **CSS**: Tailwind CSS with PostCSS and Autoprefixer
- **Code Quality**: ESM modules, strict TypeScript configuration

### Fonts & Assets

- **Typography**: Google Fonts (Inter, Space Grotesk)
- **Images**: Static assets stored in `attached_assets` directory
- **Icons**: Lucide React for UI icons

### Potential Future Integrations

Based on the design guidelines and business model:
- Payment processing (Stripe/Korean payment gateways)
- Copyright registration APIs (US partnership mentioned)
- Social media APIs (Douyin/Xiaohongshu for Chinese market)
- Cloud storage for user-generated content
- Email service for booking confirmations