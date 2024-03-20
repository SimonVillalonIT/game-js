import { Game } from "./game.ts"
import { preloadImages } from "./utils.ts"
import { SPRITE_URLS, FLYING_ENEMIES_URLS, GROUND_ENEMY_URLS } from "./constants.ts"

const canvas = document.getElementById("canvas") as HTMLCanvasElement
const ctx = canvas.getContext("2d") as CanvasRenderingContext2D
canvas.width = 1920
canvas.height = 1080
preloadImages(SPRITE_URLS);
preloadImages(FLYING_ENEMIES_URLS);
preloadImages(GROUND_ENEMY_URLS);
const game = new Game(canvas.width, canvas.height)

let lastTime = performance.now()

function animate() {
    const currentTime = performance.now()
    const deltaTime = currentTime - lastTime
    ctx.clearRect(0, 0, canvas.width, canvas.height)
    game.update(deltaTime)
    game.draw(ctx)


    lastTime = currentTime

    requestAnimationFrame(animate)
}
animate()
