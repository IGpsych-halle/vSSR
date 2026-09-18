import type {
  ItemStack,
} from "../items/itemState";

import {
  INVENTORY_SLOT_COUNT,
} from "./inventoryConstants";


export type InventorySlot =
  ItemStack | null;


export type InventoryState = {
  slots: InventorySlot[];
};


export function createInventoryState(): InventoryState {
  return {
    slots: Array(
      INVENTORY_SLOT_COUNT
    ).fill(null),
  };
}