import Phaser from 'phaser';

export default class Donut {
  constructor(scene, x, y, speed) {
    this.scene = scene;
    this.speed = speed;

    // Create donut sprite using graphics (if not already created)
    if (!scene.textures.exists('donut')) {
      const graphics = scene.add.graphics();

      // Outer circle (donut body) - BIGGER DONUTS!
      graphics.fillStyle(0xd2691e, 1); // Chocolate brown
      graphics.fillCircle(0, 0, 28);

      // Inner circle (hole)
      graphics.fillStyle(0x2d4a7c, 1); // Match background color
      graphics.fillCircle(0, 0, 12);

      // Add some sprinkles for visual appeal
      graphics.fillStyle(0xff69b4, 1); // Pink
      graphics.fillCircle(-12, -8, 3);
      graphics.fillCircle(10, -10, 3);
      graphics.fillStyle(0xffff00, 1); // Yellow
      graphics.fillCircle(-8, 12, 3);
      graphics.fillCircle(14, 5, 3);
      graphics.fillStyle(0x00ff00, 1); // Green
      graphics.fillCircle(0, -15, 3);
      graphics.fillCircle(-15, 3, 3);

      graphics.generateTexture('donut', 56, 56);
      graphics.destroy();
    }

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'donut');
    this.sprite.setCircle(28); // Circular hitbox
    this.sprite.setGravityY(-800); // Cancel world gravity for obstacles
    this.passed = false; // Track if hero has passed this obstacle
  }

  update() {
    if (!this.sprite.active) return;

    // Move left (scrolling)
    this.sprite.x -= this.speed;

    // Rotate donut while moving for visual effect
    this.sprite.rotation += 0.02;

    // Destroy if off screen
    if (this.sprite.x < -100) {
      this.destroy();
    }
  }

  getSprite() {
    return this.sprite;
  }

  hasPassed(heroX) {
    // Check if the obstacle has been passed by the hero
    if (!this.passed && this.sprite.x < heroX) {
      this.passed = true;
      return true;
    }
    return false;
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
