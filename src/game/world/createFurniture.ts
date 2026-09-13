import Phaser from "phaser";

export type FurnitureConfig = {
  texture: string;
  x: number;
  y: number;
  bodyWidth: number;
  bodyHeight: number;
  offsetX: number;
  offsetY: number;
  depthOffset?: number;
};

export function createFurniture(
  scene: Phaser.Scene,
  player: Phaser.Physics.Arcade.Sprite,
  config: FurnitureConfig
) {
  const furniture = scene.physics.add.staticImage(
    config.x,
    config.y,
    config.texture
  );

  const body =
    furniture.body as Phaser.Physics.Arcade.StaticBody;

  body.setSize(
    config.bodyWidth,
    config.bodyHeight
  );

  body.setOffset(
    config.offsetX,
    config.offsetY
  );

  furniture.setDepth(
    config.y + (config.depthOffset ?? 0)
  );

  scene.physics.add.collider(
    player,
    furniture
  );

  return furniture;
}