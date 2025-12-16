import Phaser from 'phaser';

export default class Hero {
  constructor(scene, x, y) {
    this.scene = scene;

    // Create hero sprite using graphics
    const graphics = scene.add.graphics();
    graphics.fillStyle(0x4169e1, 1); // Royal blue
    graphics.fillCircle(0, 0, 20);
    graphics.generateTexture('hero', 40, 40);
    graphics.destroy();

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'hero');
    this.sprite.setCollideWorldBounds(true);
    this.sprite.setCircle(20); // Circular hitbox

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
