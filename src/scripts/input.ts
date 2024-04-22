import { InputType } from "../types/globals";
import { GAME_STATES } from "./constants";
import { Game } from "./game";

class InputHandler {
  keys: InputType[];
  spaceKeyDown: boolean;
  game: Game;
  constructor(game: Game) {
    this.keys = [];
    this.spaceKeyDown = false;
    this.game = game;

    window.addEventListener("touchstart", (e) => {
      const element = e.target as HTMLElement;
      if (element.id === "attack" && !this.spaceKeyDown) {
        this.spaceKeyDown = true;
        this.keys.push(" ");
        // Set a timeout to remove the space key after 1 second
        setTimeout(() => {
          const index = this.keys.indexOf(" ");
          if (index !== -1) {
            this.keys.splice(index, 1);
          }
        }, 500);
      }
      if (element.id === "up" && !this.keys.includes("ArrowUp"))
        this.keys.push("ArrowUp");
      if (element.id === "down" && !this.keys.includes("ArrowDown"))
        this.keys.push("ArrowDown");
      if (element.id === "left" && !this.keys.includes("ArrowLeft"))
        this.keys.push("ArrowLeft");
      if (element.id === "right" && !this.keys.includes("ArrowRight"))
        this.keys.push("ArrowRight");
    });
    window.addEventListener("touchend", (e) => {
      const element = e.target as HTMLElement;
      console.log(element.id);
      if (element.id === "attack") {
        this.spaceKeyDown = false;
        const index = this.keys.indexOf(" ");
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
      if (element.id === "up") {
        const index = this.keys.indexOf("ArrowUp");
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
      if (element.id === "down") {
        const index = this.keys.indexOf("ArrowDown");
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
      if (element.id === "left") {
        const index = this.keys.indexOf("ArrowLeft");
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
      if (element.id === "right") {
        const index = this.keys.indexOf("ArrowRight");
        if (index !== -1) {
          this.keys.splice(index, 1);
        }
      }
    });
    window.addEventListener("keydown", (e: KeyboardEvent) => {
      if (e.key === " " && !this.spaceKeyDown) {
        this.spaceKeyDown = true;
        this.keys.push(e.key);
        // Set a timeout to remove the space key after 1 second
        setTimeout(() => {
          const index = this.keys.indexOf(" ");
          if (index !== -1) {
            this.keys.splice(index, 1);
          }
        }, 500);
      } else if (
        (e.key === "ArrowDown" ||
          e.key === "ArrowUp" ||
          e.key === "ArrowLeft" ||
          e.key === "ArrowRight") &&
        !this.keys.includes(e.key)
      ) {
        this.keys.push(e.key);
      } else if (e.key === "d") {
        this.game.debug = !this.game.debug;
      } else if (e.key === "Escape") {
        this.game.state === GAME_STATES.stopped
          ? this.game.resume()
          : this.game.pause();
      }
    });

    window.addEventListener("keyup", (e: KeyboardEvent) => {
      if (e.key === " ") this.spaceKeyDown = false;
      const index = this.keys.indexOf(e.key as InputType);
      if (index !== -1) {
        this.keys.splice(index, 1);
      }
    });
  }
}

export default InputHandler;
