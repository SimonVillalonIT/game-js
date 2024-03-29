import "./instructions.ts";
import { Game } from "./game.ts";
import { preloadImages } from "./utils.ts";
import {
  FLYING_ENEMIES_URLS,
  GROUND_ENEMY_URLS,
  SPRITE_URLS,
} from "./constants.ts";

const canvas = document.getElementById("canvas") as HTMLCanvasElement;
canvas.width = 1920;
canvas.height = 1080;

const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;

preloadImages(SPRITE_URLS);
preloadImages(FLYING_ENEMIES_URLS);
preloadImages(GROUND_ENEMY_URLS);

const game = new Game(canvas.width, canvas.height);
game.display.enter();

let lastTime = performance.now();

function animate() {
  const currentTime = performance.now();
  const deltaTime = currentTime - lastTime;
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  game.update(deltaTime);

  game.draw(ctx);
  lastTime = currentTime;

  requestAnimationFrame(animate);
}
animate();
