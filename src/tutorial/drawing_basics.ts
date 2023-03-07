import * as w4 from "../wasm4";

export function start(): void {
    setPalette(0xfff6d3, 0xf9a875, 0xeb6b6f, 0x7c3f58);
}

export function update(): void {
    showPalette();

    // DRAW_COLORS contains outline and fill color
    // colors 1-4 are defined by PALETTE
    // 0 is transparent
    store<u16>(w4.DRAW_COLORS, 0x40);
    w4.rect(4, 4, 32, 8); // x, y, width, height

    store<u16>(w4.DRAW_COLORS, 0x32);
    w4.oval(35, 25, 15, 10); // x, y, width, height
    w4.line(20, 20, 30, 40); // x1, y1, x2, y2
    w4.hline(100, 30, 20); // x, y, len
    w4.vline(100, 30, 20); // x, y, len

    // clearScreen();
    pixel(110, 40); // x, y
}

function setPalette(a: u32, b: u32, c: u32, d: u32): void {
    store<u32>(w4.PALETTE, a, 0 * sizeof<u32>());
    store<u32>(w4.PALETTE, b, 1 * sizeof<u32>());
    store<u32>(w4.PALETTE, c, 2 * sizeof<u32>());
    store<u32>(w4.PALETTE, d, 3 * sizeof<u32>());
}

function showPalette(): void {
    store<u16>(w4.DRAW_COLORS, 0x11);
    w4.rect(0, 0, 8, 8);
    store<u16>(w4.DRAW_COLORS, 0x22);
    w4.rect(8, 0, 8, 8);
    store<u16>(w4.DRAW_COLORS, 0x33);
    w4.rect(16, 0, 8, 8);
    store<u16>(w4.DRAW_COLORS, 0x44);
    w4.rect(24, 0, 8, 8);
}

function getOutlineColor(): u8 {
    return u8(load<u16>(w4.DRAW_COLORS) >> 4 & 0b11);
}

function getFillColor(): u8 {
    return u8(load<u16>(w4.DRAW_COLORS) & 0b11);
}

// Direct Framebuffer Access
// The FRAMEBUFFER memory region contains the framebuffer,
// with each byte containing 4 pixels (2 bits per pixel).
// In the framebuffer, the palette colors 1-4 are represented numerically as 0-3.

function clearScreen(): void {
    const paletteColor = getFillColor();
    if (paletteColor == 0) {
        // Transparent
        return;
    }
    const color = (paletteColor - 1) & 0b11;

    const pixel1 = color;
    const pixel2 = color << 2;
    const pixel3 = color << 4;
    const pixel4 = color << 6;
    const pixels = pixel1 | pixel2 | pixel3 | pixel4;

    const pixelsPerByte = 4;
    const framebufferSize = w4.SCREEN_SIZE * w4.SCREEN_SIZE / pixelsPerByte;

    memory.fill(w4.FRAMEBUFFER, pixels, framebufferSize);
}

function pixel (x: i32, y: i32): void {
    const paletteColor = getFillColor();
    if (paletteColor == 0) {
        // Transparent
        return;
    }
    const color = (paletteColor - 1) & 0b11;

    // The byte index into the framebuffer that contains (x, y)
    const idx = (y * w4.SCREEN_SIZE + x) >> 2;

    // Calculate the bits within the byte that corresponds to our position
    const shift = u8((x & 0b11) << 1);
    const mask = u8(0b11 << shift);

    // Write to the framebuffer
    const framebufferIndex = w4.FRAMEBUFFER + idx;
    const oldPixels = load<u8>(framebufferIndex)
    const newPixels = (color << shift) | (oldPixels & ~mask);
    store<u8>(framebufferIndex, newPixels);
}
