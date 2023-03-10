import * as w4 from "../wasm4";
import { Point } from "./point";
import { rnd } from "./util";
import { drawFruit } from "./graphics";

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
        this.positions.forEach(fruit => drawFruit(fruit));
    }
}
