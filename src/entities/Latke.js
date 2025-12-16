import Phaser from 'phaser';

export default class Latke {
  constructor(scene, x, y, speed) {
    this.scene = scene;
    this.speed = speed;

    // Create latke sprite using graphics (if not already created)
    if (!scene.textures.exists('latke')) {
      const graphics = scene.add.graphics();

      // Latke body (flatter, oval-shaped potato pancake)
      graphics.fillStyle(0xb8860b, 1); // Dark golden color
      graphics.fillEllipse(0, 0, 60, 35);

      // Add texture - crispy edges
      graphics.lineStyle(2, 0x8b6914, 1);
      graphics.strokeEllipse(0, 0, 60, 35);

      // Add some brown spots for texture
      graphics.fillStyle(0x8b6914, 0.7);
      graphics.fillCircle(-15, -5, 4);
      graphics.fillCircle(10, 8, 5);
      graphics.fillCircle(-8, 7, 3);
      graphics.fillCircle(18, -7, 4);
      graphics.fillCircle(5, -10, 3);

      // More spots
      graphics.fillStyle(0x6b5014, 0.5);
      graphics.fillCircle(-20, 3, 3);
      graphics.fillCircle(15, 0, 4);
      graphics.fillCircle(-5, -8, 2);

      graphics.generateTexture('latke', 65, 40);
      graphics.destroy();
    }

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'latke');
    this.sprite.setSize(55, 30); // Hitbox slightly smaller than visual
    this.sprite.setGravityY(-800); // Cancel world gravity for obstacles
    this.passed = false; // Track if hero has passed this obstacle
  }

  update() {
    if (!this.sprite.active) return;

    // Move left (scrolling)
    this.sprite.x -= this.speed;

    // Slight rotation for visual effect
    this.sprite.rotation += 0.01;

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
