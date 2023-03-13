import * as w4 from "../../wasm4";
import { Gamepad } from "../input/gamepad";
import { Snake } from "../entities/snake";
import { Timer } from "../util/timer";
import { Fruit } from "../entities/fruit";

export class Game {
    snake: Snake = new Snake();
    fruit: Fruit = new Fruit(2);
    timer: Timer = new Timer(15);

    constructor(
        readonly gamepad: Gamepad,
    ) {}

    update(): void {
        this.gamepad.update();
        this.snake.setDirection(this.gamepad.getDirection());
    
        if (this.timer.tick()) {
            this.snake.update();
            this.fruit.addFruit(this.snake.body);
        }
    }

    draw(): void {
        this.snake.draw();
        this.fruit.draw();
    }
}
