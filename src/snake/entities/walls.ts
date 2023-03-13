import * as w4 from "../../wasm4";
import { Point } from "../data/point";

export class Walls {
    positions: Array<Point> = [];

    constructor() {
        for (let i = 0; i < 20; i++) {
            this.positions.push(new Point(i, 0));
            this.positions.push(new Point(i, 19));
            this.positions.push(new Point(0, i));
            this.positions.push(new Point(19, i));
        }
    }

    hasWall(point: Point): boolean {
        return point.inList(this.positions);
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x4);
        this.positions.forEach(wall => w4.rect(wall.x * 8, wall.y * 8, 8, 8));
    }
}
