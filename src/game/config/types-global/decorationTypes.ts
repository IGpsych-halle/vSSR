export type DecorationType =
  | "rugGreen"
  | "noticeboard";

export type DecorationTypeConfig = {
  texture: string;
  depth: number;

  interaction?: {
    type: "noticeboard";
    offsetX: number;
    offsetY: number;
  };
};

export const decorationTypes: Record<
  DecorationType,
  DecorationTypeConfig
> = {
  rugGreen: {
    texture: "rug-green",
    depth: 10,
  },

  noticeboard: {
    texture: "noticeboard",
    depth: 10,

    interaction: {
      type: "noticeboard",
      offsetX: -2,
      offsetY: 40,
    },
  },
};