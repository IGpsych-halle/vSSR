import {
  ROOM_WIDTH,
  ROOM_HEIGHT,
} from "../roomConfig";

export type RoomLayerConfig = {
  texture: string;

  x: number;
  y: number;

  width: number;
  height: number;

  depth: number;

  collider?: {
    x: number;
    y: number;
    width: number;
    height: number;
  };
};

export const hubLayers: RoomLayerConfig[] = [
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

    collider: {
      x: ROOM_WIDTH / 2,
      y: 90,
      width: ROOM_WIDTH,
      height: 12,
    },
  },
];