import Player from "./player.ts"
import InputHandler from "./input.ts"
import { Background } from "./background.ts"
import { FlyingEnemy, GroundEnemy } from "./enemies.ts"
import { UI } from "./ui.ts"
import { GAME_STATES } from "./constants.ts"

const { notStarted, playing, stopped, gameOver } = GAME_STATES

export class Game {
    state: number
    width: number
    height: number
    speed: number
    background: Background
    player: Player
    input: InputHandler
    enemies: (GroundEnemy | FlyingEnemy)[]
    enemyTimer: number
    enemyInterval: number
    debug: boolean
    score: number
    UI: UI
    music: HTMLAudioElement
    pauseTimestamp: number | null
    hitTimeout: any
    startTime: number
    endTime: number | null
    constructor(width: number, height: number) {
        this.state = GAME_STATES.notStarted
        this.width = width
        this.height = height
        this.speed = 3
        this.background = new Background(this)
        this.player = new Player(this)
        this.input = new InputHandler(this)
        this.enemies = []
        this.enemyTimer = 0
        this.enemyInterval = 1000
        this.debug = false
        this.score = 0
        this.UI = new UI(this)
        this.music = new Audio()
        this.music.src = "/audio/music.wav"
        this.music.volume = 0.1
        this.music.loop = true
        this.pauseTimestamp = null
        this.hitTimeout = null
        this.startTime = Date.now()
        this.endTime = null
    }
    update(deltaTime: number) {
        if (this.isRunning()) {
            this.UI.update()
            this.background.update()
            this.player.update(this.input.keys)
            //handle enemies
            if (this.enemyTimer > this.enemyInterval) {
                this.addEnemy()
                this.enemyTimer = 0
            } else {
                this.enemyTimer += deltaTime
            }
            this.enemies.forEach(enemy => {
                enemy.update()
                if (enemy.markedForDeletetion) {
                    this.enemies.splice(this.enemies.indexOf(enemy), 1)
                }
            })
        }
    }
    draw(context: CanvasRenderingContext2D) {
        this.playMusic()
        this.background.draw(context)
        this.player.draw(context)
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        })
        this.UI.draw(context)
    }
    addEnemy() {
        const condition = Math.round(Math.random())
        this.enemies.push(condition === 0 ? new FlyingEnemy(this) : new GroundEnemy(this))
    }
    playMusic() {
        this.music.play()
    }
    stopEnemies() {
        this.enemies.forEach(enemy => { enemy.stop = true })
    }
    isRunning() {
        if (this.state === stopped || this.state === notStarted || this.state === gameOver) {
            return false
        }
        if (this.state === playing) return true
    }
    start() {
        this.state = playing
    }
    pause() {
        this.endTime = Date.now()
        this.pauseTimestamp = new Date().getTime()
        clearTimeout(this.hitTimeout); // Clear the existing timeout
        this.state = stopped
    }
    resume() {
        if (this.pauseTimestamp) {
            const remainingTime = this.player.isHitDuration - (this.pauseTimestamp - (this.player.getHitTimestamp as number)); // Calculate remaining time
            this.hitTimeout = setTimeout(() => {
                this.player.isHit = false;
            }, remainingTime); // Start a new timeout with remaining time
            this.pauseTimestamp = null; // Reset the pause timestamp
        }
        this.state = playing
    }
    gameOver() {
        this.endTime = Date.now()
        this.stopEnemies()
        setTimeout(() => {
            this.player.game.state = gameOver
        }, 2000)

    }

}

