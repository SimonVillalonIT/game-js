import { InputType } from "../types/globals";
import { FlyingEnemy, GroundEnemy } from "./enemies";
import Player from "./player";
import { Walk } from "./playerStates";
import { Sword } from "./sword";

export async function preloadImages(obj: { [key: string]: string[] }): Promise<void> {
    const urlsArrays = Object.values(obj)
    urlsArrays.forEach(urls => {
        const loadImagePromises = urls.map(url => {
            return new Promise<void>((resolve, reject) => {
                const img = new Image();
                img.onload = () => resolve();
                img.onerror = reject;
                img.src = url;
            });
        });
        Promise.all(loadImagePromises).then(() => {
            console.log("Images preloaded successfully");
        }).catch(error => {
            console.error("Failed to preload images:", error);
        });
    })
}

export function loadStateImages(url: string) {
    const img = new Image()
    img.src = url
    return img
}

export function swordCollisions(sword: Sword, enemy: GroundEnemy | FlyingEnemy) {
    return (enemy.x < sword.x + sword.width &&
        enemy.x + sword.width > sword.x &&
        enemy.y < sword.y + sword.height &&
        enemy.y + enemy.height > sword.y
    )
}

export function playerCollisions(player: Player, enemy: GroundEnemy | FlyingEnemy) {
    return (enemy.x < player.x + player.width &&
        enemy.x + player.width > player.x &&
        enemy.y < player.y + player.height &&
        enemy.y + enemy.height > player.y
    )
}

export function movementLogic(player: Player, input: InputType[]) {
    if (player.onGround()) {
        player.x += player.speed;
        if (input.includes(" ")) {
            player.changeState(player.stateMap.attack)
        }
        else if (input.includes("ArrowUp") && player.onGround()) {
            player.changeState(player.stateMap.jump)
        }
        else if (input.includes("ArrowRight")) {
            player.changeState(player.stateMap.run)
        } else if (input.includes("ArrowLeft")) {
            player.changeState(player.stateMap.idle)
        }

        else if (input.length === 0 && player.currentState instanceof Walk !== true) {
            player.changeState(player.stateMap.walk)
        }
    }
    else {
        // Apply horizontal movement even when jumping
        if (input.includes(" ")) {
            player.changeState(player.stateMap.jumpAttack)
        }
        if (input.includes("ArrowRight")) {
            player.x += player.maxSpeed;
        } else if (input.includes("ArrowLeft")) {
            player.x -= player.maxSpeed;
        }

        // Check if ArrowDown key is pressed to adjust weight
        if (input.includes("ArrowDown")) {
            player.weight *= 1.1;
        } else {
            // Restore weight to normal if ArrowDown is not pressed
            player.weight = 1;
        }
    }
}
