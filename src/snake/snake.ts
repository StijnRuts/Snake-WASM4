import * as w4 from "../wasm4";
import { Point } from "./point";
import { Direction, right } from "./direction";

export class Snake {
    body: Array<Point> = [
        new Point(2, 0),
        new Point(1, 0),
        new Point(0, 0)
    ];

    direction: Direction = right;

    setDirection(direction: Direction | null): void {
        if (direction == null) { return; }
        this.direction = direction;
    }

    getHead(): Point {
        return this.body[0];
    }

    update(): void {
        let newHead = this.getHead().clone();
        newHead.move(this.direction);
        newHead.wrapBounds(0, 19, 0, 19);

        // add new head
        this.body.unshift(newHead);
        // remove old tail
        this.body.pop();
    }

    draw(): void {
        // draw body
        store<u16>(w4.DRAW_COLORS, 0x43);
        this.body.forEach(part => w4.rect(part.x * 8, part.y * 8, 8, 8));
        // draw head
        store<u16>(w4.DRAW_COLORS, 0x04);
        const head = this.getHead();
        w4.rect(head.x * 8, head.y * 8, 8, 8);
    }
}
