import type {
  SitInteraction,
} from "../config/types-global/interactionTypes";


export type PlayerPosition = {
  x: number;
  y: number;
};


export type PlayerState = {
  isSitting: boolean;

  currentSeat: SitInteraction | null;

  positionBeforeSitting: PlayerPosition | null;
};


export function createPlayerState(): PlayerState {
  return {
    isSitting: false,
    currentSeat: null,
    positionBeforeSitting: null,
  };
}