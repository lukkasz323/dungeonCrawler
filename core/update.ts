import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { GatherersCamp } from "./scene/structures/gatherersCamp.js";

export function updateGame(scene: Scene, input: Input, canvas: HTMLCanvasElement, deltaTime: number): boolean {
    let loop = true;

    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }

    // Move camera
    let padding = 16;
    if (!(window.navigator as any).userAgentData.mobile) { // Temporary
        padding = 0;
    }
    if (input.keys.get("KeyA") || input.mouseOrigin.x < padding) {
        scene.camera.origin.x += scene.camera.speed;
    }
    if (input.keys.get("KeyW") || input.mouseOrigin.y < padding) {
        scene.camera.origin.y += scene.camera.speed;
    }
    if (input.keys.get("KeyD") || input.mouseOrigin.x > canvas.width - padding) {
        scene.camera.origin.x -= scene.camera.speed;
    }
    if (input.keys.get("KeyS") || input.mouseOrigin.y > canvas.height - padding) {
        scene.camera.origin.y -= scene.camera.speed;
    }

    // Find hovered tile
    scene.grid.updateHoveredTile(input, scene);

    // Tile select
    if (input.isMouseDownLeft) {
        if (scene.grid.hoveredTile) {
            scene.grid.selectedTile = scene.grid.hoveredTile;
        } else {
            scene.grid.selectedTile = null;
        }
    }
    
    // Place structures
    if (input.isMouseDownRight && scene.grid.hoveredTile && !scene.grid.hoveredTile.structure && scene.economy.workers < scene.economy.settlers) {
        scene.economy.workers += 1;
        scene.grid.hoveredTile.structure = new GatherersCamp();
    }

    // Process
    if (scene.ticks % 30 === 0) {
        scene.economy.process(scene);
    }

    // Game over
    if (scene.economy.settlers < 0) {
        loop = false;
    }

    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}