import type {
  ItemStack,
} from "../../../../shared/items/itemState";


export type InventoryState = {
  items: ItemStack[];
};


export function createInventoryState(): InventoryState {
  return {
    items: [],
  };
}