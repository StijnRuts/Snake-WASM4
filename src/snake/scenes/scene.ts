import { Gamepad } from "../input/gamepad";

export interface Scene {
    export(): Map<string, usize>;
    import(map: Map<string, usize>): void;
    update(gamepad: Gamepad): string;
    draw(): void;
}
