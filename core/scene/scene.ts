import { FPSCounter } from "../../utils/fpsCounter.js";
import { Player } from "./player.js";
import { Tile } from "./tile.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    player = new Player();
    tiles: Tile[] = [];

    constructor(private canvas: HTMLCanvasElement) {
        this.tiles.push(new Tile({ x: 0, y: 0 }));
        this.tiles.push(new Tile({ x: 0, y: -1 }));
        this.tiles.push(new Tile({ x: -1, y: 0 }));
        this.tiles.push(new Tile({ x: 1, y: 0 }));

        console.log(this); // Debug
    }
}