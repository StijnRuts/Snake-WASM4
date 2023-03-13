import { Point } from "./point";

export class Direction {
    constructor(
        readonly x: i32,
        readonly y: i32
    ) {}

    equals(other: Direction): bool {
        return this.x == other.x && this.y == other.y;
    }

    isOpposite(other: Direction): bool {
        return this.x == -1 * other.x && this.y == -1 * other.y;
    }
}

export const up = new Direction(0, -1);
export const down = new Direction(0, 1);
export const left = new Direction(-1, 0);
export const right = new Direction(1, 0);

export function directionFromPoints(from: Point, to: Point): Direction {
    let x = to.x - from.x;
    let y = to.y - from.y;

    // when wrapping from one side to the other
    if (x < -1) { x = 1; }
    if (x > 1) { x = -1; }
    if (y < -1) { y = 1; }
    if (y > 1) { y = -1; }

    return new Direction(x, y);
}
