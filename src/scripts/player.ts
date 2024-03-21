import { InputType, StateObject } from "../types/globals"
import { Game } from "./game"
import { Attack, Idle, Jump, JumpAttack, Run, State, Walk } from "./playerStates"
import { Sword } from "./sword"
import { movementLogic, playerCollisions, swordCollisions } from "./utils"

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
    sword: Sword
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
        this.stateMap = { walk: new Walk(this), run: new Run(this), idle: new Idle(this), jump: new Jump(this), attack: new Attack(this), jumpAttack: new JumpAttack(this) }
        this.currentState = this.stateMap.walk
        this.currentState.enter()
        this.sword = new Sword(this)
    }

    changeState(newState: State) {
        this.currentState = newState
        this.currentState.enter()
    }

    update(input: InputType[]) {
        this.checkCollisions()
        this.sword.update()
        this.currentFrameIndex = (this.currentFrameIndex + this.animationSpeed) % this.spriteImages.length;
        this.currentState.update()
        movementLogic(this, input)

        //Ensure player is within the map
        if (this.x < 0) {
            this.x = 0;
        }
        if (this.x > this.game.width - this.width) {
            this.x = this.game.width - this.width;
        }
    }

    draw(context: CanvasRenderingContext2D) {
        // Draw the current sprite image
        if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)
        let currentImage = this.spriteImages[Math.floor(this.currentFrameIndex)] ?? this.spriteImages[0]
        context.drawImage(
            currentImage,
            this.x,
            this.y,
            this.width,
            this.height
        );
        if (this.currentState instanceof Attack || this.currentState instanceof JumpAttack) {
            this.sword.draw(context)
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height - 70;
    }
    checkCollisions() {
        this.game.enemies.forEach(enemy => {
            if (playerCollisions(this, enemy)) {
                console.log("dead")
            }
            if (swordCollisions(this.sword, enemy) && (this.currentState instanceof JumpAttack || this.currentState instanceof Attack)) {
                enemy.markedForDeletetion = true
                this.game.score++
            }
        })
    }
}

