import Phaser from "phaser";

import type {
  WorldItem,
} from "../createWorldItem";


export function animateWorldItemDrop(
  scene: Phaser.Scene,
  worldItem: WorldItem,
  startX: number,
  startY: number
) {
  const sprite =
    worldItem.sprite;

  const targetX =
    sprite.x;

  const targetY =
    worldItem.baseY;

  const ARC_HEIGHT = 32;
  const DURATION = 450;


  worldItem.isAnimating = true;

  sprite.setPosition(
    startX,
    startY
  );


  const progress = {
    value: 0,
  };


  scene.tweens.add({
    targets: progress,

    value: 1,

    duration:
      DURATION,

    ease:
      "Linear",

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


      const arc =
        4 *
        ARC_HEIGHT *
        t *
        (1 - t);


      sprite.setPosition(
        x,
        linearY - arc
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