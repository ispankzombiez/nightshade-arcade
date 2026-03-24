# Game UI Design System - Visual Hierarchy & Colors

Complete visual and styling reference for the game UI design system.

## Color Palette

### Primary Colors (Panels & Backgrounds)
```
Light Tan:      #e4a672  (InnerPanel background, card text area)
Dark Tan:       #c28569  (OuterPanel background, dark mode inner)
Brown:          #c0cbdc  (Default label background)
Light Cream:    #fff0d4  (Card text sections, highlights)
```

### Status Colors (Label System)

| Label Type | Color | Hex | Best For |
|-----------|-------|-----|----------|
| Success | Green | #3e8948 | Positive actions, buffs, completion |
| Danger | Red | #e43b44 | Errors, negative, critical |
| Warning | Orange | #f09100 | Caution, rare items, warnings |
| Info | Blue | #1e6dd5 | Information, boosts, guides |
| Vibrant | Purple | #b65389 | Special, epic, unique items |
| Formula | Dark Blue | #3c4665 | Crafting, recipes, technical |
| Chill | Tan | #e4a672 | Neutral, friendly, calm |
| Default | Gray | #c0cbdc | Standard, generic |

### Text Colors

| Status | Color | Hex | Used On |
|--------|-------|-----|---------|
| Light/Main | White | #ffffff | Success, danger, info, vibrant, formula |
| Dark/Main | Dark Gray | #181425 | Default, warning, chill labels |
| Balance Text | White | #ffffff | Currency displays (large 28px) |
| Regular | Dark | #3e2731 | Paragraph text |

### Background Overlays

| Element | Color | Opacity | Hex |
|---------|-------|---------|-----|
| Modal Backdrop | Black | 50% | #000000 |
| Currency Backdrop | Black | 25-30% | #000000 |
| Disabled State | Gray | 50% | Varies |

---

## Typography Scale

```
balance-text:      28px (bold, currency displays)
text-lg:           18px (major headings)
text-base:         16px (normal body text)
text-sm:           14px (secondary content)
text-xs:           12px (labels, badges)
text-xxs:          10px (very small labels)
font-bold:         Headers, important labels
font-secondary:    Special styling (continue prompts)
text-stroke:       Outlined effect for HUD text
```

---

## Component Size Reference

### Pixel Sizes (Base Game Units)

```
PIXEL_SCALE = 1 game pixel unit
Applied as: PIXEL_SCALE * N

Common Sizes:
1px   = 1 game pixel
2px   = 2 game pixels (borders)
4px   = 4 game pixels (radius)
5px   = 5 game pixels (border radius)
8px   = 8 game pixels (padding)
16px  = 16 game pixels
32px  = 32 game pixels
64px  = 64 game pixels
100px = 100 game pixels
```

### Component Heights

```
Button:              32px (standard)
Small Button:        24px
Large Button:        48px
Panel Padding:       8px (1 game pixel * 8)
Card Image Area:     70-138px (depends on type)
Card Text Area:      57-100px (minimum to full)
Modal Max Width:     960px (md:max-w-3xl)
```

### Icon Sizes

```
Balance Icon:        26px (SFL)
Coin Icon:           25px
Gem Icon:            28px
Chip Icon:           25x25px
Label Icon:          16px (default)
Small Icon:          8-12px
Button Icon:         16-20px
Large Icon:          32-48px
```

---

## Visual Hierarchy

### Top Level: Modals
```
┌───────────────────────────────────────────┐
│ Modal Backdrop (semi-transparent black)   │
│  ┌─────────────────────────────────────┐  │
│  │ CloseButtonPanel with Title         │  │
│  │ ┌───────────────────────────────────┤  │
│  │ │ Tab 1 │ Tab 2 [Active indicator]  │  │
│  │ ├───────────────────────────────────┤  │
│  │ │ Main Content Area (InnerPanel)    │  │
│  │ │ • Multiple Panels/Cards           │  │
│  │ │ • Buttons & Labels                │  │
│  │ └───────────────────────────────────┘  │
│  └─────────────────────────────────────┘  │
└───────────────────────────────────────────┘
                    [X] Close
```

