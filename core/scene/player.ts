import { Vector2 } from "../../utils/vector2.js";
import { Direction } from "./direction.js";

export class Player {
    direction: Direction = Direction.North;
    position: Vector2 = {x: 0, y: 0}; 
}