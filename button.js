class Button extends Phaser.Scene {
    constructor(x, y, label, scene, callback) {
        super("mainMenu");
        const button = scene.add.text(x, y, label)
            .setOrigin(0.5)
            .setPadding(10)
            .setStyle({ backgroundColor: '#111' })
            .setInteractive({ useHandCursor: true })
            .on('pointerdown', () => callback())
            .on('pointerover', () => button.setStyle({ fill: '#f39c12' }))
            .on('pointerout', () => button.setStyle({ fill: '#FFF' }));
        
        mainMenu.add.existing(new Button (0, 0, 'Start Game', this, () => console.log('game is started')));
    }
}

