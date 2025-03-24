import { degreesToRadians } from "../utils/utils.js";
import { Vector2 } from "../utils/vector2.js";
import { CTX_FONT, FONT_SIZE } from "./constants.js";
import { Input } from "./scene/input.js";
import { Scene } from "./scene/scene.js";
import { IQuantity } from "./scene/items/iQuantity.js";

export function renderGame(scene: Scene, input: Input, canvas: HTMLCanvasElement) {
    const ctx = canvas.getContext("2d");

    renderBackground(ctx, canvas);
    renderProgressBars(ctx, scene);
    renderStats(ctx, scene);
    renderUI(ctx, scene, input);
    renderDebug(ctx, scene, input);
}

function renderDebug(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    ctx.font = CTX_FONT;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 20;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}

function renderUI(ctx: CanvasRenderingContext2D, scene: Scene, input: Input) {
    for (const box of scene.ui.boxes) {
        renderRect(ctx, "gray", "black", box.origin.x, box.origin.y, box.size.x, box.size.y);
        if (box.text) {
            ctx.fillText(box.text, box.origin.x + 4, box.origin.y + FONT_SIZE);
        }
    }
}

function renderStats(ctx: CanvasRenderingContext2D, scene: Scene) {
    ctx.font = CTX_FONT;
    ctx.fillStyle = "black";
    let x = 20;
    let y = 20;
    ctx.fillText(scene.character.name, x, y += 20);
    ctx.fillText(`Level: ${scene.character.level}`, x, y += 20);
    ctx.fillText(`XP: ${scene.character.xp.quantity} / ${scene.character.xpRequired}`, x, y += 20);
    ctx.fillText(`STR: ${scene.character.str}`, x, y += 20);
    ctx.fillText(`DEX: ${scene.character.dex}`, x, y += 20);
    ctx.fillText(`INT: ${scene.character.int}`, x, y += 20);
    ctx.fillText(`Health: ${scene.character.health}`, x, y += 20);
    
    y += 20;
    ctx.fillText(`Equipment:`, x, y += 20);
    renderRect(ctx, "gray", "black", x += 96, y += 20, 64, 64); // Helmet
    renderRect(ctx, "gray", "black", x + 80, y + 16, 32, 32); // Amulet
    renderRect(ctx, "gray", "black", x, y += 96, 64, 128); // Body armor
    renderRect(ctx, "gray", "black", x - 96 , y - 32, 64, 128); // Main Hand
    renderRect(ctx, "gray", "black", x + 96 , y - 32, 64, 128); // Off Hand
    renderRect(ctx, "gray", "black", x , y += 160, 64, 32); // Belt
    renderRect(ctx, "gray", "black", x - 96 , y, 64, 64); // Gloves
    renderRect(ctx, "gray", "black", x + 96 , y, 64, 64); // Boots
    renderRect(ctx, "gray", "black", x - 48 , y - 48, 32, 32); // Left Ring
    renderRect(ctx, "gray", "black", x + 80 , y - 48, 32, 32); // Right Ring

    x += 200;
    y = 180;
    ctx.fillText(`Inventory:`, x, y += 20);
    for (const item of scene.character.inventory) {
        const text = "quantity" in item ? `${item.displayName} ${(item as IQuantity).quantity}` : item.displayName;
        ctx.fillText(text, x, y += 20);
    }
}

function renderProgressBars(ctx: CanvasRenderingContext2D, scene: Scene) {
    renderProgressBar(ctx, {x: 0, y: 0}, {x: ctx.canvas.width, y: 20}, scene.character.xp.quantity, scene.character.xpRequired, "gold", "gray"); // XP
    renderProgressBar(ctx, {x: 224, y: 66}, {x: 256, y: 16}, scene.mapProgress, 100, "blue", "gray"); // xd
}

function renderProgressBar(ctx: CanvasRenderingContext2D, origin: Vector2, size: Vector2, current: number, max: number, colorProgress: string, colorBackground: string) {
    renderRect(ctx, colorBackground, "black", origin.x + 1, origin.y + 1, size.x - 2, size.y);
    renderRect(ctx, colorProgress, null, origin.x + 4, origin.y + 4, (size.x - 8) * (current / max), size.y - 6);
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