import type {
  ItemStack,
} from "../../items/itemState";


export type InventoryState = {
  items: ItemStack[];
};


export function createInventoryState(): InventoryState {
  return {
    items: [],
  };
}