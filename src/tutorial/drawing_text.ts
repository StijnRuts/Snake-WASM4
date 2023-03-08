import * as w4 from "../wasm4";
import { write, bitscript } from "./custom_font";

const TEXT_BUTTON_1: string = "\x80";
const TEXT_BUTTON_2: string = "\x81";
const TEXT_BUTTON_LEFT: string = "\x84";
const TEXT_BUTTON_RIGHT: string = "\x85";
const TEXT_BUTTON_UP: string = "\x86";
const TEXT_BUTTON_DOWN: string = "\x87";

export function start(): void {
}

export function update(): void {
    // DRAW_COLORS color 1 is used as the text color
    // DRAW_COLORS color 2 is used as the background color
    store<u16>(w4.DRAW_COLORS, 0x32);
    w4.text("Hello world!", 10, 10);

    w4.text("Press "+TEXT_BUTTON_1+" to jump!", 10, 20);

    const allButtons: string = 
        TEXT_BUTTON_1 +
        TEXT_BUTTON_2 +
        TEXT_BUTTON_LEFT +
        TEXT_BUTTON_RIGHT +
        TEXT_BUTTON_UP +
        TEXT_BUTTON_DOWN;
    w4.text(allButtons, 10, 30);

    write("HELLO WORLD\nWITH A CUSTOM FONT", 10, 40, bitscript);
}
