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

    draw(): void {
        // draw body
        store<u16>(w4.DRAW_COLORS, 0x43);
        this.body.forEach(part => w4.rect(part.x * 8, part.y * 8, 8, 8));
        // draw head
        store<u16>(w4.DRAW_COLORS, 0x04);
        w4.rect(this.body[0].x * 8, this.body[0].y * 8, 8, 8);
    }
}
