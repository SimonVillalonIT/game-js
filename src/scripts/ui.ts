import { Game } from "./game.ts"
import { Heart } from "./heart.ts"

export class UI {
    game: Game
    fontSize: number
    fontFamily: string
    hearts: Heart[]
    constructor(game: Game) {
        this.game = game
        this.fontSize = 60
        this.fontFamily = "KnightWarrior"
        this.hearts = [new Heart(1), new Heart(2), new Heart(3)]
    }

    update() {
        this.hearts.forEach(heart => {
            heart.update()
        })
    }

    draw(context: CanvasRenderingContext2D) {
        context.font = this.fontSize + "px " + this.fontFamily
        context.textAlign = "left"
        context.fillStyle = "white"
        // score
        context.fillText(`Score: ${this.game.score}`, 20, 70)
        this.hearts.forEach(heart => {
            heart.draw(context)
        })
    }
}
