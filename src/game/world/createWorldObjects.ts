import Phaser from "phaser";

import {
  worldObjectTypes,
  type worldObjectType,
} from "../config/types-global/worldObjectTypes";

import {
  createInteraction,
} from "../interactions/createInteractions";

import type {
  Interaction,
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

  containerId?: string;
};


export type worldObjectInstance = {
  gameObject: Phaser.GameObjects.Image;

  interaction?: Interaction;
};


export function createWorldObject(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  placement: worldObjectPlacement
) {
  const worldObjectType =
    worldObjectTypes[placement.type];

    console.log(
    "TYPE CHECK:",
    placement.type,
    worldObjectType.interaction
  );


  // Texture bestimmen
  const texture =
    placement.facing &&
    worldObjectType.directionalTextures
      ? worldObjectType.directionalTextures[
          placement.facing
        ]
      : worldObjectType.texture;


  // WorldObject erstellen
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


  // Collider-Position
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


  // Player ↔ WorldObject Collision
  scene.physics.add.collider(
    player,
    worldObject
  );


  // Runtime-Instanz
  const instance: worldObjectInstance = {
    gameObject: worldObject,
  };


  // Interaction erzeugen
  if (worldObjectType.interaction) {
    instance.interaction =
      createInteraction(
        worldObjectType.interaction,
        {
          x: placement.x,
          y: placement.y,

          facing:
            placement.facing ?? "front",

          worldObjectDepth:
            worldObject.depth,

          containerId:
            placement.containerId,
        }
      );
  }


  return instance;
}