### Mid Level: Panels
```
┌─────────────────────────────────────┐
│ OuterPanel (Dark Tan ##c28569)       │  Dark border
│ ┌─────────────────────────────────┐ │
│ │ InnerPanel (Light Tan #e4a672) │ │  Light border
│ │ [NPC Portrait - optional]       │ │
│ │                                 │ │
│ │ Content Area                    │ │
│ │ • Text                          │ │
│ │ • Labels                        │ │
│ │ • Buttons                       │ │
│ └─────────────────────────────────┘ │
└─────────────────────────────────────┘
```

### Low Level: Cards
```
┌──────────────────────────┐
│ ButtonPanel              │
│ ┌──────────────────────┐ │
│ │   [Icon/Image]       │ │  70-138px height
│ ├──────────────────────┤ │
│ │ Cream Background     │ │
│ │ #fff0d4              │ │  57-100px height
│ │                      │ │
│ │ Name • Price         │ │
│ │ Count Badge          │ │
│ └──────────────────────┘ │
└──────────────────────────┘
```

---

## Border System Visual Reference

### Border Styles Applied To Different Components

```
Panel Outer    Panel Inner    Button         Label
═══════════    ═══════════    ═════════      ═════════
│ Dark Border│ │Light Border│ │Button Image│ │Colored Border│
│            │ │            │ │            │ │             │
│ (DarkBrown)│ │(LightTan)  │ │(Varies)    │ │(Lab Type)   │
│            │ │            │ │            │ │             │
├────────────┤ ├────────────┤ ├────────────┤ ├─────────────┤
│Padding:8px │ │Padding:8px │ │Padding:4px │ │Padding:4px  │
│Radius:5px  │ │Radius:5px  │ │Radius:5px  │ │Radius:5px   │
│Width:2px   │ │Width:2px   │ │Width:3px   │ │Width:2px    │
```

### Pixel Border Implementation
```
Border Image:    url(/{imagePath}) 20%
Border Width:    PIXEL_SCALE * 2px (typically)
Border Style:    solid
imageRendering:  pixelated
borderRadius:    PIXEL_SCALE * 5px
borderImageSlice: 20%

Result: Crisp pixel-art borders that scale with PIXEL_SCALE
```

---

## Shadow & Depth Effects

### Panel Layering (Depth)
```
Layer 3: Content (InnerPanel)
         Light Tan (#e4a672)

Layer 2: Border Gap (1px padding)
         Creates visual separation

Layer 1: Outer Border (OuterPanel)
         Dark Tan (#c28569)

Result: 3D beveled/raised effect
```

### Hover/Active States
```
Hover:    brightness-90 (10% darker)
Active:   scale(0.997) + brightness-90
Disabled: opacity-50

Transition: transform 200ms ease
```

### ButtonPanel Variants

```
Primary Button:
┌─────────────────────┐
│ primaryButton Image  │
│ [active: pressed]    │
└─────────────────────┘

Secondary Button:
┌─────────────────────┐
│ usedButton Image     │
│ [muted appearance]   │
└─────────────────────┘

Card Button:
┌─────────────────────┐
│ cardButton Image     │
│ [active: pressed]    │
└─────────────────────┘
```

---

## Spacing System

### Padding Scales
```
PIXEL_SCALE * 1px   = 1 game pixel (minimal gap)
PIXEL_SCALE * 2px   = 2 game pixels (small gap)
PIXEL_SCALE * 4px   = 4 game pixels
PIXEL_SCALE * 8px   = 8 game pixels (standard padding)
PIXEL_SCALE * 15px  = 15 game pixels (tab offset)
PIXEL_SCALE * 16px  = 16 game pixels
```

### Common Spacing Patterns
```
Panel Padding:         8px (PIXEL_SCALE * 1)
Button Padding:        4px (PIXEL_SCALE * 1)
Card Internal Padding: 8px
Modal Padding:         16px minimum
Text Content Padding:  8px to 16px
Item Grid Gap:         8px (gap-2 in Tailwind)
Section Gap:           16px (gap-4)
```

