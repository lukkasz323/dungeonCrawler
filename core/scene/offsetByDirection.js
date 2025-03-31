import { Direction } from "./direction.js";
export const offsetByDirection = {
    [Direction.North]: { x: 0, y: -1 },
    [Direction.South]: { x: 0, y: 1 },
    [Direction.West]: { x: -1, y: 0 },
    [Direction.East]: { x: 1, y: 0 },
};
