import Phaser from "phaser";

import type {
  worldObjectInstance,
} from "../../world/createWorldObjects";

import type {
  RoomLayerInstance,
} from "../../world/createRoomLayer";


const ITEM_FOOTPRINT_WIDTH = 10;
const ITEM_FOOTPRINT_HEIGHT = 8;


export function isItemLandingPositionFree(
  scene: Phaser.Scene,
  x: number,
  y: number,
  worldObjects: worldObjectInstance[],
  roomLayers: RoomLayerInstance[]
): boolean {
  const halfWidth =
    ITEM_FOOTPRINT_WIDTH / 2;

  const halfHeight =
    ITEM_FOOTPRINT_HEIGHT / 2;


  const itemBounds =
    new Phaser.Geom.Rectangle(
      x - halfWidth,
      y - halfHeight,
      ITEM_FOOTPRINT_WIDTH,
      ITEM_FOOTPRINT_HEIGHT
    );


  // Raumgrenzen prüfen
  const worldBounds =
    scene.physics.world.bounds;

  if (
    itemBounds.left <
      worldBounds.left ||
    itemBounds.right >
      worldBounds.right ||
    itemBounds.top <
      worldBounds.top ||
    itemBounds.bottom >
      worldBounds.bottom
  ) {
    return false;
  }


  // WorldObjects prüfen
  for (const worldObject of worldObjects) {
    const body =
      worldObject.gameObject.body as
        Phaser.Physics.Arcade.StaticBody;

    const obstacleBounds =
      new Phaser.Geom.Rectangle(
        body.x,
        body.y,
        body.width,
        body.height
      );


    if (
      Phaser.Geom.Rectangle.Overlaps(
        itemBounds,
        obstacleBounds
      )
    ) {
      return false;
    }
  }


  // RoomLayer-Collider prüfen
  for (const roomLayer of roomLayers) {
    if (!roomLayer.collider) {
      continue;
    }

    const body =
      roomLayer.collider.body as
        Phaser.Physics.Arcade.StaticBody;

    const obstacleBounds =
      new Phaser.Geom.Rectangle(
        body.x,
        body.y,
        body.width,
        body.height
      );


    if (
      Phaser.Geom.Rectangle.Overlaps(
        itemBounds,
        obstacleBounds
      )
    ) {
      return false;
    }
  }


  return true;
}