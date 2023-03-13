import * as w4 from "../../wasm4";

class Palette {
    constructor(
        public color1: u32,
        public color2: u32,
        public color3: u32,
        public color4: u32,
    ) {}

    activate(): void {
        store<u32>(w4.PALETTE, this.color1, 0 * sizeof<u32>());
        store<u32>(w4.PALETTE, this.color2, 1 * sizeof<u32>());
        store<u32>(w4.PALETTE, this.color3, 2 * sizeof<u32>());
        store<u32>(w4.PALETTE, this.color4, 3 * sizeof<u32>());
    }
}

export const defaultPalette = new Palette(
    0xe0f8cf, 0x86c06c, 0x306850, 0x071821
);

export const EN4Palette = new Palette(
    0xfbf7f3, 0xe5b083, 0x426e5d, 0x20283d
);

