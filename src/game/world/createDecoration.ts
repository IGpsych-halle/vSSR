import Phaser from "phaser";

import type {
  DecorationPlacement,
} from "../config/hubDecorations";

export function createDecoration(
  scene: Phaser.Scene,
  config: DecorationPlacement
) {
  const decoration = scene.add.image(
    config.x,
    config.y,
    config.texture
  );

  decoration.setDepth(config.depth);

  return decoration;
}