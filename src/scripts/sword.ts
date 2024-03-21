import Player from "./player"

export class Sword {
    x: number
    y: number
    width: number
    height: number
    player: Player
    constructor(player: Player) {
        this.width = 120
        this.height = 5
        this.x = 0
        this.y = 0
        this.player = player
    }
    update() {
        this.x = this.player.x + (this.player.width / 2) - (this.width / 2) + 100;
        this.y = this.player.y + (this.player.height / 2) - (this.height / 2) - 30;
    }

    draw(context: CanvasRenderingContext2D) {
        context.strokeStyle = "red"; // Set stroke color
        context.lineWidth = 2; // Set line width

        // Draw the sword hitbox rectangle
        context.strokeRect(this.x, this.y, this.width, this.height);

    }
}
