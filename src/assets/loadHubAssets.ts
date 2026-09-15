import Phaser from "phaser";

// Tilesets
import floorWood from "./tilesets/vSSR_holzdielen.png";
import wallTop from "./tilesets/vSSR_wand_oben.png";

// Furniture
import tableSprite from "./furniture/table.png";
import bookshelfNarrowSprite from "./furniture/bookshelf_narrow.png";

import chairFrontSprite from "./furniture/chairs/chair_front.png";
import chairBackSprite from "./furniture/chairs/chair_back.png";
import chairLeftSprite from "./furniture/chairs/chair_left.png";
import chairRightSprite from "./furniture/chairs/chair_right.png";

// Interactables
import noticeboardSprite from "./interactives/noticeboard.png";

export function loadHubAssets(scene: Phaser.Scene) {
  // Tilesets
  scene.load.image("floor", floorWood);
  scene.load.image("wall-top", wallTop);

  // Furniture
  scene.load.image("table", tableSprite);
  scene.load.image(
    "bookshelf-narrow",
    bookshelfNarrowSprite
  );
  
  scene.load.image("chair-front", chairFrontSprite);
  scene.load.image("chair-back", chairBackSprite);
  scene.load.image("chair-left", chairLeftSprite);
  scene.load.image("chair-right", chairRightSprite);

  // Interactables
  scene.load.image(
    "noticeboard",
    noticeboardSprite
  );
}