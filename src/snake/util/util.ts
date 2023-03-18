export const TEXT_BUTTON_1: string = "\x80";
export const TEXT_BUTTON_2: string = "\x81";
export const TEXT_BUTTON_LEFT: string = "\x84";
export const TEXT_BUTTON_RIGHT: string = "\x85";
export const TEXT_BUTTON_UP: string = "\x86";
export const TEXT_BUTTON_DOWN: string = "\x87";

export function rnd(max: i32): u16 {
    return u16(Math.floor(Math.random() * max+1));
}
