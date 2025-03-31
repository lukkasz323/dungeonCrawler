export function equalsVector2(a, b) {
    return a.x === b.x && a.y === b.y;
}
export function sumVector2(a, b) {
    return { x: a.x + b.x, y: a.y + b.y };
}
export function differenceVector2(a, b) {
    return { x: b.x - a.x, y: b.y - a.y };
}
export function distanceVector2(a, b) {
    return Math.sqrt(((a.x - b.x) ** 2) + ((a.y - b.y) ** 2));
}
export function distanceEllipseVector2(a, b, scale1, scale2) {
    return Math.sqrt(((a.x - b.x) ** 2 * scale1) + ((a.y - b.y) ** 2 * scale2));
}
export function normVector2(v) {
    return Math.sqrt(v.x ** 2 + v.y ** 2);
}
export function normalizeVector2(v) {
    const norm = normVector2(v);
    if (norm === 0) {
        return v;
    }
    return { x: v.x / norm, y: v.y / norm };
}
export function directionVector2(a, b) {
    return normalizeVector2(differenceVector2(a, b));
}
