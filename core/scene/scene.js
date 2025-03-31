import { FPSCounter } from "../../utils/fpsCounter.js";
import { Player } from "./player.js";
import { Tile } from "./tile.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    player = new Player();
    tiles = [];
    constructor(canvas) {
        this.canvas = canvas;
        this.tiles.push(new Tile({ x: 0, y: 0 }));
        this.tiles.push(new Tile({ x: 0, y: -1 }));
        this.tiles.push(new Tile({ x: -1, y: 0 }));
        this.tiles.push(new Tile({ x: 1, y: 0 }));
        console.log(this); // Debug
    }
}
