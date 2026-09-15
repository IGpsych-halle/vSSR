import Phaser from "phaser";

import {
  furnitureTypes,
  type FurnitureType,
} from "../config/furnitureTypes";

export type FurnitureFacing =
  | "front"
  | "back"
  | "left"
  | "right";

export type FurniturePlacement = {
  type: FurnitureType;
  x: number;
  y: number;
  order?: number;
  facing?: FurnitureFacing;
};

export type Seat = {
  x: number;
  y: number;
  facing: FurnitureFacing;
  furnitureDepth: number;
};

export type FurnitureInstance = {
  gameObject: Phaser.GameObjects.Image;
  seat?: Seat;
};

export function createFurniture(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  placement: FurniturePlacement
) {
  const furnitureType =
    furnitureTypes[placement.type];

  const texture =
    placement.facing &&
    furnitureType.directionalTextures
      ? furnitureType.directionalTextures[
          placement.facing
        ]
      : furnitureType.texture;

  // Möbel MIT statischem Physics-Body erstellen
  const furniture =
    scene.physics.add.staticImage(
      placement.x,
      placement.y,
      texture
    );

  const body =
    furniture.body as Phaser.Physics.Arcade.StaticBody;

  // Collider-Größe
  body.setSize(
    furnitureType.bodyWidth,
    furnitureType.bodyHeight
  );

  // Collider-Position innerhalb des Sprites
  body.setOffset(
    furnitureType.offsetX,
    furnitureType.offsetY
  );

  // Depth-System
  const sortY =
    placement.y +
    furnitureType.sortYOffset;

  const order =
    placement.order ?? 0;

  furniture.setDepth(
    sortY + order / 100
  );

  // Player ↔ Möbel Collision
  scene.physics.add.collider(
      player,
      furniture
    );

  const instance: FurnitureInstance = {
    gameObject: furniture,
  };

  if (furnitureType.seat) {
    instance.seat = {
      x:
        placement.x +
        furnitureType.seat.offsetX,

      y:
        placement.y +
        furnitureType.seat.offsetY,

      facing: placement.facing ?? "front",

      furnitureDepth: furniture.depth,
    };
  }

  return instance;

}