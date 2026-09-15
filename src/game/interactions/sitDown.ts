import Phaser from "phaser";

import type { Seat } from "../world/createFurniture";
import type { PlayerState } from "../player/playerState";

export function sitDown(
  player: Phaser.Physics.Arcade.Sprite,
  playerState: PlayerState,
  seat: Seat
) {
  playerState.positionBeforeSitting = {
    x: player.x,
    y: player.y,
  };

  playerState.currentSeat = seat;
  playerState.isSitting = true;

  player.setVelocity(0, 0);
  player.setAcceleration(0, 0);

  player.stop();

  player.setPosition(
  seat.x,
  seat.y
  );

  const body =
  player.body as Phaser.Physics.Arcade.Body;

  body.reset(
  seat.x,
  seat.y
  );

  player.setTexture(
    `player-sit-${seat.facing}`
  );

  const playerInFront = seat.facing !== "back";

  player.setDepth(
    seat.furnitureDepth +
    (playerInFront ? 0.01 : -0.01)
  );
}