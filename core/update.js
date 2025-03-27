import { isRectCollidingWithPoint } from "./collision.js";
export function updateGame(scene, input, canvas, deltaTime) {
    let loop = true;
    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    // UI
    if (input.isMouseDown && !input.singleClickLock) {
        if (isRectCollidingWithPoint(scene.ui.runMapButton, input.mouseOrigin)) {
            scene.isMapActive = !scene.isMapActive;
            scene.ui.runMapButton.text = scene.isMapActive ? "Pause Map" : "Run Map";
        }
        for (let i = 0; i < scene.ui.inventory.length; i++) {
            const box = scene.ui.inventory[i];
            if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
                const item = scene.character.inventory[i];
                // ctx.fillText(item.displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
            }
        }
        input.singleClickLock = true;
    }
    // Map run
    if (scene.mapProgress >= 100) {
        scene.mapProgress = 0;
        scene.character.loot(scene.map.loot());
        scene.character.tryLevelUp();
    }
    if (scene.isMapActive) {
        scene.mapProgress += 20;
    }
    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}
// function updateContext(scene: Scene, context: string) {
//     switch (context) {
//         case "1":
//             break;
//         default:
//             console.error("err");
//             break;
//     }
// }
