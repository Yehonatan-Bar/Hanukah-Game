import Phaser from 'phaser';

export default class Hero {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create hero sprite as a human figure
    const graphics = scene.add.graphics();

    // Head
    graphics.fillStyle(0xffdbac, 1); // Skin tone
    graphics.fillCircle(20, 8, 8);

    // Body
    graphics.fillStyle(0x4169e1, 1); // Blue shirt
    graphics.fillRoundedRect(14, 16, 12, 16, 2);

    // Arms
    graphics.fillStyle(0xffdbac, 1); // Skin tone
    graphics.fillRect(10, 18, 3, 10); // Left arm
    graphics.fillRect(27, 18, 3, 10); // Right arm

    // Legs
    graphics.fillStyle(0x2c3e50, 1); // Dark pants
    graphics.fillRect(15, 32, 4, 10); // Left leg
    graphics.fillRect(21, 32, 4, 10); // Right leg

    // Eyes
    graphics.fillStyle(0x000000, 1); // Black
    graphics.fillCircle(18, 7, 1.5);
    graphics.fillCircle(22, 7, 1.5);

    // Smile
    graphics.lineStyle(1.5, 0x000000);
    graphics.beginPath();
    graphics.arc(20, 8, 4, 0.2, Math.PI - 0.2);
    graphics.strokePath();

    graphics.generateTexture('hero', 40, 50);
    graphics.destroy();

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'hero');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setSize(20, 40); // Rectangle hitbox for person
    this.sprite.setOffset(10, 5);

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
