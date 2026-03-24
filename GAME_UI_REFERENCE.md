# Game UI Design System - Complete Reference

Complete design system documentation for Sunflower Land game UI components.

## 📚 Documentation Structure

This design system is split into 3 main documents for easy navigation:

### 1. **GAME_UI_DESIGN_PATTERNS.md** - Architecture & Theory
**What it covers:**
- Component architecture (Panel system, Modal system, Button system)
- Border styling system and pixel art techniques
- Label/status color system with semantic usage
- Complete component breakdown with features and integration patterns
- Real-world examples showing multiple patterns together
- Dark mode support
- Asset organization (SUNNYSIDE, PIXEL_SCALE)

**Best for:** Understanding *how* components work, *why* styles are applied this way, and the reasoning behind design choices.

**Key sections:**
- Core Panel System (Panel, OuterPanel, InnerPanel, ButtonPanel, ColorPanel)
- Pixel Border System with all color variants
- Label System (8 semantic types)
- Button System (primary, secondary, card variants)
- Modal System with examples
- Card Display Patterns (Marketplace/Inventory)
- Currency Display System
- Character Speaking Modal patterns
- Treasure Chest and reward components

---

### 2. **GAME_UI_SNIPPETS.md** - Copy-Paste Code Examples
**What it covers:**
- Ready-to-use code snippets for every component
- Common layout patterns
- Imports organization
- Interactive component examples
- Quick copy-paste solutions

**Best for:** Finding working code examples quickly, copy-pasting starter templates, understanding usage without deep dives.

**Quick sections:**
- Basic Panels
- Modals (simple, closable, tabbed)
- Buttons (basic, with icons)
- Labels & Status Indicators
- Cards (item cards, grids)
- Currency Display
- Character Interactions
- Icons
- Layouts (two-column, sidebar patterns)
- Input components
- Common imports

---

### 3. **GAME_UI_DESIGN_SYSTEM.md** - Visual Guide & Colors
**What it covers:**
- Complete color palette with HEX codes
- Typography scale
- Component sizes and pixel references
- Visual hierarchy diagrams
- Border system visuals
- Spacing system details
- Button states diagram
- Modal size variants
- NPC positioning
- Dark mode color variants
- Responsive patterns
- Design checklist

**Best for:** Designers, visual consistency, color picking, sizing reference, understanding the visual hierarchy.

**Key reference tables:**
- Color Palette (primary colors, status colors, text colors)
- Typography Scale
- Component Heights
- Icon Sizes
- Label Color Usage Guide
- Border Styles Visual Reference
- Spacing Systems
- Accessibility & Interaction

---

## 🎯 Quick Start Guide

### I want to...

