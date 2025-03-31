export enum Direction {
    North,
    East,
    South,
    West,
}

export function getRightDirection(direction: Direction): Direction {
    if (direction === Object.values(Direction).length / 2 - 1) {
        return 0;
    } else {
        return direction + 1;
    }
}

export function getLeftDirection(direction: Direction): Direction {
    if (direction === 0) {
        return Object.values(Direction).length / 2 - 1;
    } else {
        return direction - 1;
    }
}