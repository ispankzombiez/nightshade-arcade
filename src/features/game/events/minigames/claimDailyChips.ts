import { Decimal } from "decimal.js-light";
import { GameState } from "features/game/types/game";
import { produce } from "immer";

export type ClaimDailyChipsAction = {
  type: "dailyChips.claimed";
  reward: number;
};

type Options = {
  state: Readonly<GameState>;
  action: ClaimDailyChipsAction;
  createdAt?: number;
};

export function claimDailyChips({
  state,
  _action,
  _createdAt = Date.now(),
}: Options): GameState {
  return produce(state, (draft) => {
    const dateKey = new Date().toISOString().slice(0, 10);
    const lastClaimDate = draft.dailyChipsLastClaimDate ?? null;

    // Check if player is eligible
    const isEligible = lastClaimDate === null || lastClaimDate !== dateKey;

    if (isEligible) {
      const currentChips = new Decimal(draft.inventory.Chip ?? 0);
      const dailyMaxChips = new Decimal(10);
      const reward = dailyMaxChips.minus(currentChips);

      // Only award if below max
      if (reward.gt(0)) {
        draft.inventory.Chip = currentChips.plus(reward);
        draft.dailyChipsLastClaimDate = dateKey;
      }
    }
  });
}
