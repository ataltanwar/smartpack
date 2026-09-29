# SmartPack UI/UX Design Specification

## 1. Product Identity

**Product:** SmartPack\
**Tagline:** Food Packaging Intelligence\
**Purpose:** An AI-powered food packaging recommendation system that
analyzes food properties and storage conditions and recommends suitable
packaging materials.

### Core visual direction

The interface should communicate:

-   **Natural** --- food, sustainability, kraft paper, organic materials
-   **Technical** --- AI, data, material properties, engineering
-   **Packaging-oriented** --- labels, material layers, film structures,
    package specifications

The final design should feel like a **modern food-packaging intelligence
platform**, not a generic SaaS dashboard and not a generic AI chatbot.

------------------------------------------------------------------------

# 2. Design Goals

1.  Make the packaging domain visually obvious.
2.  Keep the existing application functionality and data flow intact.
3.  Improve visual hierarchy and perceived product quality.
4.  Make the AI recommendation the visual centerpiece.
5.  Reduce the "generic admin dashboard" appearance.
6.  Use packaging-inspired visual elements without overusing package/box
    icons.
7.  Keep the interface clean, professional, and suitable for a
    hackathon/SIH presentation.
8.  Maintain excellent desktop and mobile responsiveness.

------------------------------------------------------------------------

# 3. Color System

Use a simple, restrained palette.

### Primary colors

``` text
Background / Paper       #F5EBDD
Card / Cream             #FCF9F4
Primary Text             #17221C
Packaging Brown          #70452C
Kraft Accent             #D9B27C
Eco Green                #4F7A52
AI Blue                  #3B82C4
White                    #FFFFFF
Border                   #E4D8C8
Muted Text               #6B7280
```

### Color usage

-   `#F5EBDD` --- main page background
-   `#FCF9F4` --- cards and elevated surfaces
-   `#17221C` --- headings and primary text
-   `#70452C` --- packaging-related emphasis and important buttons
-   `#D9B27C` --- kraft-paper/accent elements
-   `#4F7A52` --- sustainability, eco alternatives, positive indicators
-   `#3B82C4` --- AI/data/technical elements
-   `#FFFFFF` --- input fields and high-contrast surfaces
-   `#E4D8C8` --- subtle borders
-   `#6B7280` --- secondary text

Do not use many unrelated colors. Brown, cream, green, and blue should
form the visual language.

------------------------------------------------------------------------

# 4. Typography

Use a modern, highly readable sans-serif font.

Preferred:

-   Inter
-   Geist
-   Manrope

### Hierarchy

``` text
Hero heading:
48–64px desktop
36–42px mobile
font-weight: 700–800

Section heading:
24–32px
font-weight: 700

Card heading:
18–22px
font-weight: 650–700

Body:
15–17px
line-height: 1.6

Labels:
12–14px
font-weight: 600
```

Avoid excessive bold text. Use typography to create hierarchy rather
than borders.

------------------------------------------------------------------------

# 5. Overall Layout

The page should feel spacious and editorial rather than like a dense
dashboard.

Recommended structure:

``` text
Navbar
   ↓
Hero / Product Introduction
   ↓
Recommendation Workspace
   ├── Packaging Specification Form
   └── AI Analysis / Recommendation
   ↓
Material Details
   ↓
Eco Alternative
   ↓
How SmartPack Works
```

Use generous whitespace.

Desktop content width:

``` text
max-width: 1200–1280px
margin: auto
padding: 24–40px
```

Mobile:

``` text
padding: 16–20px
```

------------------------------------------------------------------------

# 6. Navbar

Keep the navbar minimal.

Recommended structure:

``` text
[SmartPack logo]

Home    How It Works    Materials    About

[ SIH 2026 · SIH26236 ]    [Profile]
```

### Branding

Logo should suggest:

-   packaging
-   material
-   food
-   intelligence

Avoid a generic cube if possible. A simple package/film/material symbol
is preferred.

Navbar:

-   warm cream/white background
-   subtle bottom border
-   no heavy shadow
-   rounded container can be used on desktop
-   sticky navigation is acceptable

------------------------------------------------------------------------

# 7. Hero Section

The current hero is too empty and looks like a generic software product.

Create a stronger packaging-oriented hero.

### Content

Small eyebrow:

``` text
FOOD PACKAGING INTELLIGENCE
```

Main heading:

``` text
Find the right
packaging for your food.
```

Supporting text:

``` text
SmartPack analyzes food properties and storage conditions
to recommend suitable packaging materials for better
protection, shelf life, and sustainability.
```

Primary CTA:

``` text
Analyze My Product →
```

Secondary CTA:

``` text
How It Works
```

### Hero visual

Use packaging-oriented visuals rather than generic abstract AI graphics.

Possible visual:

``` text
fresh food
     ↓
packaging film
     ↓
material layers
     ↓
AI recommendation
```

Suitable imagery:

