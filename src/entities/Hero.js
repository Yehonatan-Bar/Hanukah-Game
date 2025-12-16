import Phaser from 'phaser';

export default class Hero {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create hero sprite - looks like a running person!
    const graphics = scene.add.graphics();

    // Body (torso) - blue shirt
    graphics.fillStyle(0x4169e1, 1); // Royal blue shirt
    graphics.fillRect(-8, 0, 16, 20);

    // Head - skin tone
    graphics.fillStyle(0xffdbac, 1); // Skin tone
    graphics.fillCircle(0, -8, 10);

    // Eyes - scared expression!
    graphics.fillStyle(0xffffff, 1); // White of eyes
    graphics.fillCircle(-4, -10, 3);
    graphics.fillCircle(4, -10, 3);
    graphics.fillStyle(0x000000, 1); // Pupils
    graphics.fillCircle(-3, -10, 2);
    graphics.fillCircle(5, -10, 2);

    // Mouth - scared "O" shape
    graphics.lineStyle(2, 0x000000, 1);
    graphics.strokeCircle(0, -3, 3);

    // Arms - waving in panic!
    graphics.fillStyle(0xffdbac, 1); // Skin tone for arms
    graphics.fillRect(-14, 5, 6, 12);  // Left arm
    graphics.fillRect(8, 5, 6, 12);    // Right arm

    // Legs - running
    graphics.fillStyle(0x2c5aa0, 1); // Dark blue pants
    graphics.fillRect(-8, 20, 7, 12);  // Left leg
    graphics.fillRect(1, 20, 7, 12);   // Right leg

    // Shoes
    graphics.fillStyle(0x000000, 1); // Black shoes
    graphics.fillRect(-8, 30, 8, 4);
    graphics.fillRect(1, 30, 8, 4);

    // Hair - brown messy hair
    graphics.fillStyle(0x4a2511, 1);
    graphics.fillCircle(-5, -15, 4);
    graphics.fillCircle(0, -17, 4);
    graphics.fillCircle(5, -15, 4);

    graphics.generateTexture('hero', 36, 48);
    graphics.destroy();

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'hero');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setCircle(15); // Circular hitbox for body

    // Movement properties
    this.speed = 250;
    this.cursors = null;
    this.wasd = null;
    this.joystickInput = { x: 0, y: 0 };
  }

  setupKeyboardControls() {
    // Arrow keys
    this.cursors = this.scene.input.keyboard.createCursorKeys();

    // WASD keys
    this.wasd = this.scene.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D
    });
  }

  setJoystickInput(x, y) {
    this.joystickInput.x = x;
    this.joystickInput.y = y;
  }

  update() {
    let velocityX = 0;
    let velocityY = 0;

    // Check keyboard input
    if (this.cursors || this.wasd) {
      if (this.cursors.left.isDown || this.wasd.left.isDown) {
        velocityX = -1;
      } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
        velocityX = 1;
      }

      if (this.cursors.up.isDown || this.wasd.up.isDown) {
        velocityY = -1;
      } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
        velocityY = 1;
      }
    }

    // Check joystick input (overrides keyboard if active)
    if (Math.abs(this.joystickInput.x) > 0.1 || Math.abs(this.joystickInput.y) > 0.1) {
      velocityX = this.joystickInput.x;
      velocityY = this.joystickInput.y;
    }

    // Normalize diagonal movement
    if (velocityX !== 0 && velocityY !== 0) {
      const length = Math.sqrt(velocityX * velocityX + velocityY * velocityY);
      velocityX /= length;
      velocityY /= length;
    }

    // Apply velocity
    this.sprite.setVelocity(velocityX * this.speed, velocityY * this.speed);
  }

  getSprite() {
    return this.sprite;
  }

  destroy() {
    this.sprite.destroy();
  }
}
