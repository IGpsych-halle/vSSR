import type { Seat } from "../world/createWorldObjects";

export type PlayerPosition = {
  x: number;
  y: number;
};

export type PlayerState = {
  isSitting: boolean;
  currentSeat: Seat | null;
  positionBeforeSitting: PlayerPosition | null;
};

export function createPlayerState(): PlayerState {
  return {
    isSitting: false,
    currentSeat: null,
    positionBeforeSitting: null,
  };
}