import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";
import { Start } from "./start";
import { LevelIntro } from "./level_intro";
import { Game } from "./game";
import { GameOver } from "./game_over";
import { GameWon } from "./game_won";

export class SceneManager {
    scene: Scene = new Start;

    constructor(
        readonly gamepad: Gamepad,
    ) {}

    update(): void {
        this.gamepad.update();
        const next = this.scene.update(this.gamepad);

        if (next != "") {
            const oldScene = this.scene
            const newScene = this.newScene(next);
            newScene.import(oldScene.export());
            this.scene = newScene;
        }
    }

    draw(): void {
        this.scene.draw();
    }

    newScene(name: string): Scene {
        if (name == "level_intro") return new LevelIntro();
        if (name == "game") return new Game();
        if (name == "game_over") return new GameOver();
        if (name == "game_won") return new GameWon();
        return new Start;
    }
}
