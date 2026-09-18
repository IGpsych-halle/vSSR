import type {
  ItemType,
} from "./itemTypes";


export type ItemStack = {
  itemType: ItemType;
  amount: number;
};