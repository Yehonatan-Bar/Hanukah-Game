import Phaser from 'phaser';
import Donut from '../entities/Donut';

export default class DonutSpawner {
  constructor(scene, arenaWidth, arenaHeight) {
    this.scene = scene;
    this.arenaWidth = arenaWidth;
    this.arenaHeight = arenaHeight;
    this.donuts = [];
    this.target = null;

    // Difficulty settings
    this.baseSpawnInterval = 2000; // milliseconds
    this.currentSpawnInterval = this.baseSpawnInterval;
    this.minSpawnInterval = 500; // Don't spawn faster than this
    this.baseSpeed = 80;
    this.currentSpeed = this.baseSpeed;
    this.maxSpeed = 200;
    this.speedVariance = 20; // Random variance in speed

    // Difficulty scaling
    this.difficultyIncreaseInterval = 5000; // Increase difficulty every 5 seconds
    this.lastDifficultyIncrease = 0;

    // Spawn timer
    this.spawnTimer = null;
    this.setupSpawnTimer();
  }

  setTarget(target) {
    this.target = target;
  }

  setupSpawnTimer() {
    if (this.spawnTimer) {
      this.spawnTimer.destroy();
    }

    this.spawnTimer = this.scene.time.addEvent({
      delay: this.currentSpawnInterval,
      callback: this.spawnDonut,
      callbackScope: this,
      loop: true
    });
  }

  spawnDonut() {
    if (!this.target) return;

    // Choose a random edge of the arena
    const edge = Phaser.Math.Between(0, 3); // 0: top, 1: right, 2: bottom, 3: left
    let x, y;

    switch (edge) {
      case 0: // Top
        x = Phaser.Math.Between(0, this.arenaWidth);
        y = 0;
        break;
      case 1: // Right
        x = this.arenaWidth;
        y = Phaser.Math.Between(0, this.arenaHeight);
        break;
      case 2: // Bottom
        x = Phaser.Math.Between(0, this.arenaWidth);
        y = this.arenaHeight;
        break;
      case 3: // Left
        x = 0;
        y = Phaser.Math.Between(0, this.arenaHeight);
        break;
    }

    // Add speed variance for variety
    const speed = this.currentSpeed + Phaser.Math.Between(-this.speedVariance, this.speedVariance);

    // Create donut
    const donut = new Donut(this.scene, x, y, speed);
    donut.setTarget(this.target);
    this.donuts.push(donut);
  }

  update(time) {
    // Update all donuts
    this.donuts.forEach(donut => donut.update());

    // Remove destroyed donuts
    this.donuts = this.donuts.filter(donut => donut.getSprite().active);

    // Increase difficulty over time
    if (time - this.lastDifficultyIncrease > this.difficultyIncreaseInterval) {
      this.increaseDifficulty();
      this.lastDifficultyIncrease = time;
    }
  }

  increaseDifficulty() {
    // Decrease spawn interval (spawn more frequently)
    if (this.currentSpawnInterval > this.minSpawnInterval) {
      this.currentSpawnInterval = Math.max(
        this.minSpawnInterval,
        this.currentSpawnInterval - 100
      );
      this.setupSpawnTimer();
    }

    // Increase speed
    if (this.currentSpeed < this.maxSpeed) {
      this.currentSpeed = Math.min(this.maxSpeed, this.currentSpeed + 5);
    }
  }

  getDonuts() {
    return this.donuts;
  }

  getDonutSprites() {
    return this.donuts.map(donut => donut.getSprite());
  }

  destroy() {
    if (this.spawnTimer) {
      this.spawnTimer.destroy();
    }
    this.donuts.forEach(donut => donut.destroy());
    this.donuts = [];
  }
}
