import { InputType, StateObject } from "../types/globals"
import { Game } from "./main"
import { Idle, State, Walk } from "./playerStates"

export default class Player {
    game: Game
    width: number
    height: number
    x: number
    y: number
    vy: number
    spriteImages: HTMLImageElement[] // Array to hold sprite images
    currentFrameIndex: number // Current frame index for animation
    animationSpeed: number // Animation speed
    speed: number
    maxSpeed: number
    weight: number
    currentState: State
    stateMap: StateObject

    constructor(game: Game) {
        this.game = game
        this.width = 200
        this.height = 400
        this.x = 0
        this.y = this.game.height - this.height - 70
        this.vy = 0
        this.weight = 1
        this.spriteImages = [] // Initialize sprite image array
        this.currentFrameIndex = 0
        this.animationSpeed = 0.1
        this.speed = 0
        this.maxSpeed = 3
        this.currentState = new Idle(this)
        this.currentState.enter()
        this.stateMap = { idle: new Idle(this), walk: new Walk(this) }
    }

    changeState(newState: State) {
        this.currentState = newState
        this.currentState.enter()
    }

    update(input: InputType[]) {
        this.currentState.update(input)
        // Update animation frame index

        // Vertical movement
        if (input.includes("ArrowUp") && this.onGround()) this.vy -= 20;
        this.y += this.vy;
        if (!this.onGround()) this.vy += this.weight;
        else this.vy = 0;
    }

    draw(context: CanvasRenderingContext2D) {
        // Draw the current sprite image
        let currentImage = this.spriteImages[Math.floor(this.currentFrameIndex)] ?? this.spriteImages[0]
        context.drawImage(
            currentImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
    }

    onGround() {
        return this.y >= this.game.height - this.height - 70;
    }
}

