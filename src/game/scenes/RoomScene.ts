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
import { createFurniture } from "../world/createFurniture";
import { createTileSprite } from "../world/createTileSprite";


//player-animations-config
import { createPlayerAnimations } from "../player/playerAnimations";

import {
  updatePlayerMovement,
  type Facing,
} from "../player/playerMovement";

export class RoomScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private facing: Facing = "front";

  private cursors!: Phaser.Types.Input.Keyboard.CursorKeys;

  private wasd!: {
    W: Phaser.Input.Keyboard.Key;
    A: Phaser.Input.Keyboard.Key;
    S: Phaser.Input.Keyboard.Key;
    D: Phaser.Input.Keyboard.Key;
  };

  constructor() {
    super("RoomScene");
  }

  preload() {

  loadHubAssets(this);
  loadPlayerAssets(this);

  }

  create() {

    const furnitureConfigs = [
      {
        texture: "table",
        x: 530,
        y: 150,
        bodyWidth: 72,
        bodyHeight: 25,
        offsetX: 4,
        offsetY: 20,
        depthOffset: 2,
      },
      {
        texture: "bookshelf-narrow",
        x: 460,
        y: 60,
        bodyWidth: 40,
        bodyHeight: 30,
        offsetX: 6,
        offsetY: 62,
        depthOffset: 30,
      },
      {
        texture: "chair",
        x: 517,
        y: 125,
        bodyWidth: 10,
        bodyHeight: 10,
        offsetX: 16,
        offsetY: 18,
        depthOffset: 1,
      },
      {
        texture: "chair",
        x: 541,
        y: 125,
        bodyWidth: 10,
        bodyHeight: 10,
        offsetX: 16,
        offsetY: 18,
        depthOffset: 1,
      },
    ];

    for (const config of hubTiles) {
      createTileSprite(this, config);
    }

    const wallCollider = this.add.rectangle(
      ROOM_WIDTH / 2,
      90,
      ROOM_WIDTH,
      12
    );

    this.physics.add.existing(wallCollider, true);

    const noticeboard = this.add.image(
      538,
      38,
      "noticeboard"
    );

    noticeboard.setDepth(10);

    this.player = this.physics.add.sprite(600, 500, "player-front");

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    this.player.setDepth(playerBody.bottom);

    playerBody.setSize(16, 8);
    playerBody.setOffset(9, 34);

    // Player innerhalb der Welt halten
    this.player.setCollideWorldBounds(true);
    // Weltgröße festlegen
    this.physics.world.setBounds(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

    this.cameras.main.setBounds(0, 0, ROOM_WIDTH, ROOM_HEIGHT);

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(1);
    this.cameras.main.startFollow(this.player, true);

    // Furniture

    this.physics.add.collider(this.player, wallCollider);

    // Tastatursteuerung
    this.cursors = this.input.keyboard!.createCursorKeys();

    this.wasd = this.input.keyboard!.addKeys({
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

    for (const config of furnitureConfigs) {
      createFurniture(
        this,
        this.player,
        config
      );
    }
    
    createPlayerAnimations(this);
  }

  update() {

    this.facing = updatePlayerMovement(
      this.player,
      {
        cursors: this.cursors,
        wasd: this.wasd,
      },
      this.facing,
      PLAYER_SPEED
    );

    const playerBody =
      this.player.body as Phaser.Physics.Arcade.Body;

    this.player.setDepth(playerBody.bottom);
  }
}