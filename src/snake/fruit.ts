import * as w4 from "../wasm4";
import { Point } from "./point";
import { rnd } from "./util";

export class Fruit {
    positions: Array<Point> = [];

    constructor(
        public amount: u8
    ) {}

    addFruit(snakeBody: Array<Point>): void {
        while (this.positions.length < <i32>this.amount) {
            const randomPoint = new Point(rnd(19), rnd(19));
            if (
                !randomPoint.inList(snakeBody) &&
                !randomPoint.inList(this.positions)
            ) {
                this.positions.push(randomPoint);
            }
        }
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x32);
        this.positions.forEach(fruit => w4.oval(fruit.x * 8, fruit.y * 8, 8, 8));
    }
}
