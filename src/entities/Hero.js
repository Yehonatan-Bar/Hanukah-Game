import Phaser from 'phaser';

export default class Hero {
  constructor(scene, x, y) {
    this.scene = scene;
    this.groundY = y;

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

    // Create sprite with physics
    this.sprite = scene.physics.add.sprite(x, y, 'hero');
    this.sprite.setSize(20, 40); // Rectangle hitbox for person
    this.sprite.setOffset(10, 5);
    this.sprite.setGravityY(0); // Hero uses world gravity

    // Jumping properties
    this.jumpVelocity = -450;
    this.isJumping = false;
    this.isOnGround = true;

    // Setup controls
    this.setupControls();
  }

  setupControls() {
    // Spacebar for jump
    this.spaceKey = this.scene.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE);

    // Click/tap for jump
    this.scene.input.on('pointerdown', () => {
      this.jump();
    });
  }

  jump() {
    // Only jump if on ground
    if (this.isOnGround && !this.isJumping) {
      this.sprite.setVelocityY(this.jumpVelocity);
      this.isJumping = true;
      this.isOnGround = false;
    }
  }

  update() {
    // Check if spacebar is pressed
    if (Phaser.Input.Keyboard.JustDown(this.spaceKey)) {
      this.jump();
    }

    // Check if hero has landed
    if (this.sprite.y >= this.groundY && this.sprite.body.velocity.y >= 0) {
      this.sprite.y = this.groundY;
      this.sprite.setVelocityY(0);
      this.isJumping = false;
      this.isOnGround = true;
    }

    // Slight rotation when jumping (optional visual effect)
    if (this.isJumping) {
      // Tilt slightly forward when jumping
      this.sprite.angle = Phaser.Math.Clamp(this.sprite.body.velocity.y * 0.02, -15, 15);
    } else {
      // Return to upright when on ground
      this.sprite.angle = 0;
    }
  }

  getSprite() {
    return this.sprite;
  }

  isGrounded() {
    return this.isOnGround;
  }

  destroy() {
    this.sprite.destroy();
  }
}
