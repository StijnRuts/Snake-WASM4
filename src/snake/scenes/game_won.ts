import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";

export class GameWon implements Scene {
    level: usize = 1;
    score: usize = 0;

    export(): Map<string, usize> { return new Map(); }
    
    import(map: Map<string, usize>): void {}

    update(gamepad: Gamepad): string {
        if (gamepad.anyButtonPressed()) {
            return "level_intro";
        }

        return "";
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x32);
        w4.text("     Game won!      ", 0, 70);
    }
}
