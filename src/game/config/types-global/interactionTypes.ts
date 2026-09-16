export type InteractionFacing =
  | "front"
  | "back"
  | "left"
  | "right";

export type SitInteraction = {
  type: "sit";

  x: number;
  y: number;

  facing: InteractionFacing;
  furnitureDepth: number;
};

export type NoticeboardInteraction = {
  type: "noticeboard";

  x: number;
  y: number;
};

export type Interaction =
  | SitInteraction
  | NoticeboardInteraction;