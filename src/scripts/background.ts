import { Game } from "./game"

export class Layer {
    game: Game
    width: number
    height: number
    speedModifier: number
    image: CanvasImageSource
    x: number
    y: number
    constructor(game: Game, width: number, height: number, speedModifier: number, image: CanvasImageSource) {
        this.game = game
        this.width = width
        this.height = height
        this.speedModifier = speedModifier
        this.image = image
        this.x = 0
        this.y = 0
    }
    update() {
        if (this.x < -this.width) this.x = 0
        else this.x -= this.game.speed * this.speedModifier
    }
    draw(context: CanvasRenderingContext2D) {
        context.drawImage(this.image, this.x, this.y, this.width, this.height)
        context.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
    }
}

export class Background {
    game: Game
    width: number
    height: number
    layer1image: CanvasImageSource
    layer2image: CanvasImageSource
    layer3image: CanvasImageSource
    layer4image: CanvasImageSource
    layer1: Layer
    layer2: Layer
    layer3: Layer
    layer4: Layer
    backgroundLayers: Layer[]

    constructor(game: Game) {
        this.game = game
        this.width = 1920
        this.height = 1080
        this.layer1image = document.getElementById("layer1") as HTMLImageElement
        this.layer2image = document.getElementById("layer2") as HTMLImageElement
        this.layer3image = document.getElementById("layer3") as HTMLImageElement
        this.layer4image = document.getElementById("layer4") as HTMLImageElement
        this.layer1 = new Layer(this.game, this.width, this.height, 1, this.layer1image)
        this.layer2 = new Layer(this.game, this.width, this.height, .2, this.layer2image)
        this.layer3 = new Layer(this.game, this.width, this.height, .8, this.layer3image)
        this.layer4 = new Layer(this.game, this.width, this.height, .4, this.layer4image)
        this.backgroundLayers = [this.layer3, this.layer4, this.layer2, this.layer1,]
    }
    update() {
        this.backgroundLayers.forEach(layer => {
            layer.update()
        })
    }
    draw(context: CanvasRenderingContext2D) {
        this.backgroundLayers.forEach(layer => {
            layer.draw(context)
        })
    }
}
