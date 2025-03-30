export function updateGame(scene, input, canvas, deltaTime) {
    let loop = true;
    // Debug
    if (input.keys.get("Backquote")) {
        scene.fpsCounter.update(deltaTime);
        console.log(scene.fpsCounter.calculateAverage());
    }
    //     if (input.keys.get("Digit1")) scene.mapSpeed = 1;
    //     if (input.keys.get("Digit2")) scene.mapSpeed = 2;
    //     if (input.keys.get("Digit3")) scene.mapSpeed = 4;
    //     if (input.keys.get("Digit4")) scene.mapSpeed = 32;
    //     // UI
    //     if (input.isMouseDown && !input.singleClickLock) {
    //         // Run map button
    //         if (isRectCollidingWithPoint(scene.ui.runMapButton, input.mouseOrigin)) {
    //             scene.isMapActive = !scene.isMapActive;
    //             scene.ui.runMapButton.text = scene.isMapActive ? "Pause Map" : "Run Map";
    //         }
    //         // Inv
    //         for (let i = 0; i < scene.ui.inventory.length; i++) {
    //             const box = scene.ui.inventory[i];
    //             if (isRectCollidingWithPoint(box, input.mouseOrigin)) {
    //                 const item = scene.character.inventory[i];
    //                 // TODO: Item selection
    //             }
    //         }
    //         // Loot
    //         for (let i = 0; i < scene.ui.loot.length; i++) {
    //             const box = scene.ui.loot[i];
    //             const item = scene.loot[i];
    //             if (item && isRectCollidingWithPoint(box, input.mouseOrigin)) {
    //                 scene.character.tryTransferItemToInventory(scene.loot, i);
    //                 scene.character.tryLevelUp();
    //             }
    //         }
    //         input.singleClickLock = true;
    //     }
    //     // Map run  
    //     if (scene.mapProgress >= 100) {
    //         scene.mapProgress = 0;
    //         scene.loot.push(...scene.map.loot());
    //         // scene.character.loot(scene.map.loot()); 
    //         // scene.character.tryLevelUp();
    //     }
    //     if (scene.isMapActive) {
    //         scene.mapProgress += scene.mapSpeed;
    //     }
    // Must be last!
    scene.ticks++;
    if (loop) {
        return true;
    }
    return false;
}
// function updateContext(scene: Scene, context: string) {
//     switch (context) {
//         case "1":
//             break;
//         default:
//             console.error("err");
//             break;
//     }
// }
