import Phaser from 'phaser';

export default class VirtualJoystick {
  constructor(scene, x, y) {
    this.scene = scene;
    this.baseX = x;
    this.baseY = y;
    this.radius = 60;
    this.thumbRadius = 30;

    // Input values
    this.inputX = 0;
    this.inputY = 0;

    // Create joystick graphics
    this.createJoystick();

    // Setup touch/pointer events
    this.setupInput();
  }

  createJoystick() {
    // Base circle
    this.base = this.scene.add.circle(this.baseX, this.baseY, this.radius, 0x333333, 0.5);
    this.base.setStrokeStyle(2, 0xffffff, 0.8);
    this.base.setDepth(1000);
    this.base.setScrollFactor(0);

    // Thumb circle
    this.thumb = this.scene.add.circle(this.baseX, this.baseY, this.thumbRadius, 0x666666, 0.8);
    this.thumb.setStrokeStyle(2, 0xffffff, 1);
    this.thumb.setDepth(1001);
    this.thumb.setScrollFactor(0);

    // Initially hidden until touch
    this.setVisible(true);
  }

  setupInput() {
    this.isPressed = false;

    // Make base interactive
    this.base.setInteractive();

    // Pointer down
    this.scene.input.on('pointerdown', (pointer) => {
      const distance = Phaser.Math.Distance.Between(
        pointer.x,
        pointer.y,
        this.baseX,
        this.baseY
      );

      if (distance <= this.radius) {
        this.isPressed = true;
        this.updateThumbPosition(pointer);
      }
    });

    // Pointer move
    this.scene.input.on('pointermove', (pointer) => {
      if (this.isPressed) {
        this.updateThumbPosition(pointer);
      }
    });

    // Pointer up
    this.scene.input.on('pointerup', () => {
      this.isPressed = false;
      this.resetThumb();
    });
  }

  updateThumbPosition(pointer) {
    // Calculate direction from base to pointer
    const dx = pointer.x - this.baseX;
    const dy = pointer.y - this.baseY;
    const distance = Math.sqrt(dx * dx + dy * dy);

    if (distance === 0) {
      this.inputX = 0;
      this.inputY = 0;
      this.thumb.setPosition(this.baseX, this.baseY);
      return;
    }

    // Clamp to radius
    const clampedDistance = Math.min(distance, this.radius - this.thumbRadius);

    // Calculate normalized input (-1 to 1)
    this.inputX = dx / distance;
    this.inputY = dy / distance;

    // Calculate thumb position
    const thumbX = this.baseX + (dx / distance) * clampedDistance;
    const thumbY = this.baseY + (dy / distance) * clampedDistance;

    this.thumb.setPosition(thumbX, thumbY);
  }

  resetThumb() {
    this.thumb.setPosition(this.baseX, this.baseY);
    this.inputX = 0;
    this.inputY = 0;
  }

  getInput() {
    return {
      x: this.inputX,
      y: this.inputY
    };
  }

  setVisible(visible) {
    this.base.setVisible(visible);
    this.thumb.setVisible(visible);
  }

  destroy() {
    this.base.destroy();
    this.thumb.destroy();
  }
}
