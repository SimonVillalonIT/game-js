import { SPRITE_URLS } from "./constants"
import Player from "./player"
import { loadStateImages } from "./utils"



export abstract class State {
    player: Player
    sound: HTMLAudioElement
    deathSound: HTMLAudioElement
    constructor(player: Player) {
        this.player = player
        this.sound = new Audio()
        this.sound.src = "/audio/attack.wav"
        this.deathSound = new Audio()
        this.deathSound.src = "/audio/death-sound.wav"
    }
    abstract enter(): void
    abstract update(): void
    hasTraversedAllSprites(): boolean {
        return Math.floor(this.player.currentFrameIndex) >= this.player.spriteImages.length - 1;
    }
}

export class Walk extends State {
    enter() {
        this.sound.pause()
        this.player.animationSpeed = 0.07
        this.player.width = 200
        this.player.spriteImages = SPRITE_URLS.walk.map(loadStateImages)
    }
    update() {
        this.player.speed = 0;
    }
}

export class Run extends State {
    enter() {
        this.sound.pause()
        this.player.animationSpeed = 0.07
        this.player.width = 200
        this.player.spriteImages = SPRITE_URLS.run.map(loadStateImages)
    }
    update() {
        this.player.speed = this.player.maxSpeed
    }
}

export class Idle extends State {
    enter() {
        this.sound.pause()
        this.player.animationSpeed = 0.07
        this.player.width = 200
        this.player.spriteImages = SPRITE_URLS.idle.map(loadStateImages)
    }
    update() {
        this.player.speed = -5;
    }
}

export class Jump extends State {
    enter() {
        this.sound.pause()
        this.player.animationSpeed = 0.1
        this.player.width = 200
        this.player.spriteImages = SPRITE_URLS.jump.map(loadStateImages)
        this.player.vy = -this.player.jumpForce
    }
    update() {
        // Apply gravity
        this.player.vy += this.player.weight;

        // Update vertical position
        this.player.y += this.player.vy;

        // Check if player hits the ground
        if (this.player.onGround()) {
            this.player.y = this.player.game.height - this.player.height - 70;
            this.player.vy = 0; // Reset vertical velocity
            this.player.changeState(this.player.stateMap.walk)
        }
    }
}

export class Attack extends State {
    enter() {
        if (this.player.game.sound.effects) this.sound.play()
        this.player.animationSpeed = 0.15
        this.player.width = 300
        this.player.spriteImages = SPRITE_URLS.attack2.map(loadStateImages)
    }
    update() {
    }
}

export class JumpAttack extends State {
    enter() {
        this.player.animationSpeed = 0.15
        this.player.width = 300
        this.player.spriteImages = SPRITE_URLS.attack.map(loadStateImages)
    }
    update() {

        if (this.player.game.sound.effects) this.sound.play()
        // Apply gravity
        this.player.vy += this.player.weight;

        // Update vertical position
        this.player.y += this.player.vy;

        // Check if player hits the ground
        if (this.player.onGround()) {
            this.player.y = this.player.game.height - this.player.height - 70;
            this.player.vy = 0; // Reset vertical velocity
            this.player.changeState(this.player.stateMap.walk)
        }
    }
}

export class Dead extends State {
    enter() {
        this.player.game.music.volume = 0
        if (this.player.game.sound.effects) this.deathSound.play()
        this.player.spriteImages = SPRITE_URLS.dead.map(loadStateImages)
        this.player.animationSpeed = 0.02
    }
    update() {
        if (!this.player.onGround()) {
            this.player.vy += this.player.weight;
            this.player.y += this.player.vy;
        }
        this.player.speed = 0
        this.player.game.speed = 0
        this.player.game.gameOver()
    }
}
