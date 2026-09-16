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

// Interactibles
import noticeboardSprite from "./interactives/noticeboard.png";

//Decorations
import rugGreenSprite from "./decorations/rug_green.png";

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
  
  //Interactibles
  scene.load.image("chair-front", chairFrontSprite);
  scene.load.image("chair-back", chairBackSprite);
  scene.load.image("chair-left", chairLeftSprite);
  scene.load.image("chair-right", chairRightSprite);

  scene.load.image(
    "noticeboard",
    noticeboardSprite
  );

  //Decorations
  scene.load.image("rug-green", rugGreenSprite);
}