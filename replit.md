# 레코딩 카페 (Recording Café)

## Overview

Recording Café is a luxury café homepage positioning the brand as a creator-focused company builder. The site features professional entertainment services (recording studio, AI self-photo studio with patented mirror camera, multi-channel live broadcasting) using a minimalist design with gold (#D4AF37) accent color.

Korean-only content with "Creator OS" section showcasing three integrated pipelines with external platform links, emphasizing AI × Entertainment × Finance for creators' lifetime revenue structure design and operation.

## Project Goals

- **Brand Positioning**: Creator-focused company builder with luxury café experience
- **Design Philosophy**: Minimalist design inspired by SUMSEI with gold (#D4AF37) as signature accent
- **Target Audience**: Korean creators and potential franchise partners
- **Business Model**: Professional entertainment services + franchise opportunities

## Design System

### Color Palette

**Primary**:
- Gold Accent: #D4AF37 (used sparingly for logo, headings, and key highlights only)
- Background: Default background color (adapts to light/dark mode)
- Foreground: Default text color (adapts to light/dark mode)
- Muted: text-muted-foreground (for secondary information)

**Design Principles**:
- Minimalist luxury: Clean, simple design that lets content breathe
- Gold is precious, use it sparingly for maximum impact
- Generous white space between elements
- No flashy animations or decorations
- Subtle interactions only

### Typography

- Main Headings: text-3xl md:text-4xl lg:text-5xl, font-bold, gold color
- Section Headings: text-2xl md:text-3xl, font-semibold, gold color
- Body Text: text-sm md:text-base, normal weight, foreground color
- Small Text: text-xs, muted-foreground color
- Font Stack: System fonts (Inter, Pretendard for Korean)

### Layout

**Spacing**:
- Tight: gap-2, gap-3 (between small elements)
- Default: gap-4, gap-6 (between cards, sections)
- Generous: gap-8, gap-12 (major section separation)
- Section Padding: py-12 md:py-16 lg:py-20

**Container**: max-w-7xl, px-4 sm:px-6 lg:px-8

**Grid Strategy**:
- Desktop: 3-column max for service cards
- Tablet: 2-column
- Mobile: Always single column

## User Preferences

- **Communication**: Simple, everyday Korean language
- **Brand Name**: "레코딩 카페" (NOT "K 레코딩 카페" or "(주)레코딩카페")
- **Design**: Minimalist with gold accents, clean and simple
- **Credit Efficiency**: Bundle 10-15 changes together for optimal credit use

## Application Structure

### Frontend Architecture

**Framework**: React 18+ with TypeScript running on Vite

**Routing**: Wouter for lightweight client-side routing (single-page application)

**UI Components**: Shadcn/ui with Radix UI primitives, styled with Tailwind CSS

**State Management**: TanStack Query for server state management

**Pages & Sections** (in order):
1. Home (Hero with video background)
2. 공간 (Space) - Interior and atmosphere showcase
3. 서비스 (Services) - Recording studio, AI photo studio, BORA BOX
4. Creator OS - Three pipelines (Actor OS, Singer OS, Influencer OS)
5. 후기 (Reviews) - 10 Klook review screenshots with modal
6. 예약 (Booking) - Naver booking system
7. 가맹점 (Franchise) - Patent protection and franchise info

### Key Features

**Recording Studio**:
- Professional audio recording
- Copyright registration
- AI-assisted creation

**AI Photo Studio**:
- Patented mirror camera technology (국내 최초)
- AI hair/makeup/styling generation
- Face features 100% preserved

**BORA BOX**:
- Multi-channel live broadcasting
- 4-channel simultaneous streaming
- Independent booth system

**Creator OS Pipelines**:
1. Actor OS - Hollywood Profile (holly.ai.kr)
2. Singer OS - China Stage (chinastage.co.kr)
3. Influencer OS - Korean Influencer Association (influencer.kr)

### Contact Information

- **Address**: 서울특별시 서초구 강남대로107길 21. 2층
- **Email**: biz@recordingcafe.com
- **Operating Hours**: 평일 12:00-21:00
- **Booking**: https://booking.naver.com/booking/12/bizes/1536339

**Parking**:
1. 공영 주차장: 서울특별시 서초구 잠원동 89-5 (도보 5분거리, 저렴)
2. 유료 주차장: 서울특별시 서초구 강남대로 101길 40 (도보 10초거리)

**Social Media**:
- Naver Blog: https://blog.naver.com/recordingcafe
- YouTube: https://www.youtube.com/@recording-cafe
- Instagram: https://www.instagram.com/recordingcafe

### Backend Architecture

**Server**: Express.js with TypeScript (ES module)

**Storage**: In-memory storage interface (MemStorage) - ready for database upgrade

**Database**: PostgreSQL via Neon serverless (configured but minimal use)

**API**: RESTful with `/api` prefix

## Recent Changes

### Design Overhaul (Latest)

**Minimalist Redesign**:
- Simplified all sections to match SUMSEI minimalist aesthetic
- Removed decorative elements (badges, icons, heavy cards)
- Reduced text sizes throughout (text-xs, text-sm as default)
- Simplified header (h-16 instead of h-20, smaller logo)
- Cleaner footer (vertical layout, smaller icons h-4 w-4)
- Removed "(주)레코딩카페" company name from footer
- Gold (#D4AF37) only on headings and brand elements
- Generous white space between sections
- Border-left accents instead of heavy cards
- Smaller, more subtle buttons (size="sm" default)

**Footer Updates**:
- SUMSEI-style vertical layout
- Small text sizes (text-xs)
- Facebook link restored
- SNS icons reduced to h-4 w-4
- Removed company name "(주)레코딩카페"
- Simple hover states (text-muted-foreground → text-foreground)

**Header Improvements**:
- Reduced height to h-16
- Single-line logo (removed English subtitle)
- Smaller nav gap (gap-6)
- Smaller button size (size="sm")
- Cleaner mobile menu

**Section Simplification**:
- All sections: py-16 md:py-20 (reduced from py-20 md:py-32)
- Headings: text-3xl md:text-4xl (reduced from text-3xl md:text-5xl)
- Body text: text-sm (reduced from text-base/text-lg)
- Removed decorative badges and tags
- Minimal borders and shadows
- Clean card designs with subtle elevation

### Review System

- Replaced review cards with 10 Klook review screenshots
- Modal system with full-size image display
- Scrollable content (max-h-[90vh] with overflow-y-auto)
- Review images: Julian, Kristijan, Patrix, Yang 1-2, Emma, Evangeline, Klook Users, Dona

### Navigation

- Removed language selector (Globe icon) for cleaner header
- Order: 홈 → 공간 → 서비스 → Creator OS → 후기 → 예약 → 가맹점

### Creator OS Messaging

- Removed "성공적인" from "커리어 운영체제(OS)를 제공합니다"
- Simplified to focus on core message

## External Dependencies

### Core
- Neon PostgreSQL serverless
- Vite for build and dev
- Express.js for backend

### UI & Forms
- Radix UI primitives
- React Hook Form with Zod
- Lucide React icons
- React Icons (social media)

### Utilities
- date-fns
- Embla Carousel
- Wouter routing
- TanStack Query

## Development Notes

- Mobile-first responsive design
- Dark mode support via semantic tokens
- Path aliases: @/ (client/src), @shared/ (shared), @assets/ (attached_assets)
- Build: Vite for frontend, esbuild for backend
- Workflow: `npm run dev` runs both frontend and backend

## Business Context

- 10+ years entertainment industry experience
- Patented mirror camera technology
- Multi-channel broadcasting system
- Franchise business model
- Focus on creator career development (AI × Entertainment × Finance)
