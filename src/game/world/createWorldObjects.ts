import Phaser from "phaser";

import {
  worldObjectTypes,
  type worldObjectType,
} from "../config/types-global/worldObjectTypes";

import type {
  SitInteraction,
} from "../config/types-global/interactionTypes";

export type worldObjectFacing =
  | "front"
  | "back"
  | "left"
  | "right";

export type worldObjectPlacement = {
  type: worldObjectType;
  x: number;
  y: number;
  order?: number;
  facing?: worldObjectFacing;
};

export type worldObjectInstance = {
  gameObject: Phaser.GameObjects.Image;
  interaction?: SitInteraction;
};

export function createWorldObject(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  placement: worldObjectPlacement
) {
  const worldObjectType =
    worldObjectTypes[placement.type];

  const texture =
    placement.facing &&
    worldObjectType.directionalTextures
      ? worldObjectType.directionalTextures[
          placement.facing
        ]
      : worldObjectType.texture;

  // Möbel MIT statischem Physics-Body erstellen
  const worldObject =
    scene.physics.add.staticImage(
      placement.x,
      placement.y,
      texture
    );

  const body =
    worldObject.body as Phaser.Physics.Arcade.StaticBody;

  // Collider-Größe
  body.setSize(
    worldObjectType.bodyWidth,
    worldObjectType.bodyHeight
  );

  // Collider-Position innerhalb des Sprites
  body.setOffset(
    worldObjectType.offsetX,
    worldObjectType.offsetY
  );

  // Depth-System
  const sortY =
    placement.y +
    worldObjectType.sortYOffset;

  const order =
    placement.order ?? 0;

  worldObject.setDepth(
    sortY + order / 100
  );

  // Player ↔ Möbel Collision
  scene.physics.add.collider(
      player,
      worldObject
    );

  const instance: worldObjectInstance = {
    gameObject: worldObject,
  };

  if (worldObjectType.seat) {
    instance.interaction = {
      type: "sit",

      x:
        placement.x +
        worldObjectType.seat.offsetX,

      y:
        placement.y +
        worldObjectType.seat.offsetY,

      facing:
        placement.facing ?? "front",

      worldObjectDepth:
        worldObject.depth,
    };
  }

  return instance;

}