import Phaser from "phaser";

// Tilesets
import floorWood from "./tilesets/vSSR_holzdielen.png";
import wallTop from "./tilesets/vSSR_wand_oben.png";

// Furniture
import tableSprite from "./furniture/table.png";
import bookshelfNarrowSprite from "./furniture/bookshelf_narrow.png";
import chairSprite from "./furniture/chair.png";

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
  scene.load.image("chair", chairSprite);
  // Interactables
  scene.load.image(
    "noticeboard",
    noticeboardSprite
  );
}