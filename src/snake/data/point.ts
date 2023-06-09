import { Direction } from "./direction";

export class Point {
    constructor(
        public x: i32,
        public y: i32
    ) {}

    equals(other: Point): boolean {
        return this.x == other.x && this.y == other.y
    }

    inList(list: Array<Point>): boolean {
        for (let i = 0, len = list.length; i < len; i++) {
            if (this.equals(list[i])) {
                return true;
            }
        }
        return false;
    }

    clone(): Point {
        return new Point(this.x, this.y);
    }

    move(direction: Direction): void {
        this.x += direction.x;
        this.y += direction.y;
    }

    wrapBounds(lowerX: i32, upperX: i32, lowerY: i32, upperY: i32): void {
        if (this.x < lowerX) { this.x = upperX; }
        if (this.x > upperX) { this.x = lowerX; }
        if (this.y < lowerY) { this.y = upperY; }
        if (this.y > upperY) { this.y = lowerY; }
    }
}