-   tomato/vegetables
-   transparent food pouch
-   kraft packaging
-   film layers
-   recyclable packaging
-   material samples

Keep the image/illustration subtle and premium.

------------------------------------------------------------------------

# 8. Packaging Specification Form

The left-side form should feel like a **packaging specification sheet**,
not a generic form.

Rename the section:

``` text
Packaging Specification
```

Subtitle:

``` text
Tell us about your food and storage conditions.
```

Organize the form into clear steps.

## Step 01 --- Product

``` text
01
PRODUCT

Food / Commodity
[ Tomato                         ▼ ]
```

Use a small food icon.

## Step 02 --- Storage Conditions

``` text
02
STORAGE CONDITIONS

Temperature       Relative Humidity
[ 5 °C ]          [ 90 % ]

Storage Type
[ Chilled                        ▼ ]

Transportation
[ Refrigerated                   ▼ ]
```

## Step 03 --- Requirements

``` text
03
PACKAGING REQUIREMENTS

[ Eco-friendly ]
[ Extended shelf life ]
[ MAP compatible ]
[ High oxygen protection ]
[ Moisture protection ]
```

Use pill-style selections.

Selected pills should use brown or blue depending on the type of
setting.

------------------------------------------------------------------------

# 9. Analyze Button

Make the primary action visually important.

Recommended:

``` text
[ ✦ Analyze Packaging ]
```

Button:

-   background: `#70452C`
-   text: white
-   border radius: 10--14px
-   height: 48--54px
-   subtle hover animation
-   arrow/icon at the right

Hover:

-   slightly darker brown
-   small upward/right movement
-   no excessive glow

------------------------------------------------------------------------

# 10. AI Analysis Result

This should become the visual centerpiece of the application.

Current problem:

The result currently looks like another dashboard card.

Instead, create a clear recommendation hierarchy.

### Header

``` text
✦ AI PACKAGING ANALYSIS

Tomato
Fresh vegetable · Chilled storage
```

Show a small status:

``` text
ANALYSIS COMPLETE
```

Use subtle green/blue styling.

------------------------------------------------------------------------

# 11. Recommended Material

The recommendation should be immediately visible.

Example:

``` text
RECOMMENDED PACKAGING

┌─────────────────────────────────────────────┐
│                                             │
│   [Packaging visual]   Breathable Film      │
│                       Recommended           │
│                                             │
│                       Suitable for:          │
│                       High respiration       │
│                       Chilled storage        │
│                       High humidity          │
│                                             │
│                       [Why this material?]  │
└─────────────────────────────────────────────┘
```

The material name should be the largest element in the result.

Do not hide the recommendation among six metric cards.

------------------------------------------------------------------------

# 12. Packaging Material Visual

Where possible, represent the recommended material visually.

Examples:

### Breathable film

Use a transparent flexible pouch containing produce.

### Kraft packaging

Use a kraft paper pouch.

### Aluminum laminate

Use a metallic foil pouch.

### PET

Use a transparent rigid container/bottle.

### HDPE

Use a clean white plastic container.

### Biodegradable film

Use a natural paper/fiber-style package.

These visuals should be consistent and minimal.

------------------------------------------------------------------------

# 13. Material Properties

Show the technical requirements in a packaging-engineering style.

Example:

``` text
MATERIAL REQUIREMENTS

O₂ BARRIER       HIGH
MOISTURE         MEDIUM
BREATHABILITY    HIGH
SEALABILITY      HIGH
MAP SUITABILITY  YES
STRENGTH         MEDIUM
```

Instead of generic dashboard cards, use compact technical specification
blocks.

Optional visual treatment:

``` text
O₂ BARRIER
HIGH
● ● ● ● ●

MOISTURE
MEDIUM
● ● ● ○ ○
```

This makes the data easier to scan.

------------------------------------------------------------------------

# 14. Material Layer Visualization

Add a packaging-layer section when appropriate.

Example:

``` text
PACKAGING STRUCTURE

┌──────────────────────┐
│ OUTER PROTECTION     │
├──────────────────────┤
│ OXYGEN / MOISTURE    │
│ BARRIER              │
├──────────────────────┤
│ SEALING LAYER        │
└──────────────────────┘
```

This is a strong visual representation of packaging engineering.

Use subtle animations on hover/click.

------------------------------------------------------------------------

# 15. Food Metrics

Keep the existing metrics, but redesign them to feel more purposeful.

Example:

``` text
FOOD PROFILE

💧 Moisture       94%
⚗ pH             4.3
〽 Respiration    High
◷ Shelf Life      ~15 days
```

Use small icons and strong numbers.

Avoid putting every metric inside a large bordered card.

------------------------------------------------------------------------

# 16. Sustainability Section

Use green only for sustainability-related information.

Example:

``` text
🌱 ECO ALTERNATIVE

A lower-impact packaging material may also satisfy
the required protection and shelf-life conditions.

[ View Eco Alternative → ]
```

