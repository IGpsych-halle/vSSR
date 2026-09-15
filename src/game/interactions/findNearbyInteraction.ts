export type PositionedInteraction = {
  x: number;
  y: number;
};

export function findNearbyInteraction<
  T extends PositionedInteraction
>(
  playerX: number,
  playerY: number,
  interactions: T[],
  maxDistance = 35
): T | null {
  let nearest: T | null = null;
  let nearestDistanceSquared =
    maxDistance * maxDistance;

  for (const interaction of interactions) {
    const dx = playerX - interaction.x;
    const dy = playerY - interaction.y;

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