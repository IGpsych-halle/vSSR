import Phaser from "phaser";

import { loadHubAssets } from "../../assets/loadHubAssets";
import { loadPlayerAssets } from "../player/loadPlayerAssets";

//room-config
import {ROOM_WIDTH, ROOM_HEIGHT, PLAYER_SPEED} from "../config/roomConfig";
import { hubLayers } from "../config/hub-area/hubLayers";
import { hubWorldObjects } from "../config/hub-area/hubWorldObjects";
import { hubDecorations } from "../config/hub-area/hubDecorations";

//import creator-files
import {
  createWorldObject,
  type worldObjectInstance,
} from "../world/createWorldObjects";
import { createRoomLayer } from "../world/createRoomLayer";
import { createDecoration } from "../world/createDecoration";

//import interactions
import type {
  Interaction,
} from "../config/types-global/interactionTypes";
import { findNearbyInteraction } from "../interactions/findNearbyInteraction";
import { sitDown } from "../interactions/sitDown";
import { standUp } from "../interactions/standUp";


//imports for player
import { createPlayerAnimations } from "../player/playerAnimations";
import {
  createPlayerState,
  type PlayerState,
} from "../player/playerState";

import {
  updatePlayerMovement,
  type Facing,
} from "../player/playerMovement";

export class RoomScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private facing: Facing = "front";
  private playerState: PlayerState =
  createPlayerState();

  private interactKey!: Phaser.Input.Keyboard.Key;
  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  private worldObjects: worldObjectInstance[] = [];
  private interactions: Interaction[] = [];

  constructor() {
    super("RoomScene");
  }

  preload() {

  loadHubAssets(this);
  loadPlayerAssets(this);

  }

  create() {
    // 1. Create World and Player
    this.physics.world.setBounds(
      0,
      0,
      ROOM_WIDTH,
      ROOM_HEIGHT
    );

    this.player = this.physics.add.sprite(
      600,
      500,
      "player-front"
    );

    const playerBody =
      this.player.body as Phaser.Physics.Arcade.Body;

    playerBody.setSize(16, 8);
    playerBody.setOffset(9, 34);

    this.player.setDepth(
      playerBody.bottom + 0.5
    );

    this.player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(
      0,
      0,
      ROOM_WIDTH,
      ROOM_HEIGHT
    );

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(1);

    this.cameras.main.startFollow(
      this.player,
      true
    );


    for (const config of hubLayers) {
      createRoomLayer(this, this.player, config);
    }

    // 7. Create Input
    this.cursors =
      this.input.keyboard!.createCursorKeys();

    this.wasd =
      this.input.keyboard!.addKeys({
        W: Phaser.Input.Keyboard.KeyCodes.W,
        A: Phaser.Input.Keyboard.KeyCodes.A,
        S: Phaser.Input.Keyboard.KeyCodes.S,
        D: Phaser.Input.Keyboard.KeyCodes.D,
      }) as {
        W: Phaser.Input.Keyboard.Key;
        A: Phaser.Input.Keyboard.Key;
        S: Phaser.Input.Keyboard.Key;
        D: Phaser.Input.Keyboard.Key;
      };

    this.interactKey = this.input.keyboard!.addKey(
      Phaser.Input.Keyboard.KeyCodes.E
    );


    // 8. Create Animations
    createPlayerAnimations(this);

    // 9. Create worldObject

    for (const config of hubWorldObjects) {
      const worldObject = createWorldObject(
        this,
        this.player,
        config
      );

      this.worldObjects.push(
        worldObject
      );

      if (worldObject.interaction) {
        this.interactions.push(
          worldObject.interaction
        );
      }
    }

    for (const config of hubDecorations) {
      const decoration = createDecoration(
        this,
        config
      );

      if (decoration.interaction) {
        this.interactions.push(
          decoration.interaction
        );
      }
    }
  }

  update() {

     //Interactions in Room-Scene

    if (
      Phaser.Input.Keyboard.JustDown(
        this.interactKey
      )
    ) {
      if (this.playerState.isSitting) {
        standUp(
          this.player,
          this.playerState,
          this.facing
        );
      } else {
        const interaction = findNearbyInteraction(
          this.player.x,
          this.player.y,
          this.interactions
        );

        if (
          interaction?.type === "sit"
        ) {
          sitDown(
            this.player,
            this.playerState,
            interaction
          );
        }

        if (
          interaction?.type === "noticeboard"
        ) {
          console.log(
            "Noticeboard öffnen"
          );
        }
        if (
          interaction?.type === "container"
        ) {
          console.log(
            "Container öffnen:",
            interaction.containerId
          );
        }
      }
    }

    //Movement 

    if (!this.playerState.isSitting) {
      this.facing = updatePlayerMovement(
        this.player,
        {
          cursors: this.cursors,
          wasd: this.wasd,
        },
        this.facing,
        PLAYER_SPEED
      );
    }

    const playerBody =
      this.player.body as Phaser.Physics.Arcade.Body;

    if (!this.playerState.isSitting) {
      this.player.setDepth(
        playerBody.bottom + 0.5
      );
    }
 }
    
}