Colors:

``` text
Background: #F0F7F0
Green:      #4F7A52
```

Do not make the entire website green.

------------------------------------------------------------------------

# 17. Packaging-Inspired UI Language

Use packaging concepts as visual design elements.

### Use:

-   label-like badges
-   technical specification labels
-   material layers
-   perforation/dashed lines
-   subtle kraft-paper sections
-   package-shaped cards
-   seal/edge motifs
-   food + package compositions
-   material swatches

### Avoid:

-   excessive box icons
-   random 3D cubes
-   generic AI brain graphics
-   neon gradients
-   excessive glassmorphism
-   excessive shadows
-   generic dashboard charts
-   too many colors

The design should communicate packaging through **structure**, not
decoration.

------------------------------------------------------------------------

# 18. Cards and Borders

Reduce the number of nested cards.

Current problem:

``` text
Card
 └── Card
      └── Card
           └── Card
```

Preferred:

``` text
Section
 ├── heading
 ├── content
 └── one clear surface
```

Use:

``` css
border: 1px solid #E4D8C8;
border-radius: 14px;
```

Shadows should be subtle:

``` css
box-shadow: 0 8px 30px rgba(23, 34, 28, 0.06);
```

Do not use heavy shadows.

------------------------------------------------------------------------

# 19. Border Radius

Use a consistent system.

``` text
Small controls:     8px
Inputs:             10px
Cards:              14–18px
Large hero panels:  20–24px
Pills:              999px
```

Avoid mixing many radius values.

------------------------------------------------------------------------

# 20. Animation

Animations should be subtle.

Recommended:

-   button hover: 150--200ms
-   cards: 200--300ms
-   recommendation reveal: 400--600ms
-   material layer reveal: 300--500ms
-   subtle fade/slide on result generation

Do not add unnecessary animations everywhere.

For the AI result:

``` text
Analyze
   ↓
small loading state
   ↓
AI Analysis Complete
   ↓
recommended package gently appears
```

This can make the AI interaction feel much more polished.

------------------------------------------------------------------------

# 21. Responsive Design

Desktop:

``` text
Hero:
50% text / 50% visual

Workspace:
40% form / 60% result
```

Tablet:

``` text
40% / 60%
```

Mobile:

``` text
Hero
↓
Form
↓
AI Result
↓
Material Details
↓
Eco Alternative
```

Never force the desktop two-column layout on mobile.

All input controls must remain comfortable to tap.

------------------------------------------------------------------------

# 22. Current UI Migration

Do not rebuild the application's business logic.

Preserve:

-   existing API calls
-   FastAPI integration
-   commodity data
-   model predictions
-   existing input values
-   recommendation calculations
-   navigation
-   functionality

Only improve:

-   layout
-   visual hierarchy
-   styling
-   components
-   responsive behavior
-   animations
-   presentation of results

Do not change API contracts unless required.

------------------------------------------------------------------------

# 23. Recommended Component Structure

If the current React project supports componentization, use:

``` text
src/
├── components/
│   ├── Navbar
│   ├── Hero
│   ├── PackagingForm
│   ├── FormSection
│   ├── FoodProfile
│   ├── AIAnalysis
│   ├── RecommendedMaterial
│   ├── MaterialProperties
│   ├── MaterialLayers
│   ├── EcoAlternative
│   └── Footer
│
├── pages/
│   └── Home
│
└── ...
```

Keep components reusable.

------------------------------------------------------------------------

# 24. Final Visual Direction

The finished SmartPack interface should feel like:

``` text
Modern food-tech
        +
Packaging engineering
        +
Sustainability
        +
AI intelligence
```

A visitor should be able to look at the interface for 2--3 seconds and
understand:

> "This is an AI system that helps choose packaging for food."

The design should NOT look like:

> "This is another generic blue AI dashboard."

------------------------------------------------------------------------

# 25. Priority Order for Implementation

Implement changes in this order:

### Priority 1

Redesign overall color system and page background.

### Priority 2

Improve hero section with packaging-oriented visual.

### Priority 3

Transform the input form into a Packaging Specification workflow.

### Priority 4

Make the AI recommendation the primary visual focus.

### Priority 5

Create packaging-material visual cards.

### Priority 6

Redesign technical metrics into packaging specification blocks.

### Priority 7

Add sustainability/eco alternative section.

### Priority 8

Add material-layer visualization.

### Priority 9

Add subtle animations.

### Priority 10

Polish mobile responsiveness.

------------------------------------------------------------------------

# 26. Important Design Rule

**Do not overdesign.**

SmartPack should remain:

-   clean
-   professional
-   credible
-   technical
-   food-oriented
-   packaging-oriented
-   easy to understand

Packaging should be the **design language**, not a collection of
decorative package icons.

The strongest visual idea is:

> **Food → Packaging Requirements → Material → AI Recommendation**

The entire UI should visually reinforce this journey.
