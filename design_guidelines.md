# 레코딩 카페 - Design Guidelines

## Design Philosophy

**Minimalist Luxury**: Clean, simple design that lets content breathe while using gold (#D4AF37) as the signature luxury accent. Inspired by minimalist Japanese design principles with premium positioning.

**Key Principle**: Less is more. Every element must earn its place. Gold is precious, use it sparingly for maximum impact.

## Color Palette

### Primary Colors
- **Gold Accent**: #D4AF37 (use for logo, headings, and key highlights only)
- **Background**: Default background color (adapts to light/dark mode)
- **Foreground**: Default text color (adapts to light/dark mode)
- **Muted**: text-muted-foreground (for secondary information)

### Usage Rules
- Gold (#D4AF37) only for:
  - Main logo/brand name
  - Section headings
  - Key call-to-action elements
  - Important highlights
- Never use gold for body text or backgrounds
- Maintain high contrast between text and backgrounds
- Use semantic color tokens (foreground, muted-foreground) for dark mode compatibility

## Typography

**Font Stack**: System fonts (Inter, Pretendard for Korean)

**Hierarchy**:
- Main Headings: text-3xl md:text-4xl lg:text-5xl, font-bold, gold color
- Section Headings: text-2xl md:text-3xl, font-semibold, gold color
- Subsection Titles: text-xl md:text-2xl, font-semibold, foreground color
- Body Text: text-sm md:text-base, normal weight, foreground color
- Small Text: text-xs, muted-foreground color

**Korean Typography**:
- Use consistent tracking for Korean text
- Slightly larger line-height for readability
- Never mix fonts within same text block

## Layout System

**Spacing Philosophy**: Generous white space. Let content breathe.

**Spacing Scale**:
- Tight: gap-2, gap-3 (between small elements)
- Default: gap-4, gap-6 (between cards, sections)
- Generous: gap-8, gap-12 (major section separation)
- Section Padding: py-12 md:py-16 lg:py-20

**Container**:
- Max width: max-w-7xl
- Consistent horizontal padding: px-4 sm:px-6 lg:px-8

**Grid Strategy**:
- Desktop: 3-column max for service cards
- Tablet: 2-column
- Mobile: Always single column

## Component Patterns

### Headers
- Minimal, clean navigation
- Logo in gold on left
- Simple text links (no icons)
- Sticky with subtle border on scroll
- No backgrounds or heavy styling

### Hero Section
- Large, impactful headline in gold
- Simple, clean subtitle
- Minimal CTA buttons
- Full-width background image with dark overlay for text legibility
- No clutter

### Service Cards
- Clean white/card background
- Minimal border or subtle shadow
- Gold accent for icons or numbers
- Generous padding
- Simple hover state (subtle elevation)

### Content Sections
- Clear section separation with white space
- Gold headings
- Simple, readable body text in muted color
- No unnecessary decorations

### Footer
- Single column, vertical layout (SUMSEI style)
- Minimal information hierarchy
- Small text sizes (text-xs)
- Simple links (no heavy buttons)
- Social icons small and subtle (h-4 w-4)
- Legal links with subtle hover states

## Interactions

**Hover States**:
- Text links: muted-foreground → foreground
- Buttons: use built-in Shadcn variants
- Cards: subtle elevation (no dramatic transforms)
- Icons: color transition only

**Transitions**: All transitions 200-300ms, ease-in-out

**No Animations**: Avoid flashy animations. Keep interactions minimal and purposeful.

## Images

**Photography Style**:
- High quality, professional
- Clean backgrounds
- Authentic, not overly staged
- Consistent color grading

**Usage**:
- Hero: Full-width, high-impact
- Services: Relevant, contextual imagery
- Reviews: User-generated content (authentic)

## Navigation Structure

홈 → 공간 → 서비스 → Creator OS → 후기 → 예약 → 가맹점

## Best Practices

### DO:
- Use generous white space
- Keep typography hierarchy clear
- Use gold sparingly for impact
- Maintain consistent spacing
- Let content breathe
- Use semantic color tokens
- Keep interactions subtle

### DON'T:
- Overuse gold color
- Add unnecessary decorations
- Use multiple accent colors
- Create complex layouts
- Add flashy animations
- Use large, bulky icons
- Crowd content together

## Dark Mode Support

All colors must work in both light and dark modes:
- Use semantic tokens (foreground, background, muted-foreground)
- Gold (#D4AF37) works in both modes as-is
- Test all components in both modes
- Ensure sufficient contrast in both modes

## Responsive Principles

- Mobile-first approach
- Single column on mobile
- Generous touch targets (min 44px)
- Readable font sizes on all devices
- Consistent spacing across breakpoints
