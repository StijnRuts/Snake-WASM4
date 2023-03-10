import * as w4 from "../wasm4";
import { EN4Palette } from "./palette";
import { Gamepad } from "./gamepad";
import { Snake } from "./snake";
import { Timer } from "./timer";

const gamepad = new Gamepad(w4.GAMEPAD1);
const snake = new Snake();
const timer = new Timer(15);

export function start(): void {
    EN4Palette.activate();
}

export function update(): void {
    gamepad.update();
    snake.setDirection(gamepad.getDirection());

    timer.update(() => {
        snake.update();
    });

    snake.draw();
}
