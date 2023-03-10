export class Direction {
    constructor(
        readonly x: i32,
        readonly y: i32
    ) {}
}

export const up = new Direction(0, -1);
export const down = new Direction(0, 1);
export const left = new Direction(-1, 0);
export const right = new Direction(1, 0);
