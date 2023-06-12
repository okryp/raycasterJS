"use strict"

const COS = Math.cos;
const SIN = Math.sin;
const TAN = Math.tan;
const INT = Math.floor;

// --- DOM --- //
const CANVAS_WIDTH = 800
const CANVAS_HEIGHT = 600

document.querySelector("#wrapper").innerHTML = `
    <canvas id="canvas" width="${CANVAS_WIDTH}" height="${CANVAS_HEIGHT}"></canvas> 
`

const canvas = document.querySelector("#canvas");
const ctx = canvas.getContext("2d");

// --- MAP --- //
const MAP_WIDTH = 8;
const MAP_HEIGHT = 8;
// W x H
const MAP_SIZE = 64;

const MAP = [
    1, 1, 1, 1, 1, 1, 1, 1,
    1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 1, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 0, 0, 0, 0, 1, 0, 1,
    1, 0, 0, 0, 0, 0, 0, 1,
    1, 1, 1, 1, 1, 1, 1, 1,
];

// --- PLAYER --- //

const degToRad = (angle) => angle*Math.PI/180;
const fixAngle = (angle) => {
    if (angle > 359) {angle -= 360} 
    if (angle < 0) {angle += 360}
}

let px = 0, py = 0, pdx = 0, pdy = 0, pa = 0;

window.addEventListener("keydown", e => {
    if (e.key == "a") { pa += 5; pa = fixAngle(pa); pdx = COS(degToRad(pa)); pdy = SIN(degToRad(pa));}
    if (e.key == "a") { pa -= 5; pa = fixAngle(pa); pdx = COS(degToRad(pa)); pdy = SIN(degToRad(pa));}
    if (e.key == "w") { px += pdx * 5; py += pdy * 5}
    if (e.key == "s") { px -= pdx * 5; py -= pdy * 5}
});

// --- RAYCASTING --- //

const distance = (ax, ay, bx, by, ang) => {return COS(degToRad(ang))*(bx-ax)-SIN(degToRad(ang))*(by-ay)};

const drawRays = (ctx) => {
    // Draw ground
    ctx.fillStyle = "#0ff";
    ctx.fillRect(0, 0 , CANVAS_WIDTH, CANVAS_HEIGHT);
    ctx.fillStyle = "#00f";
    ctx.fillRect(0, CANVAS_HEIGHT/2, CANVAS_WIDTH, CANVAS_HEIGHT);

    let r, mx, my, mp, dof, side;
    let vx, vy, rx, ry, ra, xo, yo, disV, disH;

    ra = fixAngle(pa+30);

    for (r = 0; r < 60; r++) {
        // vertical
        dof = 0; side = 0; disV = 0;
        let tan = TAN(degToRad(ra));
        if (COS(degToRad(ra)) > 0.001) {
            rx = ((INT(px)>>6)<<6) + 64;
            ry = (px - rx) * tan + py;
            xo = 64; yo = -xo * tan;
        } else if (COS(degToRad(ra)) < -0.001) {
            rx = ((INT(px)>>6)<<6) - 0.0001;
            ry = (px - rx) * tan + py;
            xo = -64; yo = -xo * tan;
        } else {
            rx = px; ry = py; dof = 8;
        }
        vx=rx; vy=ry;
        // horizontal
        dof = 0; disH=100000;
        tan = 1.0/tan;
        if (SIN(degToRad(ra)) > 0.001) { 
            ry = ((INT(py)>>6)<<6) - 0.0001;
            rx = (py - ry) * tan + px;
            yo = -64; xo = -yo * tan; 
        } else if (SIN(degToRad(ra)) < -0.001) {
            ry = ((INT(py)>>6)<<6) + 64;
            rx = (py - ry) * tan + px;
            yo = 64; xo = -yo * tan;
        } else {
            rx = px; ry = py; dof = 8;
        }

        while (dof < 8) {
            mx = INT(rx) >> 6; my = INT(ry) >> 6; mp = my * MAP_WIDTH + mx;
             
        }
    }
}