import { Vector2 } from "../../utils/vector2";
import { Direction } from "./direction.js"

export const offsetByDirection: Record<Direction, Vector2> = {
    [Direction.North]: { x: 0, y: -1 },
    [Direction.South]: { x: 0, y: 1 },
    [Direction.West]: { x: -1, y: 0 },
    [Direction.East]: { x: 1, y: 0 },
} as const;