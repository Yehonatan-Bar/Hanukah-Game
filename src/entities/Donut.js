import Phaser from 'phaser';

export default class Donut {
  constructor(scene, x, y, speed) {
    this.scene = scene;
    this.speed = speed;

    // Create donut sprite using graphics (if not already created)
    if (!scene.textures.exists('donut')) {
      const graphics = scene.add.graphics();

      // Outer circle (donut body)
      graphics.fillStyle(0xd2691e, 1); // Chocolate brown
      graphics.fillCircle(0, 0, 18);

      // Inner circle (hole)
      graphics.fillStyle(0x2d4a7c, 1); // Match background color
      graphics.fillCircle(0, 0, 8);

      // Add some sprinkles for visual appeal
      graphics.fillStyle(0xff69b4, 1); // Pink
      graphics.fillCircle(-8, -5, 2);
      graphics.fillCircle(7, -6, 2);
      graphics.fillStyle(0xffff00, 1); // Yellow
      graphics.fillCircle(-5, 8, 2);
      graphics.fillCircle(9, 3, 2);
      graphics.fillStyle(0x00ff00, 1); // Green
      graphics.fillCircle(0, -10, 2);
      graphics.fillCircle(-10, 2, 2);

      graphics.generateTexture('donut', 36, 36);
      graphics.destroy();
    }

    // Create sprite
    this.sprite = scene.physics.add.sprite(x, y, 'donut');
    this.sprite.setCircle(18); // Circular hitbox
    this.target = null;
  }

  setTarget(target) {
    this.target = target;
  }

  update() {
    if (!this.target || !this.sprite.active) return;

    // Simple steering behavior to chase the target
    const dx = this.target.x - this.sprite.x;
    const dy = this.target.y - this.sprite.y;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance > 0) {
      // Normalize and apply speed
      const velocityX = (dx / distance) * this.speed;
      const velocityY = (dy / distance) * this.speed;

      this.sprite.setVelocity(velocityX, velocityY);

      // Rotate donut slightly while moving for visual effect
      this.sprite.rotation += 0.02;
    }
  }

  getSprite() {
    return this.sprite;
  }

  destroy() {
    if (this.sprite) {
      this.sprite.destroy();
    }
  }
}
