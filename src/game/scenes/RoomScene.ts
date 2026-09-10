import Phaser from "phaser";
import floorWood from "../../assets/tilesets/vSSR_holzdielen.png"
import tableSprite from "../../assets/furniture/table.png";

export class RoomScene extends Phaser.Scene {
  private player!: Phaser.Physics.Arcade.Sprite;
  private table!: Phaser.Physics.Arcade.StaticImage;

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

    this.player = this.physics.add.sprite(1200, 1000, "player");
    this.player.setDepth(30);

    const playerBody = this.player.body as Phaser.Physics.Arcade.Body;

    playerBody.setSize(20, 18);
    playerBody.setOffset(6, 30);

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

    tableBody.setSize(170, 80);
    tableBody.setOffset(35, 50);

    this.table.setDepth(this.table.y);

    // Kollision Player ↔ Tisch
    this.physics.add.collider(this.player, this.table);

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
  }

  update() {
    const speed = 180;

    const direction = new Phaser.Math.Vector2(0, 0);

    if (this.cursors.left.isDown || this.wasd.A.isDown) {
      direction.x = -1;
    }

    if (this.cursors.right.isDown || this.wasd.D.isDown) {
      direction.x = 1;
    }

    if (this.cursors.up.isDown || this.wasd.W.isDown) {
      direction.y = -1;
    }

    if (this.cursors.down.isDown || this.wasd.S.isDown) {
      direction.y = 1;
    }

    if (direction.length() > 0) {
      direction.normalize();
      direction.scale(speed);

      this.player.setVelocity(direction.x, direction.y);
    } else {
      this.player.setVelocity(0, 0);
    }

    const camera = this.cameras.main;

    camera.scrollX = Math.round(
    this.player.x - camera.width / 2
    );

    camera.scrollY = Math.round(
    this.player.y - camera.height / 2
    );

    this.player.setDepth(this.player.y);
  }
}