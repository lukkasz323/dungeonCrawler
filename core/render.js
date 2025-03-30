import { degreesToRadians } from "../utils/utils.js";
import { CTX_FONT, FONT, FONT_SIZE } from "./constants.js";
export function renderGame(scene, input, canvas) {
    const ctx = canvas.getContext("2d");
    renderBackground(ctx, canvas);
    renderDebug(ctx, scene, input);
}
function renderDebug(ctx, scene, input) {
    ctx.font = CTX_FONT;
    // Mouse coordinates
    ctx.fillStyle = "black";
    let y = 20;
    ctx.fillText(input.mouseOrigin.x.toString(), ctx.canvas.width - 40, y += 20);
    ctx.fillText(input.mouseOrigin.y.toString(), ctx.canvas.width - 40, y += 20);
}
function renderUI(ctx, scene) {
    // Boxes
    for (const box of scene.ui.boxes) {
        renderRect(ctx, "gray", "black", box.origin.x, box.origin.y, box.size.x, box.size.y);
        if (box.text) {
            ctx.fillText(box.text, box.origin.x + 4, box.origin.y + FONT_SIZE);
        }
    }
    // Inv
    for (let i = 0; i < scene.ui.inventory.length; i++) {
        const box = scene.ui.inventory[i];
        const item = scene.character.inventory[i];
        renderRect(ctx, "gray", "black", box.origin.x, box.origin.y, box.size.x, box.size.y);
        if (item) {
            ctx.fillText(item.displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
        }
    }
    // Loot
    for (let i = 0; i < scene.ui.visibleLootSize; i++) {
        const box = scene.ui.loot[i];
        const item = scene.loot[i];
        renderRect(ctx, "gray", "black", box.origin.x, box.origin.y, box.size.x, box.size.y);
        if (item) {
            ctx.fillText(item.displayName, box.origin.x + 4, box.origin.y + FONT_SIZE);
        }
    }
    if (scene.loot.length > scene.ui.visibleLootSize) {
        let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.visibleLootSize) + 8;
        let y = scene.ui.lootOrigin.y + 8;
        ctx.fillStyle = "black";
        ctx.font = `32px ${FONT}`;
        ctx.fillText("+", x, y + FONT_SIZE);
    }
}
function renderLootPlus(ctx, scene) {
    ctx.strokeStyle = "black";
    ctx.lineWidth = 2;
    let x = scene.ui.lootOrigin.x + (scene.ui.boxSize * scene.ui.visibleLootSize) + 8;
    let y = scene.ui.lootOrigin.y + 4;
    ctx.beginPath();
    ctx.moveTo(x, y);
    ctx.lineTo(x + 16, y);
    ctx.closePath();
    ctx.moveTo(x + 8, y - 8);
    ctx.lineTo(x + 8, y + 8);
    ctx.stroke();
}
function renderStats(ctx, scene) {
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
    renderRect(ctx, "gray", "black", x - 96, y - 32, 64, 128); // Main Hand
    renderRect(ctx, "gray", "black", x + 96, y - 32, 64, 128); // Off Hand
    renderRect(ctx, "gray", "black", x, y += 160, 64, 32); // Belt
    renderRect(ctx, "gray", "black", x - 96, y, 64, 64); // Gloves
    renderRect(ctx, "gray", "black", x + 96, y, 64, 64); // Boots
    renderRect(ctx, "gray", "black", x - 48, y - 48, 32, 32); // Left Ring
    renderRect(ctx, "gray", "black", x + 80, y - 48, 32, 32); // Right Ring
    x += 180;
    y = 530;
    ctx.fillText(`Inventory:`, x, y += 20);
    for (let i = 0; i < scene.character.inventory.length; i++) {
        const item = scene.character.inventory[i];
        const text = "quantity" in item ? `${item.displayName} ${item.quantity}` : item.displayName;
        ctx.font = `12px ${FONT}`;
        ctx.fillText(text, x, y += 10);
        if (i !== 0 && i % 25 === 0) {
            x += 80;
            y = 550;
        }
    }
}
function renderProgressBars(ctx, scene) {
    renderProgressBar(ctx, { x: 0, y: 0 }, { x: ctx.canvas.width, y: 20 }, scene.character.xp.quantity, scene.character.xpRequired, "gold", "gray"); // XP
    renderProgressBar(ctx, { x: 450, y: 66 }, { x: 256, y: 16 }, scene.mapProgress, 100, "blue", "gray"); // Map
}
function renderProgressBar(ctx, origin, size, current, max, colorProgress, colorBackground) {
    renderRect(ctx, colorBackground, "black", origin.x + 1, origin.y + 1, size.x - 2, size.y);
    renderRect(ctx, colorProgress, null, origin.x + 4, origin.y + 4, (size.x - 8) * (current / max), size.y - 6);
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
