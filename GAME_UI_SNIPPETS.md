# Game UI Design Patterns - Code Snippets

Quick reference for common UI patterns with ready-to-use code examples.

## 1. Basic Panels

### Simple Content Panel
```tsx
import { Panel } from "components/ui/Panel";

export const MyComponent = () => (
  <Panel>
    <h2 className="text-lg font-bold mb-2">Title</h2>
    <p className="text-sm">Content goes here</p>
  </Panel>
);
```

### Panel with NPC Character
```tsx
import { Panel } from "components/ui/Panel";
import { NPC_WEARABLES } from "lib/npcs";

export const NPCGreeting = () => (
  <Panel bumpkinParts={NPC_WEARABLES.wobble}>
    <p>Hello, I'm an NPC!</p>
  </Panel>
);
```

### Outer vs Inner Panels
```tsx
import { OuterPanel, InnerPanel } from "components/ui/Panel";

export const NestedPanel = () => (
  <OuterPanel>
    <InnerPanel>Content</InnerPanel>
  </OuterPanel>
);
```

---

## 2. Modals

### Simple Modal
```tsx
import { Modal } from "components/ui/Modal";
import { Panel } from "components/ui/Panel";
import { useState } from "react";

export const SimpleModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Modal</button>
      
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <Panel>
          <h2>Modal Title</h2>
          <p>Modal content</p>
        </Panel>
      </Modal>
    </>
  );
};
```

### Modal with Close Button
```tsx
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { useState } from "react";

export const ClosableModal = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open</button>
      
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <CloseButtonPanel onClose={() => setIsOpen(false)}>
          <p>Click the X to close</p>
        </CloseButtonPanel>
      </Modal>
    </>
  );
};
```

### Modal with Tabs
```tsx
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel, PanelTabs } from "features/game/components/CloseablePanel";
import { useState } from "react";
import { SUNNYSIDE } from "assets/sunnyside";

export const TabbedModal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<"items" | "stats">("items");

  const tabs: PanelTabs<"items" | "stats">[] = [
    {
      id: "items",
      icon: SUNNYSIDE.icons.bag,
      name: "Items"
    },
    {
      id: "stats",
      icon: SUNNYSIDE.icons.heart,
      name: "Stats"
    }
  ];

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <CloseButtonPanel
        tabs={tabs}
        currentTab={activeTab}
        setCurrentTab={setActiveTab}
        onClose={() => setIsOpen(false)}
      >
        {activeTab === "items" && <ItemsTab />}
        {activeTab === "stats" && <StatsTab />}
      </CloseButtonPanel>
    </Modal>
  );
};
```

---

## 3. Buttons

### Basic Buttons
```tsx
import { Button } from "components/ui/Button";

export const ButtonExamples = () => (
  <div className="flex gap-2">
    <Button onClick={() => console.log("primary")}>
      Primary Button
    </Button>
    
    <Button variant="secondary" onClick={() => console.log("secondary")}>
      Secondary Button
    </Button>
    
    <Button disabled>
      Disabled Button
    </Button>
  </div>
);
```

### Button with Icon
```tsx
import { Button } from "components/ui/Button";

export const IconButton = () => (
  <Button className="flex items-center justify-center gap-2">
    <img src={coinIcon} className="w-5" />
    Collect Coins
  </Button>
);
```

---

## 4. Labels & Status Indicators

### Color-Coded Labels
```tsx
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";

export const LabelExamples = () => (
  <div className="flex flex-col gap-2">
    <Label type="success">✓ Success</Label>
    <Label type="danger">✗ Error</Label>
    <Label type="warning">⚠ Warning</Label>
    <Label type="info">ℹ Information</Label>
    <Label type="vibrant">★ Special</Label>
    <Label type="formula">⚗ Crafting</Label>
    <Label type="default">Default</Label>
  </div>
);
```

### Labels with Icons
```tsx
import { Label } from "components/ui/Label";
import { SUNNYSIDE } from "assets/sunnyside";

export const IconedLabel = () => (
  <>
    <Label 
      type="success" 
      icon={SUNNYSIDE.icons.heart}
      iconWidth={16}
    >
      Health Restored
    </Label>
    
    <Label
      type="warning"
      icon={SUNNYSIDE.icons.star}
      secondaryIcon={SUNNYSIDE.icons.gem}
    >
      Rare Item Found
    </Label>
  </>
);
```

