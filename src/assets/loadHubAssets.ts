import Phaser from "phaser";

// Tilesets
import floorWood from "./tilesets/vSSR_holzdielen.png";
import wallTop from "./tilesets/vSSR_wand_oben.png";

// WorldObjects

//----furniture
import tableSprite from "./worldObjects/table.png";
import bookshelfNarrowSprite from "./worldObjects/bookshelf_narrow.png";
import chairFrontSprite from "./worldObjects/chairs/chair_front.png";
import chairBackSprite from "./worldObjects/chairs/chair_back.png";
import chairLeftSprite from "./worldObjects/chairs/chair_left.png";
import chairRightSprite from "./worldObjects/chairs/chair_right.png";

//----containers 
import chestSprite from "./worldObjects/containers/treasurechest1.png";

//Decorations
import rugGreenSprite from "./decorations/rug_green.png";
import noticeboardSprite from "./decorations/noticeboard.png";

export function loadHubAssets(scene: Phaser.Scene) {
  // Tilesets
  scene.load.image("floor", floorWood);
  scene.load.image("wall-top", wallTop);

  // worldObjects
  scene.load.image("table", tableSprite);
  scene.load.image(
    "bookshelf-narrow",
    bookshelfNarrowSprite
  );
  scene.load.image("chair-front", chairFrontSprite);
  scene.load.image("chair-back", chairBackSprite);
  scene.load.image("chair-left", chairLeftSprite);
  scene.load.image("chair-right", chairRightSprite);
  scene.load.image("chest", chestSprite);

  //Decorations
  scene.load.image("rug-green", rugGreenSprite);
  scene.load.image("noticeboard", noticeboardSprite);
}