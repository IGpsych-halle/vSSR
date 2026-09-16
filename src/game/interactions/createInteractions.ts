import type {
  Interaction,
  InteractionConfig,
  InteractionFacing,
} from "../config/types-global/interactionTypes";

type InteractionContext = {
  x: number;
  y: number;

  facing?: InteractionFacing;
  worldObjectDepth?: number;
  containerId?: string;
};

export function createInteraction(
  config: InteractionConfig,
  context: InteractionContext
): Interaction {
  const x =
    context.x + config.offsetX;

  const y =
    context.y + config.offsetY;

  switch (config.type) {
    case "sit": {
      if (
        context.facing === undefined ||
        context.worldObjectDepth === undefined
      ) {
        throw new Error(
          "Sit interaction requires facing and worldObjectDepth!"
        );
      }

      return {
        type: "sit",
        x,
        y,
        facing: context.facing,
        worldObjectDepth:
          context.worldObjectDepth,
      };
    }

    case "noticeboard":
      return {
        type: "noticeboard",
        x,
        y,
      };

    case "container": {
      if (!context.containerId) {
        throw new Error(
          "Container interaction requires a containerId."
        );
      }

      return {
        type: "container",
        x,
        y,
        containerId: context.containerId,
      };
    }
  }
}