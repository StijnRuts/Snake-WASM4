import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";
import { Timer } from "../util/timer";

export class LevelIntro implements Scene {
    level: usize = 1;
    timer: Timer = new Timer(120);

    export(): Map<string, usize> {
        const map = new Map<string, usize>();
        map.set("level", this.level);
        return map;
    }
    
    import(map: Map<string, usize>): void {
        this.level = map.has("level") ? map.get("level") : 0;
        this.level++;
    }

    update(gamepad: Gamepad): string {
        if (this.timer.tick()) {
            return "game";
        }

        return "";
    }

    draw(): void {
        store<u16>(w4.DRAW_COLORS, 0x32);
        w4.text("      Level " + this.level.toString() + "       ", 0, 70);
    }
}
