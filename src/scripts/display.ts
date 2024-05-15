import { Game } from "./game.ts";
import { fromMsToMMSS } from "./utils.ts";

export class Display {
  game: Game;
  startSection: HTMLElement;
  startButton: HTMLElement;
  pauseScore: HTMLElement;
  pauseArticle: HTMLElement;
  pauseTime: HTMLElement;
  resumeButton: HTMLElement;
  gameOverArticle: HTMLElement;
  restartButton: HTMLElement;
  gameOverScore: HTMLElement;
  gameOverTime: HTMLElement;
  soundButton: HTMLElement;
  musicButton: HTMLElement;
  constructor(game: Game) {
    this.game = game;
    this.pauseArticle = document.getElementById("pause") as HTMLElement;
    this.resumeButton = document.getElementById("resume") as HTMLElement;
    this.pauseScore = document.getElementById("pause-score") as HTMLElement;
    this.pauseTime = document.getElementById("pause-time") as HTMLElement;
    this.gameOverArticle = document.getElementById("gameOver") as HTMLElement;
    this.restartButton = document.getElementById("restart") as HTMLElement;
    this.gameOverScore = document.getElementById(
      "gameOver-score",
    ) as HTMLElement;
    this.gameOverTime = document.getElementById("gameOver-time") as HTMLElement;
    this.startSection = document.getElementById("start") as HTMLElement;
    this.startButton = document.getElementById("startButton") as HTMLElement;
    this.soundButton = document.getElementById("soundButton") as HTMLElement;
    this.musicButton = document.getElementById("musicButton") as HTMLElement;
  }
  enter() {
    this.resumeButton.addEventListener("click", () => {
      this.game.resume();
      this.pauseArticle?.classList.remove("flex");
      this.pauseArticle?.classList.add("hidden");
    });
    this.restartButton.addEventListener("click", () => {
      window.location.reload();
    });
    this.startButton.addEventListener("click", () => {
      this.game.start();
      this.startSection.classList.remove("flex");
      this.startSection.classList.add("hidden");
    });
    this.musicButton.addEventListener("click", () => {
      for (const child of this.musicButton.children) {
        child.classList.toggle("hidden");
      }
      if (this.musicButton.dataset.state === "on") {
        this.game.sound.music = false;
        this.game.music.volume = 0;
        this.musicButton.dataset.state = "off";
      } else {
        this.game.sound.music = true;
        this.game.music.volume = 0.1;
        this.musicButton.dataset.state = "on";
      }
    });
    this.soundButton.addEventListener("click", () => {
      for (const child of this.soundButton.children) {
        child.classList.toggle("hidden");
      }
      if (this.soundButton.dataset.state === "on") {
        this.game.sound.effects = false;
        this.soundButton.dataset.state = "off";
      } else {
        this.game.sound.effects = true;
        this.soundButton.dataset.state = "on";
      }
    });
  }
  pauseGame() {
    const duration = `${fromMsToMMSS(
      (Date.now() as number) - (this.game.startTime as number),
    )}`;
    this.pauseScore.innerHTML = `${this.game.score}`;
    this.pauseTime.innerHTML = duration;
    this.pauseArticle.classList.remove("hidden");
    this.pauseArticle.classList.add("flex");
  }
  gameOver() {
    const duration = `${fromMsToMMSS(
      (this.game.endTime as number) - (this.game.startTime as number),
    )}`;
    this.gameOverScore.innerHTML = `${this.game.score}`;
    this.gameOverTime.innerHTML = duration;
    this.gameOverArticle.classList.remove("hidden");
    this.gameOverArticle.classList.add("flex");
  }

  resume() {
    this.pauseArticle?.classList.remove("flex");
    this.pauseArticle?.classList.add("hidden");
  }
}
