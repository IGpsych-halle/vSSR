import Phaser from "phaser";
import floorWood from "../../assets/tilesets/vSSR_holzdielen.png"
import tableSprite from "../../assets/furniture/table.png";
import wallTop from "../../assets/tilesets/vSSR_wand_oben.png";

import playerFront from "../../assets/avatar/avatar_base_front.png";
import playerBack from "../../assets/avatar/avatar_base_back.png";
import playerLeft from "../../assets/avatar/avatar_base_left.png";
import playerRight from "../../assets/avatar/avatar_base_right.png";

import playerFrontWalk from "../../assets/avatar/avatar_base_walk_front.png";



export class RoomScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private table!: Phaser.Physics.Arcade.Image;

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
  this.load.image("floor", floorWood);
  this.load.image("table", tableSprite);
  this.load.image("wall-top", wallTop);

  this.load.image("player-front", playerFront);
  this.load.image("player-back", playerBack);
  this.load.image("player-left", playerLeft);
  this.load.image("player-right", playerRight);

  this.load.spritesheet(
    "player-front-walk",
    playerFrontWalk,
    {
      frameWidth: 81,
      frameHeight: 107,
    }
  );
  }

  create() {
    
    const floor =this.add.tileSprite(
        1200,
        800,
        2400,
        1600,
        "floor"
    );

    floor.setDepth(0);

    const wall = this.add.tileSprite(
      1200, // Mitte der 2400px breiten Welt
      120,  // Mitte der 300px hohen Wand
      2400,
      254,
      "wall-top"
    );

    wall.setDepth(5);

    const wallCollider = this.add.rectangle(
      1200,
      230,
      2400,
      30
    );

    this.physics.add.existing(wallCollider, true);

    this.add.text(40, 40, "vSSR Room", {
      fontSize: "32px",
      color: "#ffffff",
    });

    // Temporäre Player-Textur erzeugen
    const playerGraphics = this.make.graphics({ x: 0, y: 0 });

    playerGraphics.fillStyle(0xffffff);
    playerGraphics.fillRect(0, 0, 32, 48);
    playerGraphics.generateTexture("player", 32, 48);
    playerGraphics.destroy();

    // Temporäre Tisch-Textur erzeugen
    const tableGraphics = this.make.graphics({ x: 0, y: 0 });

    tableGraphics.fillStyle(0x8b5a2b);
    tableGraphics.fillRect(0, 0, 160, 80);
    tableGraphics.generateTexture("table", 160, 80);
    tableGraphics.destroy();

    this.player = this.physics.add.sprite(1200, 1000, "player-front");
    this.player.setDepth(30);

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    playerBody.setSize(40, 40);
    playerBody.setOffset(20, 65);

    // Weltgröße festlegen
    this.physics.world.setBounds(0, 0, 2400, 1600);

    // Player innerhalb der Welt halten
    this.player.setCollideWorldBounds(true);

    this.cameras.main.setBounds(0, 0, 2400, 1600);

    this.cameras.main.setRoundPixels(true);
    this.cameras.main.setZoom(1);

    // Test-Tisch
    this.table = this.physics.add.staticImage(1200, 800, "table");

    const tableBody = this.table.body as Phaser.Physics.Arcade.StaticBody;

    tableBody.setSize(240, 70);
    tableBody.setOffset(80, 95);

    this.table.setDepth(this.table.y);

    // Kollision Player
    this.physics.add.collider(this.player, this.table);
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
    
    this.anims.create({
      key: "walk-front",
      frames: this.anims.generateFrameNumbers("player-front-walk", {
        frames: [1, 2, 3, 0],
      }),
      frameRate: 6.67,
      repeat: -1,
    });
  }

  update() {
    const speed = 180;

    const direction = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      this.player.setTexture("player-left");
      direction.x = -1;
    }

    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      this.player.setTexture("player-right");
      direction.x = 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      this.player.setTexture("player-back");
      direction.y = -1;
    }

    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      direction.y = 1;
    }

    if (direction.y > 0) {
      this.player.play("walk-front", true);
    }

    if (direction.length() > 0) {
      direction.normalize();
      direction.scale(speed);

      this.player.setVelocity(direction.x, direction.y);
    } else {
      this.player.setVelocity(0, 0);

      this.player.stop();

      // Wenn die Front-Animation aktiv war:
      if (this.player.texture.key === "player-front-walk") {
        this.player.setFrame(0);
      }
    }

    const camera = this.cameras.main;

    camera.scrollX = Math.round(
    this.player.x - camera.width / 2
    );

    camera.scrollY = Math.round(
    this.player.y - camera.height / 2
    );

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;
    const playerFeetY = playerBody.bottom;

    const depthLineY = this.table.y;

    if (playerFeetY < depthLineY) {
      this.player.setDepth(this.table.depth - 1);
    } else {
      this.player.setDepth(this.table.depth + 1);
    }
  }
}