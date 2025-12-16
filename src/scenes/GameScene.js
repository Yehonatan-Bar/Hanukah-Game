import Phaser from 'phaser';
import Hero from '../entities/Hero';
import ObstacleManager from '../managers/ObstacleManager';
import ScrollingBackground from '../managers/ScrollingBackground';

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
    this.difficultyTimer = 0;

    // Create scrolling background
    this.scrollingBackground = new ScrollingBackground(this, width, height);

    // Create hero on the left side of screen at ground level
    const heroX = 150;
    const groundY = height - 80;
    this.hero = new Hero(this, heroX, groundY);

    // Create obstacle manager
    this.obstacleManager = new ObstacleManager(this, width, height);

    // Setup collision detection
    this.setupCollisions();

    // Create UI
    this.createUI();
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

    // Update background scrolling
    this.scrollingBackground.update();

    // Update hero
    this.hero.update();

    // Update obstacle manager
    this.obstacleManager.update(time);

    // Update difficulty (increase speed over time)
    this.difficultyTimer += delta;
    if (this.difficultyTimer > 10000) { // Every 10 seconds
      this.difficultyTimer = 0;
      this.obstacleManager.increaseSpeed(0.2);
      this.scrollingBackground.setScrollSpeed(this.scrollingBackground.scrollSpeed + 0.2);
    }

    // Update time display
    const timeAlive = Math.floor((time - this.startTime) / 1000);
    this.timeText.setText(`Time: ${timeAlive}s`);

    // Check collisions with obstacles
    const heroSprite = this.hero.getSprite();
    const obstacles = this.obstacleManager.getObstacles();

    for (let obstacle of obstacles) {
      const obstacleSprite = obstacle.getSprite();

      // Check if hero passed the obstacle (award points)
      if (obstacle.hasPassed(heroSprite.x)) {
        this.score += 10;
        this.scoreText.setText(`Score: ${this.score}`);
        this.showScoreText(obstacleSprite.x, obstacleSprite.y);
      }

      // Check collision
      if (this.physics.overlap(heroSprite, obstacleSprite)) {
        this.handleGameOver();
        break;
      }
    }
  }

  showScoreText(x, y) {
    const text = this.add.text(x, y - 30, '+10', {
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
    // Clean up obstacle manager
    if (this.obstacleManager) {
      this.obstacleManager.destroy();
    }

    // Clean up scrolling background
    if (this.scrollingBackground) {
      this.scrollingBackground.destroy();
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
