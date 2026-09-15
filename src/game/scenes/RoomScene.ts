import Phaser from "phaser";

import { loadHubAssets } from "../../assets/loadHubAssets";
import { loadPlayerAssets } from "../player/loadPlayerAssets";

//room-config
import {
  ROOM_WIDTH,
  ROOM_HEIGHT,
  PLAYER_SPEED,
} from "../config/roomConfig";

import { hubTiles } from "../config/hubTiles";

//import creator-files
import {
  createFurniture,
  type FurniturePlacement,
  type FurnitureInstance,
  type Seat,
} from "../world/createFurniture";
import { createTileSprite } from "../world/createTileSprite";

//import interactions
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

  private furniture: FurnitureInstance[] = [];
  private seats: Seat[] = [];

  //Debug-Variables
  private sortYDebugText!: Phaser.GameObjects.Text;

  constructor() {
    super("RoomScene");
  }

  preload() {

  loadHubAssets(this);
  loadPlayerAssets(this);

  }

  create() {
    // 1. Welt / Physics zuerst initialisieren
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


    // 2. Tiles / Hintergrund
    for (const config of hubTiles) {
      createTileSprite(this, config);
    }


    // 3. Wall Collider
    const wallCollider = this.add.rectangle(
      ROOM_WIDTH / 2,
      90,
      ROOM_WIDTH,
      12
    );

    this.physics.add.existing(
      wallCollider,
      true
    );


    // 4. Noticeboard
    const noticeboard = this.add.image(
      538,
      38,
      "noticeboard"
    );

    noticeboard.setDepth(10);

    // 7. Input
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


    // 8. Animationen
    createPlayerAnimations(this);


    // 9. Furniture
    const furnitureConfigs: FurniturePlacement[] = [
      {
        type: "table",
        x: 530,
        y: 150,
        order: 50,
      },
      {
        type: "bookshelfNarrow",
        x: 450,
        y: 80,
      },
      {
        type: "chair",
        x: 500,
        y: 300,
        order: 20,
        facing: "front",
      },
      {
        type: "chair",
        x: 650,
        y: 170,
        order: 70,
        facing: "back",
      },
      {
        type: "chair",
        x: 450,
        y: 470,
        facing: "front",
      },
      {
        type: "chair",
        x: 500,
        y: 470,
        facing: "back",
      },
      {
        type: "chair",
        x: 550,
        y: 470,
        facing: "left",
      },
      {
        type: "chair",
        x: 600,
        y: 470,
        facing: "right",
      },
    ];

    for (const config of furnitureConfigs) {
      const furniture = createFurniture(
        this,
        this.player,
        config
      );

      this.furniture.push(furniture);

      if (furniture.seat) {
        this.seats.push(furniture.seat);
      }
    }


    // 10. Debug UI zuletzt
    this.sortYDebugText = this.add.text(
      10,
      10,
      "",
      {
        fontSize: "12px",
        color: "#ffffff",
        backgroundColor: "#000000",
        padding: {
          x: 4,
          y: 2,
        },
      }
    );

    this.sortYDebugText
      .setScrollFactor(0)
      .setDepth(999999);
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
        const seat = findNearbyInteraction(
          this.player.x,
          this.player.y,
          this.seats
        );

        if (seat) {
          sitDown(
            this.player,
            this.playerState,
            seat
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

    this.sortYDebugText.setText(
      `Player sortY: ${Math.round(playerBody.bottom)}`
    );
 }
    
}