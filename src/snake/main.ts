import * as w4 from "../wasm4";
import { EN4Palette } from "./graphics/palette";
import { Gamepad } from "./input/gamepad";
import { Game } from "./scenes/game";

const gamepad = new Gamepad(w4.GAMEPAD1);
const game = new Game(gamepad);

export function start(): void {
    EN4Palette.activate();
}

export function update(): void {
    game.update();
    game.draw();
}
