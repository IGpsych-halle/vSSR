import Phaser from "phaser";

import {
  itemTypes,
  type ItemType,
} from "./itemTypes";


export type WorldItem = {
  itemType: ItemType;

  sprite: Phaser.Physics.Arcade.Sprite;

  baseY: number;
};


export function createWorldItem(
  scene: Phaser.Scene,
  itemType: ItemType,
  x: number,
  y: number
): WorldItem {

  const config =
    itemTypes[itemType];


  const sprite =
    scene.physics.add.sprite(
      x,
      y,
      config.texture
    );


  // Items sollen nicht durch die Welt fallen.
  // Wir verwenden Arcade Physics später nur
  // für Bewegung Richtung Spieler.
  sprite.body!.allowGravity = false;


  // Über dem Boden / WorldObjects anzeigen
  const body = sprite.body as Phaser.Physics.Arcade.Body;

  sprite.setDepth(body.bottom + 0.5);


  return {
    itemType,
    sprite,
    baseY: y,
  };
}