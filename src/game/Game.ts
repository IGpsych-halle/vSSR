import Phaser from "phaser";
import { RoomScene } from "./scenes/RoomScene";

export function startGame(parent: string) {
  const config: Phaser.Types.Core.GameConfig = {
    type: Phaser.AUTO,
    width: 960,
    height: 540,
    parent,
    backgroundColor: "#1e1e2f",
    pixelArt: false,
    antialias: true,
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