# K Recording Cafe - Design Guidelines

## Design Approach

**Reference-Based Strategy**: Drawing from K-pop entertainment industry leaders (HYBE, SM Entertainment) combined with Airbnb's experience-driven design and Stripe's professional credibility. This creates a balance between aspirational energy (20%) and business legitimacy (80%).

**Key Design Principle**: "Aspirational yet Accessible" - The design should make everyday people feel that becoming a content creator is within reach while maintaining professional franchise credibility.

## Typography

**Font Families**:
- Headlines: Inter or Pretendard (for Korean), 700-800 weight - bold, confident
- Body: Inter or Pretendard, 400-500 weight - clean, readable
- Accents: Space Grotesk, 600 weight - modern, tech-forward for stats/numbers

**Hierarchy**:
- Hero Headline: text-5xl md:text-6xl lg:text-7xl, font-bold
- Section Headlines: text-3xl md:text-4xl lg:text-5xl, font-bold
- Subsection Titles: text-xl md:text-2xl, font-semibold
- Body Text: text-base md:text-lg, leading-relaxed
- Small Text: text-sm md:text-base

## Layout System

**Spacing Primitives**: Use Tailwind units of 4, 6, 8, 12, 16, 20, 24 for consistent rhythm
- Component internal padding: p-4, p-6, p-8
- Section vertical spacing: py-16 md:py-20 lg:py-24
- Card spacing: gap-6 md:gap-8
- Container max-width: max-w-7xl for full sections, max-w-4xl for text content

**Grid Strategy**:
- Desktop (lg): 3-column for service cards, 2-column for features
- Tablet (md): 2-column maximum
- Mobile: Always single column

## Component Library

### Hero Section
- Full viewport height (min-h-screen) with dynamic content
- Large background image showcasing recording studio/K-pop aesthetic
- Centered headline + subheadline + dual CTA (Primary: "Start Your Journey" / Secondary: "Franchise Inquiry")
- Floating language switcher (KR/EN/CN) in top-right
- Subtle overlay gradient for text readability
- Trust indicator below CTAs: "10+ Years in Entertainment | Global Franchise | US Copyright Partnership"

### Service Showcase (3 Cards)
- 3-column grid on desktop, stacked on mobile
- Each card: Icon/Image + Title + Description + "Learn More" link
- Recording Studio: Emphasize copyright & revenue
- Hollywood Profile: Global expansion focus
- Live Broadcasting: Creator-advertiser ecosystem
- Hover effect: subtle lift (transform scale-105)

### Brand Story Section
- 2-column layout: Left = Founder narrative text, Right = Timeline visual or photo
- Highlight: 10+ years experience, 50+ artists trained, transition to public access
- Pull quote: Key mission statement in larger text

### Customer Journey (Jiwoo Persona)
- Horizontal timeline or step-by-step cards
- 4-5 steps: Discovery → First Visit → Creating Content → Publishing → Success
- Include relatable imagery for each step
- Emotional journey: "From everyday person to published creator"

### Competitive Advantages
- 4-column grid for key differentiators
- Icon + Stat + Description format
- Examples: "US Copyright Partner", "Douyin Direct Access", "Global Scalability", "Proven Revenue Model"
- Use bold numbers/stats where possible

### Franchise Opportunity
- Split layout: Benefits list (left) + Inquiry form (right)
- Benefits: Bullet points with checkmark icons
- Form fields: Name, Email, Phone, Country, Message, Language preference
- Clear ROI messaging: "Modular system | Standardized process | Recurring revenue"

### Footer
- 4-column layout: About, Services, Franchise, Contact
- Social media links (Instagram, YouTube, TikTok, Douyin, Xiaohongshu)
- Language selector repeated
- Newsletter signup: "Stay updated on franchise opportunities"
- Copyright notice with all three languages

## Images

**Hero Image**: Large, cinematic shot of modern recording studio with K-pop aesthetic - LED lights, professional equipment, aspirational but welcoming atmosphere

**Service Cards**: 
- Recording: Close-up of microphone with pop filter, warm studio lighting
- Hollywood Profile: Professional photography setup, glamorous but accessible
- Live Broadcasting: Multi-camera streaming setup, energetic atmosphere

**Brand Story**: Founder in professional setting or montage of past artist work

**Customer Journey**: Relatable photos showing progression from nervous first-timer to confident creator

**Franchise Section**: Clean, modern cafe storefront or interior showcasing the space

## Navigation

Sticky header with transparent background that becomes solid on scroll:
- Logo (left)
- Nav links: Home, Services, Story, Franchise, Contact (center)
- Language switcher + Primary CTA (right)
- Mobile: Hamburger menu

## Key Interactions

- Smooth scroll between sections (scroll-behavior: smooth)
- Parallax effect on hero background (subtle, not distracting)
- Card hover states: slight elevation + subtle shadow
- Form validation with inline feedback
- Language switch with smooth content transition

## Content Strategy Notes

- Headlines in all three languages must be equally compelling
- Maintain 80/20 balance: concrete business details prominent, aspirational messaging strategic
- Use real numbers where possible: "10+ years", "50+ artists", "3 countries"
- Korean text should feel authentic, not translated
- Emphasize "everyday person" accessibility throughout
- Position franchise as proven system, not experiment