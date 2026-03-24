# Portal Minigames Architecture Analysis

## Executive Summary

Portal minigames in Sunflower Land follow a **two-layer architecture** where **React wrapper components in the main game** manage UI and state, while **separately-hosted iframe games** handle actual gameplay. Communication happens via `postMessage` API. This design allows minigames to be distributed across different domains while maintaining tight integration with the main game's state management and economy.

---

## 1. Architecture Overview

### High-Level Design Pattern

```
Main Game (sunflower-land.com)
├── React UI Layer (ChickenRescue.tsx, Memory.tsx, etc.)
│   ├─ State Management: GameState.minigames via XState
│   ├─ Prize Display: MinigamePrizeUI component
│   └─ Leaderboards: PortalLeaderboard component
│
└── Portal Iframe Manager (Portal.tsx)
    ├─ Authentication: JWT token generation
    ├─ Message Routing: Listens for postMessage events
    └─ Score Submission: Routes to game service events
    
External Hosted Games (*.sunflower-land.com iframes)
├── chicken-rescue.sunflower-land.com
├── memory.sunflower-land.com
├── mine-whack.sunflower-land.com
├── fruit-dash.sunflower-land.com
└── crops-and-chickens.sunflower-land.com
    └─ Each runs independently with access to player GameState via JWT
```

### Key Concept: Two-Tier Organization

| Layer | Responsibility | Files | Tech Stack |
|-------|-----------------|-------|-----------|
| **Wrapper** | UI, state display, modal management | `ChickenRescue.tsx`, `Memory.tsx`, etc. | React + XState |
| **Portal Iframe Manager** | Authentication, message handling | `Portal.tsx` | React hooks |
| **Hosted Game** | Game logic, rendering, score calculation | External domain | Any tech (Phaser, Pixi, etc.) |

---

## 2. File Structure: Integrated Minigames

### Main Game Files

```
src/features/world/ui/portals/
├── ChickenRescue.tsx          # Wrapper component for chicken-rescue
├── CropsAndChickens.tsx        # Wrapper component for crops-and-chickens  
├── FruitDash.tsx               # Wrapper component with leaderboard support
├── Memory.tsx                  # Simple wrapper without leaderboard
├── MineWhack.tsx               # Wrapper with leaderboard support
├── Portal.tsx                  # iframe manager & postMessage handler
├── PortalChooser.tsx           # Menu to select which game to play
├── PortalLeaderboard.tsx       # Leaderboard component (if supported)
├── MinigamePrizeUI.tsx         # Shows prize info & daily stats
└── PortalDonation.tsx          # Donation modal
```

### Game State Files

```
src/features/game/
├── types/
│   ├── minigames.ts            # MinigameName type & SUPPORTED_MINIGAMES list
│   ├── game.ts (line 1796)      # GameState.minigames field definition
│   └── minigameShop.ts         # Shop items for minigames
└── events/minigames/
    ├── startMinigameAttempt.ts  # Increments daily attempts
    ├── submitMinigameScore.ts   # Updates highscore
    └── claimMinigamePrize.ts    # Awards prize items/coins
```

### Portal System (iframe-based games)

```
src/features/portal/
├── PortalApp.tsx               # Entry point for all standalone portals
├── actions/
│   └── loadPortal.ts           # API call: fetch player GameState
├── example/                    # Template/example for new portals
│   ├── lib/
│   │   ├── portalMachine.ts    # XState machine for portal lifecycle
│   │   └── PortalProvider.tsx  # React Context for portal state
│   ├── PortalExample.tsx       # Example portal component
│   └── PortalExampleScene.ts   # Example Phaser scene
├── lib/
│   ├── portalUtil.ts           # Communication helpers (submitScore, purchase, etc.)
│   └── portalUtil.ts           # Available to iframe games
└── poker/                      # Casino Island specific (reference implementation)
    ├── CasinoIslandPortal.tsx
    ├── CasinoIslandScene.tsx
    └── casinoIslandEvents.ts
```

---

## 3. Portal Integration Pattern

### Registration & Discovery

**PORTAL_OPTIONS** in `PortalChooser.tsx` (lines 47-77):

