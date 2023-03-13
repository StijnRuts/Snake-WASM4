import * as w4 from "../../wasm4";
import { snake_sprite } from "./snake_sprite";
import { Point } from "../data/point";
import { Direction, up, down, left, right } from "../data/direction";

function drawSprite(index: u8, point: Point): void {
    // color 4 is transparent
    store<u16>(w4.DRAW_COLORS, 0x0321);
    w4.blitSub(
        snake_sprite.data,
        point.x * 8, point.y * 8, 8, 8,
        index * 8, 0, snake_sprite.width,
        snake_sprite.flags
    );
}

export function drawFruit(point: Point): void {
    drawSprite(14, point);
}

export function drawHead(point: Point, direction: Direction): void {
    drawSprite(getHeadIndex(direction), point);
}

export function drawTail(point: Point, direction: Direction): void {
    drawSprite(getTailIndex(direction), point);
}

export function drawBody(point: Point, direction: Direction, from: Direction): void {
    drawSprite(getBodyIndex(direction, from), point);
}

function getHeadIndex(direction: Direction): u8 {
    if (direction.equals(up)) return 0;
    if (direction.equals(down)) return 1;
    if (direction.equals(left)) return 2;
    if (direction.equals(right)) return 3;
    throw new Error(
        "getHeadIndex: invalid direction " +
        direction.x.toString()+","+direction.y.toString()
    );
}

function getTailIndex(direction: Direction): u8 {
    if (direction.equals(up)) return 4;
    if (direction.equals(down)) return 5;
    if (direction.equals(left)) return 6;
    if (direction.equals(right)) return 7;
    throw new Error(
        "getTailIndex: invalid direction " +
        direction.x.toString()+","+direction.y.toString()
    );
}

function getBodyIndex(direction: Direction, from: Direction): u8 {
    if (direction.equals(up) && from.equals(up)) return 8;
    if (direction.equals(up) && from.equals(left)) return 11;
    if (direction.equals(up) && from.equals(right)) return 10;
    if (direction.equals(down) && from.equals(down)) return 8;
    if (direction.equals(down) && from.equals(left)) return 13;
    if (direction.equals(down) && from.equals(right)) return 12;
    if (direction.equals(left) && from.equals(up)) return 12;
    if (direction.equals(left) && from.equals(down)) return 10;
    if (direction.equals(left) && from.equals(left)) return 9;
    if (direction.equals(right) && from.equals(up)) return 13;
    if (direction.equals(right) && from.equals(down)) return 11;
    if (direction.equals(right) && from.equals(right)) return 9;
    throw new Error(
        "getBodyIndex: invalid direction " +
        direction.x.toString()+","+direction.y.toString() +
        " from " + from.x.toString()+","+from.y.toString()
    );
}
