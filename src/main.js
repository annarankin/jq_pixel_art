const Square  = require('./shapes/square.js')

const getRandomNumber = function getRandomNumber(minimum, maximum) {
  const min = minimum || 1
  const max = maximum || 100
  return Math.round(Math.random() * max - min) + min
}

const createNumberArray = function createNumberArray(length) {
  return Array.apply([], Array(length)).map((el, index) => index)
}

let board;
let ctx;

$(function(){
  board = $('#game-board')[0];
  ctx  = board.getContext('2d');
  let drawingState = false;

  $(board).on('mousemove', function(event){
    if(!drawingState) { return }
    fillSquare({x: event.offsetX, y: event.offsetY});
  });

  $(board).on('mousedown', function(event){
    fillSquare({x: event.offsetX, y: event.offsetY});
    drawingState = true
  });
  $(board).on('mouseup', function(event){
    drawingState = false
  });

  function createGrid(board) {
    const width = board.width;
    const height = board.height;
    const pixelSize = 50;
    const maxRows = Math.floor(height/pixelSize)
    const maxCols = Math.floor(width/pixelSize)

    window.grid = createNumberArray(maxRows).map((row, rowIndex) => {
      return createNumberArray(maxCols).map((col, colIndex) => {
        return new Square(ctx, { x: colIndex * pixelSize, y: rowIndex * pixelSize }, pixelSize)
      })
    })
    strokeGrid(window.grid)
  }

  function strokeGrid(grid) {
    grid.forEach((row) => {
      row.forEach((square) => {
        square.outline()
      })
    })
  }

  function fillSquare(coords) {
    // add logic for determining the current pixel user is on
    x = Math.floor((coords.x / 50))
    y = Math.floor((coords.y / 50))
    window.grid[y][x].fill()
  }
  createGrid(board)
});
