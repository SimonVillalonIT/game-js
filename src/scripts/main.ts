// interface animationState {
//     name: string
//     frames: number
// }
//
// const canvas: HTMLCanvasElement | null = document.getElementById("canvas1") as HTMLCanvasElement
// const ctx = canvas?.getContext("2d")
// const CANVAS_WIDTH = canvas.width = 600
// const CANVAS_HEIGHT = canvas.height = 600
//
//
// const playerImage = new Image()
// playerImage.src = 'shadow_dog.png'
// const spriteWidth = 575
// const spriteHeight = 523
// let playerState = "jump"
//
// let gameFrame = 0
// const staggerFrames = 5
// const spriteAnimations: any = []
//
// const animationStates: animationState[] = [
//     {
//         name: 'idle',
//         frames: 7
//     },
//     {
//         name: 'jump',
//         frames: 7
//     },
//     {
//         name: 'fall',
//         frames: 7
//     },
//     {
//         name: 'run',
//         frames: 9
//     },
//     {
//         name: 'dizzy',
//         frames: 11
//     },
//     {
//         name: 'sit',
//         frames: 5
//     },
//     {
//         name: 'roll',
//         frames: 7
//     },
//     {
//         name: 'ko',
//         frames: 12
//     },
//     {
//         name: 'getHit',
//         frames: 4
//     },
// ]
//
// //Create the select
// const selectElement = document.getElementById("animations")
// // Loop through the animationStates array and create an option element for each state
// animationStates.forEach(state => {
//     const option = document.createElement('option');
//     option.value = state.name; // Set the value of the option to the state name
//     option.text = state.name; // Set the text of the option to the state name
//     selectElement?.appendChild(option); // Append the option to the select element
// });
//
// selectElement?.addEventListener("change", (e: Event) => {
//     playerState = (e.target as HTMLSelectElement).value ?? "idle"
// })
//
//
// animationStates.forEach((state, i) => {
//     let frames: { loc: { x: number, y: number }[] } = {
//         loc: [],
//     }
//     for (let j = 0; j < state.frames; j++) {
//         let positionX = j * spriteWidth
//         let positionY = i * spriteHeight
//         frames.loc.push({ x: positionX, y: positionY })
//     }
//     spriteAnimations[state.name] = frames
// })
//
// console.log({ spriteAnimations, animationStates })
//
// function animate() {
//     ctx?.clearRect(0, 0, CANVAS_WIDTH, CANVAS_HEIGHT)
//     let position = Math.floor(gameFrame / staggerFrames) % spriteAnimations[playerState].loc.length
//     let frameX = spriteWidth * position
//     let frameY = spriteAnimations[playerState].loc[position].y
//
//     ctx?.drawImage(playerImage, frameX, frameY, spriteWidth, spriteHeight, 0, 0, spriteWidth, spriteHeight)
//
//     gameFrame++
//     requestAnimationFrame(animate)
// }
// animate()
