class GameOver extends Phaser.Scene {
    constructor() {
        super({ key: 'GameOver' });
    }

    init(data) {
        this.finalScore = data.score || 0;
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Game Over title
        this.add.text(width / 2, 120, 'GAME OVER', {
            fontSize: '64px',
            fontStyle: 'bold',
            color: '#e74c3c',
            stroke: '#ffffff',
            strokeThickness: 6
        }).setOrigin(0.5);

        // Score display
        this.add.text(width / 2, 220, 'Final Score', {
            fontSize: '32px',
            color: '#333333'
        }).setOrigin(0.5);

        this.add.text(width / 2, 280, this.finalScore.toString(), {
            fontSize: '72px',
            fontStyle: 'bold',
            color: '#27ae60',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Performance message
        let message = '';
        if (this.finalScore >= 200) {
            message = '🌟 AMAZING! Waste sorting expert! 🌟';
        } else if (this.finalScore >= 100) {
            message = '👍 Great job! Keep it up!';
        } else if (this.finalScore >= 50) {
            message = '😊 Good effort! Practice makes perfect!';
        } else {
            message = '💪 Keep trying! You can do better!';
        }

        this.add.text(width / 2, 370, message, {
            fontSize: '24px',
            color: '#555555',
            align: 'center'
        }).setOrigin(0.5);

        // Fun fact
        const facts = [
            'Did you know? Recycling one aluminum can saves\nenough energy to run a TV for 3 hours!',
            'Fun fact: Paper can be recycled up to 7 times\nbefore the fibers become too short!',
            'Remember: Organic waste can become compost\nand enrich the soil naturally!',
            'Tip: Reducing waste is even better than recycling!\nUse reusable items when possible.'
        ];

        this.add.text(width / 2, 440, Phaser.Utils.Array.GetRandom(facts), {
            fontSize: '16px',
            color: '#666666',
            align: 'center'
        }).setOrigin(0.5);

        // Restart instruction
        const restartText = this.add.text(width / 2, height - 80, 'Press SPACE to Play Again', {
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#3498db',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Menu instruction
        this.add.text(width / 2, height - 40, 'Press M for Main Menu', {
            fontSize: '20px',
            color: '#555555'
        }).setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: restartText,
            alpha: 0.4,
            duration: 700,
            yoyo: true,
            repeat: -1
        });

        // Input handlers
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });

        this.input.keyboard.once('keydown-M', () => {
            this.scene.start('MainMenu');
        });
    }
}
