class MainMenu extends Phaser.Scene {
    constructor() {
        super({ key: 'MainMenu' });
    }

    create() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Title
        this.add.text(width / 2, 100, '♻️ WASTE SORTING GAME ♻️', {
            fontSize: '48px',
            fontStyle: 'bold',
            color: '#2d5016',
            stroke: '#ffffff',
            strokeThickness: 4
        }).setOrigin(0.5);

        // Instructions
        this.add.text(width / 2, 200, 'How to Play:', {
            fontSize: '28px',
            fontStyle: 'bold',
            color: '#333333'
        }).setOrigin(0.5);

        const instructions = [
            'Sort falling waste into correct bins!',
            '',
            'Use ← → ARROW KEYS to move',
            '',
            '🔵 Blue = Recyclable (bottles, cans)',
            '🟢 Green = Organic (food, leaves)',
            '🟡 Yellow = Paper (newspapers, documents)',
            '⚫ Gray = General waste',
            '',
            'Correct: +10 points | Wrong: -5 points',
            'Don\'t miss 10 items or time runs out!'
        ];

        let yPos = 260;
        instructions.forEach(line => {
            this.add.text(width / 2, yPos, line, {
                fontSize: '18px',
                color: '#333333',
                align: 'center'
            }).setOrigin(0.5);
            yPos += 28;
        });

        // Start instruction
        const startText = this.add.text(width / 2, height - 60, 'Press SPACE to Start', {
            fontSize: '32px',
            fontStyle: 'bold',
            color: '#ff6b6b',
            stroke: '#ffffff',
            strokeThickness: 3
        }).setOrigin(0.5);

        // Blinking effect
        this.tweens.add({
            targets: startText,
            alpha: 0.3,
            duration: 800,
            yoyo: true,
            repeat: -1
        });

        // Start game on SPACE
        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.start('GameScene');
        });
    }
}
