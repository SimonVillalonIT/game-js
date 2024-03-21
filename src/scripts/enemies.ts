import { FLYING_ENEMIES_URLS, GROUND_ENEMY_URLS } from "./constants"
import { Game } from "./game"
import { loadStateImages } from "./utils"

class Enemy {
    game: Game
    currentFrameIndex: number
    animationSpeed: number
    spriteImages: HTMLImageElement[]
    x: number
    y: number
    speedX: number
    speedY: number
    width: number
    height: number
    markedForDeletetion: boolean
    constructor(game: Game) {
        this.currentFrameIndex = 0
        this.animationSpeed = 0
        this.spriteImages = []
        this.x = 0
        this.y = 0
        this.speedX = 0
        this.speedY = 0
        this.width = 0
        this.height = 0
        this.game = game
        this.markedForDeletetion = false
    }
    update() {
        this.x -= this.speedX + this.game.speed
        this.y += this.speedY
        this.currentFrameIndex = (this.currentFrameIndex + this.animationSpeed) % this.spriteImages.length;
        if (this.x + this.width < 0) this.markedForDeletetion = true
    }
    draw(context: CanvasRenderingContext2D) {
        // Draw the current sprite image
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        let currentImage = this.spriteImages[Math.floor(this.currentFrameIndex)] ?? this.spriteImages[0]
        context.drawImage(
            currentImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }
}

export class FlyingEnemy extends Enemy {
    angle: number
    va: number
    constructor(game: Game) {
        super(game)
        this.animationSpeed = 0.17
        this.game = game
        this.width = 200
        this.height = 200
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = 200
        this.speedX = Math.random() + 5
        this.speedY = 0;
        this.angle = 0
        this.va = Math.random() * 0.1 + 0.1

        // Load sprite images for ground enemies
        this.spriteImages = FLYING_ENEMIES_URLS.idle.map(loadStateImages);
    }
    update() {
        super.update()
        this.angle += this.va * 0.4
        this.y += Math.sin(this.angle) * 3
    }

}

export class GroundEnemy extends Enemy {
    constructor(game: Game) {
        // Call the superclass constructor
        super(game);

        // Set initial position and speed for ground enemies
        this.animationSpeed = 0.09
        this.width = 150
        this.height = 120
        this.x = this.game.width + Math.random() * this.game.width * 0.5
        this.y = this.game.height - 350
        this.speedX = Math.random() + 5
        this.speedY = 0;

        // Load sprite images for ground enemies
        this.spriteImages = GROUND_ENEMY_URLS.idle.map(loadStateImages);
    }

    // Optionally, you can override the update method if needed
    update() {
        super.update(); // Call superclass update method if necessary
        // Additional update logic specific to ground enemies can be added here
    }
}
