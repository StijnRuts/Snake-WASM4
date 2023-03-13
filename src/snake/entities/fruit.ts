import * as w4 from "../../wasm4";
import { Game } from "../scenes/game";
import { Point } from "../data/point";
import { drawFruit } from "../graphics/graphics";
import { rnd } from "../util/util";

export class Fruit {
    positions: Array<Point> = [];

    constructor(
        public amount: u8
    ) {}

    hasFruit(point: Point): boolean {
        return point.inList(this.positions);
    }

    eatFruit(game: Game): void {
        for (let i = this.positions.length - 1; i >= 0; i--) {
            if (game.snake.getHead().equals(this.positions[i])) {
                this.positions.splice(i, 1); // remove fruit
                game.snake.grow = true;
                // @TODO: Add score
            }
        }
    }

    addFruit(game: Game): void {
        while (this.positions.length < <i32>this.amount) {
            const randomPoint = new Point(rnd(19), rnd(19));
            if (
                !game.snake.isInBody(randomPoint) &&
                !game.walls.hasWall(randomPoint) &&
                !this.hasFruit(randomPoint)
            ) {
                this.positions.push(randomPoint);
            }
        }
    }

    update(game: Game): void {
        this.eatFruit(game);
        this.addFruit(game);
    }

    draw(): void {
        this.positions.forEach(fruit => drawFruit(fruit));
    }
}
