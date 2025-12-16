import Phaser from 'phaser';

export default class GameOverScene extends Phaser.Scene {
  constructor() {
    super({ key: 'GameOverScene' });
  }

  init(data) {
    this.finalScore = data.score || 0;
  }

  create() {
    const width = this.cameras.main.width;
    const height = this.cameras.main.height;

    // Semi-transparent overlay
    const overlay = this.add.rectangle(0, 0, width, height, 0x000000, 0.7);
    overlay.setOrigin(0, 0);

    // Game Over title
    const gameOverText = this.add.text(width / 2, height / 3 - 40, 'GAME OVER!', {
      font: 'bold 56px Arial',
      fill: '#ff0000',
      stroke: '#000000',
      strokeThickness: 8
    });
    gameOverText.setOrigin(0.5);

    // Funny message
    const funnyMessage = this.add.text(width / 2, height / 3 + 30, 'פופוטם! השמנת ב5 קילו!', {
      font: 'bold 32px Arial',
      fill: '#ff6b00',
      stroke: '#000000',
      strokeThickness: 4
    });
    funnyMessage.setOrigin(0.5);

    const cryMessage = this.add.text(width / 2, height / 3 + 70, 'תבכי, כל דמעה זה גרם!', {
      font: 'bold 28px Arial',
      fill: '#ffaa00',
      stroke: '#000000',
      strokeThickness: 3
    });
    cryMessage.setOrigin(0.5);

    // Animate title
    this.tweens.add({
      targets: gameOverText,
      scale: { from: 0.5, to: 1 },
      duration: 500,
      ease: 'Bounce.easeOut'
    });

    // Animate funny messages
    this.tweens.add({
      targets: [funnyMessage, cryMessage],
      alpha: { from: 0, to: 1 },
      y: { from: '+=20', to: '-=20' },
      duration: 800,
      delay: 300,
      ease: 'Back.easeOut'
    });

    // Final score
    const scoreText = this.add.text(width / 2, height / 2 - 40, `Your Score: ${this.finalScore}`, {
      font: 'bold 32px Arial',
      fill: '#ffffff',
      stroke: '#000000',
      strokeThickness: 4
    });
    scoreText.setOrigin(0.5);

    // Best score
    const bestScore = localStorage.getItem('bestScore') || 0;
    const bestScoreText = this.add.text(width / 2, height / 2 + 10, `Best Score: ${bestScore}`, {
      font: 'bold 28px Arial',
      fill: '#ffff00',
      stroke: '#000000',
      strokeThickness: 4
    });
    bestScoreText.setOrigin(0.5);

    // New high score message
    if (this.finalScore >= bestScore && this.finalScore > 0) {
      const newHighScore = this.add.text(width / 2, height / 2 + 50, '🎉 NEW HIGH SCORE! 🎉', {
        font: 'bold 24px Arial',
        fill: '#00ff00',
        stroke: '#000000',
        strokeThickness: 3
      });
      newHighScore.setOrigin(0.5);

      // Pulsing animation
      this.tweens.add({
        targets: newHighScore,
        scale: { from: 1, to: 1.2 },
        duration: 500,
        yoyo: true,
        repeat: -1
      });
    }

    // Restart button
    const restartButton = this.add.text(width / 2, height / 2 + 120, 'RESTART', {
      font: 'bold 36px Arial',
      fill: '#ffffff',
      backgroundColor: '#4CAF50',
      padding: { x: 30, y: 15 }
    });
    restartButton.setOrigin(0.5);
    restartButton.setInteractive({ useHandCursor: true });

    // Button hover effect
    restartButton.on('pointerover', () => {
      restartButton.setScale(1.1);
      restartButton.setStyle({ backgroundColor: '#45a049' });
    });

    restartButton.on('pointerout', () => {
      restartButton.setScale(1);
      restartButton.setStyle({ backgroundColor: '#4CAF50' });
    });

    // Restart game
    restartButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    // Main menu button
    const menuButton = this.add.text(width / 2, height / 2 + 190, 'Main Menu', {
      font: 'bold 24px Arial',
      fill: '#ffffff',
      backgroundColor: '#2196F3',
      padding: { x: 20, y: 10 }
    });
    menuButton.setOrigin(0.5);
    menuButton.setInteractive({ useHandCursor: true });

    // Button hover effect
    menuButton.on('pointerover', () => {
      menuButton.setScale(1.1);
      menuButton.setStyle({ backgroundColor: '#1976D2' });
    });

    menuButton.on('pointerout', () => {
      menuButton.setScale(1);
      menuButton.setStyle({ backgroundColor: '#2196F3' });
    });

    // Go to main menu
    menuButton.on('pointerdown', () => {
      this.scene.start('MainMenuScene');
    });

    // Also allow space or enter to restart
    this.input.keyboard.once('keydown-SPACE', () => {
      this.scene.start('GameScene');
    });

    this.input.keyboard.once('keydown-ENTER', () => {
      this.scene.start('GameScene');
    });
  }
}
