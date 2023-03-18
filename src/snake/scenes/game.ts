import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";
import { Score } from "../entities/score";
import { Snake } from "../entities/snake";
import { Fruit } from "../entities/fruit";
import { Walls } from "../entities/walls";
import { Timer } from "../util/timer";

export class Game implements Scene {
    score: Score = new Score();
    snake: Snake = new Snake();
    fruit: Fruit = new Fruit(2);
    walls: Walls = new Walls();
    timer: Timer = new Timer(15);
    gameOver: boolean = false;

    export(): Map<string, usize> {
        const map = new Map<string, usize>();
        map.set("score", this.score.value);
        return map;
    }
    
    import(map: Map<string, usize>): void {}

    update(gamepad: Gamepad): string {
        this.snake.input(gamepad);
        
        if (this.timer.tick()) {
            this.snake.update(this);
            this.fruit.update(this);
        }

        if (this.gameOver) {
            return "game_over";
        }

        return "";
    }

    draw(): void {
        this.walls.draw();
        this.score.draw();
        this.snake.draw();
        this.fruit.draw();
    }
}
