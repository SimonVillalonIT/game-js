import { InputType } from "../types/globals";

class InputHandler {
    keys: InputType[];
    spaceKeyDown: boolean;

    constructor() {
        this.keys = [];
        this.spaceKeyDown = false;

        window.addEventListener("keydown", (e: KeyboardEvent) => {
            console.log({ spaceKeyDown: this.spaceKeyDown })
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
            }
        });

        window.addEventListener("keyup", (e: KeyboardEvent) => {
            console.log({ spaceKeyDown: this.spaceKeyDown })
            if (e.key === " ") this.spaceKeyDown = false
            const index = this.keys.indexOf((e.key as InputType));
            if (index !== -1) {
                this.keys.splice(index, 1);
            }
        });
    }
}

export default InputHandler;

