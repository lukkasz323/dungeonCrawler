export type Vector2 = {
    x: number,
    y: number,
}

export function equalsVector2(a: Vector2, b: Vector2): boolean {
    return a.x === b.x && a.y === b.y;
}

export function sumVector2(a: Vector2, b: Vector2): Vector2 {
    return {x: a.x + b.x, y: a.y + b.y}
}

export function differenceVector2(a: Vector2, b: Vector2): Vector2 {
    return {x: b.x - a.x, y: b.y - a.y}
}

export function distanceVector2(a: Vector2, b: Vector2): number {
    return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
}

export function distanceEllipseVector2(a: Vector2, b: Vector2, scale1: number, scale2: number): number {
    return Math.sqrt(((a.x - b.x) ** 2  * scale1) + ((a.y - b.y) ** 2 * scale2));
}

export function normVector2(v: Vector2): number {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}

export function normalizeVector2(v: Vector2): Vector2 {
    const norm = normVector2(v);
    if (norm === 0) {
        return v;
    }
    return {x: v.x / norm, y: v.y / norm}
}

export function directionVector2(a: Vector2, b: Vector2): Vector2 {
    return normalizeVector2(differenceVector2(a, b));
}