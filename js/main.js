"use strict"
console.log("---\tMAIN LOADED\t---");

const HEIGHT = 600;
const WIDTH = 800;

// Tick update every n seconds;
const TICKSPEED = 0.2;

// MAP RELATED VARS
const MAP_WIDTH = 8;
const MAP_HEIGHT = 8;
const map = [
    // 8x8 map 
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 1, 1, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1
];
// 32x32px blocks
const MAP_BLOCK_SIZE = 32;

// PLAYER OBJECT THAT STORES THE IMPORTANT DATA
const PLAYER = {
    pos_x: 0,
    pos_y: 0,
    // deg
    rotation: 0,
    movement_speed: 0.1,
    overflow_rotation: () => {
        if (rotation = 360) rotation = 0;
    }
};

const wrapper= document.querySelector("div#wrapper");

const createCanvas = (width, height) => {
    if (!wrapper) return 1;

    wrapper.innerHTML = `
    <canvas id="canvas" width="${width}" height="${height}"></canvas>
    `
}

createCanvas(WIDTH, HEIGHT);

const drawPlayer = (ctx) => {
    ctx.fillStyle = "yellow"
    ctx.fillRect(PLAYER.pos_x-0.5, PLAYER.pos_y-0.5, 1, 1);
    overflow_rotation
}

// Canvas Vars
const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

ctx.fillStyle = "#666"
ctx.fillRect(0, 0, WIDTH, HEIGHT);

const draw = () => {
    // TODO
    drawPlayer(ctx);
    console.log(`player x: ${PLAYER.pos_x}\nplayer y: ${PLAYER.pos_y}`);
}

// setInterval(draw, 0.2); 

window.addEventListener("keydown", e => {
    switch(e.key) {
        case "w":
            PLAYER.pos_y -= PLAYER.movement_speed;
            break;
        case "d":
            PLAYER.pos_x += PLAYER.movement_speed;
            break;
        case "s":
            PLAYER.pos_y += PLAYER.movement_speed;
            break;
        case "a":
            PLAYER.pos_x -= PLAYER.movement_speed;
    }  
    if (PLAYER.pos_x < 0) PLAYER.pos_x = 0;
    if (PLAYER.pos_y < 0) PLAYER.pos_y = 0;
    if (PLAYER.pos_x > WIDTH) PLAYER.pos_x = WIDTH;
    if (PLAYER.pos_y > HEIGHT) PLAYER.pos_y = HEIGHT;
});