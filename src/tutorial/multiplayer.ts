import * as w4 from "../wasm4";

// ### Local Multiplayer

// Local multiplayer is where everyone is playing on the same computer.
// To play local multiplayer, you can connect multiple physical USB controllers.

// If all you have is a keyboard, up to 3 players can be controlled from one keyboard using these keys:
// Player  Directions   X button       Z button
// 1       Arrows       . (period)     , (comma)
// 2       ESDF         A or Q         Tab or LShift
// 3       Numpad 8456  Numpad * or .  Numpad - or Enter

// ### Netplay

// Netplay connects gamepad inputs over the Internet using WebRTC.
// WASM-4 implements rollback netcode to keep games fast and responsive.

// Hosting a netplay game is as easy as copy and pasting a link.
//    While playing any cart, press Enter to open the WASM-4 menu.
//    Select "Copy Netplay URL". An invite link (like https://wasm4.org/netplay/#ABCDEF) will be copied to your clipboard for you to send to a friend.
//    When your friend clicks your link, they'll instantly join your game.

// All WASM-4 games that support local multiplayer automatically support netplay.
// There are no additional steps developers need to take to make their games netplay-ready.

// There are currently some caveats to keep in mind:
//    Mouse input is disabled during netplay.
//    State saving/loading and cart reset is currently disabled during netplay.

// WASM-4 exposes the state of netplay to the cart via the NETPLAY memory register.
// Reading this register is not required to implement netplay,
// but it can be used to implement advanced features such as non-shared screen multiplayer

// if (*NETPLAY & 0b100) {
//    int playerIdx = *NETPLAY & 0b011;
//    // Render the game from playerIdx's perspective

// This is a powerful feature enabling games with hidden information, like card games, strategy games, and first person shooters.
// However, caution must be taken by developers to not introduce desynchronization.
// In other words, the netplay player index should only be used to adjust how a frame is rendered, and not affect game logic.
// Each connected player must run the same game logic for all players in order to prevent desyncs.

class Player {
    gamepad: usize;
    color: u8;
    x: i32;
    y: i32;
    active: boolean = false;

    constructor(gamepad: usize, color: u8, x: i32, y: i32) {
        this.gamepad = gamepad;
        this.color = color;
        this.x = x;
        this.y = y;
    }
}

let player1 = new Player(w4.GAMEPAD1, 0x12, 60, 60);
let player2 = new Player(w4.GAMEPAD2, 0x23, 100, 60);
let player3 = new Player(w4.GAMEPAD3, 0x34, 60, 100);
let player4 = new Player(w4.GAMEPAD4, 0x41, 100, 100);

export function start(): void {
}

export function update(): void {
    updatePlayer(player1);
    updatePlayer(player2);
    updatePlayer(player3);
    updatePlayer(player4);
}

function updatePlayer(player: Player): void {
    const keys = load<u8>(player.gamepad);
    const speed = 1;

    if (isDown(keys, w4.BUTTON_LEFT)) {
        player.x = max(0, player.x - speed);
        player.active = true;
    }
    if (isDown(keys, w4.BUTTON_RIGHT)) {
        player.x = min(w4.SCREEN_SIZE, player.x + speed);
        player.active = true;
    }
    if (isDown(keys, w4.BUTTON_UP)) {
        player.y = max(0, player.y - speed);
        player.active = true;
    }
    if (isDown(keys, w4.BUTTON_DOWN)) {
        player.y = min(w4.SCREEN_SIZE, player.y + speed);
        player.active = true;
    }

    store<u16>(w4.DRAW_COLORS, player.color);

    if (player.active) {
        w4.rect(player.x - 6, player.y - 6, 12, 12);
    } else {
        w4.oval(player.x - 3, player.y - 3, 6, 6);
    }
}

function isDown(keys: u8, button: u8): boolean {
    return !!(keys & button);
}
