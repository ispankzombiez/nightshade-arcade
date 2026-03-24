import Decimal from "decimal.js-light";
import { fromWei } from "web3-utils";

import { Inventory, InventoryItemName } from "features/game/types/game";
import { KNOWN_IDS } from "features/game/types";
import { getItemUnit } from "features/game/lib/conversion";
import { Context } from "features/game/GameProvider";
import { useContext } from "react";
import { MachineState } from "features/game/lib/gameMachine";
import { useSelector } from "@xstate/react";

export function balancesToInventory(balances: Array<any>) {
  const names = Object.keys(KNOWN_IDS) as InventoryItemName[];

  const reduced = balances.reduce(
    (items: Inventory, balance: string, index: number) => {
      const unit = getItemUnit(names[index]);
      const value = new Decimal(fromWei(balance, unit));

      if (value.equals(0)) {
        return items;
      }

      return { ...items, [names[index]]: value };
    },
    {} as Inventory,
  );

  return reduced;
}

const _isVisiting = (state: MachineState) =>
  state.context.visitorId !== undefined;

const _visitedFarmId = (state: MachineState) =>
  state.context.visitorId ? state.context.farmId : undefined;

export const useVisiting = () => {
  const context = useContext(Context);
  
  // In portal mode, Context is undefined. Default to visiting behavior.
  if (!context) {
    return { isVisiting: true, visitedFarmId: undefined };
  }
  
  const isVisiting = useSelector(context.gameService, _isVisiting);
  const visitedFarmId = useSelector(context.gameService, _visitedFarmId);

  return { isVisiting, visitedFarmId };
};
