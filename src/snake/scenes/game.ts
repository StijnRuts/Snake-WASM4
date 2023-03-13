import * as w4 from "../../wasm4";
import { Gamepad } from "../input/gamepad";
import { Snake } from "../entities/snake";
import { Timer } from "../util/timer";
import { Fruit } from "../entities/fruit";
import { Walls } from "../entities/walls";

export class Game {
    snake: Snake = new Snake();
    fruit: Fruit = new Fruit(2);
    walls: Walls = new Walls();
    timer: Timer = new Timer(15);

    constructor(
        readonly gamepad: Gamepad,
    ) {}

    update(): void {
        this.gamepad.update();
        this.snake.input(this.gamepad);
    
        if (this.timer.tick()) {
            this.snake.update(this);
            this.fruit.update(this);
        }
    }

    draw(): void {
        this.walls.draw();
        this.snake.draw();
        this.fruit.draw();
    }
}
