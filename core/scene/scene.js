import { FPSCounter } from "../../utils/fpsCounter.js";
import { Player } from "./player.js";
export class Scene {
    canvas;
    fpsCounter = new FPSCounter();
    ticks = 0;
    player = new Player();
    constructor(canvas) {
        this.canvas = canvas;
        console.log(this); // Debug
    }
}
