import * as w4 from "../../wasm4";

export class Score {
    value: usize = 0

    constructor(
        public goal: usize = 100
    ) {}

    add(x: usize): void {
        this.value += x;
    }

    hasReachedGoal(): boolean {
        return this.value >= this.goal;
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x2);
        w4.text(
            "Score: " + this.value.toString() + " / " + this.goal.toString(),
            0, 0
        );
    }
}
