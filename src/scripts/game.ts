import Player from "./player.ts"
import InputHandler from "./input.ts"
import { Background } from "./background.ts"

export class Game {
    width: number
    height: number
    speed: number
    background: Background
    player: Player
    input: InputHandler
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.speed = 3
        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler()
    }
    update(deltaTime: number) {
        this.background.update()
        this.player.update(this.input.keys, deltaTime)
    }
    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context)
        this.player.draw(context)
    }
}

