import { EN4Palette } from "./palette";
import { Snake } from "./snake";

const snake = new Snake();

export function start(): void {
    EN4Palette.activate();
}

export function update(): void {
    snake.draw();
}
