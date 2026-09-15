import Phaser from "phaser";

import type { PlayerState } from "../player/playerState";
import type { Facing } from "../player/playerMovement";

export function standUp(
  player: Phaser.Physics.Arcade.Sprite,
  playerState: PlayerState,
  facing: Facing
) {
  const previousPosition =
    playerState.positionBeforeSitting;

  if (!previousPosition) return;

  player.setPosition(
    previousPosition.x,
    previousPosition.y
  );

  player.setVelocity(0, 0);
  player.stop();

  player.setTexture(
    `player-${facing}`
  );

  playerState.isSitting = false;
  playerState.currentSeat = null;
  playerState.positionBeforeSitting = null;
}