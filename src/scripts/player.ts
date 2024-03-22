import { InputType, StateObject } from "../types/globals"
import { Game } from "./game"
import { Attack, Dead, Idle, Jump, JumpAttack, Run, State, Walk } from "./playerStates"
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
    lives: number
    isHit: boolean
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
        this.stateMap = { walk: new Walk(this), run: new Run(this), idle: new Idle(this), jump: new Jump(this), attack: new Attack(this), jumpAttack: new JumpAttack(this), dead: new Dead(this) }
        this.currentState = this.stateMap.walk
        this.currentState.enter()
        this.sword = new Sword(this)
        this.lives = 3
        this.isHit = false
    }

    changeState(newState: State) {
        if (this.currentState instanceof Dead === false && newState !== this.currentState) {
            this.currentState = newState
            this.currentState.enter()
            this.currentFrameIndex = 0
        }
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
        if (this.game.debug && (this.currentState instanceof Attack || this.currentState instanceof JumpAttack)) {
            context.strokeRect(this.x, this.y, this.width - 100, this.height)
        } else if (this.game.debug) context.strokeRect(this.x, this.y, this.width, this.height)

        let currentImage = this.spriteImages[Math.floor(this.currentFrameIndex)] ?? this.spriteImages[0]

        if (this.isHit) {
            let alpha = Math.abs(Math.sin(Date.now() / 200))
            context.globalAlpha = alpha
        }

        context.drawImage(
            currentImage,
            this.x,
            this.y,
            this.width,
            this.height
        );

        context.globalAlpha = 1;

        if (this.currentState instanceof Attack || this.currentState instanceof JumpAttack) {
            this.sword.draw(context)
        }
    }

    onGround() {
        return this.y >= this.game.height - this.height - 70;
    }

    getHit() {
        this.lives = this.lives - 1
        this.isHit = true
        this.game.UI.hearts.pop()
        setTimeout(() => { this.isHit = false }, 1000)
    }
    checkCollisions() {
        this.game.enemies.forEach(enemy => {
            if (playerCollisions(this, enemy) && !enemy.isDead && !this.isHit) {
                if (this.lives <= 1) {
                    this.game.UI.hearts.pop()
                    this.changeState(this.stateMap.dead)
                }
                else {
                    enemy.isDead = true
                    this.getHit()
                }
            }
            if (swordCollisions(this.sword, enemy) && !enemy.isDead && (this.currentState instanceof JumpAttack || this.currentState instanceof Attack)) {
                enemy.isDead = true
                this.game.score++
            }
        })
    }
}

