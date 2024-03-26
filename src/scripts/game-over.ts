import { Game } from "./game"
import { fromMsToMMSS } from "./utils"

const gameOver = document.getElementById("gameOver")
const score = document.getElementById("score") as HTMLSpanElement
const time = document.getElementById("time") as HTMLSpanElement
const restart = document.getElementById("restart") as HTMLButtonElement
restart.addEventListener("click", () => {
    window.location.reload()
})

export function displayGameOver(game: Game) {
    score.innerHTML = `${game.score}`
    time.innerHTML = `${fromMsToMMSS((game.endTime as number) - game.startTime)}`
    gameOver?.classList.remove("hidden")
    gameOver?.classList.add("flex")
}
