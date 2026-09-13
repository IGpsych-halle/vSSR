import {
  ROOM_WIDTH,
  ROOM_HEIGHT,
} from "./roomConfig";

export const hubTiles = [
  {
    texture: "floor",
    x: ROOM_WIDTH / 2,
    y: ROOM_HEIGHT / 2,
    width: ROOM_WIDTH,
    height: ROOM_HEIGHT,
    depth: 0,
  },

  {
    texture: "wall-top",
    x: ROOM_WIDTH / 2,
    y: 48,
    width: ROOM_WIDTH,
    height: 96,
    depth: 5,
  },
];