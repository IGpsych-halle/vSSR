import type {
  InteractionConfig,
} from "./interactionTypes";


export type worldObjectType =
  | "table"
  | "bookshelfNarrow"
  | "chair";


export type WorldObjectTypeConfig = {
  texture: string;

  bodyWidth: number;
  bodyHeight: number;

  offsetX: number;
  offsetY: number;

  sortYOffset: number;

  directionalTextures?: {
    front: string;
    back: string;
    left: string;
    right: string;
  };

  interaction?: InteractionConfig;
};


export const worldObjectTypes: Record<
  worldObjectType,
  WorldObjectTypeConfig
> = {

  table: {
    texture: "table",

    bodyWidth: 72,
    bodyHeight: 25,

    offsetX: 4,
    offsetY: 20,

    sortYOffset: 24,
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
    texture: "chair-front",

    directionalTextures: {
      front: "chair-front",
      back: "chair-back",
      left: "chair-left",
      right: "chair-right",
    },

    bodyWidth: 20,
    bodyHeight: 12,

    offsetX: 5,
    offsetY: 25,

    sortYOffset: 18,

    interaction: {
      type: "sit",
      offsetX: -1,
      offsetY: -10,
    },
  },
};