---

## 5. Cards (Marketplace/Inventory Pattern)

### Item Card
```tsx
import { ButtonPanel } from "components/ui/Panel";
import { SquareIcon } from "components/ui/SquareIcon";
import { Label } from "components/ui/Label";
import { CountLabel } from "components/ui/CountLabel";

interface ItemCardProps {
  id: string;
  name: string;
  image: string;
  price: number;
  count: number;
  onClick: () => void;
}

export const ItemCard: React.FC<ItemCardProps> = ({
  id,
  name,
  image,
  price,
  count,
  onClick
}) => (
  <ButtonPanel 
    onClick={onClick}
    variant="card"
    className="h-full flex flex-col"
  >
    {/* Image Section */}
    <div className="h-[70px] p-2 pt-4 flex items-center justify-center">
      <SquareIcon icon={image} width={32} />
    </div>
    
    {/* Text Section */}
    <div
      style={{
        background: "#fff0d4",
        borderTop: "1px solid #e4a672",
        padding: "8px"
      }}
      className="flex-1"
    >
      <p className="font-bold text-xs mb-1">{name}</p>
      
      {/* Price Badge */}
      {price > 0 && (
        <div className="flex items-center text-xs mb-1">
          <img src={flowerIcon} className="w-4 mr-1" />
          <span>{formatNumber(price)}</span>
        </div>
      )}
      
      {/* Count Badge */}
      {count > 0 && (
        <div className="absolute bottom-2 right-2">
          <CountLabel count={count} icon={image} type="info" />
        </div>
      )}
    </div>
  </ButtonPanel>
);
```

### Grid of Cards
```tsx
import { ItemCard } from "./ItemCard";

export const ItemGrid = ({ items }: { items: Item[] }) => (
  <div className="grid grid-cols-3 gap-2 md:grid-cols-4 lg:grid-cols-5">
    {items.map(item => (
      <ItemCard
        key={item.id}
        {...item}
        onClick={() => selectItem(item.id)}
      />
    ))}
  </div>
);
```

---

## 6. Currency Display

### Balance Display
```tsx
import { Balances } from "components/Balances";
import Decimal from "decimal.js-light";

export const GameHUD = ({ gameState }: { gameState: GameState }) => (
  <Balances
    sfl={new Decimal(gameState.balance)}
    coins={gameState.coins}
    gems={new Decimal(gameState.gems)}
    chips={new Decimal(gameState.inventory.Chip ?? 0)}
    onClick={() => openCurrenciesModal()}
  />
);
```

### Custom Currency Display
```tsx
import flowerIcon from "assets/icons/flower_token.webp";
import { formatNumber } from "lib/utils/formatNumber";
import Decimal from "decimal.js-light";

export const CurrencyDisplay = ({ amount }: { amount: Decimal }) => (
  <div className="flex items-center space-x-2 bg-black bg-opacity-25 px-3 py-1 rounded">
    <img src={flowerIcon} className="w-6" alt="SFL" />
    <span className="balance-text text-sm">
      {formatNumber(amount, { decimalPlaces: 4 })}
    </span>
  </div>
);
```

---

## 7. Character Interactions

### NPC Speaking Modal
```tsx
import { SpeakingModal, Message } from "features/game/components/SpeakingModal";
import { NPC_WEARABLES } from "lib/npcs";
import { useAppTranslation } from "lib/i18n/useAppTranslations";

export const NPCInteraction = ({ onClose }: { onClose: () => void }) => {
  const { t } = useAppTranslation();
  
  const messages: Message[] = [
    {
      text: "Howdy there! Welcome to my farm!"
    },
    {
      text: "Would you like to help me with something?",
      actions: [
        {
          text: "Sure!",
          cb: () => {
            console.log("Player accepted");
            onClose();
          }
        },
        {
          text: "Maybe later",
          cb: onClose
        }
      ]
    }
  ];

  return (
    <SpeakingModal
      onClose={onClose}
      bumpkinParts={NPC_WEARABLES.pete}
      message={messages}
    />
  );
};
```

