import { HEART_URLS } from "./constants";
import { loadStateImages } from "./utils";

export class Heart {
  width: number;
  height: number;
  x: number;
  y: number;
  spriteImages: HTMLImageElement[];
  currentFrameIndex: number;
  animationSpeed: number;
  position: number;
  constructor(position: number) {
    this.width = 50;
    this.height = 60;
    this.position = position;
    this.x = position * 20 * 2.7 - 30;
    this.y = 100;
    this.spriteImages = HEART_URLS.map(loadStateImages);
    this.currentFrameIndex = 0;
    this.animationSpeed = 0.04;
  }

  update() {
    this.currentFrameIndex =
      (this.currentFrameIndex + this.animationSpeed) % this.spriteImages.length;
  }
  draw(context: CanvasRenderingContext2D) {
    let currentImage =
      this.spriteImages[Math.floor(this.currentFrameIndex)] ??
      this.spriteImages[0];

    context.drawImage(currentImage, this.x, this.y, this.width, this.height);
  }
}
