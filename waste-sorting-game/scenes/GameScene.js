class GameScene extends Phaser.Scene {
    constructor() {
        super({ key: 'GameScene' });
    }

    create() {
        this.score = 0;
        this.lives = 10;
        this.gameTime = 60; // 60 seconds
        this.isGameOver = false;

        const width = this.cameras.main.width;
        const height = this.cameras.main.height;

        // Waste types and their categories
        this.wasteTypes = {
            recyclable: ['Bottle', 'Can', 'Plastic', 'Cardboard'],
            organic: ['Apple', 'Banana', 'Leaves', 'Food'],
            paper: ['Newspaper', 'Magazine', 'Document', 'Paper Bag'],
            general: ['Diaper', 'Straw', 'Wrapper', 'Chip Bag']
        };

        this.binColors = {
            recyclable: 0x3498db, // Blue
            organic: 0x27ae60,    // Green
            paper: 0xf1c40f,      // Yellow
            general: 0x95a5a6     // Gray
        };

        // Create bins at the bottom
        this.createBins();

        // Create player (moveable truck with current bin)
        this.currentBinType = 'recyclable';
        this.player = this.add.rectangle(width / 2, height - 80, 100, 60, this.binColors[this.currentBinType]);
        this.physics.add.existing(this.player);
        this.player.body.setCollideWorldBounds(true);
        this.player.body.setImmovable(true);

        // Bin label on player
        this.playerLabel = this.add.text(this.player.x, this.player.y, this.getBinLabel(this.currentBinType), {
            fontSize: '14px',
            color: '#ffffff',
            fontStyle: 'bold'
        }).setOrigin(0.5);

        // Falling items group
        this.fallingItems = this.physics.add.group();

        // UI
        this.scoreText = this.add.text(16, 16, 'Score: 0', {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        });

        this.livesText = this.add.text(16, 48, 'Lives: 10', {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        });

        this.timerText = this.add.text(width - 16, 16, 'Time: 60', {
            fontSize: '24px',
            color: '#333333',
            fontStyle: 'bold'
        }).setOrigin(1, 0);

        // Instructions
        this.add.text(width / 2, 16, 'Use ← → to switch bins | Move with arrows', {
            fontSize: '16px',
            color: '#555555'
        }).setOrigin(0.5, 0);

        // Controls
        this.cursors = this.input.keyboard.createCursorKeys();
        this.lastBinSwitch = 0;

        // Collision detection
        this.physics.add.overlap(this.player, this.fallingItems, this.catchItem, null, this);

        // Spawn items periodically
        this.itemSpawnTimer = this.time.addEvent({
            delay: 1500, // Every 1.5 seconds
            callback: this.spawnItem,
            callbackScope: this,
            loop: true
        });

        // Game timer
        this.gameTimer = this.time.addEvent({
            delay: 1000,
            callback: this.updateTimer,
            callbackScope: this,
            loop: true
        });
    }

    createBins() {
        const width = this.cameras.main.width;
        const height = this.cameras.main.height;
        const binTypes = ['recyclable', 'organic', 'paper', 'general'];
        const binWidth = width / 4;

        binTypes.forEach((type, index) => {
            const x = binWidth * index + binWidth / 2;
            const y = height - 20;

            // Bin background indicator
            this.add.rectangle(x, y, binWidth - 10, 30, this.binColors[type], 0.3);
            this.add.text(x, y, this.getBinLabel(type), {
                fontSize: '12px',
                color: '#333333'
            }).setOrigin(0.5);
        });
    }

    getBinLabel(type) {
        const labels = {
            recyclable: '♻️ Recyclable',
            organic: '🌱 Organic',
            paper: '📄 Paper',
            general: '🗑️ General'
        };
        return labels[type];
    }

    update() {
        if (this.isGameOver) return;

        // Move player left/right
        if (this.cursors.left.isDown) {
            this.player.x -= 5;
        } else if (this.cursors.right.isDown) {
            this.player.x += 5;
        }

        // Switch bin type with up/down arrows (with cooldown)
        const time = this.time.now;
        if (time - this.lastBinSwitch > 200) {
            if (this.cursors.up.isDown || this.cursors.down.isDown) {
                this.switchBinType();
                this.lastBinSwitch = time;
            }
        }

        // Keep player in bounds
        this.player.x = Phaser.Math.Clamp(this.player.x, 50, this.cameras.main.width - 50);

        // Update label position
        this.playerLabel.setPosition(this.player.x, this.player.y);

        // Check for missed items
        this.fallingItems.children.entries.forEach(item => {
            if (item.y > this.cameras.main.height) {
                this.missItem(item);
            }
        });
    }

    switchBinType() {
        const types = ['recyclable', 'organic', 'paper', 'general'];
        const currentIndex = types.indexOf(this.currentBinType);
        const nextIndex = (currentIndex + 1) % types.length;
        this.currentBinType = types[nextIndex];
        
        // Update player color and label
        this.player.setFillStyle(this.binColors[this.currentBinType]);
        this.playerLabel.setText(this.getBinLabel(this.currentBinType));
    }

    spawnItem() {
        if (this.isGameOver) return;

        // Random category
        const categories = Object.keys(this.wasteTypes);
        const category = Phaser.Utils.Array.GetRandom(categories);
        const itemName = Phaser.Utils.Array.GetRandom(this.wasteTypes[category]);

        // Random X position
        const x = Phaser.Math.Between(100, this.cameras.main.width - 100);

        // Create item
        const item = this.add.text(x, -20, itemName, {
            fontSize: '20px',
            color: '#000000',
            backgroundColor: '#ffffff',
            padding: { x: 8, y: 4 }
        }).setOrigin(0.5);

        this.physics.add.existing(item);
        item.body.setVelocity(0, Phaser.Math.Between(100, 150));
        item.setData('category', category);

        this.fallingItems.add(item);
    }

    catchItem(player, item) {
        const itemCategory = item.getData('category');

        if (itemCategory === this.currentBinType) {
            // Correct bin!
            this.score += 10;
            this.scoreText.setText('Score: ' + this.score);
            
            // Visual feedback
            this.tweens.add({
                targets: item,
                alpha: 0,
                scale: 1.5,
                duration: 200,
                onComplete: () => item.destroy()
            });
        } else {
            // Wrong bin!
            this.score = Math.max(0, this.score - 5);
            this.scoreText.setText('Score: ' + this.score);
            
            // Visual feedback
            this.cameras.main.shake(100, 0.005);
            item.destroy();
        }
    }

    missItem(item) {
        this.lives--;
        this.livesText.setText('Lives: ' + this.lives);
        item.destroy();

        if (this.lives <= 0) {
            this.endGame();
        }
    }

    updateTimer() {
        this.gameTime--;
        this.timerText.setText('Time: ' + this.gameTime);

        if (this.gameTime <= 0) {
            this.endGame();
        }
    }

    endGame() {
        this.isGameOver = true;
        this.itemSpawnTimer.remove();
        this.gameTimer.remove();
        
        this.scene.start('GameOver', { score: this.score });
    }
}
