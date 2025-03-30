import { degreesToRadians } from "../utils/utils.js";
import { Vector2 } from "../utils/vector2.js";
import { CTX_FONT, FONT, FONT_SIZE } from "./constants.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { IQuantity } from "./scene/items/iQuantity.js";
import { Rect } from "./rect.js";

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    renderBackground(ctx, canvas);
    renderWorld(ctx, scene);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    ctx.font = CTX_FONT;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 40;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}

function renderWorld(ctx: CanvasRenderingContext2D, scene: Scene) {
    const depth0: Rect = { origin: { x: 0, y: 0 }, size: {x: ctx.canvas.width, y: ctx.canvas.height } };
    const depth1: Rect = { origin: { x: ctx.canvas.width / 4, y: ctx.canvas.height / 4 }, size: {x: ctx.canvas.width / 2, y: ctx.canvas.height / 2 } };
    const depth2: Rect = { origin: { x: ctx.canvas.width / 4 + ctx.canvas.width / 8, y: ctx.canvas.height / 4 + ctx.canvas.height / 8}, size: {x: ctx.canvas.width / 4, y: ctx.canvas.height / 4 } };
    renderRect(ctx, null, "red", depth0.origin.x, depth0.origin.y, depth0.size.x, depth0.size.y);
    renderRect(ctx, null, "red", depth1.origin.x, depth1.origin.y, depth1.size.x, depth1.size.y);
    renderRect(ctx, null, "red", depth2.origin.x, depth2.origin.y, depth2.size.x, depth2.size.y);
    
    renderDepthDiagonals(ctx, depth0, depth2);
}

function renderDepthDiagonals(ctx: CanvasRenderingContext2D, outer: Rect, inner: Rect) {
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

function renderBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement) {
    ctx.fillStyle = "white";
    ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function renderShape(ctx: CanvasRenderingContext2D, origin: Vector2, radius: number, vertices: number, strokeColor: string = null, fillColor: string = null, lineWidth: number = 2, scaleX: number = 1, scaleY: number = 1, rotation: number = 0) {
    ctx.beginPath();
    const angle = Math.PI * 2 / vertices;
    const rotationRadians = degreesToRadians(rotation);
    for (let i = 0; i <= vertices; i++) {
        ctx.lineTo(
            origin.x + radius * Math.cos((i * angle) + rotationRadians) * scaleX, 
            origin.y + radius * Math.sin((i * angle) + rotationRadians) * scaleY
        );
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

function renderRect(ctx: CanvasRenderingContext2D, fillColor: string = null, strokeColor: string = null, x: number = 32, y: number = 32, w: number = 32, h: number = 32, lineWidth: number = 2) {
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