import {
  itemTypes,
} from "../items/itemTypes.js";

import type {
  ItemStack,
} from "../items/itemState.js";

import type {
  InventoryState,
} from "./inventoryTypes.js";


export type AddItemResult = {
  inventory: InventoryState;
  addedAmount: number;
  remainingAmount: number;
};


export function addItemToInventory(
  inventory: InventoryState,
  incomingStack: ItemStack
): AddItemResult {
  const config =
    itemTypes[incomingStack.itemType];

  let remainingAmount =
    incomingStack.amount;

  const newSlots =
    inventory.slots.map(
      (slot) =>
        slot
          ? { ...slot }
          : null
    );


  // 1. Bestehende Stacks auffüllen
  if (config.stackable) {
    for (const slot of newSlots) {
      if (!slot) {
        continue;
      }

      if (
        slot.itemType !==
        incomingStack.itemType
      ) {
        continue;
      }

      const availableSpace =
        config.maxStack -
        slot.amount;

      if (availableSpace <= 0) {
        continue;
      }

      const amountToAdd =
        Math.min(
          availableSpace,
          remainingAmount
        );

      slot.amount += amountToAdd;
      remainingAmount -=
        amountToAdd;

      if (remainingAmount <= 0) {
        break;
      }
    }
  }


  // 2. Leere Slots füllen
  for (
    let i = 0;
    i < newSlots.length;
    i++
  ) {
    if (remainingAmount <= 0) {
      break;
    }

    if (newSlots[i] !== null) {
      continue;
    }

    const stackAmount =
      config.stackable
        ? Math.min(
            config.maxStack,
            remainingAmount
          )
        : 1;

    newSlots[i] = {
      itemType:
        incomingStack.itemType,
      amount:
        stackAmount,
    };

    remainingAmount -=
      stackAmount;
  }


  const addedAmount =
    incomingStack.amount -
    remainingAmount;


  return {
    inventory: {
      slots: newSlots,
    },

    addedAmount,
    remainingAmount,
  };
}