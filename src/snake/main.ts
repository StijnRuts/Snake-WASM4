import * as w4 from "../wasm4";
import { EN4Palette } from "./graphics/palette";
import { Gamepad } from "./input/gamepad";
import { SceneManager } from "./scenes/scene_manager";

const gamepad = new Gamepad(w4.GAMEPAD1);
const sceneManager: SceneManager = new SceneManager(gamepad);

export function start(): void {
    EN4Palette.activate();
}

export function update(): void {
    sceneManager.update();
    sceneManager.draw();
}
