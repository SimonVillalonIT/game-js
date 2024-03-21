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
    }
    update(deltaTime: number) {
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
            if (enemy.markedForDeletetion) this.enemies.splice(this.enemies.indexOf(enemy), 1)
        })
    }
    draw(context: CanvasRenderingContext2D) {
        this.background.draw(context)
        this.player.draw(context)
        this.enemies.forEach(enemy => {
            enemy.draw(context)
        })
        this.UI.draw(context)
    }
    addEnemy() {
        console.log(this.enemies)
        const condition = Math.round(Math.random())
        this.enemies.push(condition === 0 ? new FlyingEnemy(this) : new GroundEnemy(this))
    }
}

