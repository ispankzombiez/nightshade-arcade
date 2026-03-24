# Item Image Reference Guide

## Finding Item Images for Kale, Barley, Wheat, and Turnip

### 1. Image Access Pattern

All crop item images are accessed through the `ITEM_DETAILS` object defined in [src/features/game/types/images.ts](src/features/game/types/images.ts):

```tsx
// Access the crop images
ITEM_DETAILS.Wheat.image     // Image URL for harvested wheat
ITEM_DETAILS.Kale.image      // Image URL for harvested kale
ITEM_DETAILS.Barley.image    // Image URL for harvested barley
ITEM_DETAILS.Turnip.image    // Image URL for harvested turnip
```

### 2. Image Path Structure

The images come from `CROP_LIFECYCLE`, which is defined in [src/features/island/plots/lib/plant.ts](src/features/island/plots/lib/plant.ts):

**Image URL Format:**
```
${CONFIG.PROTECTED_IMAGE_URL}/crops/{crop_name}/crop.png
```

**Actual URLs:**
- Wheat: `${CONFIG.PROTECTED_IMAGE_URL}/crops/wheat/crop.png`
- Kale: `${CONFIG.PROTECTED_IMAGE_URL}/crops/kale/crop.png`
- Barley: `${CONFIG.PROTECTED_IMAGE_URL}/crops/barley/crop.png`
- Turnip: `${CONFIG.PROTECTED_IMAGE_URL}/crops/turnip/crop.png`

**Related Images (if needed):**
- Seedling: `crops/{crop_name}/seedling.png`
- Halfway grown: `crops/{crop_name}/halfway.png`
- Almost ready: `crops/{crop_name}/almost.png`
- Growing plant: `crops/{crop_name}/plant.png`
- Seed: `crops/{crop_name}/seed.png`

### 3. SquareIcon Component

Location: [src/components/ui/SquareIcon.tsx](src/components/ui/SquareIcon.tsx)

**Purpose:** Responsive component for displaying pixel art item icons that auto-scales to fit containers.

**Basic Usage:**
```tsx
import { SquareIcon } from "components/ui/SquareIcon";
import { ITEM_DETAILS } from "features/game/types/images";

export const ItemDisplay = () => (
  <SquareIcon
    icon={ITEM_DETAILS.Wheat.image}
    width={20}  // Size in game pixels (gets scaled by PIXEL_SCALE)
  />
);
```

**Props:**
- `icon: string` - Image URL
- `width: number` - Width in game pixels (auto-scaled)
- `className?: string` - Optional CSS classes
- `style?: React.CSSProperties` - Optional inline styles

**Key Features:**
- Auto-detects image dimensions via `onLoad`
- Preserves pixel art quality with `imageRendering: pixelated` (internal)
- Maintains aspect ratio
- Smart scaling algorithm:
  - Small images (≤ width): scales by `PIXEL_SCALE`
  - Larger images: scales to fit within bounds
  - Height-dominant images: special handling

**Size Examples:**
```tsx
{/* Small icon (16px game pixels) */}
<SquareIcon icon={ITEM_DETAILS.Wheat.image} width={16} />

{/* Medium icon (32px) */}
<SquareIcon icon={ITEM_DETAILS.Wheat.image} width={32} />

{/* Large icon with styling */}
<SquareIcon
  icon={ITEM_DETAILS.Wheat.image}
  width={48}
  className="border-2 border-yellow-400"
  style={{ background: "#fff0d4" }}
/>
```

### 4. Inventory Display Patterns

Other components that display item images with counts:

#### Box Component
Location: [src/components/ui/Box.tsx](src/components/ui/Box.tsx)

```tsx
import { Box } from "components/ui/Box";
import { ITEM_DETAILS } from "features/game/types/images";

<Box
  image={ITEM_DETAILS.Wheat.image}
  count={5}  // Shows count badge
  isSelected={false}
  onClick={() => {}}
/>
```

