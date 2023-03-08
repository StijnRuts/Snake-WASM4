import * as w4 from "../wasm4";

let gamepad: u8;
let previousGamepad: u8;

function anyButtonIsPressed(): boolean {
    const diff = gamepad ^ previousGamepad;
    return !!(gamepad & diff);
}

// tone (frequency, duration, volume, flags)
// Frequency is the "pitch", measured in hertz.
// Durations are measured in frames, 1/60ths of a second.
// Volume ranges from 0 (silent) to 100 (full volume).
// Flags sets the channel (0-3), duty cycle (0-3) and panning (0-2).

// TONE_PULSE1: square wave
// TONE_PULSE2: square wave
// TONE_TRIANGLE: triangle wave
// TONE_NOISE: noise

// TONE_MODE1: 12.5% duty cycle (default)
// TONE_MODE2: 25% duty cycle
// TONE_MODE3: 50% duty cycle
// TONE_MODE4: 75% duty cycle

// TONE_PAN_LEFT
// TONE_PAN_RIGHT
// none: pan center

export function start(): void {
}

let activeSound: u8 = 0;
const nrSounds: u8 = 5;

export function update(): void {
    gamepad = load<u8>(w4.GAMEPAD1);

    if (anyButtonIsPressed()) {
        playsound(activeSound);
        activeSound = (activeSound + 1) % nrSounds;
    }

    previousGamepad = gamepad;
}

export function playsound(n: u8): void {
    if (n == 0) {
        // play a one second (60 frames) tone of 262 Hz (middle C) on the first pulse wave channel
        w4.tone(262, 60, 100, w4.TONE_PULSE1);
    } else if (n == 1) {
        // play at 50% duty cycle (square wave)
        w4.tone(262, 60, 100, w4.TONE_PULSE1 | w4.TONE_MODE3);        
    } else if (n == 2) {
        // Frequency Slide
        // We can actually pass two different frequencies to tone()
        // The high 16 bits of the frequency parameter is used for a second frequency
        // If non-zero, it specifies the frequency to slide to over the duration of the tone

        // slide the tone starting from 262 Hz and up to 523 Hz
        w4.tone(262 | (523 << 16), 60, 100, w4.TONE_PULSE1);
    } else if (n == 3) {
        // Volume
        // There are two volume levels that can be passed to the tone function
        // Volume   Shift  Description
        // Sustain  0      The main volume used for the sustain duration
        // Peak     8      Optional, the peak volume reached by the attack duration
        // If the peak volume is not set (or is set to 0), it defaults to 100.

        // ADSR Envelope
        // ADSR describes how the volume changes over time, and has 4 time components:
        // Time     Shift  Description
        // Attack   24     The time it takes to initially ramp up from 0 volume to peak volume
        // Decay    16     The time taken to ramp down from peak volume to the sustain volume
        // Sustain  0      The time to hold the tone steady at the sustain volume
        // Release  8      The time to ramp back down to 0 volume
        // These times are all measured in frames (1/60th of a second), and can be packed into the duration parameter

        // play a tone that sustains for one second and releases over half a second (30 frames)
        w4.tone(262, 60 | (30 << 8), 100, w4.TONE_PULSE1);
    } else if (n == 4) {
        // Tones can be panned either center (default), far left (TONE_PAN_LEFT), or far right (TONE_PAN_RIGHT)
        w4.tone(262, 60, 100, w4.TONE_PULSE1 | w4.TONE_PAN_LEFT);
    }
}

// Setting ADSR flags require the use of various bitwise and bitshift operations
// These functions can be used to understand how they are calculated
function toneFrequency(freq1: i32 = 0, freq2: i32 = 0): u32 {
    return freq1 | (freq2 << 16);
}
function toneDuration(attack: i32 = 0, decay: i32 = 0, sustain: i32 = 0, release: i32 = 0): u32 {
    return (attack << 24) | (decay << 16) | sustain | (release << 8);
}
function toneVolume(peak: i32 = 0, volume: i32 = 0): u32 {
    return (peak << 8) | volume;
}
function toneFlags(channel: i32 = 0, mode: i32 = 0, pan: i32 = 0): u32 {
    return channel | (mode << 2) | (pan << 4);
}

// Sound Tool
// The sound demo and sound test are a great way to quickly experiment with different sounds and find values to plug into your game
// Sound Demo, Bruno Garcia, https://wasm4.org/play/sound-demo
// Sound Test, Mr.Rafael, https://wasm4.org/play/sound-test
