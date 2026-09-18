import Phaser from "phaser";

import type {
  WorldItem,
} from "../createWorldItem";

import type {
  worldObjectInstance,
} from "../../world/createWorldObjects";

import type {
  RoomLayerInstance,
} from "../../world/createRoomLayer";

import {
  findValidItemPosition,
} from "../placement/findValidItemPosition";


export function animateWorldItemRejected(
  worldItem: WorldItem,
  player: Phaser.Physics.Arcade.Sprite,
  worldObjects: worldObjectInstance[],
  roomLayers: RoomLayerInstance[]
) {
  if (worldItem.isAnimating) {
    return;
  }


  const sprite =
    worldItem.sprite;

  const startX =
    sprite.x;

  const startY =
    worldItem.baseY;


  const direction =
    new Phaser.Math.Vector2(
      sprite.x - player.x,
      sprite.y - player.y
    );


  if (direction.lengthSq() === 0) {
    direction.set(0, 1);
  }

  direction.normalize();


  const KNOCKBACK_DISTANCE = 20;
  const HOP_HEIGHT = 10;


  const desiredX =
    startX +
    direction.x *
      KNOCKBACK_DISTANCE;

  const desiredY =
    startY +
    direction.y *
      KNOCKBACK_DISTANCE;


  const landingPosition =
    findValidItemPosition(
      sprite.scene,
      desiredX,
      desiredY,
      worldObjects,
      roomLayers,
      {
        searchRadius: 20,
        radiusStep: 5,
        angleSteps: 8,
      }
    );


  const targetX =
    landingPosition?.x ??
    startX;

  const targetY =
    landingPosition?.y ??
    startY;


  worldItem.isAnimating =
    true;


  const progress = {
    value: 0,
  };


  sprite.scene.tweens.add({
    targets: progress,

    value: 1,

    duration: 180,

    ease: "Sine.easeOut",

    onUpdate: () => {
      const t =
        progress.value;


      const x =
        Phaser.Math.Linear(
          startX,
          targetX,
          t
        );


      const linearY =
        Phaser.Math.Linear(
          startY,
          targetY,
          t
        );


      const hop =
        4 *
        HOP_HEIGHT *
        t *
        (1 - t);


      sprite.setPosition(
        x,
        linearY - hop
      );
    },

    onComplete: () => {
      worldItem.baseY =
        targetY;

      worldItem.sortY =
        targetY;

      sprite.setPosition(
        targetX,
        targetY
      );

      worldItem.isAnimating =
        false;
    },
  });
}