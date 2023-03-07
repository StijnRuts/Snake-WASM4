import * as w4 from "../wasm4";

let gamepad: u8;
let previousGamepad: u8;

export function start(): void {
}

export function update(): void {
    updateButtons();
    updateMouse();
}

function updateButtons(): void {
    gamepad = load<u8>(w4.GAMEPAD1);

    updateButton(w4.BUTTON_LEFT, 20, 35);
    updateButton(w4.BUTTON_RIGHT, 50, 35);
    updateButton(w4.BUTTON_UP, 35, 20);
    updateButton(w4.BUTTON_DOWN, 35, 50);
    updateButton(w4.BUTTON_1, 100, 35);
    updateButton(w4.BUTTON_2, 130, 35);

    previousGamepad = gamepad;
}

function updateButton(button: u8, x: i32, y: i32): void {
    const color = getButtonColor(button);
    store<u16>(w4.DRAW_COLORS, color);

    if (isDown(button)) {
        y += 2;
    }
    w4.rect(x - 5, y - 5, 10, 10);
}

function getButtonColor(button: u8): u8 {
    return (isPressed(button) || isReleased(button)) ? 0x33 : 0x22;
}

function isDown(button: u8): boolean {
    return !!(gamepad & button);
}
function isUp(button: u8): boolean {
    return !!(~gamepad & button);
}
function isPressed(button: u8): boolean {
    const diff = gamepad ^ previousGamepad;
    return !!(gamepad & diff & button);
}
function isReleased(button: u8): boolean {
    const diff = gamepad ^ previousGamepad;
    return !!(~gamepad & diff & button);
}

function updateMouse(): void {
    const mouse  = load<u8>(w4.MOUSE_BUTTONS);
    const mouseX = load<i16>(w4.MOUSE_X);
    const mouseY = load<i16>(w4.MOUSE_Y);

    if (mouse & w4.MOUSE_LEFT) {
        store<u16>(w4.DRAW_COLORS, 0x44);
        w4.rect(mouseX - 8, mouseY - 8, 16, 16);
    } else {
        store<u16>(w4.DRAW_COLORS, 0x33);
        w4.rect(mouseX - 4, mouseY - 4, 8, 8);
    }
}
