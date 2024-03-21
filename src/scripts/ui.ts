import { Game } from "./game.ts"

export class UI {
    game: Game
    fontSize: number
    fontFamily: string
    constructor(game: Game) {
        this.game = game
        this.fontSize = 30
        this.fontFamily = "Helvetica"
    }
    draw(context: CanvasRenderingContext2D) {
        context.font = this.fontSize + "px " + this.fontFamily
        context.textAlign = "left"
        context.fillStyle = "black"
        // score
        context.fillText(`Score: ${this.game.score}`, 20, 50)
    }
}
