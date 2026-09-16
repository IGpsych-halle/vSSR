import Phaser from "phaser";

import {
  decorationTypes,
} from "../config/types-global/decorationTypes";

import type {
  DecorationPlacement,
} from "../config/hub-area/hubDecorations";

import type {
  Interaction,
} from "../config/types-global/interactionTypes";

export type DecorationInstance = {
  gameObject: Phaser.GameObjects.Image;
  interaction?: Interaction;
};

export function createDecoration(
  scene: Phaser.Scene,
  placement: DecorationPlacement
): DecorationInstance {
  const decorationType =
    decorationTypes[placement.type];

  const decoration = scene.add.image(
    placement.x,
    placement.y,
    decorationType.texture
  );

  decoration.setDepth(
    decorationType.depth
  );

  const instance: DecorationInstance = {
    gameObject: decoration,
  };

  if (decorationType.interaction) {
    if (decorationType.interaction) {
      instance.interaction = {
        type:
          decorationType.interaction.type,

        x:
          placement.x +
          decorationType.interaction.offsetX,

        y:
          placement.y +
          decorationType.interaction.offsetY,
      };
    }
  }

  return instance;
}