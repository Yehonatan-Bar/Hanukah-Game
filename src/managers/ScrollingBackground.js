import Phaser from 'phaser';

export default class ScrollingBackground {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;
    this.scrollSpeed = 2;

    this.layers = [];

    // Create multiple parallax layers
    this.createBackgroundLayers();
  }

  createBackgroundLayers() {
    // Layer 1: Far background (slowest) - Stars and distant elements
    const layer1 = this.createStarLayer();
    this.layers.push({ sprite: layer1, speed: this.scrollSpeed * 0.3 });

    // Layer 2: Mid background - Hanukkah decorations
    const layer2 = this.createDecorationLayer();
    this.layers.push({ sprite: layer2, speed: this.scrollSpeed * 0.6 });

    // Layer 3: Ground (fastest)
    const layer3 = this.createGroundLayer();
    this.layers.push({ sprite: layer3, speed: this.scrollSpeed });
  }

  createStarLayer() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x2d4a7c, 1); // Night sky blue
    graphics.fillRect(0, 0, this.width * 2, this.height);

    // Add stars of David and small stars
    graphics.fillStyle(0xffd700, 1); // Gold
    for (let i = 0; i < 15; i++) {
      const x = Math.random() * this.width * 2;
      const y = Math.random() * this.height * 0.6;
      const size = 2 + Math.random() * 3;
      graphics.fillStar(x, y, 6, size, size * 0.5);
    }

    graphics.generateTexture('starLayer', this.width * 2, this.height);
    graphics.destroy();

    const sprite = this.scene.add.tileSprite(0, 0, this.width, this.height, 'starLayer');
    sprite.setOrigin(0, 0);
    sprite.setDepth(-100);

    return sprite;
  }

  createDecorationLayer() {
    const graphics = this.scene.add.graphics();
    graphics.fillStyle(0x000000, 0); // Transparent
    graphics.fillRect(0, 0, this.width * 2, this.height);

    // Add menorahs and dreidels as decorations
    graphics.fillStyle(0x4169e1, 0.3); // Semi-transparent blue

    // Draw some simple menorah silhouettes
    for (let i = 0; i < 3; i++) {
      const x = (i + 1) * (this.width * 2 / 4);
      const y = this.height - 150;

      // Simple menorah shape
      graphics.fillRect(x - 2, y, 4, 40); // Center candle
      graphics.fillRect(x - 30, y + 20, 60, 3); // Base

      // Candles
      for (let j = -3; j <= 3; j++) {
        if (j !== 0) {
          graphics.fillRect(x + (j * 10) - 1, y + 10, 2, 15);
        }
      }
    }

    graphics.generateTexture('decorationLayer', this.width * 2, this.height);
    graphics.destroy();

    const sprite = this.scene.add.tileSprite(0, 0, this.width, this.height, 'decorationLayer');
    sprite.setOrigin(0, 0);
    sprite.setDepth(-50);

    return sprite;
  }

  createGroundLayer() {
    const graphics = this.scene.add.graphics();

    // Ground
    graphics.fillStyle(0x1a3a5c, 1); // Darker blue for ground
    graphics.fillRect(0, this.height - 50, this.width * 2, 50);

    // Ground pattern
    graphics.lineStyle(2, 0x4169e1, 0.5);
    for (let i = 0; i < this.width * 2; i += 40) {
      graphics.lineBetween(i, this.height - 50, i + 20, this.height);
    }

    graphics.generateTexture('groundLayer', this.width * 2, this.height);
    graphics.destroy();

    const sprite = this.scene.add.tileSprite(0, 0, this.width, this.height, 'groundLayer');
    sprite.setOrigin(0, 0);
    sprite.setDepth(-10);

    return sprite;
  }

  update() {
    // Scroll each layer at different speeds for parallax effect
    for (const layer of this.layers) {
      layer.sprite.tilePositionX += layer.speed;
    }
  }

  setScrollSpeed(speed) {
    this.scrollSpeed = speed;
    // Update layer speeds based on new scroll speed
    this.layers[0].speed = this.scrollSpeed * 0.3;
    this.layers[1].speed = this.scrollSpeed * 0.6;
    this.layers[2].speed = this.scrollSpeed;
  }

  destroy() {
    for (const layer of this.layers) {
      layer.sprite.destroy();
    }
    this.layers = [];
  }
}
