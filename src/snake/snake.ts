import * as w4 from "../wasm4";
import { Point } from "./point";
import { Direction, directionFromPoints, right } from "./direction";
import { drawHead, drawTail, drawBody } from "./graphics"; 

export class Snake {
    body: Array<Point> = [
        new Point(2, 0),
        new Point(1, 0),
        new Point(0, 0)
    ];

    direction: Direction = right;
    nextDirection: Direction = right;

    setDirection(direction: Direction | null): void {
        if (direction == null) { return; }
        this.nextDirection = direction;
    }

    getHead(): Point {
        return this.body[0];
    }

    update(): void {
        if (!this.nextDirection.isOpposite(this.direction)) {
            this.direction = this.nextDirection;
        }

        let newHead = this.getHead().clone();
        newHead.move(this.direction);
        newHead.wrapBounds(0, 19, 0, 19);

        // add new head
        this.body.unshift(newHead);
        // remove old tail
        this.body.pop();
    }

    draw(): void {
        for (let i = 0, len = this.body.length; i < len; i++) {
            let direction = this.direction;
            if (i > 0) {
                direction = directionFromPoints(this.body[i], this.body[i-1]);
            }

            if (i == 0) {
                drawHead(this.body[i], direction);
            } else if (i == this.body.length - 1) {
                drawTail(this.body[i], direction);
            } else {
                let nextDirection = directionFromPoints(this.body[i+1], this.body[i]);
                drawBody(this.body[i], nextDirection, direction);
            }
        }
    }
}
