import * as w4 from "../../wasm4";

export class Score {
    constructor(
        public value: usize = 0
    ) {}

    add(x: usize): void {
        this.value += x;
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x2);
        w4.text("Score: "+this.value.toString(), 0, 0);
    }
}
