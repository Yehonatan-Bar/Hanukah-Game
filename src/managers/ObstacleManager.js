import Phaser from 'phaser';
import Donut from '../entities/Donut';
import Latke from '../entities/Latke';

export default class ObstacleManager {
  constructor(scene, width, height) {
    this.scene = scene;
    this.width = width;
    this.height = height;

    this.obstacles = [];
    this.obstacleSpeed = 3;
    this.spawnInterval = 2000; // milliseconds
    this.lastSpawnTime = 0;
    this.minSpawnDistance = 300;
    this.maxSpawnDistance = 500;

    // Ground level for obstacles
    this.groundY = height - 80;
  }

  update(time) {
    // Spawn new obstacles at intervals
    if (time - this.lastSpawnTime > this.spawnInterval) {
      this.spawnRandomObstacle();
      this.lastSpawnTime = time;

      // Vary the spawn interval slightly for randomness
      this.spawnInterval = Phaser.Math.Between(1500, 2500);
    }

    // Update all obstacles
    for (let i = this.obstacles.length - 1; i >= 0; i--) {
      const obstacle = this.obstacles[i];

      if (obstacle.getSprite().active) {
        obstacle.update();
      } else {
        // Remove destroyed obstacles from array
        this.obstacles.splice(i, 1);
      }
    }
  }

  spawnRandomObstacle() {
    const x = this.width + 50;

    // Randomly choose between donut and latke
    const obstacleType = Math.random() < 0.5 ? 'donut' : 'latke';

    let obstacle;
    if (obstacleType === 'donut') {
      // Donuts can be at different heights
      const heightVariation = Phaser.Math.Between(0, 50);
      obstacle = new Donut(this.scene, x, this.groundY - heightVariation, this.obstacleSpeed);
    } else {
      // Latkes are on the ground
      obstacle = new Latke(this.scene, x, this.groundY, this.obstacleSpeed);
    }

    this.obstacles.push(obstacle);
  }

  getObstacles() {
    return this.obstacles;
  }

  setSpeed(speed) {
    this.obstacleSpeed = speed;
  }

  increaseSpeed(amount) {
    this.obstacleSpeed += amount;
  }

  destroy() {
    for (const obstacle of this.obstacles) {
      obstacle.destroy();
    }
    this.obstacles = [];
  }
}
