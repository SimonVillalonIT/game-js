// const canvas = document.getElementById("canvas1") as HTMLCanvasElement
// const ctx = canvas.getContext('2d')
// const CANVAS_WIDTH = canvas.width = 800
// const CANVAS_HEIGHT = canvas.height = 700
// let gameSpeed = 5
// let gameFrame = 0
//
// const backgroundLayer1 = new Image()
// backgroundLayer1.src = "../../public/layer-1.png"
// const backgroundLayer2 = new Image()
// backgroundLayer2.src = "../../public/layer-2.png"
// const backgroundLayer3 = new Image()
// backgroundLayer3.src = "../../public/layer-3.png"
// const backgroundLayer4 = new Image()
// backgroundLayer4.src = "../../public/layer-4.png"
// const backgroundLayer5 = new Image()
// backgroundLayer5.src = "../../public/layer-5.png"
//
// window.addEventListener('load', function() {
//     const slider = document.getElementById("slider") as HTMLInputElement
//     slider.value = gameSpeed.toString()
//     const showGameSpeed = document.getElementById("showGameSpeed") as HTMLSpanElement
//     showGameSpeed.innerHTML = gameSpeed.toString()
//     slider.addEventListener("change", function(e: Event) {
//         showGameSpeed.innerHTML = (e.target as HTMLInputElement).value
//         gameSpeed = parseInt((e.target as HTMLInputElement).value)
//     })
//
//     class Layer {
//         x: number
//         y: number
//         width: number
//         height: number
//         image: CanvasImageSource
//         speedModifier: number
//         speed: number
//
//         constructor(image: CanvasImageSource, speedModifier: number) {
//             this.x = 0
//             this.y = 0
//             this.width = 2400
//             this.height = 700
//             this.image = image
//             this.speedModifier = speedModifier
//             this.speed = gameSpeed * this.speedModifier
//         }
//         update() {
//             this.speed = gameSpeed * this.speedModifier
//             if (this.x <= -this.width) {
//                 this.x = 0
//             }
//             this.x = Math.floor(this.x - this.speed)
//         }
//         draw() {
//             ctx?.drawImage(this.image, this.x, this.y, this.width, this.height)
//             ctx?.drawImage(this.image, this.x + this.width, this.y, this.width, this.height)
//         }
//         init() {
//             this.update()
//             this.draw()
//         }
//     }
//
//     const layer1 = new Layer(backgroundLayer1, .2)
//     const layer2 = new Layer(backgroundLayer2, .4)
//     const layer3 = new Layer(backgroundLayer3, .6)
//     const layer4 = new Layer(backgroundLayer4, .8)
//     const layer5 = new Layer(backgroundLayer5, 1)
//
//     const gameObjects = [layer1, layer2, layer3, layer4, layer5]
//
//     function animate() {
//         ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//         gameObjects.forEach(obj => {
//             obj.init()
//         });
//         requestAnimationFrame(animate)
//     }
//     animate()
// })