```typescript
export const PORTAL_OPTIONS: PortalOption[] = [
  {
    id: "chicken-rescue",           // MinigameName type
    npc: "billy",                   // NPC to display in menu
    title: translate("..."),        // i18n key
    description: translate("..."),  // i18n key
    component: ChickenRescue,       # React component to render
  },
  // ... repeat for other minigames
];
```

**MinigameName Type** in `src/features/game/types/minigames.ts`:

```typescript
export type MinigameName = 
  | "chicken-rescue"
  | "crops-and-chickens"
  | "fruit-dash"
  | "memory"
  | "mine-whack"
  // ... others

export const SUPPORTED_MINIGAMES: MinigameName[] = [
  "chicken-rescue",
  // ...
];
```

### How Games Are Discovered & Loaded

1. **User Clicks Menu**: PortalChooser.tsx renders PORTAL_OPTIONS
2. **User Selects Game**: Component state updates → specific wrapper rendered (ChickenRescue, Memory, etc.)
3. **User Clicks "Play Now"**: `isPlaying` state → true → Portal component mounts
4. **Portal Component**:
   - Calls `portal()` API action → receives JWT token
   - Constructs iframe URL: `https://[minigame-id].sunflower-land.com?jwt=TOKEN&language=en&...`
   - Renders `<iframe src={url}>`
5. **Hosted Game Loads**: External app loads GameState via JWT, renders game
6. **Communication**: Hosted game sends postMessage events → Portal component routes to gameService

---

## 4. Game Loop & State Management

### Minigame Data Structure

**GameState.minigames** (in `src/features/game/types/game.ts`):

```typescript
minigames: {
  // Prize configuration for today
  prizes: Partial<Record<MinigameName, MinigamePrize>>;
  // Game history & stats
  games: Partial<Record<MinigameName, Minigame>>;
}
```

