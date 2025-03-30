import { FPSCounter } from "../../utils/fpsCounter.js";
import { Vector2 } from "../../utils/vector2.js";
import { Character } from "./character.js";
import { Item } from "./items/item.js";
import { MapItem } from "./map.js";
import { Player } from "./player.js";
import { UI } from "./ui/ui.js";

export class Scene {
    fpsCounter = new FPSCounter();
    ticks = 0;
    player = new Player();

    constructor(private canvas: HTMLCanvasElement) {

        console.log(this); // Debug
    }
}