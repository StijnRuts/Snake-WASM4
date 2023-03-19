import * as w4 from "../../wasm4";
import { Scene } from "./scene";
import { Gamepad } from "../input/gamepad";
import { Score } from "../entities/score";
import { Snake } from "../entities/snake";
import { Fruit } from "../entities/fruit";
import { Walls } from "../entities/walls";
import { Timer } from "../util/timer";

export class Game implements Scene {
    level: usize = 1;
    score: Score = new Score(100);
    snake: Snake = new Snake(11, 10);
    fruit: Fruit = new Fruit(1);
    walls: Walls = new Walls(1);
    timer: Timer = new Timer(15);
    gameOver: boolean = false;

    export(): Map<string, usize> {
        const map = new Map<string, usize>();
        map.set("score", this.score.value);
        map.set("level", this.level);
        return map;
    }
    
    import(map: Map<string, usize>): void {
        this.level = map.has("level") ? map.get("level") : 1;
        this.load();
    }

    load(): void {
        if (this.level == 1) {
            this.score = new Score(150);
            this.fruit = new Fruit(3);
        }
        if (this.level == 2) {
            this.score = new Score(250);
            this.fruit = new Fruit(3);
        }
        if (this.level == 3) {
            this.score = new Score(250);
            this.fruit = new Fruit(2);
        }
        if (this.level == 4) {
            this.score = new Score(300);
            this.snake = new Snake(11, 12);
            this.fruit = new Fruit(1);
        }
        this.walls = new Walls(this.level);
    }

    update(gamepad: Gamepad): string {
        this.snake.input(gamepad);
        
        if (this.timer.tick()) {
            this.snake.update(this);
            this.fruit.update(this);
        }

        if (this.gameOver) {
            return "game_over";
        }

        if (this.score.hasReachedGoal()) {
            return this.level >= 4 ? "game_won" : "level_intro";
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
