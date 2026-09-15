import Phaser from "phaser";

import playerFront from "../../assets/avatar/avatar_base_front.png";
import playerBack from "../../assets/avatar/avatar_base_back.png";
import playerLeft from "../../assets/avatar/avatar_base_left.png";
import playerRight from "../../assets/avatar/avatar_base_right.png";

import playerFrontWalk from "../../assets/avatar/avatar_base_walk_front.png";
import playerBackWalk from "../../assets/avatar/avatar_base_walk_back.png";
import playerLeftWalk from "../../assets/avatar/avatar_base_walk_left.png";
import playerRightWalk from "../../assets/avatar/avatar_base_walk_right.png";

//states
import playerSitFront from "../../assets/avatar/states/avatar_base_seated_front.png";
import playerSitBack from "../../assets/avatar/states/avatar_base_seated_back.png";
import playerSitLeft from "../../assets/avatar/states/avatar_base_seated_left.png";
import playerSitRight from "../../assets/avatar/states/avatar_base_seated_right.png";

export function loadPlayerAssets(scene: Phaser.Scene) {
  scene.load.image("player-front", playerFront);
  scene.load.image("player-back", playerBack);
  scene.load.image("player-left", playerLeft);
  scene.load.image("player-right", playerRight);

  scene.load.image("player-sit-front", playerSitFront);
  scene.load.image("player-sit-back", playerSitBack);
  scene.load.image("player-sit-left", playerSitLeft);
  scene.load.image("player-sit-right", playerSitRight);

  scene.load.spritesheet(
    "player-front-walk",
    playerFrontWalk,
    {
      frameWidth: 32,
      frameHeight: 42,
    }
  );

  scene.load.spritesheet(
    "player-back-walk",
    playerBackWalk,
    {
      frameWidth: 32,
      frameHeight: 42,
    }
  );

  scene.load.spritesheet(
    "player-left-walk",
    playerLeftWalk,
    {
      frameWidth: 32,
      frameHeight: 42,
    }
  );

  scene.load.spritesheet(
    "player-right-walk",
    playerRightWalk,
    {
      frameWidth: 32,
      frameHeight: 42,
    }
  );
}