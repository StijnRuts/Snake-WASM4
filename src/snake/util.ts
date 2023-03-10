export function rnd(max: i32): u16 {
    return u16(Math.floor(Math.random() * max+1));
}
