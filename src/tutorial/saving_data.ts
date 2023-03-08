import * as w4 from "../wasm4";

let gamepad: u8;
let previousGamepad: u8;

function anyButtonIsPressed(): boolean {
    const diff = gamepad ^ previousGamepad;
    return !!(gamepad & diff);
}

let a: u8 = 0;
let b: u8 = 0;

// To store the value somewhere in memory, we need to get a pointer
const ptr = memory.data(sizeof<u8>());

export function start(): void {
    // load the value of a
    w4.diskr(ptr, sizeof<u8>());
    a = load<u8>(ptr);
}

export function update(): void {
    gamepad = load<u8>(w4.GAMEPAD1);

    if (anyButtonIsPressed()) {
        a++;
        b++;
        
        // save the value of a
        store<u8>(ptr, a);
        w4.diskw(ptr, sizeof<u8>());
    }

    w4.text("a = " + a.toString(), 10, 10);
    w4.text("b = " + b.toString(), 10, 20);

    previousGamepad = gamepad;
}