### Multi-Step Dialogue
```tsx
import { SpeakingModal, Message } from "features/game/components/SpeakingModal";

const messages: Message[] = [
  { text: "Step 1: Listen to my story..." },
  { text: "Step 2: I need your help..." },
  { text: "Step 3: Will you assist me?", 
    actions: [
      { text: "Help", cb: handleHelp },
      { text: "Refuse", cb: handleRefuse }
    ]
  }
];

export const StorySequence = ({ onClose }: { onClose: () => void }) => (
  <SpeakingModal
    onClose={onClose}
    bumpkinParts={NPC_WEARABLES.raven}
    message={messages}
  />
);
```

---

## 8. Icons

### Square Icon
```tsx
import { SquareIcon } from "components/ui/SquareIcon";

export const IconExamples = () => (
  <div className="flex gap-4">
    {/* Small Icon */}
    <SquareIcon icon={itemImage} width={16} />
    
    {/* Medium Icon */}
    <SquareIcon icon={itemImage} width={32} />
    
    {/* Large Icon with styling */}
    <SquareIcon
      icon={itemImage}
      width={48}
      className="border-2 border-yellow-400"
      style={{ background: "#fff" }}
    />
  </div>
);
```

---

## 9. Common Layouts

### Two-Column Layout
```tsx
import { Panel } from "components/ui/Panel";

export const TwoColumnLayout = () => (
  <div className="grid grid-cols-2 gap-4">
    <Panel>
      <h3>Left Column</h3>
      <p>Content...</p>
    </Panel>
    <Panel>
      <h3>Right Column</h3>
      <p>Content...</p>
    </Panel>
  </div>
);
```

### Stacked with Sidebar
```tsx
<div className="flex gap-4">
  {/* Sidebar */}
  <div className="w-32">
    <Panel>
      <div className="flex flex-col gap-2">
        <button onClick={() => setTab("tab1")}>Tab 1</button>
        <button onClick={() => setTab("tab2")}>Tab 2</button>
      </div>
    </Panel>
  </div>
  
  {/* Main Content */}
  <div className="flex-1">
    <Panel>
      {activeTab === "tab1" && <Tab1Content />}
      {activeTab === "tab2" && <Tab2Content />}
    </Panel>
  </div>
</div>
```

---

## 10. Interactive Components

### Expandable Section
```tsx
import { useState } from "react";
import { Panel } from "components/ui/Panel";
import { Button } from "components/ui/Button";
import { SUNNYSIDE } from "assets/sunnyside";

export const ExpandableSection = ({ 
  title, 
  children 
}: { 
  title: string; 
  children: React.ReactNode;
}) => {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <Panel>
      <div 
        className="cursor-pointer flex items-center justify-between"
        onClick={() => setIsExpanded(!isExpanded)}
      >
        <h3 className="font-bold">{title}</h3>
        <img
          src={SUNNYSIDE.icons.arrow}
          className={`transform transition-transform ${isExpanded ? "rotate-180" : ""}`}
        />
      </div>
      
      {isExpanded && (
        <div className="mt-4">
          {children}
        </div>
      )}
    </Panel>
  );
};
```

### Toggle Button
```tsx
import { Button } from "components/ui/Button";

export const ToggleButton = ({ 
  isActive, 
  onToggle 
}: { 
  isActive: boolean;
  onToggle: () => void;
}) => (
  <Button
    onClick={onToggle}
    className={isActive ? "bg-green-500" : "bg-gray-500"}
  >
    {isActive ? "Active" : "Inactive"}
  </Button>
);
```

---

## 11. Chest/Reward Components

### Treasure Chest Modal
```tsx
import { Modal } from "components/ui/Modal";
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { TreasureChest } from "features/world/ui/chests/TreasureChest";
import { useState } from "react";

export const ChestReward = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <>
      <button onClick={() => setIsOpen(true)}>Open Chest</button>
      
      <Modal show={isOpen} onHide={() => setIsOpen(false)}>
        <TreasureChest
          type="Treasure Key"
          location="plaza"
          onClose={() => setIsOpen(false)}
          setIsLoading={(loading) => console.log(loading)}
        />
      </Modal>
    </>
  );
};
```

### Daily Reward Notification
```tsx
import { Modal } from "components/ui/Modal";
import { DailyChipsReward } from "features/world/ui/chests/DailyChipsReward";
import { useState } from "react";

export const DailyRewardModal = () => {
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Modal show={isOpen} onHide={() => setIsOpen(false)}>
      <DailyChipsReward onClose={() => setIsOpen(false)} />
    </Modal>
  );
};
```

