import * as w4 from "../wasm4";
import { bunny } from "./bunny_sprite";

// 1BPP sprites require 1 Bit Per Pixel.
// That means each pixel can be one of two colors.
// Bit value 0 uses DRAW_COLORS color 1,
// and bit value 1 is DRAW_COLORS color 2.
const smiley = memory.data<u8>([
    0b11000011,
    0b10000001,
    0b00100000,
    0b00100110,
    0b00000000,
    0b00100100,
    0b10011001,
    0b11000011,
]);

export function start(): void {
}

export function update(): void {
    // spritePtr, x, y, width, height, flags
    w4.blit(smiley, 10, 10, 8, 8, w4.BLIT_1BPP);
    w4.blit(smiley, 20, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_X);
    w4.blit(smiley, 30, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_Y);
    w4.blit(smiley, 40, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_X | w4.BLIT_FLIP_Y);
    w4.blit(smiley, 50, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_ROTATE);
    w4.blit(smiley, 60, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_X | w4.BLIT_ROTATE);
    w4.blit(smiley, 70, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_Y | w4.BLIT_ROTATE);
    w4.blit(smiley, 80, 10, 8, 8, w4.BLIT_1BPP | w4.BLIT_FLIP_X | w4.BLIT_FLIP_Y | w4.BLIT_ROTATE);

    w4.blit(bunny.data, 10, 30, bunny.width, bunny.height, bunny.flags);

    // spritePtr, x, y, width, height, srcX, srcY, stride, flags
    // stride: Total width of the overall sprite atlas. This is typically larger than width
    w4.blitSub(bunny.data, 30, 30, bunny.width, bunny.height/2, 0, 0, bunny.width, bunny.flags);
}
