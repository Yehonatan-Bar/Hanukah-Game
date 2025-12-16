import Phaser from 'phaser';

export default class MainMenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MainMenuScene' });
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Title
    const title = this.add.text(width / 2, height / 3, 'SUFGANIYOT CHASE', {
      font: 'bold 48px Arial',
      fill: '#ffd700',
      stroke: '#8b4513',
      strokeThickness: 6
    });
    title.setOrigin(0.5);

    // Subtitle
    const subtitle = this.add.text(width / 2, height / 3 + 60, 'Avoid the Donuts!', {
      font: '24px Arial',
      fill: '#ffffff'
    });
    subtitle.setOrigin(0.5);

    // Best score display
    const bestScore = localStorage.getItem('bestScore') || 0;
    const bestScoreText = this.add.text(width / 2, height / 2, `Best Score: ${bestScore}`, {
      font: '20px Arial',
      fill: '#ffff00'
    });
    bestScoreText.setOrigin(0.5);

    // Start button
    const startButton = this.add.text(width / 2, height / 2 + 80, 'START GAME', {
      font: 'bold 32px Arial',
      fill: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 20, y: 10 }
    });
    startButton.setOrigin(0.5);
    startButton.setInteractive({ useHandCursor: true });

    // Button hover effect
    startButton.on('pointerover', () => {
      startButton.setScale(1.1);
    });

    startButton.on('pointerout', () => {
      startButton.setScale(1);
    });

    // Start game on click/tap
    startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Controls instructions
    const isMobile = this.sys.game.device.os.android || this.sys.game.device.os.iOS;
    const controlText = isMobile
      ? 'Use on-screen joystick to move'
      : 'Use Arrow Keys or WASD to move';

    const controls = this.add.text(width / 2, height - 50, controlText, {
      font: '16px Arial',
      fill: '#cccccc'
    });
    controls.setOrigin(0.5);
  }
}
