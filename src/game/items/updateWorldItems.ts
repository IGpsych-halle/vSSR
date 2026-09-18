import Phaser from "phaser";

import type {
  WorldItem,
} from "./createWorldItem";


const BOB_AMPLITUDE = 2;
const BOB_SPEED = 0.004;


export function updateWorldItems(
  worldItems: WorldItem[],
  time: number
) {
  for (const worldItem of worldItems) {
    const sprite =
      worldItem.sprite;

    sprite.setDepth(
      worldItem.sortY + 0.5
    );

    if (worldItem.isAnimating) {
      continue;
    }

    sprite.setVelocity(0, 0);

    sprite.y =
      worldItem.baseY +
      Math.sin(
        time * BOB_SPEED
      ) *
      BOB_AMPLITUDE;
  }
}