import { GAME_STATES } from "./constants";
import { Game } from "./game";
import { fromMsToMMSS } from "./utils";

const app = document.getElementById("app") as HTMLElement;
let pauseElement: HTMLElement | null = null;
let prevState: number | null = null;

function resume() {
    const escapeKeyDownEvent = new KeyboardEvent("keydown", {
        key: "Escape",
        code: "Escape",
        keyCode: 27,
        bubbles: true, // Allows the event to bubble up through the DOM
        cancelable: true // Allows the event to be canceled
    });
    document.dispatchEvent(escapeKeyDownEvent);
}

document.addEventListener('click', (event) => {
    if (event.target && (event.target as HTMLElement).id === 'resume') {
        resume();
    }
});

export function renderPause({ state, endTime, startTime, score }: Game) {
    if (state === prevState) {
        return;
    }

    prevState = state;
    if (state !== GAME_STATES.stopped) {
        if (pauseElement) {
            app.removeChild(pauseElement);
            pauseElement = null;
        }
        return;
    }

    const duration = `${fromMsToMMSS((endTime as number) - startTime)}`;
    const html = `
        <article class="z-20 flex flex-col items-center text-white font-KnightWarrior relative bg-black/90 rounded-xl px-12 py-8 backdrop-blur animate-fade animate-once animate-duration-1000" id="pause">
            <h3 class="text-6xl">Pause</h3>
            <div class="flex justify-between my-4 w-full items-center">
                <p class="text-2xl">Duration: </p><span class="text-2xl" id="time">${duration}</span>
            </div>
            <div class="flex justify-between items-center w-full">
                <p class="text-2xl">Score: </p><span class="text-2xl" id="score">${score}</span>
            </div>
            <button id="resume" class="text-xl border-2 w-fit mt-6 py-1 px-3 hover:text-black hover:bg-white duration-200">Resume</button>
        </article>
    `;

    const articleElement = document.createElement("article");
    articleElement.innerHTML = html;
    articleElement.style.minWidth = "340px"
    if (pauseElement) {
        app.replaceChild(articleElement, pauseElement);
    } else {
        app.appendChild(articleElement);
    }
    pauseElement = articleElement;
}