---

## 12. Styling Utilities

### Using Pixel Scale
```tsx
import { PIXEL_SCALE } from "features/game/lib/constants";

export const CustomComponent = () => (
  <div
    style={{
      padding: `${PIXEL_SCALE * 2}px`,
      marginBottom: `${PIXEL_SCALE * 1}px`,
      width: `${PIXEL_SCALE * 64}px`,
      height: `${PIXEL_SCALE * 32}px`,
      borderRadius: `${PIXEL_SCALE * 4}px`
    }}
  >
    Content with pixel-perfect sizing
  </div>
);
```

### Using Pixel Borders
```tsx
import { pixelDarkBorderStyle } from "features/game/lib/style";

export const CustomBorderedBox = ({ children }: { children: React.ReactNode }) => (
  <div
    style={{
      ...pixelDarkBorderStyle,
      padding: "8px",
      background: "#f5f5f5"
    }}
  >
    {children}
  </div>
);
```

### Dark Mode Support
```tsx
import { useIsDarkMode } from "lib/utils/hooks/useIsDarkMode";

export const DarkModeSensitive = () => {
  const { isDarkMode } = useIsDarkMode();

  return (
    <div style={{
      background: isDarkMode ? "#333" : "#fff",
      color: isDarkMode ? "#fff" : "#000"
    }}>
      This responds to dark mode
    </div>
  );
};
```

---

## 13. Field/Input Components

### Text Input with Label
```tsx
import { TextInput } from "components/ui/TextInput";
import { Label } from "components/ui/Label";
import { useState } from "react";

export const NameInput = () => {
  const [name, setName] = useState("");

  return (
    <div className="flex flex-col gap-2">
      <Label type="default">Enter your name</Label>
      <TextInput
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Your name..."
      />
    </div>
  );
};
```

### Number Input
```tsx
import { NumberInput } from "components/ui/NumberInput";
import { Label } from "components/ui/Label";
import { useState } from "react";

export const AmountSelector = () => {
  const [amount, setAmount] = useState(0);

  return (
    <div className="flex flex-col gap-2">
      <Label type="info">Select amount</Label>
      <NumberInput
        value={amount}
        onChange={(value) => setAmount(value)}
        min={0}
        max={100}
      />
    </div>
  );
};
```

---

## 14. Common Import Patterns

```tsx
// Core UI components
import { Panel, OuterPanel, InnerPanel, ButtonPanel, ColorPanel } from "components/ui/Panel";
import { Modal } from "components/ui/Modal";
import { Button } from "components/ui/Button";
import { Label } from "components/ui/Label";
import { SquareIcon } from "components/ui/SquareIcon";
import { CountLabel } from "components/ui/CountLabel";
import { Balances } from "components/Balances";

// Game-specific components
import { CloseButtonPanel } from "features/game/components/CloseablePanel";
import { SpeakingModal } from "features/game/components/SpeakingModal";
import { NPC_WEARABLES } from "lib/npcs";

// Styling
import { PIXEL_SCALE } from "features/game/lib/constants";
import { SUNNYSIDE } from "assets/sunnyside";
import { pixelDarkBorderStyle, pixelLightBorderStyle } from "features/game/lib/style";

// Utilities
import { useAppTranslation } from "lib/i18n/useAppTranslations";
import { useIsDarkMode } from "lib/utils/hooks/useIsDarkMode";
import { formatNumber } from "lib/utils/formatNumber";
import Decimal from "decimal.js-light";
```

---

## 15. Design System Checklist

When creating new game UI:

- [ ] Use `Panel` for main containers
- [ ] Apply `CloseButtonPanel` for modal content
- [ ] Use `Button` for interactive elements
- [ ] Use `Label` for status/badges
- [ ] Use `SquareIcon` for item icons
- [ ] Display currency with `Balances` or custom icon pattern
- [ ] Use `SpeakingModal` for NPC interactions
- [ ] Use `ButtonPanel` variant="card" for inventory items
- [ ] Apply `PIXEL_SCALE` to all dimensions
- [ ] Use `SUNNYSIDE` for asset paths
- [ ] Apply dark mode hook when needed
- [ ] Use semantic `Label` types (success/danger/warning/etc.)
- [ ] Test keyboard accessibility
- [ ] Test on multiple screen sizes
- [ ] Add sound feedback where appropriate
