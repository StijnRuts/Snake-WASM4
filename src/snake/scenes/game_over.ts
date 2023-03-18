import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";

export class GameOver implements Scene {
    score: usize = 0;

    export(): Map<string, usize> { return new Map(); }
    
    import(map: Map<string, usize>): void {
        this.score = map.has("score") ? map.get("score") : 0;
    }

    update(gamepad: Gamepad): string {
        if (gamepad.anyButtonPressed()) {
            return "game";
        }

        return "";
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x32);
        w4.text(
            "     Game over      " +
            "\n Score: " + this.score.toString() + "          ",
            0, 70
        );
    }
}
