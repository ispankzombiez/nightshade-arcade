import Decimal from "decimal.js-light";
import { GameState } from "features/game/types/game";
import { produce } from "immer";

export type PokerBetPlacedAction = {
  type: "poker.betPlaced";
  amount: number;
};

type Options = {
  state: Readonly<GameState>;
  action: PokerBetPlacedAction;
  createdAt?: number;
};

export function pokerBetPlaced({
  state,
  action,
  _createdAt = Date.now(),
}: Options): GameState {
  return produce(state, (draft) => {
    const currentChips = new Decimal(draft.inventory.Chip ?? 0);
    const betAmount = new Decimal(action.amount);

    // Deduct the bet amount from inventory
    draft.inventory.Chip = currentChips.minus(betAmount);
  });
}
