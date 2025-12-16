import Phaser from 'phaser';
import Hero from '../entities/Hero';
import DonutSpawner from '../managers/DonutSpawner';
import VirtualJoystick from '../ui/VirtualJoystick';

export default class GameScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Initialize game state
    this.score = 0;
    this.gameOver = false;
    this.startTime = this.time.now;

    // Create hero at center
    this.hero = new Hero(this, width / 2, height / 2);
    this.hero.setupKeyboardControls();

    // Create donut spawner
    this.donutSpawner = new DonutSpawner(this, width, height);
    this.donutSpawner.setTarget(this.hero.getSprite());

    // Setup collision detection
    this.setupCollisions();

    // Create UI
    this.createUI();

    // Setup virtual joystick for mobile
    const isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    if (isMobile || this.sys.game.device.input.touch) {
      this.joystick = new VirtualJoystick(this, 100, height - 100);
    }

    // Setup world bounds
    this.physics.world.setBounds(0, 0, width, height);
  }

  createUI() {
    const width = this.cameras.main.width;

    // Score text
    this.scoreText = this.add.text(16, 16, 'Score: 0', {
      font: 'bold 24px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    });
    this.scoreText.setScrollFactor(0);
    this.scoreText.setDepth(1000);

    // Time survived text
    this.timeText = this.add.text(16, 50, 'Time: 0s', {
      font: '18px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 3
    });
    this.timeText.setScrollFactor(0);
    this.timeText.setDepth(1000);

    // Best score
    const bestScore = localStorage.getItem('bestScore') || 0;
    this.bestScoreText = this.add.text(width - 16, 16, `Best: ${bestScore}`, {
      font: '18px Arial',
      fill: '#ffff00',
      stroke: '#000000',
      strokeThickness: 3
    });
    this.bestScoreText.setOrigin(1, 0);
    this.bestScoreText.setScrollFactor(0);
    this.bestScoreText.setDepth(1000);
  }

  setupCollisions() {
    // We'll check collisions manually in update for better control
    this.collisionGroup = this.physics.add.group();
  }

  update(time, delta) {
    if (this.gameOver) return;

    // Update hero
    if (this.joystick) {
      const input = this.joystick.getInput();
      this.hero.setJoystickInput(input.x, input.y);
    }
    this.hero.update();

    // Update donut spawner
    this.donutSpawner.update(time);

    // Update score based on time survived
    const timeAlive = Math.floor((time - this.startTime) / 1000);
    this.score = timeAlive * 10;
    this.scoreText.setText(`Score: ${this.score}`);
    this.timeText.setText(`Time: ${timeAlive}s`);

    // Check collisions with donuts
    const heroSprite = this.hero.getSprite();
    const donuts = this.donutSpawner.getDonuts();

    for (let donut of donuts) {
      const donutSprite = donut.getSprite();
      if (this.physics.overlap(heroSprite, donutSprite)) {
        this.handleGameOver();
        break;
      }

      // Optional: near miss bonus (if donut gets close but doesn't hit)
      const distance = Phaser.Math.Distance.Between(
        heroSprite.x,
        heroSprite.y,
        donutSprite.x,
        donutSprite.y
      );

      // Award small bonus for very close calls
      if (distance < 50 && distance > 40) {
        if (!donutSprite.getData('nearMissAwarded')) {
          this.score += 5;
          donutSprite.setData('nearMissAwarded', true);
          // Visual feedback
          this.showNearMissText(heroSprite.x, heroSprite.y);
        }
      }
    }
  }

  showNearMissText(x, y) {
    const text = this.add.text(x, y - 30, '+5', {
      font: 'bold 16px Arial',
      fill: '#00ff00'
    });
    text.setOrigin(0.5);

    this.tweens.add({
      targets: text,
      y: y - 60,
      alpha: 0,
      duration: 1000,
      onComplete: () => text.destroy()
    });
  }

  handleGameOver() {
    if (this.gameOver) return;

    this.gameOver = true;

    // Screen shake effect
    this.cameras.main.shake(500, 0.01);

    // Flash effect
    this.cameras.main.flash(500, 255, 0, 0);

    // Stop hero movement
    this.hero.getSprite().setVelocity(0, 0);

    // Update best score
    const bestScore = parseInt(localStorage.getItem('bestScore') || 0);
    if (this.score > bestScore) {
      localStorage.setItem('bestScore', this.score);
    }

    // Transition to game over scene after a short delay
    this.time.delayedCall(1000, () => {
      this.cleanup();
      this.scene.start('GameOverScene', { score: this.score });
    });
  }

  cleanup() {
    // Clean up spawner
    if (this.donutSpawner) {
      this.donutSpawner.destroy();
    }

    // Clean up joystick
    if (this.joystick) {
      this.joystick.destroy();
    }

    // Clean up hero
    if (this.hero) {
      this.hero.destroy();
    }
  }

  shutdown() {
    this.cleanup();
  }
}
