import Phaser from "phaser";

import type {
    ItemStack,
} from "../../../shared/items/itemState.js";

import {
    createWorldItem,
    type WorldItem,
} from "./createWorldItem";

import {
    animateWorldItemDrop,
} from "./animations/animateWorldItemDrop.js";

import type {
    worldObjectInstance,
} from "../world/createWorldObjects";

import type {
    RoomLayerInstance,
} from "../world/createRoomLayer";

import {
    findValidItemPosition,
} from "./placement/findValidItemPosition";


type DropWorldItemsOptions = {
    minDistance?: number;
    maxDistance?: number;
};


export function dropWorldItems(
    scene: Phaser.Scene,
    worldItems: WorldItem[],
    worldObjects: worldObjectInstance[],
    roomLayers: RoomLayerInstance[],
    sourceX: number,
    sourceY: number,
    stacks: ItemStack[],
    options: DropWorldItemsOptions = {}
) {
    const minDistance =
        options.minDistance ?? 35;

    const maxDistance =
        options.maxDistance ?? 60;


    const createdItems: WorldItem[] =
        [];


    for (
        let i = 0;
        i < stacks.length;
        i++
    ) {
        const stack =
            stacks[i];

        const baseAngle =
            (Math.PI * 2 * i) /
            stacks.length;

        const angleJitter =
            Phaser.Math.FloatBetween(
                -0.25,
                0.25
            );

        const angle =
            baseAngle +
            angleJitter;

        const distance =
            Phaser.Math.Between(
                minDistance,
                maxDistance
            );


        const desiredX =
            sourceX +
            Math.cos(angle) *
            distance;

        const desiredY =
            sourceY +
            Math.sin(angle) *
            distance;


        const landingPosition =
            findValidItemPosition(
                scene,
                desiredX,
                desiredY,
                worldObjects,
                roomLayers
            );


        if (!landingPosition) {
            continue;
        }


        const targetX =
            landingPosition.x;

        const targetY =
            landingPosition.y;


        const worldItem =
            createWorldItem(
                scene,
                stack,
                targetX,
                targetY
            );


        worldItems.push(
            worldItem
        );

        createdItems.push(
            worldItem
        );


        animateWorldItemDrop(
            scene,
            worldItem,
            sourceX,
            sourceY
        );
    }


    return createdItems;
}