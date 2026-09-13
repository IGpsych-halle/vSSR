import Phaser from "phaser";

export function createPlayerAnimations(scene: Phaser.Scene) {
  const directions = ["front", "back", "left", "right"];

  for (const direction of directions) {
    scene.anims.create({
      key: `walk-${direction}`,
      frames: scene.anims.generateFrameNumbers(
        `player-${direction}-walk`,
        {
          frames: [1, 2, 3, 0],
        }
      ),
      frameRate: 6.67,
      repeat: -1,
    });
  }
}