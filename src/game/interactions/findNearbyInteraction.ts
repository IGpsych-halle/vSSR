import type {
  Interaction,
} from "../config/types-global/interactionTypes";

export function findNearbyInteraction(
  playerX: number,
  playerY: number,
  interactions: Interaction[],
  maxDistance = 35
): Interaction | null {
  let nearest: Interaction | null = null;

  let nearestDistanceSquared =
    maxDistance * maxDistance;

  for (const interaction of interactions) {
    const dx =
      playerX - interaction.x;

    const dy =
      playerY - interaction.y;

    const distanceSquared =
      dx * dx + dy * dy;

    if (
      distanceSquared <
      nearestDistanceSquared
    ) {
      nearestDistanceSquared =
        distanceSquared;

      nearest = interaction;
    }
  }

  return nearest;
}