---

## Button Styling Example

### Primary Button States
```
Normal:
┌──────────────────────┐
│ [Primary Button Image]│
│ Click Me             │
└──────────────────────┘

Hover:
┌──────────────────────┐
│ [darker]             │
│ Click Me             │ ← brightness-90
└──────────────────────┘

Active (Pressed):
┌──────────────────────┐
│ [darker + pressed]   │
│ Click Me             │ ← scale(0.99) + sound
└──────────────────────┘

Disabled:
┌──────────────────────┐
│ [faded]              │
│ Click Me             │ ← opacity-50
└──────────────────────┘
```

---

## Label Color Reference

### Semantic Color Usage Pattern
```
Input/Neutral:
┌────────────────┐
│ Default Gray   │ Use for generic labels
└────────────────┘

Positive:
┌────────────────┐
│ Success Green  │ Use for completed tasks, buffs
└────────────────┘

Negative:
┌────────────────┐
│ Danger Red     │ Use for errors, critical items
└────────────────┘

Caution:
┌────────────────┐
│ Warning Orange │ Use for warnings, rare items
└────────────────┘

Information:
┌────────────────┐
│ Info Blue      │ Use for tips, boosts
└────────────────┘

Special:
┌────────────────┐
│ Vibrant Purple │ Use for epic items, special status
└────────────────┘

Crafting:
┌────────────────┐
│ Formula Blue   │ Use for recipes, crafting
└────────────────┘

Friendly:
┌────────────────┐
│ Chill Tan      │ Use for friendly, calm messages
└────────────────┘
```

---

## Marketplace Card Layout Details

### Card Section Breakdown
```
┌──────────────────────────────────┐
│     Image Section (70px)         │  PIXEL_SCALE: 2px margin top
│   [Centered SquareIcon]          │  Padding: 8px (2/side) + top adjustment
├──────────────────────────────────┤
│ Text Section Background: #fff0d4  │
│ Border-top: 1px solid #e4a672    │
│ Margin: 0 -8px -2.6px            │
│                                  │
│ ┌─ Price Badge (absolute)        │  If price > 0
│ │  [SFL Icon] [Amount]           │
│ │ Top-left, white bg + opacity    │
│ │                                │
│ │ Item Name (bold, xs)            │
│ │ Item Description (if avail)     │
│ │ Buffs/Stats (labels if any)     │
│ │                                │
│ └─ Count Badge (absolute)         │  If count > 0
│    [Icon] [Count]                │  Bottom-right
│                                  │
└──────────────────────────────────┘
```

### Grid Layouts
```
Mobile (1 column):
██

Tablet (3 columns):
██ ██ ██

Desktop (4-5 columns depending on width):
██ ██ ██ ██

Classes Used:
grid grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-2
```

---

## Modal Dialog Sizes

### Size Variants

#### Small Modal (size="sm")
```
Width: Auto (smaller content)
Max-width: 400-500px
Center: Centered on screen
Used for: Confirmations, simple content
```

#### Large Modal (size="lg", default)
```
Width: 80-90vw
Max-width: 960px (can customize with dialogClassName)
Center: Centered on screen
Used for: Main content, complex layouts
```

#### Custom Modal (dialogClassName)
```
Tailwind class: "md:max-w-3xl", "max-w-4xl", etc.
Example: dialogClassName="md:max-w-3xl"
Result: Responsive sizing
```

---

## Accessibility & Interaction

### Keyboard Support
```
Modal Closing:
  ESC key          → Closes modal (if backdrop enabled)
  
Speaking Modal:
  ENTER/SPACE/ESC → Advance message
  Click anywhere  → Continue/show full text
  
Tabs:
  Click on tab icon/name → Switch tab (plays tab sound)
  
Buttons:
  Click or ENTER → Activate (plays button sound)
```

### Cursor States
```
cursor-pointer:        Clickable elements (buttons, cards)
cursor-not-allowed:    Disabled buttons
cursor-auto:           Default text areas
```

