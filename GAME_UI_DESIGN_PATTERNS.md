# Sunflower Land Game UI Design Patterns Guide

This document outlines the reusable design and styling patterns used throughout the game UI components. These patterns create the cohesive pixel-art farming game aesthetic.

## 1. Core Panel System

### Overview
Panels are the primary container component used for all content sections, modals, and interactive areas. They use a layered pixel-art border system.

### Panel Variants

#### **Panel (Default - Double Layered)**
- **Location**: `src/components/ui/Panel.tsx`
- **Use Case**: Main content containers, primary UI sections
- **Structure**: OuterPanel (dark border) + InnerPanel (light border)
- **Pattern**:
```tsx
<Panel bumpkinParts={bumpkinParts}>
  {children}
</Panel>
```
- **Key Features**:
  - Double-layered pixel border effect (depth)
  - Optional NPC bumpkin character display on top-left
  - Light background (#e4a672 or #c28669 in dark mode)
  - Responsive padding using PIXEL_SCALE constant

#### **OuterPanel (Single Dark Layer)**
- **Use Case**: Outer container with dark border
- **Background**: #c28569 (brown)
- **Border**: Dark pixel border (pixelDarkBorderStyle)
- **Pattern**:
```tsx
<OuterPanel>
  {children}
</OuterPanel>
```

#### **InnerPanel (Single Light Layer)**
- **Use Case**: Inner content area with light border
- **Background**: #e4a672 (light tan)
- **Border**: Light pixel border (pixelLightBorderStyle)
- **Pattern**:
```tsx
<InnerPanel>
  {children}
</InnerPanel>
```

#### **ButtonPanel (Interactive Container)**
- **Use Case**: Card-like containers, marketplace items, clickable regions
- **Variants**: "primary" | "secondary" | "card"
- **Interactive Features**:
  - Hover: `brightness-90`
  - Active: `scale-[0.997]`
  - Disabled: `opacity-50`
- **Pattern**:
```tsx
<ButtonPanel onClick={onClick} variant="card">
  <div className="h-full flex flex-col">
    {/* Card content */}
  </div>
</ButtonPanel>
```
- **Marketplace Card Example**: Height 70px for standard items, 32px (h-32) for buds, 138px for pets
- **Internal Layout**: Image section + text section with cream background (#fff0d4)

#### **ColorPanel (Token-based Styling)**
- **Use Case**: Special status containers that inherit Label color schemes
- **Type Prop**: Matches LabelType enum
- **Pattern**:
```tsx
<ColorPanel type="success">
  {children}
</ColorPanel>
```

### Tab Support in Panels
- **CloseButtonPanel** supports tabs with optional tab rendering
- **Tab Icon Pattern**: Use image paths with SUNNYSIDE assets
- **Tab Switching**: State managed via `currentTab` and `setCurrentTab`
- **Visual**: Tabs display as buttons above content with icon + name

---

## 2. Pixel Border System

### Overview
All panels use procedurally-styled pixel borders from **pixelized border images** stored in assets/ui/.

### Border Styles Available

| Style | Color | Use Case |
|-------|-------|----------|
| `pixelLightBorderStyle` | Tan/Beige | Inner panels, light containers |
| `pixelDarkBorderStyle` | Brown | Outer panels, darker containers |
| `pixelGrayBorderStyle` | Gray | Default, generic containers |
| `pixelOrangeBorderStyle` | Orange | Warning, rare items |
| `pixelRedBorderStyle` | Red | Danger, errors |
| `pixelGreenBorderStyle` | Green | Success, buffs |
| `pixelBlueBorderStyle` | Blue | Info, boosts |
| `pixelVibrantBorderStyle` | Purple | Special, epic items |
| `pixelFormulaBorderStyle` | Dark Blue | Formula/Crafting |
| `pixelCalmBorderStyle` | Tan | General, calm state |

### Implementation Pattern
```tsx
import { pixelDarkBorderStyle } from "features/game/lib/style";

// Applied to any element
const myElement = (
  <div style={{ ...pixelDarkBorderStyle, padding: "8px" }}>
    Content
  </div>
);
```

### CSS Properties
- **borderWidth**: `PIXEL_SCALE * 2` px
- **borderStyle**: "solid"
- **borderImage**: URL reference with 20% slice
- **borderImageRepeat**: "stretch"
- **imageRendering**: "pixelated" (critical for pixel-perfect effect)
- **borderRadius**: `PIXEL_SCALE * 5` px (slight rounding)

---

## 3. Label System (Status & Tags)

### Overview
Labels are small, colored containers used for badges, status indicators, and category tags. They use a semantic color system.

### Location
`src/components/ui/Label.tsx`

### LabelType Variants

| Type | Background | Text Color | Use Case |
|------|-----------|-----------|----------|
| `default` | #c0cbdc | #181425 | Standard labels |
| `danger` | #e43b44 | White | Errors, negative states |
| `success` | #3e8948 | White | Positive completion, buffs |
| `info` | #1e6dd5 | White | Information, boosts |
| `warning` | #f09100 | #3e2731 | Caution, rare items |
| `vibrant` | #b65389 | White | Special, epic quality |
| `formula` | #3c4665 | White | Crafting, formulas |
| `chill` | #e4a672 | #3e2731 | Calm, friendly |
| `transparent` | None | #181425 | Text-only labels |

### Usage Pattern
```tsx
<Label type="success" icon={iconUrl} className="mb-2">
  Achievement Unlocked
</Label>

<Label type="danger">
  Warning
</Label>

<Label type="vibrant" secondaryIcon={secondaryIconUrl}>
  Rare Item
</Label>
```

### Props
- **icon**: Optional image URL shown to left of text
- **iconWidth**: Optional icon pixel width
- **secondaryIcon**: Optional icon shown after text
- **className**: Additional CSS classes
- **type**: LabelType (see table above)
- **popup**: Shows toast notification when copied

---

## 4. Button System

### Overview
Buttons use image-based borders with pixel-art styling for a cohesive game feel.

### Location
`src/components/ui/Button.tsx`

### Button Variants

#### **Primary Button**
- **Border Image**: primaryButton
- **Pressed State**: primaryButtonPressed
- **Use Case**: Main actions, confirmations
- **Pattern**:
```tsx
<Button onClick={() => handleAction()}>
  Click Me
</Button>
```

#### **Secondary Button**
- **Border Image**: secondaryButton (same as used_button)
- **Use Case**: Alternative actions, less important
- **Pattern**:
```tsx
<Button variant="secondary" onClick={() => handleAction()}>
  Secondary Action
</Button>
```

### Interactive States
- **Hover**: `brightness-90`
- **Active**: `scale-[0.99]` (slight press animation)
- **Disabled**: `opacity-50`, `cursor-not-allowed`
- **Sound**: Plays "button" sound effect on click

### Special Features
- **Long Press**: Optional long-press behavior with `longPress={true}`
- **Sound**: Integrates useSound hook for audio feedback
- **Full Width**: Default `w-full` unless custom width specified
- **Content Alignment**: `contentAlign` prop ("start" | "center" | "end")

---

## 5. Modal System

### Overview
Modals display full-screen overlays with custom content, using a fade and center-align pattern.

### Location
`src/components/ui/Modal.tsx`

### Usage Patterns

#### **Basic Modal**
```tsx
<Modal show={isOpen} onHide={closeModal}>
  <Panel>
    {/* Modal content */}
  </Panel>
</Modal>
```

#### **Modal with CloseButtonPanel**
```tsx
<Modal show={isOpen} onHide={closeModal}>
  <CloseButtonPanel onClose={closeModal}>
    {/* Content with auto close button */}
  </CloseButtonPanel>
</Modal>
```

#### **Modal with Tabs**
```tsx
<Modal show={isOpen} onHide={closeModal}>
  <CloseButtonPanel 
    title="Title"
    tabs={[
      { id: "tab1", icon: iconUrl, name: "Tab 1" },
      { id: "tab2", icon: iconUrl, name: "Tab 2" }
    ]}
    currentTab={currentTab}
    setCurrentTab={setCurrentTab}
    onClose={closeModal}
  >
    {currentTab === "tab1" && <Tab1Content />}
    {currentTab === "tab2" && <Tab2Content />}
  </CloseButtonPanel>
</Modal>
```

### Key Features
- **Backdrop**: Semi-transparent black (#000 with opacity-50), disableable via `backdrop={false}` or `backdrop="static"`
- **Animations**: Fade in/out using Headless UI Transition
- **Sounds**: Plays "open" on show, "close" on hide
- **Centering**: Automatically centered on screen
- **Sizes**: `size="lg"` (default) or `size="sm"`
- **Fullscreen**: `fullscreen={true}` for full-screen modals

### Layout Example
```tsx
<Modal 
  show={interactable === "treasure_chest"} 
  onHide={closeModal}
  dialogClassName="md:max-w-3xl"
>
  <CloseButtonPanel onClose={closeModal} title="Treasure Chest">
    <ChestRevealing type={type} />
  </CloseButtonPanel>
</Modal>
```

---

## 6. Card Display Pattern (Marketplace/Inventory)

### Overview
Cards are the primary way to display items, collectibles, and tradeable goods. They follow a consistent image-text layout.

### Location
`src/features/marketplace/components/ListViewCard.tsx`

### Card Structure
```
┌─────────────────────────┐
│   Image Area (70-138px) │  ← Centered item image
├─────────────────────────┤
│ Price/Stats Section     │  ← Price badge (SFL + amount)
│ (#fff0d4 background)    │
│                         │
│ Name + Description      │
│ Buffs/Experience tags   │
│ Inventory count badge   │
└─────────────────────────┘
```

### Card Examples

#### **Standard Item Card**
- **Height**: 70px image + minimum 57px text
- **Image**: Centered, auto-scaled
- **Text Section**: Beige background (#fff0d4)
- **Count Badge**: Shows inventory quantity in top-right
- **Pattern**:
```tsx
<ButtonPanel onClick={onClick} variant="card" className="h-full flex flex-col">
  <div className="h-[70px] p-2 pt-4">
    {/* Image here */}
  </div>
  <div style={{
    background: "#fff0d4",
    borderTop: "1px solid #e4a672",
    height: "100px",
    minHeight: "57px"
  }}>
    {/* Price and info */}
  </div>
</ButtonPanel>
```

#### **Bud Card**
- **Height**: h-32 (128px image area)
- **Special rendering**: Pet egg marketplace image as fallback

#### **Pet Card**
- **Height**: h-[138px] (138px image area)
- **Special rendering**: Pet NFT marketplace image as fallback

### Price Display Pattern
```tsx
<div className="absolute top-0 left-0">
  <div className="flex items-center">
    <div className="bg-[#fff0d4] opacity-70 absolute nft-marketplace-flower-price-backdrop w-[120%] h-[20px]" />
    <img src={sfl} className="h-4 sm:h-5 mr-1" />
    <p className="text-xs font-normal whitespace-nowrap">
      {formatNumber(price, { decimalPlaces: 4 })}
    </p>
  </div>
</div>
```

### Cost Display Pattern
```tsx
<CountLabel
  count={cost}
  icon={iconUrl}
  type="danger"
  className="absolute bottom-0 left-0"
/>
```

---

## 7. Currency Display System

### Overview
Currencies are displayed with a consistent icon + text pattern, used in HUD and modals.

### Location
`src/components/Balances.tsx`

### Balance Display Pattern

#### **Standard Currency Display**
```tsx
<div className="flex items-center space-x-2">
  <span className="balance-text">
    {formatNumber(amount)}
  </span>
  <img src={currencyIcon} alt="Currency" style={{ width: 25 }} />
</div>
```

#### **Full Balances Component**
```tsx
<Balances
  sfl={gameState.balance}
  coins={gameState.coins}
  gems={gameState.gems}
  chips={gameState.inventory.Chip}
  onClick={openCurrenciesModal}
/>
```

### Supported Currencies
- **SFL** (Flower Token): `flowerIcon` (26px)
- **Coins**: `coinsIcon` (25px)
- **Gems**: `gemIcon` (28px)
- **Chips**: `chipIcon` (25x25px)

### Styling Details
- **Container**: Dark background backdrop (#000 with opacity-25 to 30%)
- **Text Class**: `balance-text` (28px, text-stroke effect)
- **Layout**: Horizontal flex with 8px spacing
- **Alignment**: Right-aligned in HUD
- **Add Button**: Small "+" icon for purchasing currencies (floating right)
- **Decimal Display**: Toggleable (click shows 8 decimals for SFL)

---

## 8. Character/NPC Speaking Modal

### Overview
Interactive dialogue with NPCs, featuring typed text animations and character portraits.

### Location
`src/features/game/components/SpeakingModal.tsx`

### Usage Pattern
```tsx
<SpeakingModal
  onClose={closeModal}
  bumpkinParts={NPC_WEARABLES.wobble}
  message={[
    {
      text: "First message with typing animation...",
      actions: [
        { text: "Accept", cb: handleAccept },
        { text: "Decline", cb: handleDecline }
      ]
    },
    {
      text: "Second message (auto-progresses on click)"
    }
  ]}
/>
```

### Features
- **Typed Text Animation**: Text reveals character-by-character
- **Multi-message Support**: Array of sequential messages
- **Auto-progression**: Click/Space/Enter to advance
- **Action Buttons**: Optional action buttons for last message
- **Character Portrait**: Optional NPC bumpkin parts overlay (top-left)
- **Keyboard Support**: Enter, Space, Escape keys advance
- **Dynamic Height**: Adjusts based on longest message

### Layout
```
┌──────────────────────┐
│ Character Image      │  ← If bumpkinParts provided
│ (Top-left, z-10)     │
├──────────────────────┤
│ "Tap to continue"    │  ← Text animation area
│ Typed message...     │
│                      │
├──────────────────────┤
│ [Action] [Button]    │  ← If message has actions
└──────────────────────┘
```

---

## 9. Icon System (SquareIcon)

### Overview
Responsive icon component that auto-scales pixel art icons to fit within containers.

### Location
`src/components/ui/SquareIcon.tsx`

### Usage Pattern
```tsx
<SquareIcon
  icon={itemImageUrl}
  width={20}  // Width in game pixels, gets scaled by PIXEL_SCALE
  className="border border-gray-300"
  style={{ background: "#f5f5f5" }}
/>
```

### Features
- **Auto-scaling**: Detects natural image dimensions
- **Pixel preservation**: Uses `imageRendering: pixelated`
- **Aspect ratio preservation**: Maintains width/height ratio
- **Container sizing**: Square container based on width parameter
- **Smart sizing algorithm**:
  - If image ≤ iconWidth: scales by PIXEL_SCALE
  - If image fits within bounds: scales to fit
  - Handles height-dominant images specially

---

## 10. Treasure Chest Component Pattern

### Overview
Complex component demonstrating tabbed UI, animation states, and reward reveals.

### Location
`src/features/world/ui/chests/TreasureChest.tsx`

### Key Patterns Used
- **Tabs**: Chest type info + Rewards list tabs
- **Tab Icons**: Different chest images (basic, rare, luxury)
- **States**: Picking animation → Revealing animation → Result display
- **Integration**: Uses Revealed component for item reveal animations
- **Modal Integration**: Wrapped in CloseButtonPanel within Modal

### Content Example
```tsx
const tabs = [
  {
    id: "chest",
    icon: basicChest,  // Image path
    name: "Basic Chest"
  },
  {
    id: "rewards",
    icon: rewardsIcon,
    name: "Rewards"
  }
];

// Content changes based on currentTab
{currentTab === "chest" && <ChestRevealing type={type} />}
{currentTab === "rewards" && <ChestRewardsList type={type} />}
```

---

## 11. Daily Reward Components (Chips Example)

### Overview
Simple reward notification using SpeakingModal pattern.

### Location
`src/features/world/ui/chests/DailyChipsReward.tsx`

### Pattern
```tsx
<SpeakingModal
  onClose={handleClaim}
  message={[
    {
      text: `Daily reward! You've been awarded ${chipCount} chips!`,
      actions: [
        {
          text: "Claim",
          cb: onClaimDailyChips
        }
      ]
    }
  ]}
/>
```

### Features
- **Eligibility check**: Per-day tracking (ISO date string)
- **Dynamic messaging**: Different messages for already-claimed, max-reached, eligible
- **State updates**: Integrates with game service for reward claiming
- **Action callback**: Direct claim functionality

---

## 12. Asset Constants (SUNNYSIDE & PIXEL_SCALE)

### Overview
Central asset constants ensure consistent sizing and styling across components.

### Location
- **SUNNYSIDE**: `assets/sunnyside/` (image paths)
- **PIXEL_SCALE**: `src/features/game/lib/constants.ts`

### PIXEL_SCALE Pattern
```tsx
import { PIXEL_SCALE } from "features/game/lib/constants";

// Use for any pixel-based dimension
const size = PIXEL_SCALE * 16;  // 16 game pixels
```

### Common SUNNYSIDE Assets
```tsx
SUNNYSIDE.ui.{
  lightBorder,
  darkBorder,
  grayBorder,
  orangeBorder,
  redBorder,
  blueBorder,
  greenBorder,
  vibrantBorder,
  formulaBorder,
  calmBorder,
  primaryButton,
  primaryButtonPressed,
  add_button
}
```

---

## 13. Practical Integration Examples

### Full Game Modal Flow
```tsx
<Modal show={isOpen} onHide={closeModal}>
  <CloseButtonPanel 
    title="Game Interface"
    onClose={closeModal}
    tabs={[
      { id: "items", icon: itemIcon, name: "Items" },
      { id: "stats", icon: statsIcon, name: "Stats" }
    ]}
    currentTab={activeTab}
    setCurrentTab={setActiveTab}
  >
    {activeTab === "items" && (
      <div className="grid grid-cols-3 gap-2">
        {items.map(item => (
          <ButtonPanel key={item.id} variant="card">
            <SquareIcon icon={item.image} width={16} />
            <Label type="info">{item.name}</Label>
            {item.count > 0 && <CountLabel count={item.count} icon={coinsIcon} />}
          </ButtonPanel>
        ))}
      </div>
    )}
    {activeTab === "stats" && (
      <div>
        <Label type="success">Health: 100/100</Label>
        <Label type="warning">Mana: 50/50</Label>
      </div>
    )}
  </CloseButtonPanel>
</Modal>
```

### Marketplace Item Card
```tsx
<div className="grid gap-3 grid-cols-3">
  {items.map(item => (
    <ButtonPanel 
      onClick={() => selectItem(item)}
      variant="card"
      className="h-full flex flex-col"
    >
      <div className="h-[70px] p-2 pt-4 flex items-center justify-center">
        <SquareIcon icon={item.image} width={32} />
      </div>
      <div style={{ background: "#fff0d4", borderTop: "1px solid #e4a672" }} className="p-2">
        <p className="font-bold text-xs">{item.name}</p>
        <div className="flex items-center mt-1">
          <img src={flowerIcon} className="h-4 mr-1" />
          <span className="text-xs">{formatNumber(item.price)}</span>
        </div>
        {item.inventory > 0 && (
          <CountLabel count={item.inventory} icon={item.image} />
        )}
      </div>
    </ButtonPanel>
  ))}
</div>
```

---

## 14. Dark Mode Support

### Overview
The UI system supports dark mode with automatic color adjustments.

### Usage Pattern
```tsx
import { useIsDarkMode } from "lib/utils/hooks/useIsDarkMode";

const { isDarkMode } = useIsDarkMode();

const bgColor = isDarkMode ? "#c28669" : "#e4a672";
```

### Dark Mode Panel Background
- **Light Mode**: #e4a672 (light tan)
- **Dark Mode**: #c28569 (darker tan)

---

## 15. Common CSS Patterns

### Flex Spacing
```tsx
className="flex gap-2 items-center"        // For rows
className="flex flex-col gap-2"            // For columns
className="space-x-2"                      // Legacy spacing
className="space-y-1"                      // Vertical spacing
```

### Pixel Sizing
```tsx
padding: `${PIXEL_SCALE * 1}px`            // 1 game pixel padding
margin: `${PIXEL_SCALE * 2}px`             // 2 game pixel margin
width: `${PIXEL_SCALE * 16}px;`            // 16 game pixels width
height: `${PIXEL_SCALE * 100}px`           // 100 game pixels height
```

### Text Styling
```tsx
className="text-sm"                        // Small text
className="text-xs"                        // Extra small (labels)
className="font-bold"                      // Bold headers
className="font-secondary"                 // Secondary font
className="text-stroke"                    // Outlined text effect
className="balance-text"                   // Currency text (28px)
```

### Interactive Elements
```tsx
className="cursor-pointer hover:brightness-90"
className="cursor-not-allowed opacity-50"
className="transition-transform active:scale-[0.99]"
```

---

## Summary of Key Assets

| Component | Primary File | Border Style | Background |
|-----------|-------------|--------------|-----------|
| Panel | `Panel.tsx` | pixelLightBorderStyle + pixelDarkBorderStyle | #e4a672 / #c28569 |
| OuterPanel | `Panel.tsx` | pixelDarkBorderStyle | #c28569 |
| InnerPanel | `Panel.tsx` | pixelLightBorderStyle | #e4a672 |
| ButtonPanel | `Panel.tsx` | Button image borders | Inherit |
| ColorPanel | `Panel.tsx` | Label color borders | Label color |
| Labels | `Label.tsx` | Color-specific borders | Color palette |
| Buttons | `Button.tsx` | primaryButton / secondaryButton | Inherit |
| Modals | `Modal.tsx` | Panel borders | Semi-transparent overlay |
| Cards | `ListViewCard.tsx` | buttonPanel borders | #fff0d4 (text section) |
| Balances | `Balances.tsx` | None (HUD element) | Dark backdrop |

---

## Recommended Implementation Checklist

- [ ] Use Panel/OuterPanel for main containers
- [ ] Apply pixelBorderStyle to custom elements
- [ ] Use SquareIcon for all item/icon displays
- [ ] Use Label for status/badge information
- [ ] Use Button variant for main interactions
- [ ] Use CloseButtonPanel for modals with close functionality
- [ ] Wrap content in Modal for overlays
- [ ] Use SpeakingModal for NPC/character interactions
- [ ] Use ListViewCard pattern for inventory displays
- [ ] Use Balances component for currency displays
- [ ] Apply dark mode hook to style-aware components
- [ ] Always scale dimensions with PIXEL_SCALE
- [ ] Use SUNNYSIDE asset paths for consistency
- [ ] Test pixel-rendering on different screen scales
