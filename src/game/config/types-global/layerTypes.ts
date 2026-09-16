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