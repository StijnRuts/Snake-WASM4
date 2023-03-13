import * as w4 from "../../wasm4";
import { Direction, down, left, right, up } from "../data/direction";

export class Gamepad {
    buttons: u8 = 0;

    constructor(
        readonly id: usize,
    ) {}

    update(): void {
        this.buttons = load<u8>(this.id);
    }

    isDown(button: u8): boolean {
        return !!(this.buttons & button);
    }

    getDirection(): Direction | null {
        if (this.isDown(w4.BUTTON_UP)) { return up; }
        if (this.isDown(w4.BUTTON_DOWN)) { return down; }
        if (this.isDown(w4.BUTTON_LEFT)) { return left; }
        if (this.isDown(w4.BUTTON_RIGHT)) { return right; }
        return null;
    }
}
