import Phaser from "phaser";
import { RoomScene } from "./scenes/RoomScene";

export function startGame(parent: string) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,

    width: 480,
    height: 270,

    parent: parent,

    backgroundColor: "#1e1e2f",

    pixelArt: true,
    antialias: false,

    scale: {
      mode: Phaser.Scale.FIT,
      autoCenter: Phaser.Scale.CENTER_BOTH,
    },

    physics: {
      default: "arcade",
      arcade: {
        debug: true,
      },
    },

    scene: [RoomScene],
  };

  return new Phaser.Game(config);
}