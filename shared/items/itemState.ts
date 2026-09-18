import type {
  ItemType,
} from "./itemTypes.js";


export type ItemStack = {
  itemType: ItemType;
  amount: number;
};