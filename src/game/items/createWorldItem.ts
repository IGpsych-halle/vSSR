import Phaser from "phaser";

import type {
  ItemStack,
} from "../../../shared/items/itemState.ts";

import {
  itemTextures,
} from "./itemVisuals";


export type WorldItem = {
  stack: ItemStack;
  sprite: Phaser.Physics.Arcade.Sprite;
  baseY: number;
};


export function createWorldItem(
  scene: Phaser.Scene,
  stack: ItemStack,
  x: number,
  y: number
): WorldItem {
  const texture =
    itemTextures[stack.itemType];

  const sprite =
    scene.physics.add.sprite(
      x,
      y,
      texture
    );

  sprite.body!.allowGravity = false;

  const body =
    sprite.body as Phaser.Physics.Arcade.Body;

  sprite.setDepth(
    body.bottom + 0.5
  );

  return {
    stack,
    sprite,
    baseY: y,
  };
}