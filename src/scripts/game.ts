import Player from "./player.ts"
import InputHandler from "./input.ts"
import { Background } from "./background.ts"
import { FlyingEnemy, GroundEnemy } from "./enemies.ts"
import { UI } from "./ui.ts"

export class Game {
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
    stop: boolean
    pauseTimestamp: number | null
    hitTimeout: any
    constructor(width: number, height: number) {
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
        this.stop = false
        this.pauseTimestamp = null
        this.hitTimeout = null
    }
    update(deltaTime: number) {
        if (!this.stop) {
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
    stopAll() {
        this.enemies.forEach(enemy => { enemy.stop = true })
    }
    pause() {
        this.pauseTimestamp = new Date().getTime()
        clearTimeout(this.hitTimeout); // Clear the existing timeout
        this.stop = true
    }
    resume() {
        if (this.pauseTimestamp) {
            console.log(this.player.isHitDuration - (this.pauseTimestamp - (this.player.getHitTimestamp as number)))
            const remainingTime = this.player.isHitDuration - (this.pauseTimestamp - (this.player.getHitTimestamp as number)); // Calculate remaining time
            this.hitTimeout = setTimeout(() => {
                this.player.isHit = false;
            }, remainingTime); // Start a new timeout with remaining time
            this.pauseTimestamp = null; // Reset the pause timestamp
        }
        this.stop = false
    }

}

