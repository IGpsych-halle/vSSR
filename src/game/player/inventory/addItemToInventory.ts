import {
  itemTypes,
} from "../../../../shared/items/itemTypes";

import type {
  ItemStack,
} from "../../../../shared/items/itemState";

import type {
  InventoryState,
} from "./inventoryState";


export function addItemToInventory(
  inventory: InventoryState,
  incomingStack: ItemStack
) {
  const config =
    itemTypes[incomingStack.itemType];

  let amount =
    incomingStack.amount;


  // Nicht stapelbare Items einzeln hinzufügen
  if (!config.stackable) {
    for (let i = 0; i < amount; i++) {
      inventory.items.push({
        itemType: incomingStack.itemType,
        amount: 1,
      });
    }

    return;
  }


  // Erst vorhandene Stacks auffüllen
  for (const stack of inventory.items) {
    if (
      stack.itemType !== incomingStack.itemType
    ) {
      continue;
    }

    const availableSpace =
      config.maxStack - stack.amount;

    if (availableSpace <= 0) {
      continue;
    }

    const amountToAdd =
      Math.min(
        availableSpace,
        amount
      );

    stack.amount += amountToAdd;
    amount -= amountToAdd;

    if (amount <= 0) {
      return;
    }
  }


  // Übrige Items auf neue Stacks verteilen
  while (amount > 0) {
    const stackAmount =
      Math.min(
        config.maxStack,
        amount
      );

    inventory.items.push({
      itemType: incomingStack.itemType,
      amount: stackAmount,
    });

    amount -= stackAmount;
  }
}