**MinigamePrize** (defines today's challenge):

```typescript
type MinigamePrize = {
  startAt: number;           // Unix timestamp when prize becomes available
  endAt: number;             // Unix timestamp when prize expires
  score: number;             // Required score to win
  coins: number;             // Reward: coins
  items: Record<string, number>;    // Reward: inventory items
  wearables: Record<string, number>; // Reward: wearables
};
```

**Minigame** (tracks player progress):

```typescript
type Minigame = {
  highscore: number;         // All-time highest score
  history: Record<string, MinigameHistory>; // Keyed by date "YYYY-MM-DD"
  purchases?: Array<{...}>;  // SFL spent on extra attempts
  shop?: {                   // Minigame shop items
    wearables: Record<string, number>;
    items: Record<string, number>;
  };
}

type MinigameHistory = {
  highscore: number;         // Today's highest score
  attempts: number;          // Number of attempts today
  prizeClaimedAt?: number;   // Timestamp when prize was claimed
};
```

### Daily Reset Pattern

Score/prize tracking is keyed by date:

```typescript
const dateKey = new Date().toISOString().slice(0, 10); // "2025-03-23"
const dailyHistory = minigame.history[dateKey];
```

New day = automatic reset (no explicit reset needed). Each game gets fresh daily attempt count and can earn prize.

### State Update Flow

**1. Game Starts** → `startMinigameAttempt()` event handler:

```typescript
// src/features/game/events/minigames/startMinigameAttempt.ts
dailyAttempt.attempts += 1;
```

**2. Player Scores** → `submitMinigameScore()` event handler:

```typescript
// src/features/game/events/minigames/submitMinigameScore.ts
dailyHistory.highscore = Math.max(dailyHistory.highscore, action.score);
minigame.highscore = Math.max(minigame.highscore, action.score);
```

**3. Player Claims Prize** → `claimMinigamePrize()` event handler:

```typescript
// src/features/game/events/minigames/claimMinigamePrize.ts
if (score >= prize.score && createdAt within prize.startAt..endAt) {
  dailyHistory.prizeClaimedAt = createdAt;
  // Transfer prize items/coins to inventory
}
```

---

## 5. Communication with Main Game

### postMessage API Events

All communication from hosted iframe to main game uses `postMessage`:

```typescript
// In hosted iframe game (using portalUtil.ts functions):

// 1. When player starts attempt
window.parent.postMessage({ event: "attemptStarted" }, "*");

// 2. When player finishes and scores
window.parent.postMessage({ event: "scoreSubmitted", score: 1500 }, "*");

// 3. When player completes the daily goal
window.parent.postMessage({ event: "claimPrize" }, "*");

// 4. When purchase is needed (e.g., buy extra attempts)
window.parent.postMessage({ 
  event: "purchase", 
  sfl: 10,           // SFL cost
  items: { "Gold": 5 } // Item cost
}, "*");
```

### Portal.tsx Message Handler

**File**: `src/features/world/ui/portals/Portal.tsx` (lines 100-150)

```typescript
const handleMessage = useCallback((event: any) => {
  
  if (event.data?.event === "attemptStarted") {
    gameService.send("minigame.attemptStarted", { id: portalName });
    gameService.send("SAVE");
    return;
  }

  if (event.data?.event === "scoreSubmitted") {
    gameService.send("minigame.scoreSubmitted", {
      score: event.data.score,
      id: portalName,
    });
    gameService.send("SAVE");
    return;
  }

  if (event.data?.event === "claimPrize") {
    setIsComplete(true);
    return;
  }

  if (event.data?.event === "purchase") {
    setPurchase(event.data);
    return;
  }
  
  // ... etc
}, [gameService, portalName]);

useEffect(() => {
  window.addEventListener("message", handleMessage);
  return () => window.removeEventListener("message", handleMessage);
}, [handleMessage]);
```

### Wrapper Component Pattern

**Memory.tsx** (simple example without leaderboard):

```typescript
export const Memory: React.FC<Props> = ({ onClose }) => {
  const { gameService } = useContext(Context);
  const minigames = useSelector(gameService, _minigames);
  const [isPlaying, setIsPlaying] = useState(false);

  if (isPlaying) {
    // Render iframe with portal
    return <Portal portalName="memory" onClose={onClose} />;
  }

  // Render menu UI
  return (
    <>
      <MinigamePrizeUI prize={prize} history={dailyAttempt} />
      <Button onClick={() => setIsPlaying(true)}>Play Now</Button>
    </>
  );
};
```

**FruitDash.tsx** (with leaderboard):

```typescript
export const FruitDash: React.FC<Props> = ({ onClose }) => {
  const [page, setPage] = useState<"play" | "leaderboard">("play");

  if (page === "leaderboard") {
    return (
      <PortalLeaderboard
        farmId={gameService.getSnapshot().context.farmId}
        jwt={authService.getSnapshot().context.user.rawToken}
        name="fruit-dash"
      />
    );
  }

  if (isPlaying) {
    return <Portal portalName="fruit-dash" onClose={onClose} />;
  }

  return (
    <>
      <Button onClick={() => setPage("leaderboard")}>Leaderboard</Button>
      <Button onClick={() => setIsPlaying(true)}>Play</Button>
    </>
  );
};
```

---

## 6. Configuration & Entry Points

### How Minigames Get Their Data

**JWT Token Flow**:

```
1. Main game needs to load minigame in iframe
2. Call: portal(request: {portalId, token, farmId})
   - Endpoint: POST /portal/{minigame-id}/login
   - Auth header: Bearer {farmToken}
   - Body: {farmId: number}
3. Backend returns: {token: portalJWT}
4. Construct iframe URL: https://minigame.sunflower-land.com?jwt=portalJWT
5. Minigame receives JWT, decodes it, identifies player
6. Minigame loads GameState via API: GET /portal/{minigame-id}/player
   - Auth header: Bearer {portalJWT}
   - Returns: {farm: GameState}
```

**File**: `src/features/world/ui/community/actions/portal.ts`:

```typescript
export async function portal(request: Request) {
  // Check cache first
  const cachedToken = getMinigameToken(request.portalId);
  if (cachedToken && isFresh(cachedToken)) {
    return { token: cachedToken };
  }

  // Get new token from backend
  const response = await fetch(
    `${API_URL}/portal/${request.portalId}/login`,
    {
      method: "POST",
      headers: {
        "content-type": "application/json",
        Authorization: `Bearer ${request.token}`,
      },
      body: JSON.stringify({ farmId: request.farmId }),
    }
  );

  const data = await response.json();
  saveJWT({ token: data.token, name: request.portalId });
  return data;
}
```

### Portal Utility Functions (Available to Iframe Games)

**File**: `src/features/portal/lib/portalUtil.ts`

These are the **primary API** for hosted games to communicate:

```typescript
// Start tracking attempt
export function startAttempt() {
  window.parent.postMessage({ event: "attemptStarted" }, "*");
}

// Submit final score
export function submitScore({ score }: { score: number }) {
  window.parent.postMessage({ event: "scoreSubmitted", score }, "*");
}

// Player completed the challenge
export function claimPrize() {
  window.parent.postMessage({ event: "claimPrize" }, "*");
}

// Request to purchase items
export function purchase({
  sfl,
  items,
}: {
  sfl: number;
  items: Record<string, number>;
}) {
  window.parent.postMessage({ event: "purchase", sfl, items }, "*");
}

// Request to donate
export function donate({ matic, address }: {...}) {
  window.parent.postMessage({ event: "donated", matic, address }, "*");
}

// Exit back to main game
export function goHome() {
  window.parent.postMessage({ event: "closePortal" }, "*");
}
```

---

## 7. Common Patterns Identified

### Pattern 1: Wrapper Component Structure

All five minigames follow identical React component pattern:

```typescript
interface Props { onClose: () => void; }

export const [GameName]: React.FC<Props> = ({ onClose }) => {
  // 1. Get game service & minigame data
  const { gameService } = useContext(Context);
  const minigames = useSelector(gameService, _minigames);
  const minigame = minigames.games[`${id}`];
  const prize = minigames.prizes[`${id}`];

  // 2. Track UI state
  const [isPlaying, setIsPlaying] = useState(false);
  const dateKey = new Date().toISOString().slice(0, 10);
  const dailyAttempt = minigame?.history[dateKey] ?? { attempts: 0, highscore: 0 };

  // 3. If playing → show iframe
  if (isPlaying) {
    return <Portal portalName={`${id}`} onClose={onClose} />;
  }

  // 4. If complete & unclaimed → show prize modal
  const isComplete = isMinigameComplete({ minigames, name: `${id}` });
  if (isComplete && !dailyAttempt.prizeClaimedAt && prize) {
    return (
      <ClaimReward
        onClaim={() => {
          gameService.send("minigame.prizeClaimed", { id: `${id}` });
          onClose();
        }}
        reward={{
          items: prize.items,
          coins: prize.coins,
          wearables: prize.wearables,
        }}
      />
    );
  }

  // 5. Otherwise → show menu with play button
  return (
    <>
      <MinigamePrizeUI prize={prize} history={dailyAttempt} />
      <Button onClick={() => setIsPlaying(true)}>Play Now</Button>
    </>
  );
};
```

### Pattern 2: Leaderboard Support

Only some games have leaderboards. Indicated by:
- Conditional `<PortalLeaderboard>` component (FruitDash, MineWhack, ChickenRescue)
- `page` state: `"play" | "leaderboard"`
- Requires `authService` to get user JWT

```typescript
const [page, setPage] = useState<"play" | "leaderboard">("play");

if (page === "leaderboard") {
  return (
    <PortalLeaderboard
      farmId={gameService.getSnapshot().context.farmId}
      jwt={authService.getSnapshot().context.user.rawToken}
      name={portalName}
    />
  );
}
```

### Pattern 3: Configuration Hierarchy

**Discovery**: PORTAL_OPTIONS → id → minigame.sunflower-land.com  
**Data**: GameState.minigames.prizes[minigame-id] → score target  
**Communication**: postMessage events → Portal.tsx → gameService.send()

---

## 8. Key Differences from Integrated Components

### Portal Minigames vs Main Game Components

| Aspect | Portal Minigames | Main Game Components |
|--------|------------------|---------------------|
| **Rendering** | iframe (separate HTML document) | React component in DOM |
| **State Access** | JWT token + API call | Direct XState context |
| **Communication** | postMessage API | XState events |
| **Hosting** | External domain | Same domain |
| **Initialization** | Load GameState at startup | Already in context |
| **Restart** | Full page reload in iframe | Component state reset |
| **Dependencies** | None (standalone) | Depend on parent imports |
| **Testing** | Independent test suite | Jest + test utilities |
| **Deployment** | Separate build/deploy | Same release cycle |

### Main Game Integration vs Standalone Portal

```
Integrated Component (e.g., Farming)
├─ import { CropPlot } from "features/crops"
├─ const crops = gameState.crops
└─ Direct state manipulation via gameService.send()

Portal Minigame (e.g., ChickenRescue)
├─ Portal.tsx wraps iframe
├─ Minigame loads via JWT + API
├─ Communication only via postMessage events
└─ Limited control (score submission only)
```

---

## 9. Files to Reference for Implementation

### Essential Reference Files

| File | Purpose | Key Code |
|------|---------|----------|
| [src/features/world/ui/portals/Memory.tsx](src/features/world/ui/portals/Memory.tsx) | **Simplest** minigame wrapper | No leaderboard|
| [src/features/world/ui/portals/FruitDash.tsx](src/features/world/ui/portals/FruitDash.tsx) | **Most complete** minigame | Leaderboard + page state |
| [src/features/world/ui/portals/PortalChooser.tsx](src/features/world/ui/portals/PortalChooser.tsx) | **Registration** template | PORTAL_OPTIONS array |
| [src/features/world/ui/portals/Portal.tsx](src/features/world/ui/portals/Portal.tsx) | **Core communication** | Message handler + iframe setup |
| [src/features/game/types/minigames.ts](src/features/game/types/minigames.ts) | **Type definitions** | MinigameName, SUPPORTED_MINIGAMES |
| [src/features/game/types/game.ts](src/features/game/types/game.ts#L1796) | **State structure** | minigames: {prizes, games} |
| [src/features/game/events/minigames/submitMinigameScore.ts](src/features/game/events/minigames/submitMinigameScore.ts) | **Score logic** | Daily highscore tracking |
| [src/features/game/events/minigames/claimMinigamePrize.ts](src/features/game/events/minigames/claimMinigamePrize.ts) | **Prize logic** | Validation & distribution |
| [src/features/portal/lib/portalUtil.ts](src/features/portal/lib/portalUtil.ts) | **Hosted game API** | submitScore(), purchase(), etc. |
| [POKER_ISLAND_ARCHITECTURE.md](/POKER_ISLAND_ARCHITECTURE.md) | **Advanced example** | Casino Island reference |

### Portal System Files

| File | Purpose |
|------|---------|
| [src/features/portal/PortalApp.tsx](src/features/portal/PortalApp.tsx) | Entry point for iframe apps |
| [src/features/portal/example/lib/portalMachine.ts](src/features/portal/example/lib/portalMachine.ts) | XState machine for loading |
| [src/features/portal/example/lib/PortalProvider.tsx](src/features/portal/example/lib/PortalProvider.tsx) | React Context setup |
| [src/features/portal/actions/loadPortal.ts](src/features/portal/actions/loadPortal.ts) | API call to fetch GameState |
| [src/features/world/ui/community/actions/portal.ts](src/features/world/ui/community/actions/portal.ts) | JWT token generation |

---

## 10. Summary: Replicating the Pattern

### To Add a New Minigame:

**1. Main Game Wrapper** (5-10 minutes):
   - Copy Memory.tsx or FruitDash.tsx template
   - Change minigame id: `"memory"` → `"your-minigame"`
   - Add to PORTAL_OPTIONS in PortalChooser.tsx
   - Add MinigameName type to minigames.ts

**2. Hosted Game Setup** (varies):
   - Create separate React/Phaser project
   - Load GameState from JWT: `https://your-minigame.sunflower-land.com?jwt=...`
   - Use portalUtil.ts functions: `submitScore()`, `purchase()`, etc.
   - Deploy to separate domain

**3. Backend Configuration** (handled by core team):
   - Add portalId endpoints: `/portal/{your-minigame}/login` & `/player`
   - Configure MinigamePrize (score target, items, coins)
   - Set start/end times

**4. Registration** (1 file change):
   - Add to SUPPORTED_MINIGAMES list
   - Add to PORTAL_OPTIONS array with NPC & description

### Architecture Benefits:
✅ **Decoupling**: Minigames are independent projects  
✅ **Scalability**: Easy to add new games without modifying main codebase much  
✅ **Isolation**: Bug in one game doesn't crash main game  
✅ **Flexibility**: Each game can use any tech stack  
✅ **Testing**: Separate test suites per game  
✅ **Performance**: Iframe prevents memory leaks from accumulating  

### Constraints to Be Aware Of:
⚠️ **postMessage Latency**: Communication has slight delay (asynchronous)  
⚠️ **CORS**: Must match domain or use messagePort  
⚠️ **Data Freshness**: Scores cached daily until SAVE event  
⚠️ **No Real-time Sync**: Prize/inventory updates happen on score submission only  
⚠️ **Token Expiry**: 1-hour buffer for session stability

---

## Appendix: Complete Event Flow Diagram

```
┌─────────────────────────────────────────────────────────────────┐
│                      MINIGAME COMPLETE FLOW                      │
└─────────────────────────────────────────────────────────────────┘

1. MENU SELECTION
   ChickenRescue.tsx
   └─> isPlaying = true
   
2. PORTAL LOADS
   Portal.tsx
   ├─> portal() API call → JWT token
   ├─> Construct: https://chicken-rescue.sunflower-land.com?jwt=...
   └─> Render <iframe src={url} />
   
3. HOSTED GAME INITIALIZES
   chicken-rescue.sunflower-land.com
   ├─> Decode JWT (farmId, userAccess)
   ├─> API: GET /portal/chicken-rescue/player?jwt=...
   ├─> Returns: {farm: GameState}
   └─> Render game with player data
   
4. PLAYER STARTS GAME
   User clicks "Start"
   └─> startAttempt() from portalUtil
       └─> postMessage({event: "attemptStarted"})
   
5. GAME RUNS (gameplay loop)
   Score = 500 points
   
6. GAME COMPLETES
   Player finishes
   └─> submitScore({score: 500}) from portalUtil
       └─> postMessage({event: "scoreSubmitted", score: 500})
       
7. PORTAL RECEIVES SCORE
   Portal.tsx handleMessage listener
   ├─> gameService.send("minigame.scoreSubmitted", {id: "chicken-rescue", score: 500})
   └─> gameService.send("SAVE")
   
8. GAME STATE UPDATES
   submitMinigameScore() event handler
   ├─> dateKey = "2025-03-23"
   ├─> dailyHistory.highscore = max(oldScore, 500) = 500
   └─> minigame.highscore = max(oldHighscore, 500)
   
9. CHECK COMPLETION
   ChickenRescue.tsx re-renders
   ├─> isMinigameComplete({minigames, name: "chicken-rescue"})
   ├─> Check: highscore (500) >= prize.score (400) → TRUE
   ├─> Check: prizeClaimedAt exists → FALSE
   └─> Show ClaimReward modal
   
10. PLAYER CLAIMS PRIZE
    User clicks "Claim Reward"
    └─> gameService.send("minigame.prizeClaimed", {id: "chicken-rescue"})
    
11. PRIZE AWARDED
    claimMinigamePrize() event handler
    ├─> dailyHistory.prizeClaimedAt = now
    ├─> Transfer prize.items → inventory
    ├─> Transfer prize.coins → coins balance
    └─> Save to GameState
    
12. MODAL CLOSES
    onClose() called
    └─> ChickenRescue.tsx modal closes
    └─> Return to main island view
```

---

## Conclusion

Portal minigames represent a sophisticated **distributed game architecture** where the main game acts as a **hub** managing state, authentication, and rewards, while individual minigames are **standalone services** focused on gameplay. The `postMessage` API enables seamless communication between isolated contexts, creating a flexible system that can scale from 5 to hundreds of minigames without architectural changes.

The pattern prioritizes **decoupling** (each game is independent), **security** (JWT-based auth), and **performance** (iframe isolation), making it ideal for a web3 game ecosystem where multiple teams might contribute games.
