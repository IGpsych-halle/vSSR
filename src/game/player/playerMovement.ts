import Phaser from "phaser";

export type Facing =
  | "front"
  | "back"
  | "left"
  | "right";

type MovementKeys = {
  cursors: Phaser.Types.Input.Keyboard.CursorKeys;

  wasd: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };
};

export function updatePlayerMovement(
  player: Phaser.Physics.Arcade.Sprite,
  keys: MovementKeys,
  facing: Facing,
  speed: number
): Facing {
  const direction = new Phaser.Math.Vector2(0, 0);

  if (
    keys.cursors.left.isDown ||
    keys.wasd.A.isDown
  ) {
    direction.x = -1;
  }

  if (
    keys.cursors.right.isDown ||
    keys.wasd.D.isDown
  ) {
    direction.x = 1;
  }

  if (
    keys.cursors.up.isDown ||
    keys.wasd.W.isDown
  ) {
    direction.y = -1;
  }

  if (
    keys.cursors.down.isDown ||
    keys.wasd.S.isDown
  ) {
    direction.y = 1;
  }

  if (direction.x < 0) {
    facing = "left";
  }
  else if (direction.x > 0) {
    facing = "right";
  }
  else if (direction.y > 0) {
    facing = "front";
  }
  else if (direction.y < 0) {
    facing = "back";
  }

  if (direction.length() > 0) {
    player.play(`walk-${facing}`, true);

    direction.normalize();
    direction.scale(speed);

    player.setVelocity(
      direction.x,
      direction.y
    );
    console.log(
      "speed:", speed,
      "velocity:", direction.x, direction.y,
      "player:", player.x, player.y
    );
  } else {
    player.setVelocity(0, 0);
    player.stop();

    player.setTexture(`player-${facing}`);
  }

  return facing;
}