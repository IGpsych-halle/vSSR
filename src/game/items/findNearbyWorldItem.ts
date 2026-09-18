import Phaser from "phaser";

import type {
  WorldItem,
} from "./createWorldItem";


const PICKUP_RADIUS = 45;


export function findNearbyWorldItem(
  player: Phaser.Physics.Arcade.Sprite,
  worldItems: WorldItem[]
): WorldItem | null {
  let nearestItem:
    WorldItem | null = null;

  let nearestDistance =
    PICKUP_RADIUS;


  for (const worldItem of worldItems) {
    const distance =
      Phaser.Math.Distance.Between(
        player.x,
        player.y,
        worldItem.sprite.x,
        worldItem.sprite.y
      );


    if (distance <= nearestDistance) {
      nearestDistance =
        distance;

      nearestItem =
        worldItem;
    }
  }


  return nearestItem;
}