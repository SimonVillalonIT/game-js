import { Game } from "./main"

export default class Player {
    game: Game
    width: number
    height: number
    x: number
    y: number
    constructor(game: Game) {
        this.game = game
        this.width = 100
        this.height = 91.3
        this.x = 0
        this.y = 100
    }
    update() {

    }
    draw(context: CanvasRenderingContext2D) {
        context.fillStyle = "red"
        context.fillRect(this.x, this.y, this.width, this.height)
    }
}
