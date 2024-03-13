import Player from "./player.ts"

export class Game {
    width: number
    height: number
    player: Player
    constructor(width: number, height: number) {
        this.width = width
        this.height = height
        this.player = new Player(this)
    }
    update() { }
    draw(context: CanvasRenderingContext2D) {
        this.player.draw(context)
    }
}

window.addEventListener('load', () => {
    const canvas = document.getElementById("canvas") as HTMLCanvasElement
    const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
    canvas.width = 500
    canvas.height = 500
    const game = new Game(canvas.width, canvas.height)
    console.log(game)

    function animate() {
        game.draw(ctx)
        requestAnimationFrame(animate)
    }
    animate()
})
