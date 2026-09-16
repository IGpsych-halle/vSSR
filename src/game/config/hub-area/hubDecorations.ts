import type {
  DecorationType,
} from "../types-global/decorationTypes";

export type DecorationPlacement = {
  type: DecorationType;
  x: number;
  y: number;
};

export const hubDecorations: DecorationPlacement[] = [
  {
    type: "rugGreen",
    x: 590,
    y: 160,
  },

  {
    type: "noticeboard",
    x: 538,
    y: 38,
  },
];