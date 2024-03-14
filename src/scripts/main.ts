import { Game } from "./game.ts"
import { preloadImages } from "./utils.ts"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
canvas.width = 1920
canvas.height = 1080
preloadImages();
const game = new Game(canvas.width, canvas.height)

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update()
    game.draw(ctx)
    requestAnimationFrame(animate)
}
animate()
