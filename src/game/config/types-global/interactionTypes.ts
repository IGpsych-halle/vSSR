export type InteractionFacing =
  | "front"
  | "back"
  | "left"
  | "right";


// ========================================
// CONFIG
// Definition am Objekt
// ========================================

export type InteractionType =
  | "sit"
  | "noticeboard"
  | "container";

export type InteractionConfig = {
  type: InteractionType;

  offsetX: number;
  offsetY: number;
};


// ========================================
// RUNTIME INTERACTIONS
// Konkrete Interaction im Raum
// ========================================

export type SitInteraction = {
  type: "sit";

  x: number;
  y: number;

  facing: InteractionFacing;
  worldObjectDepth: number;
};

export type NoticeboardInteraction = {
  type: "noticeboard";

  x: number;
  y: number;
};

export type ContainerInteraction = {
  type: "container";

  x: number;
  y: number;

  containerId: string;
};


// ========================================
// ALL RUNTIME INTERACTIONS
// ========================================

export type Interaction =
  | SitInteraction
  | NoticeboardInteraction
  | ContainerInteraction;