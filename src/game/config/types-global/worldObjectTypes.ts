export type worldObjectTypeConfig = {
  texture: string;

  directionalTextures?: {
    front: string;
    back: string;
    left: string;
    right: string;
  };

  bodyWidth: number;
  bodyHeight: number;

  offsetX: number;
  offsetY: number;

  sortYOffset: number;

  seat?: {
    offsetX: number;
    offsetY: number;
  };
};

export type worldObjectType =
  | "table"
  | "bookshelfNarrow"
  | "chair";

export const worldObjectTypes: Record<
  worldObjectType,
  worldObjectTypeConfig
> = {
    table: {
    texture: "table",
    bodyWidth: 72,
    bodyHeight: 25,
    offsetX: 4,
    offsetY: 20,
    sortYOffset: 0,
  },

  bookshelfNarrow: {
    texture: "bookshelf-narrow",
    bodyWidth: 40,
    bodyHeight: 30,
    offsetX: 6,
    offsetY: 62,
    sortYOffset: 30,
  },

  chair: {
    texture: "chair",
    directionalTextures: {
        front: "chair-front",
        back: "chair-back",
        left: "chair-left",
        right: "chair-right",
    },
    bodyWidth: 20,
    bodyHeight: 12,
    offsetX: 10,
    offsetY: 25,
    sortYOffset: 8,

    seat: {
        offsetX: -1,
        offsetY: -11,
    },
  }
};








