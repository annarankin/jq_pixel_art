'use strict'

let ctx;
let center;
let hex;
let size;

$(function(){

  const board = $('#game-board')[0];
  ctx  = board.getContext('2d');
  size = 20;

  const rows  = createNumberArray(31)
  const hexes = rows.map(createRow) 


  hexes.forEach(function(row){
    row.forEach(function(center){
      drawHex(center, size);
    })
  })
})

function createRow(i) { return row(i, 25, 25) }

function row(y, x, yOffset) {
  const initialX = (y % 2 ? 30 : 0) + x
  const blanks    = createNumberArray(13)
  const hexes     = blanks.map((el, i) => { return({x: (initialX + (i * size * 3)), y: (y * size * 0.90) + yOffset}) })
  return hexes;
}

function drawHex(center, size) {
  const hex = new Path2D();
  const emptyArray = createNumberArray(6)
  const hexVertices = emptyArray
                      .map(function(el, index){ return {center, size, index} })
                      .map(hexCorner);
                      
  ctx.fillStyle = `rgb(${Math.round(center.y * 0.25)},${Math.round(center.y * 0.25)},${Math.round(center.y * 0.75)})`;
  hex.moveTo(hexVertices[0].x, hexVertices[0].y);

  hexVertices.forEach(function(coords) {
    hex.lineTo(coords.x, coords.y)
  })
  ctx.fill(hex);
}

function createNumberArray(length) {
  return Array.apply([], Array(length)).map((el, index)=> index)
}

function hexCorner(options) {
  const angleDegree = 60 * options.index;
  const angleRadius = Math.PI / 180 * angleDegree;
  return({x: (options.center.x + options.size * Math.cos(angleRadius)),
          y: (options.center.y + options.size * Math.sin(angleRadius)) })
}