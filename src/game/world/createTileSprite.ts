import Phaser from "phaser";

export type TileSpriteConfig = {
  texture: string;
  x: number;
  y: number;
  width: number;
  height: number;
  depth: number;
};

export function createTileSprite(
  scene: Phaser.Scene,
  config: TileSpriteConfig
) {
  const tile = scene.add.tileSprite(
    config.x,
    config.y,
    config.width,
    config.height,
    config.texture
  );

  tile.setDepth(config.depth);

  return tile;
}