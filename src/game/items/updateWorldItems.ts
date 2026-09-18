import Phaser from "phaser";

import type {
  WorldItem,
} from "./createWorldItem";

import type {
  ItemStack,
} from "../../../shared/items/itemState";


const ATTRACT_RADIUS = 60;
const PICKUP_RADIUS = 8;

const ATTRACT_SPEED = 80;

const BOB_AMPLITUDE = 2;
const BOB_SPEED = 0.004;


export function updateWorldItems(
  worldItems: WorldItem[],
  player: Phaser.Physics.Arcade.Sprite,
  time: number
) {
  const pickedUpStacks: ItemStack[] = [];
  for (
    let i = worldItems.length - 1;
    i >= 0;
    i--
  ) {
    const worldItem =
      worldItems[i];

    const sprite =
      worldItem.sprite;

    const body =
    sprite.body as Phaser.Physics.Arcade.Body;

    sprite.setDepth(
    body.bottom + 0.5
    );


    const distance =
      Phaser.Math.Distance.Between(
        sprite.x,
        sprite.y,
        player.x,
        player.y
      );


    // ========================================
    // PICKUP
    // ========================================

    if (distance <= PICKUP_RADIUS) {
        pickedUpStacks.push(
            worldItem.stack
        );

        sprite.destroy();
        worldItems.splice(i, 1);
        continue;
    }


    // ========================================
    // ITEM WIRD VOM SPIELER ANGEZOGEN
    // ========================================

    if (distance <= ATTRACT_RADIUS) {
      const direction =
        new Phaser.Math.Vector2(
          player.x - sprite.x,
          player.y - sprite.y
        );

      direction
        .normalize()
        .scale(ATTRACT_SPEED);


      sprite.setVelocity(
        direction.x,
        direction.y
      );

      continue;
    }


    // ========================================
    // NORMALES SCHWEBEN
    // ========================================

    sprite.setVelocity(0, 0);

    sprite.y = worldItem.baseY + Math.sin(time * BOB_SPEED) * BOB_AMPLITUDE;
  }
  return pickedUpStacks;
}