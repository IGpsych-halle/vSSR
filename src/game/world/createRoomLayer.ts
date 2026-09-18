import Phaser from "phaser";

import type {
  RoomLayerConfig,
} from "../config/types-global/layerTypes";


export type RoomLayerInstance = {
  gameObject: Phaser.GameObjects.TileSprite;
  collider?: Phaser.GameObjects.Rectangle;
};


export function createRoomLayer(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  config: RoomLayerConfig
): RoomLayerInstance {
  const layer =
    scene.add.tileSprite(
      config.x,
      config.y,
      config.width,
      config.height,
      config.texture
    );

  layer.setDepth(
    config.depth
  );


  const instance: RoomLayerInstance = {
    gameObject: layer,
  };


  if (config.collider) {
    const collider =
      scene.add.rectangle(
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


    instance.collider =
      collider;
  }


  return instance;
}