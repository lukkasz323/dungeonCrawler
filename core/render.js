import { degreesToRadians } from "../utils/utils.js";
import { CTX_FONT } from "./constants.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderWorld(ctx, scene);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    ctx.font = CTX_FONT;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 40;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}
function renderWorld(ctx, scene) {
    const depth0 = { origin: { x: 0, y: 0 }, size: { x: ctx.canvas.width, y: ctx.canvas.height } };
    const depth1 = { origin: { x: ctx.canvas.width / 4, y: ctx.canvas.height / 4 }, size: { x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 } };
    const depth2 = { origin: { x: ctx.canvas.width / 4 + ctx.canvas.width / 8, y: ctx.canvas.height / 4 + ctx.canvas.height / 8 }, size: { x: ctx.canvas.width / 4, y: ctx.canvas.height / 4 } };
    renderRect(ctx, null, "red", depth0.origin.x, depth0.origin.y, depth0.size.x, depth0.size.y);
    renderRect(ctx, null, "red", depth1.origin.x, depth1.origin.y, depth1.size.x, depth1.size.y);
    renderRect(ctx, null, "red", depth2.origin.x, depth2.origin.y, depth2.size.x, depth2.size.y);
    renderDepthDiagonals(ctx, depth0, depth1);
}
function renderDepthDiagonals(ctx, outer, inner) {
    // Top left
    ctx.moveTo(outer.origin.x, outer.origin.y);
    ctx.lineTo(inner.origin.x, inner.origin.y);
    // Top right
    ctx.moveTo(outer.origin.x + outer.size.x, outer.origin.y);
    ctx.lineTo(inner.origin.x + inner.size.x, inner.origin.y);
    // Bottom left
    ctx.moveTo(outer.origin.x, outer.origin.y + outer.size.y);
    ctx.lineTo(inner.origin.x, inner.origin.y + inner.size.y);
    // Bottom right
    ctx.moveTo(outer.origin.x + outer.size.x, outer.origin.y + outer.size.y);
    ctx.lineTo(inner.origin.x + inner.size.x, inner.origin.y + inner.size.y);
    ctx.stroke();
}
function renderBackground(ctx, canvas) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}
function renderShape(ctx, origin, radius, vertices, strokeColor = null, fillColor = null, lineWidth = 2, scaleX = 1, scaleY = 1, rotation = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY);
    }
    if (fillColor) {
        ctx.fillStyle = fillColor;
        ctx.fill();
    }
    if (strokeColor) {
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.stroke();
    }
}
function renderRect(ctx, fillColor = null, strokeColor = null, x = 32, y = 32, w = 32, h = 32, lineWidth = 2) {
    let previousFillStyle;
    let previousStrokeStyle;
    if (fillColor) {
        previousFillStyle = ctx.fillStyle;
        ctx.fillStyle = fillColor;
        ctx.fillRect(x, y, w, h);
    }
    if (strokeColor) {
        previousStrokeStyle = ctx.strokeStyle;
        ctx.lineWidth = lineWidth;
        ctx.strokeStyle = strokeColor;
        ctx.strokeRect(x, y, w, h);
    }
    ctx.fillStyle = previousFillStyle;
    ctx.strokeStyle = previousStrokeStyle;
}
