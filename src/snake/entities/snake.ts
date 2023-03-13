import * as w4 from "../../wasm4";
import { Point } from "../data/point";
import { Direction, directionFromPoints, right } from "../data/direction";
import { drawHead, drawTail, drawBody } from "../graphics/graphics"; 
import { Gamepad } from "../input/gamepad";
import { Game } from "../scenes/game";

export class Snake {
    body: Array<Point> = [
        new Point(11, 10),
        new Point(10, 10),
        new Point(9, 10)
    ];

    direction: Direction = right;
    nextDirection: Direction = right;
    grow: boolean = false;

    setDirection(direction: Direction | null): void {
        if (direction == null) { return; }
        this.nextDirection = direction;
    }

    getHead(): Point {
        return this.body.at(0);
    }

    getBodyWithoutHead(): Array<Point> {
        return this.body.slice(1);
    }

    getTail(): Point {
        return this.body.at(-1);
    }

    isInHead(point: Point): boolean {
        return point.equals(this.getHead());
    }

    isInBodyWithoutHead(point: Point): boolean {
        return point.inList(this.getBodyWithoutHead());
    }

    isInBody(point: Point): boolean {
        return point.inList(this.body);
    }

    hasCollision(game: Game): boolean {
        return this.getHead().inList(this.getBodyWithoutHead()) ||
            game.walls.hasWall(this.getHead());
    }

    input(gamepad: Gamepad): void {
        this.setDirection(gamepad.getDirection());
    }

    update(game: Game): void {
        if (!this.nextDirection.isOpposite(this.direction)) {
            this.direction = this.nextDirection;
        }

        let newHead = this.getHead().clone();
        newHead.move(this.direction);
        newHead.wrapBounds(0, 19, 0, 19);

        this.body.unshift(newHead); // add new head
        if (!this.grow) {
            this.body.pop(); // remove old tail
        }
        this.grow = false

        if (this.hasCollision(game)) {
            w4.trace("Game over"); // @TODO
        }
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
