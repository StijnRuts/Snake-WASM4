import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";
import { TEXT_BUTTON_1, TEXT_BUTTON_2 } from "../util/util";

export class Start implements Scene {
    export(): Map<string, usize> { return new Map(); }
    import(map: Map<string, usize>): void {}

    update(gamepad: Gamepad): string {
        if (gamepad.anyButtonPressed()) {
            return "game";
        }

        return "";
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x32);
        w4.text(
            "    Press " + TEXT_BUTTON_1 + " or " + TEXT_BUTTON_2 + "    " +
            "\n  to start the game  ",
            0, 70
        );
    }
}