### Sound Effects
```
Component         Sound File
─────────────────────────────
Modal Open        "open"
Modal Close       "close"
Button Click      "button"
Tab Switch        "tab"
```

---

## NPC Character Positioning

### Bumpkin Parts Overlay
```
Position: Top-left corner
Z-index: -10 (behind content)
Size: PIXEL_SCALE * 100px wide
Offset: 
  Top: PIXEL_SCALE * -61px
  Left: PIXEL_SCALE * -8px

Typical Panels with NPC:
┌──────────────────────────┐
│ [NPC Avatar] ┌─────────┐ │
│              │ Content │ │
│              │  Area   │ │
│              └─────────┘ │
└──────────────────────────┘

Applied to:
- Panel component
- SpeakingModal
- CloseButtonPanel (with bumpkinParts prop)
```

---

## Dark Mode Variants

### Colors That Change
```
Component        Light Mode    Dark Mode
─────────────────────────────────────────
InnerPanel BG    #e4a672      #c28669
Text Primary     #181425      #181425 (same)
Panel Border      Light        Dark
Background       Varies        Darker
```

### Usage
```tsx
const { isDarkMode } = useIsDarkMode();
const bgColor = isDarkMode ? "#c28569" : "#e4a672";
```

---

## Asset Path Organization

### SUNNYSIDE Asset Structure
```
SUNNYSIDE.ui.{
  borders:        All border images
  buttons:        Button styling
  labels:         Label colors
  icons:          Common icons
    heart, star, bag, etc.
}

SUNNYSIDE.world.{
  chests:         Chest images
  characters:     NPC avatars
  items:          Item graphics
}

Applied as:
<img src={SUNNYSIDE.ui.primaryButton} />
```

---

## Common Responsive Patterns

### Grid Responsiveness
```
Grid Columns:
  Mobile:   grid-cols-2 (2 columns)
  Tablet:   md:grid-cols-3 (3 columns at 768px)
  Desktop:  lg:grid-cols-4 (4 columns at 1024px)

Gap/Spacing:
  Mobile:   gap-2 (8px)
  Desktop:  lg:gap-4 (16px)
```

### Text Responsiveness
```
Text Sizes:
  Icon Width:   sm:h-5 (smaller on mobile)
  Font Size:    text-sm (smaller on mobile)
  Padding:      p-2 (smaller on mobile)

Viewport Query:
  sm: 640px
  md: 768px
  lg: 1024px
  xl: 1280px
```

---

## Quick Design Checklist

When designing new UI components:

### Color Selection
- [ ] Primary content = Panel tan (#e4a672)
- [ ] Borders = Pixel borders from style.ts
- [ ] Status = Use semantic Label colors
- [ ] Text = Dark on light, white on dark
- [ ] Interactive = Use Button variants

### Typography
- [ ] Headers = text-lg, font-bold
- [ ] Body = text-sm or text-base
- [ ] Labels = text-xs
- [ ] Currency = balance-text class

### Layout
- [ ] Use PIXEL_SCALE for all sizes
- [ ] Use Panel/OuterPanel containers
- [ ] Use grid for item displays
- [ ] Use flex for horizontal layouts
- [ ] Add proper gap/spacing

### Spacing
- [ ] Padding = 8px minimum (PIXEL_SCALE * 1)
- [ ] Margins = Follow grid gap pattern
- [ ] Tabs = PIXEL_SCALE * 15px offset
- [ ] Border width = PIXEL_SCALE * 2px

### Interactive
- [ ] Buttons use Button component
- [ ] Cards use ButtonPanel
- [ ] Icons use SquareIcon
- [ ] Status uses Label
- [ ] Currency displays use Balances

### Accessibility
- [ ] Keyboard controls documented
- [ ] Sound effects used
- [ ] Color not only indicator
- [ ] Contrast meets WCAG
- [ ] Mobile responsive

### Performance
- [ ] Images optimized
- [ ] Icons cached via SUNNYSIDE
- [ ] Lazy load modals
- [ ] Minimize re-renders
- [ ] Use memo for cards
