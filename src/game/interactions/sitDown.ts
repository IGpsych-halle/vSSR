import Phaser from "phaser";

import type {
  SitInteraction,
} from "../config/types-global/interactionTypes";

import type {
  PlayerState,
} from "../player/playerState";

export function sitDown(
  player: Phaser.Physics.Arcade.Sprite,
  playerState: PlayerState,
  interaction: SitInteraction
) {
  // Position vor dem Hinsetzen merken
  playerState.positionBeforeSitting = {
    x: player.x,
    y: player.y,
  };

  playerState.currentSeat = interaction;
  playerState.isSitting = true;

  // Bewegung vollständig stoppen
  player.setVelocity(0, 0);
  player.setAcceleration(0, 0);
  player.stop();

  const body =
    player.body as Phaser.Physics.Arcade.Body;

  // Spieler exakt auf Interaction-Punkt setzen
  body.reset(
    interaction.x,
    interaction.y
  );

  // Passendes Sitz-Sprite
  player.setTexture(
    `player-sit-${interaction.facing}`
  );

  // front / left / right:
  // Spieler VOR dem Stuhl
  //
  // back:
  // Spieler HINTER dem Stuhl
  const playerInFront =
    interaction.facing !== "back";

  player.setDepth(
    interaction.worldObjectDepth +
      (playerInFront ? 0.01 : -0.01)
  );
}