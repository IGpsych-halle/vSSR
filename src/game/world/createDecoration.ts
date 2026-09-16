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

import { createInteraction } from "../interactions/createInteractions";


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


  // Decoration erstellen
  const decoration = scene.add.image(
    placement.x,
    placement.y,
    decorationType.texture
  );

  decoration.setDepth(
    decorationType.depth
  );


  // Runtime-Instanz
  const instance: DecorationInstance = {
    gameObject: decoration,
  };


  // Interaction erzeugen
  if (decorationType.interaction) {
    instance.interaction =
      createInteraction(
        decorationType.interaction,
        {
          x: placement.x,
          y: placement.y,
        }
      );
  }


  return instance;
}