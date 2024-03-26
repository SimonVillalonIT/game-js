import { Game } from "./game"

const start = document.getElementById("start") as HTMLElement
const startButton = document.getElementById("startButton") as HTMLElement

export function startGame(game: Game) {
    startButton.addEventListener("click", () => {
        start.classList.remove("flex")
        start.classList.add("hidden")
        game.start()
    })
}
