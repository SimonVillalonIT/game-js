import { InputType, StateObject } from "../types/globals"
import { Game } from "./game"
import { Attack, Idle, Jump, JumpAttack, Run, State, Walk } from "./playerStates"

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
    jumpForce: number
    weight: number
    currentState: State
    stateMap: StateObject
    attackCooldown: number

    constructor(game: Game) {
        this.game = game
        this.width = 200
        this.height = 400
        this.x = 0
        this.y = this.game.height - this.height - 70
        this.vy = 0
        this.jumpForce = 35
        this.weight = 1
        this.spriteImages = [] // Initialize sprite image array
        this.currentFrameIndex = 0
        this.animationSpeed = 0.07
        this.speed = 0
        this.maxSpeed = 7
        this.attackCooldown = 0
        this.stateMap = { walk: new Walk(this), run: new Run(this), idle: new Idle(this), jump: new Jump(this), attack: new Attack(this), jumpAttack: new JumpAttack(this) }
        this.currentState = this.stateMap.walk
        this.currentState.enter()
    }

    updateCooldowns(deltaTime: number) {
        if (this.attackCooldown > 0) {
            this.attackCooldown -= deltaTime;
        }
    }

    canAttack() {
        return this.attackCooldown <= 0
    }

    changeState(newState: State) {
        if (newState instanceof Attack && this.canAttack()) {
            this.attackCooldown = 1000; // 1000 milliseconds = 1 second
            this.currentState = newState;
            this.currentState.enter();
        } else if (newState instanceof JumpAttack && this.canAttack()) {
            this.attackCooldown = 1000; // 1000 milliseconds = 1 second
            this.currentState = newState;
            this.currentState.enter();
        }
        else if (newState instanceof JumpAttack === false && newState instanceof Attack === false) {
            this.currentState = newState
            this.currentState.enter()
        }
    }

    update(input: InputType[], deltaTime: number) {
        this.currentFrameIndex = (this.currentFrameIndex + this.animationSpeed) % this.spriteImages.length;
        this.currentState.update()

        // Lógica de movimiento
        if (this.onGround()) {
            this.x += this.speed;
            if (input.includes(" ")) {
                this.changeState(this.stateMap.attack)
            }
            else if (input.includes("ArrowUp") && this.onGround()) {
                this.changeState(this.stateMap.jump)
            }
            else if (input.includes("ArrowRight")) {
                this.changeState(this.stateMap.run)
            } else if (input.includes("ArrowLeft")) {
                this.changeState(this.stateMap.idle)
            }

            else if (input.length === 0 && this.currentState instanceof Walk !== true) {
                this.changeState(this.stateMap.walk)
            }
        }
        else {
            // Apply horizontal movement even when jumping
            if (input.includes(" ")) {
                this.changeState(this.stateMap.jumpAttack)
            }
            if (input.includes("ArrowRight")) {
                this.x += this.maxSpeed;
            } else if (input.includes("ArrowLeft")) {
                this.x -= this.maxSpeed;
            }

            // Check if ArrowDown key is pressed to adjust weight
            if (input.includes("ArrowDown")) {
                this.weight *= 1.1;
            } else {
                // Restore weight to normal if ArrowDown is not pressed
                this.weight = 1;
            }
        }

        //Ensure player is within the map
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
        this.updateCooldowns(deltaTime)
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

