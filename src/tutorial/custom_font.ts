import * as w4 from "../wasm4";

// https://opengameart.org/content/bitscript-a-low-res-handwriting-font

class Font {
    constructor(
        readonly data: usize,
        readonly charset: string,
        readonly charWidth: u32,
        readonly charHeight: u32,
        readonly width: u32,
        readonly flags: u32,
    ) {}
}

export const bitscript = new Font(
    memory.data<u8>([
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x08, 0x1c, 0x1c, 0x3c, 0x18, 0x3e,
        0x1c, 0x26, 0x10, 0x2c, 0x12, 0x08, 0x24, 0x26,
        0x1c, 0x3c, 0x1c, 0x78, 0x1c, 0x3c, 0x62, 0x42,
        0x82, 0xc4, 0x42, 0x66, 0x08, 0x32, 0x22, 0x52,
        0x24, 0x51, 0x22, 0x25, 0x28, 0x14, 0x14, 0x08,
        0x24, 0x26, 0x22, 0x52, 0x22, 0xa4, 0x22, 0x52,
        0x22, 0xa5, 0x44, 0x2a, 0x24, 0x1c, 0x14, 0x52,
        0x20, 0x12, 0x20, 0x10, 0x20, 0x26, 0x28, 0x04,
        0x14, 0x08, 0x2c, 0x24, 0x22, 0x52, 0x22, 0xa4,
        0x20, 0x10, 0x22, 0x24, 0x54, 0x10, 0x24, 0x04,
        0x14, 0x5c, 0x40, 0x22, 0x38, 0x38, 0x4e, 0x7c,
        0x28, 0x08, 0x28, 0x10, 0x54, 0x58, 0x42, 0x14,
        0x44, 0x78, 0x18, 0x10, 0x24, 0x28, 0x54, 0x10,
        0x14, 0x08, 0x24, 0xa4, 0x40, 0x62, 0x40, 0x20,
        0x44, 0x48, 0x10, 0x08, 0x34, 0x30, 0x54, 0x48,
        0x44, 0x20, 0x54, 0x48, 0x04, 0x20, 0x44, 0x28,
        0x2c, 0x28, 0x08, 0x10, 0x3c, 0xa4, 0x42, 0xa4,
        0x44, 0xa0, 0x44, 0xc9, 0x10, 0x48, 0x24, 0x52,
        0x44, 0x4a, 0x44, 0xa0, 0x3a, 0x48, 0x44, 0xa0,
        0x44, 0x10, 0x28, 0xa8, 0x48, 0x38, 0x42, 0x5b,
        0x3c, 0x58, 0x38, 0x40, 0x38, 0x46, 0x68, 0x34,
        0x42, 0x2c, 0x82, 0x84, 0x3a, 0x40, 0x08, 0x86,
        0x38, 0x40, 0x3a, 0x10, 0x48, 0x46, 0x30, 0x66
    ]),
    "ABCDEFGHIJKLMNOPQRSTUVWXYZ",
    8,
    8,
    208,
    w4.BLIT_1BPP,
);

export function write(text: string, x: i32, y: i32, font: Font): void {
    // Line and column counters
    let line  : i32 = 0;
    let column: i32 = 0;

    // Iterate through each character
    for (let i = 0; i < text.length; i += 1) {
        const char: string = text.charAt(i);
        const charCode: i32 = char.charCodeAt(0);

        // Break into next line when encounter a "\n" (newline)
        if (charCode === 10) {
            line  += 1;
            column = 0;
            continue;
        }

        // Character index on charset
        let charIndex: i32 = font.charset.indexOf(char);

        // Skip invalid characters, spaces, etc.
        if (charIndex < 0 || charIndex >= font.charset.length) {
            drawSpace(x, y, column, line, font);
            column += 1;
            continue;
        }

        // Draw character
        w4.blitSub(
            font.data,
            x + (column * font.charWidth),
            y + (line * font.charHeight),
            font.charWidth,
            font.charHeight,
            charIndex * font.charWidth,
            0,
            font.width,
            font.flags
        );

        // Advance to next column
        column += 1;
    }
}

function drawSpace(x: i32, y: i32, column: i32, line: i32, font: Font): void {
    const colors = load<u16>(w4.DRAW_COLORS);
    store<u16>(w4.DRAW_COLORS, colors & 0x0F);

    w4.rect(
        x + (column * font.charWidth),
        y + (line * font.charHeight),
        font.charWidth,
        font.charHeight
    );

    store<u16>(w4.DRAW_COLORS, colors);
}
