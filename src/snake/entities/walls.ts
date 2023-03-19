import * as w4 from "../../wasm4";
import { Point } from "../data/point";

export class Walls {
    constructor(
        public level: usize
    ) {}

    hasWall(point: Point): boolean {
        return this.inWall(this.level, point.x, point.y);
    }

    inWall(level: usize, x: i32, y: i32): boolean {
        if (level == 1) {
            return this.inOuterWall(x, y);
        }
        if (level == 2) {
            return this.inOuterWall(x, y) && !this.inSingelWrap(x, y);
        }
        if (level == 3) {
            return (this.inOuterWall(x, y) && !this.inDoubleWrapWide(x, y))
                || (this.inInnerWall(x, y) && !this.inSingelWrap(x, y));
        }
        if (level == 4) {
            return this.inOuterWall(x, y)
                || (this.inInnerWall(x, y) && !this.inDoubleWrapNarrow(x, y));
        }
        return false;
    }

    inOuterWall(x: i32, y: i32): boolean {
        return x == 0 || y == 0 || x == 19 || y == 19;
    }

    inInnerWall(x: i32, y: i32): boolean {
        return (x == 5 || y == 5 || x == 14 || y == 14)
            && (x >= 5 && y >= 5 && x <= 14 && y <= 14);
    }

    inSingelWrap(x: i32, y: i32): boolean {
        return x == 9 || y == 9 || x == 10 || y == 10;
    }

    inDoubleWrapWide(x: i32, y: i32): boolean {
        return x == 5 || y == 5 || x == 14 || y == 14;
    }

    inDoubleWrapNarrow(x: i32, y: i32): boolean {
        return x == 7 || y == 7 || x == 12 || y == 12;
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x4);
        for (let x = 0; x < 20; x++) {
            for (let y = 0; y < 20; y++) {
                if (this.inWall(this.level, x, y)) {
                    w4.rect(8 * x, 8 * y, 8, 8);
                }
            }
        }
    }
}
