import Phaser from "phaser";

import type {
  RoomLayerConfig,
} from "../config/types-global/layerTypes";

export function createRoomLayer(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  config: RoomLayerConfig
) {
  const layer = scene.add.tileSprite(
    config.x,
    config.y,
    config.width,
    config.height,
    config.texture
  );

  layer.setDepth(config.depth);

  if (config.collider) {
    const collider = scene.add.rectangle(
      config.collider.x,
      config.collider.y,
      config.collider.width,
      config.collider.height
    );

    scene.physics.add.existing(
      collider,
      true
    );

    scene.physics.add.collider(
      player,
      collider
    );
  }

  return layer;
}