#### SmallBox Component
Location: [src/components/ui/SmallBox.tsx](src/components/ui/SmallBox.tsx)

```tsx
import { SmallBox } from "components/ui/SmallBox";
import { ITEM_DETAILS } from "features/game/types/images";

<SmallBox
  image={ITEM_DETAILS.Wheat.image}
  count={10}
  onClick={() => {}}
/>
```

#### CountLabel Component
Location: [src/components/ui/CountLabel.tsx](src/components/ui/CountLabel.tsx)

```tsx
import { CountLabel } from "components/ui/CountLabel";

<CountLabel
  count={5}
  icon={ITEM_DETAILS.Wheat.image}
  type="info"  // 'info', 'warning', 'secondary'
/>
```

### 5. Real-World Usage Examples

**Example 1: In Chore Details**
[src/features/island/hud/components/codex/lib/choreDetails.ts](src/features/island/hud/components/codex/lib/choreDetails.ts):

```tsx
"Harvest Wheat 250 times": {
  icon: ITEM_DETAILS.Wheat.image,
  description: translate("chore.harvest.wheat.250"),
},
"Harvest Kale 150 times": {
  icon: ITEM_DETAILS.Kale.image,
  description: translate("chore.harvest.kale.150"),
},
"Harvest Barley 100 times": {
  icon: ITEM_DETAILS.Barley.image,
  description: translate("chore.harvest.barley.100"),
},
"Harvest Turnip 250 times": {
  icon: ITEM_DETAILS.Turnip.image,
  description: translate("chore.harvest.turnip.250"),
},
```

**Example 2: In Composter Modal**
[src/features/island/buildings/components/building/composters/ComposterModal.tsx](src/features/island/buildings/components/building/composters/ComposterModal.tsx):

```tsx
<SquareIcon icon={ITEM_DETAILS[produce].image} width={14} />
```

**Example 3: In Inventory Display**
[src/features/island/hud/components/codex/pages/ChapterCollections.tsx](src/features/island/hud/components/codex/pages/ChapterCollections.tsx):

```tsx
<SimpleBox
  silhouette={!hasItem}
  inventoryCount={hasItem ? count : undefined}
  image={ITEM_DETAILS[itemName]?.image}
  showBoostIcon={showBoostIcon}
/>
```

### 6. For Playing Card Suit Replacement

To use these crop images to replace card suit symbols (♠ ♥ ♦ ♣):

```tsx
import { SquareIcon } from "components/ui/SquareIcon";
import { ITEM_DETAILS } from "features/game/types/images";

// Create a suit mapping using crops
const CROP_SUITS = {
  clubs: ITEM_DETAILS.Wheat.image,      // ♣
  diamonds: ITEM_DETAILS.Kale.image,    // ♦
  hearts: ITEM_DETAILS.Turnip.image,    // ♥
  spades: ITEM_DETAILS.Barley.image,    // ♠
};

export const PlayingCard = ({ suit, rank }) => (
  <div className="card">
    <div className="suit-icon">
      <SquareIcon
        icon={CROP_SUITS[suit]}
        width={32}  // Adjust size as needed
      />
    </div>
    <p className="rank">{rank}</p>
  </div>
);
```

---

## Key Files Reference

| File | Purpose |
|------|---------|
| [src/features/game/types/images.ts](src/features/game/types/images.ts) | `ITEM_DETAILS` definition for all items |
| [src/features/island/plots/lib/plant.ts](src/features/island/plots/lib/plant.ts) | `CROP_LIFECYCLE` URLs and image paths |
| [src/components/ui/SquareIcon.tsx](src/components/ui/SquareIcon.tsx) | Icon display component |
| [src/components/ui/Box.tsx](src/components/ui/Box.tsx) | Inventory item box with count |
| [src/features/island/hud/components/inventory/Chest.tsx](src/features/island/hud/components/inventory/Chest.tsx) | `ITEM_ICONS` reference for inventory |
