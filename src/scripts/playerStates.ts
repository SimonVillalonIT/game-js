import { InputType } from "../types/globals"
import { SPRITE_URLS } from "./constants"
import Player from "./player"
import { loadStateImages } from "./utils"



export class State {
    player: Player
    constructor(player: Player) {
        this.player = player
    }

    enter() { }
    update(_: InputType[]) { }
}

export class Idle extends State {
    enter() {
        this.player.spriteImages = SPRITE_URLS.idle.map(loadStateImages)
    }
    update(input: InputType[]) {
        this.player.currentFrameIndex = (this.player.currentFrameIndex + this.player.animationSpeed) % this.player.spriteImages.length;

        // Horizontal movement
        this.player.x += this.player.speed;
        if (input.includes("ArrowRight")) {
            this.player.speed = this.player.maxSpeed
            this.player.changeState(this.player.stateMap.walk)
        }
        else if (input.includes("ArrowLeft")) this.player.speed = -this.player.maxSpeed;
        else this.player.speed = 0;
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x > this.player.game.width - this.player.width) this.player.x = this.player.game.width - this.player.width;
    }
}

export class Walk extends State {
    enter() {
        this.player.spriteImages = SPRITE_URLS.walk.map(loadStateImages)
    }
    update(input: InputType[]) {
        this.player.currentFrameIndex = (this.player.currentFrameIndex + this.player.animationSpeed) % this.player.spriteImages.length;
        // Logic to update walk state
        // Horizontal movement
        if (this.player.x < 0) this.player.x = 0;
        if (this.player.x > this.player.game.width - this.player.width) this.player.x = this.player.game.width - this.player.width;

        this.player.x += this.player.speed;
        if (input.includes("ArrowRight")) {
            this.player.speed = this.player.maxSpeed
        }
        else if (input.includes("ArrowLeft")) this.player.speed = -this.player.maxSpeed;
        else this.player.changeState(this.player.stateMap.idle)
    }
}