#### Create a new game UI modal
1. Read: [GAME_UI_DESIGN_PATTERNS.md - Modal System](GAME_UI_DESIGN_PATTERNS.md#5-modal-system)
2. Copy: [GAME_UI_SNIPPETS.md - Modals section](GAME_UI_SNIPPETS.md#2-modals)
3. Reference: [GAME_UI_DESIGN_SYSTEM.md - Modal Dialog Sizes](GAME_UI_DESIGN_SYSTEM.md#modal-dialog-sizes)

#### Display inventory items in a card grid
1. Copy: [Card Pattern from SNIPPETS](GAME_UI_SNIPPETS.md#5-cards-marketplaceinventory-pattern)
2. Understand: [Card Display Pattern from PATTERNS](GAME_UI_DESIGN_PATTERNS.md#6-card-display-pattern-marketplaceinventory)
3. Style: [Card Layout Details from SYSTEM](GAME_UI_DESIGN_SYSTEM.md#marketplace-card-layout-details)

#### Add character interaction with NPC
1. Copy: [SpeakingModal from SNIPPETS](GAME_UI_SNIPPETS.md#7-character-interactions)
2. Learn: [Speaking Modal from PATTERNS](GAME_UI_DESIGN_PATTERNS.md#8-characternpc-speaking-modal)
3. Position: [NPC Positioning from SYSTEM](GAME_UI_DESIGN_SYSTEM.md#npc-character-positioning)

#### Choose the right colors for UI elements
1. Reference: [Label Color Reference](GAME_UI_DESIGN_SYSTEM.md#label-color-reference)
2. Apply: [Label System from PATTERNS](GAME_UI_DESIGN_PATTERNS.md#3-label-system-status--tags)
3. Copy: [Label snippet](GAME_UI_SNIPPETS.md#4-labels--status-indicators)

#### Size components properly
1. Reference: [Component Sizes](GAME_UI_DESIGN_SYSTEM.md#component-sizes)
2. Understand: [PIXEL_SCALE usage](GAME_UI_DESIGN_PATTERNS.md#12-asset-constants-sunnyside--pixel_scale)
3. Apply: [Styling utilities example](GAME_UI_SNIPPETS.md#12-styling-utilities)

#### Design a custom panel layout
1. Understand: [Panel System](GAME_UI_DESIGN_PATTERNS.md#1-core-panel-system)
2. Copy: [Panel layouts from SNIPPETS](GAME_UI_SNIPPETS.md#9-common-layouts)
3. Style: [Visual Hierarchy from SYSTEM](GAME_UI_DESIGN_SYSTEM.md#visual-hierarchy)

---

## 🎨 Core Design Principles

### 1. **Pixel-Perfect Styling**
- All sizes use `PIXEL_SCALE` constant
- Borders use pixelated border images
- Results in crisp, retro game aesthetic
- Responsive scaling across devices

### 2. **Semantic Color System**
- Colors have meaning (red=danger, green=success)
- Label types correspond to intent
- Consistent across entire game
- Supports dark mode

### 3. **Layered Architecture**
- Outer borders (dark) for depth
- Inner content (light) for readability
- Multiple layers create 3D effect
- Consistent 2px border width

### 4. **Interactive Feedback**
- Sound effects on interaction
- Visual feedback (brightness/scale changes)
- Disabled states clearly marked
- Smooth transitions

### 5. **Component Composition**
- Small reusable components
- Combined for complex layouts
- Clear prop interfaces
- Consistent patterns across components

---

## 📊 Component Relationship Map

```
Modal (Full-screen overlay)
├── CloseButtonPanel (Header + content + tabs)
│   ├── Panel (Content container)
│   │   ├── OuterPanel (Dark border layer)
│   │   └── InnerPanel (Light border layer)
│   │       ├── ColorPanel (With label colors)
│   │       ├── ButtonPanel (Interactive containers)
│   │       │   └── Card patterns
│   │       ├── Label (Status badges)
│   │       ├── Button (Interactive elements)
│   │       ├── SquareIcon (Icons)
│   │       └── Text + Content
│   └── Tabs support
│       └── Multiple tab content
│
├── SpeakingModal (Character dialogue)
│   ├── Panel
│   ├── Bumpkin Character visual
│   ├── Typed text animation
│   └── Action buttons
│
└── Custom components (TreasureChest, etc)
    └── Panel-based structure

HUD Elements (Always visible)
├── Balances (Currency display)
│   ├── SFL icon + amount
│   ├── Coins icon + amount
│   ├── Gems icon + amount
│   └── Chips icon + amount
└── Navigation / Inventory buttons
```

---

## 🎯 Common Patterns

### Panel-Based Layout
```
Design Pattern: All game UI uses Panels as containers
Benefit: Consistent styling, clear hierarchy, reusable
```

### Pixel Border System
```
Design Pattern: Procedural borders from asset images
Benefit: Crisp pixel-art look at any scale, cheap to modify
```

### Semantic Colors
```
Design Pattern: Colors represent meaning (success, danger, etc)
Benefit: User immediately understands intent, consistent experience
```

### Icon + Text Combination
```
Design Pattern: All currencies/items shown with icon + amount
Benefit: Visual clarity, international understanding, consistent layout
```

### Layered Modality
```
Design Pattern: Modal > CloseButtonPanel > Panel > Content
Benefit: Clear visual hierarchy, reusable layers, keyboard support
```

---

## 📏 Key Constants Reference

```tsx
// Sizing
PIXEL_SCALE = 1 game pixel unit
Used as: PIXEL_SCALE * Npx

// Common Panel Sizing
Panel Padding:         PIXEL_SCALE * 1px
Panel Border:          PIXEL_SCALE * 2px
Panel Radius:          PIXEL_SCALE * 5px
Card Image Height:     70-138px
Button Height:         32px

// Colors
Light Tan:             #e4a672
Dark Tan:              #c28569
Light Cream:           #fff0d4

// Assets
SUNNYSIDE: Central image asset paths
ui.lightBorder, ui.darkBorder, etc.
icons.heart, icons.star, etc.
```

---

## 🛠️ Implementation Checklist

### Before Building UI

- [ ] Read relevant pattern section (5-10 min)
- [ ] Copy appropriate snippet as template
- [ ] Check sizing using `PIXEL_SCALE`
- [ ] Select correct Label type for colors
- [ ] Use SUNNYSIDE for all images
- [ ] Test on mobile viewport
- [ ] Test dark mode
- [ ] Add keyboard support
- [ ] Add sound effects if interactive
- [ ] Check accessibility

### Component Structure

- [ ] Wrap in Modal if fullscreen overlay
- [ ] Use CloseButtonPanel if close button needed
- [ ] Use Panel for main container
- [ ] Use Label for status/badges
- [ ] Use Button for interactive elements
- [ ] Use SquareIcon for item icons
- [ ] Use Balances for currency display
- [ ] Use ButtonPanel variant="card" for items
- [ ] Apply proper spacing with gap/padding
- [ ] Use proper text classes (text-sm, text-xs)

### Styling

- [ ] Apply PIXEL_SCALE to dimensions
- [ ] Use pixelBorderStyle for custom borders
- [ ] Choose semantic Label type
- [ ] Support dark mode
- [ ] Test on >3 screen sizes
- [ ] Use SUNNYSIDE asset paths

---

## 🔍 Component Lookup Table

| Component | File | Use Case | Export |
|-----------|------|----------|--------|
| Panel | `components/ui/Panel.tsx` | Main container | `Panel` |
| OuterPanel | `components/ui/Panel.tsx` | Dark border layer | `OuterPanel` |
| InnerPanel | `components/ui/Panel.tsx` | Light border layer | `InnerPanel` |
| ButtonPanel | `components/ui/Panel.tsx` | Interactive container | `ButtonPanel` |
| ColorPanel | `components/ui/Panel.tsx` | Color-coded container | `ColorPanel` |
| Modal | `components/ui/Modal.tsx` | Full-screen overlay | `Modal` |
| Button | `components/ui/Button.tsx` | Interactive element | `Button` |
| Label | `components/ui/Label.tsx` | Status badge | `Label` |
| SquareIcon | `components/ui/SquareIcon.tsx` | Icon display | `SquareIcon` |
| CloseButtonPanel | `features/game/components/CloseablePanel.tsx` | Modal header | `CloseButtonPanel` |
| SpeakingModal | `features/game/components/SpeakingModal.tsx` | NPC dialogue | `SpeakingModal` |
| Balances | `components/Balances.tsx` | Currency display | `Balances` |
| CountLabel | `components/ui/CountLabel.tsx` | Count badge | `CountLabel` |
| TreasureChest | `features/world/ui/chests/TreasureChest.tsx` | Reward chest | `TreasureChest` |

---

## 📖 Documentation Reading Tips

### For First-Time Review
1. Start with this document (5 min)
2. Skim DESIGN_SYSTEM.md visual sections (10 min)
3. Read DESIGN_PATTERNS.md intro (10 min)
4. **Total planned time: 25 min overview**

### For Implementing a Feature
1. Find relevant section in DESIGN_PATTERNS.md
2. Copy snippet from SNIPPETS.md
3. Reference colors/sizes from DESIGN_SYSTEM.md
4. **Total time: 15-30 min**

### For Quick Code Reference
1. Ctrl+F search SNIPPETS.md
2. Copy paste code
3. Modify as needed
4. **Total time: 5-10 min**

### For Design Questions
1. Check DESIGN_SYSTEM.md color/size tables
2. Check visual hierarchy section
3. Check component checklist
4. **Total time: 5 min**

---

## 🎮 Real-World Example: Complete Modal

Here's how to use all three documents for one feature:

### Feature: Daily Reward Chest Modal

**DESIGN_PATTERNS.md tells you:**
- Use Modal wrapper
- Use CloseButtonPanel for header
- Use Label for chest type indicator
- Use SpeakingModal for reward message
- Use Balances to show rewards

**SNIPPETS.md gives you:**
```tsx
<Modal show={isOpen} onHide={closeModal}>
  <CloseButtonPanel onClose={closeModal} title="Daily Reward">
    <Label type="success">Chest Opened!</Label>
    <div className="flex gap-2">
      {/* Items display here */}
    </div>
  </CloseButtonPanel>
</Modal>
```

**DESIGN_SYSTEM.md shows you:**
- Colors: Success type = #3e8948 (green)
- Spacing: 8px padding between sections
- Icon sizes: 26px for main items
- Text: text-sm for descriptions
- Typography: font-bold for rewards

**Result:** Fully styled, accessible, consistent modal

---

## 🚀 Common Tasks

### Add Item to Game
1. Patterns: Marketplace Card Pattern
2. Snippets: ItemCard component
3. System: Card Layout Details
4. Color: Use Label type="vibrant" for rare
5. Size: Icon width 32, card height 70

### Create NPC Interaction
1. Patterns: SpeakingModal section
2. Snippets: NPCInteraction example
3. System: NPC Positioning
4. Add: NPC_WEARABLES bumpkinParts
5. Messages: Array of Message objects

### Display Inventory
1. Patterns: Card Display Pattern
2. Snippets: ItemGrid example
3. System: Marketplace Card Layout
4. Layout: grid-cols-3 md:grid-cols-4
5. Items: Use ButtonPanel variant="card"

### Style Status Indicator
1. System: Label Color Reference table
2. Patterns: Label System section
3. Snippets: LabelExamples
4. Choose: Type based on meaning
5. Add: Icon if needed

---

## 📝 File Organization

```
Project Root/
├── GAME_UI_DESIGN_PATTERNS.md     ← Architecture & patterns
├── GAME_UI_SNIPPETS.md             ← Code examples
├── GAME_UI_DESIGN_SYSTEM.md        ← Colors & visual guide
└── src/
    ├── components/ui/              ← Core UI components
    │   ├── Panel.tsx               ← Panel system
    │   ├── Modal.tsx               ← Modal overlay
    │   ├── Button.tsx              ← Buttons
    │   ├── Label.tsx               ← Status labels
    │   ├── SquareIcon.tsx          ← Icon display
    │   └── ...
    ├── features/game/components/
    │   ├── CloseablePanel.tsx      ← Modal header
    │   ├── SpeakingModal.tsx       ← NPC dialogue
    │   └── ...
    ├── features/game/lib/
    │   ├── style.ts                ← Border styles
    │   └── constants.ts            ← PIXEL_SCALE
    └── assets/
        └── sunnyside/              ← Image assets
```

---

## ✅ Design System Maturity Check

This design system provides:
- ✅ Complete component library (15+ components)
- ✅ Semantic color system (8 label types)
- ✅ Consistent sizing (via PIXEL_SCALE)
- ✅ Reusable patterns (panels, cards, modals)
- ✅ Accessibility features (kbd support, contrast)
- ✅ Dark mode support
- ✅ Responsive layouts
- ✅ Sound feedback integration
- ✅ Character/NPC support
- ✅ Animation hooks available
- ✅ Internationalization ready
- ✅ Documentation (3 complete guides)

---

## 📞 Quick Reference Links

**Need colors?** → [Color Palette](GAME_UI_DESIGN_SYSTEM.md#color-palette)

**Need component sizes?** → [Component Size Reference](GAME_UI_DESIGN_SYSTEM.md#component-sizes)

**Need a code example?** → [All Snippets](GAME_UI_SNIPPETS.md)

**Need to understand architecture?** → [Core Panel System](GAME_UI_DESIGN_PATTERNS.md#1-core-panel-system)

**Need to check colors?** → [Label Color Reference](GAME_UI_DESIGN_SYSTEM.md#label-color-reference)

**Need border styles?** → [Pixel Border System](GAME_UI_DESIGN_PATTERNS.md#2-pixel-border-system)

**Need imports?** → [Common Import Patterns](GAME_UI_SNIPPETS.md#14-common-import-patterns)

---

## 🎓 Learning Path

### Week 1: Foundations
- [ ] Read this overview (15 min)
- [ ] Skim DESIGN_SYSTEM.md color/size sections (20 min)
- [ ] Read DESIGN_PATTERNS.md Panel System section (15 min)
- [ ] Create 1 simple Panel component (15 min)

### Week 2: Components
- [ ] Read DESIGN_PATTERNS.md Modal section
- [ ] Read DESIGN_PATTERNS.md Button section
- [ ] Create Modal with CloseButtonPanel
- [ ] Create Card grid layout

### Week 3: Patterns
- [ ] Read DESIGN_PATTERNS.md Card Display section
- [ ] Read DESIGN_PATTERNS.md Currency Display section
- [ ] Create inventory grid
- [ ] Implement currency display

### Week 4: Polish
- [ ] Read DESIGN_PATTERNS.md SpeakingModal section
- [ ] Implement NPC interaction
- [ ] Test dark mode
- [ ] Test responsive layouts

---

## 💡 Tips & Tricks

### Working Faster
- Keep SNIPPETS.md open in split view
- Use Cmd+F to search patterns
- Copy-paste template, edit inline
- Reference SYSTEM.md colors while styling

### Avoiding Mistakes
- Always use PIXEL_SCALE for sizing
- Don't customize colors without reason
- Use existing Label types before adding custom
- Test on mobile first
- Check dark mode before shipping

### Best Practices
- Use semantic Label type (match intent)
- Keep modal titles concise
- Use icons with text (not text alone)
- Provide keyboard shortcuts
- Test sound effects
- Document prop interfaces

---

**Last Updated:** March 2026  
**Design System Version:** 1.0 (Complete)  
**Component Count:** 15+ documented components  
**Pattern Count:** 20+ documented patterns
