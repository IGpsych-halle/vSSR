import Phaser from "phaser";

import type {
  worldObjectInstance,
} from "../../world/createWorldObjects";

import type {
  RoomLayerInstance,
} from "../../world/createRoomLayer";

import {
  isItemLandingPositionFree,
} from "./isItemLandingPositionFree";


export type ItemLandingPosition = {
  x: number;
  y: number;
};


type FindValidItemPositionOptions = {
  searchRadius?: number;
  radiusStep?: number;
  angleSteps?: number;
};


export function findValidItemPosition(
  scene: Phaser.Scene,
  desiredX: number,
  desiredY: number,
  worldObjects: worldObjectInstance[],
  roomLayers: RoomLayerInstance[],
  options: FindValidItemPositionOptions = {}
): ItemLandingPosition | null {
  const searchRadius =
    options.searchRadius ?? 40;

  const radiusStep =
    options.radiusStep ?? 8;

  const angleSteps =
    options.angleSteps ?? 16;


  // Wunschposition zuerst direkt prüfen
  if (
    isItemLandingPositionFree(
      scene,
      desiredX,
      desiredY,
      worldObjects,
      roomLayers
    )
  ) {
    return {
      x: desiredX,
      y: desiredY,
    };
  }


  // Danach konzentrisch nach Ersatzpositionen suchen
  for (
    let radius = radiusStep;
    radius <= searchRadius;
    radius += radiusStep
  ) {
    for (
      let i = 0;
      i < angleSteps;
      i++
    ) {
      const angle =
        (Math.PI * 2 * i) /
        angleSteps;

      const candidateX =
        desiredX +
        Math.cos(angle) *
          radius;

      const candidateY =
        desiredY +
        Math.sin(angle) *
          radius;


      if (
        isItemLandingPositionFree(
          scene,
          candidateX,
          candidateY,
          worldObjects,
          roomLayers
        )
      ) {
        return {
          x: candidateX,
          y: candidateY,
        };
      }
    }
  }


  return null;
}