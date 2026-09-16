import type {
  worldObjectPlacement,
} from "../../world/createWorldObjects";

export const hubWorldObjects: worldObjectPlacement[] = [
  {
    type: "table",
    x: 530,
    y: 150,
    order: 50,
  },
  {
    type: "bookshelfNarrow",
    x: 450,
    y: 80,
  },
  {
    type: "chair",
    x: 500,
    y: 300,
    order: 20,
    facing: "front",
  },
  {
    type: "chair",
    x: 650,
    y: 170,
    order: 70,
    facing: "back",
  },
  {
    type: "chair",
    x: 450,
    y: 470,
    facing: "front",
  },
  {
    type: "chair",
    x: 500,
    y: 470,
    facing: "back",
  },
  {
    type: "chair",
    x: 550,
    y: 470,
    facing: "left",
  },
  {
    type: "chair",
    x: 600,
    y: 470,
    facing: "right",
  },
];