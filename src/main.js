const Hex     = require('./shapes/hexagon.js')
const Triangle = require('./shapes/triangle.js')
const Square  = require('./shapes/square.js')

const shapeArray = [ Hex, Triangle, Square ];

const Random = function(ctx, coords, size) {
  const index = getRandomNumber(0,2)
  return shapeArray[index]
}


const getRandomNumber = function getRandomNumber(minimum, maximum) {
  const min = minimum || 1
  const max = maximum || 100
  return Math.round(Math.random() * max - min) + min
}


let board;
let ctx;
let size;

$(function(){
  board = $('#game-board')[0];
  ctx  = board.getContext('2d');
  let drawingState = false;
  let currentShape = Hex;
  let random = false;
  let drawMode = 'drag';

  const $shapeSelect = $('#shape-select');
  $shapeSelect.on('change', function() {
    const userChoice = $(this).val()
    
    switch(userChoice){
      case 'hex':
      currentShape = Hex
      random = false;
      break

      case 'tri':
      currentShape = Triangle
      random = false;
      break

      case 'sqr':
      currentShape = Square
      random = false;
      break

      case 'rand':
      currentShape = Random()
      random = true
      break
    }
  });

  const $modeSelect = $('#mode-select');
  $modeSelect.on('change', function(){
    const userChoice = $(this).val()
    drawMode = userChoice;
  });

  const $startBtn = $('#toggle-drawing');
  $startBtn.on('click', function() {
    $btn = $(this);
    drawingState ? $btn.text('Start') : $btn.text('Drawing')
    drawingState = !drawingState
  });

  $(board).on('mousemove', function(event){
    if(!drawingState || drawMode != 'drag') { return }
    drawShape(event);
  });

  $(board).on('mousedown', function(event){
    if(!drawingState || drawMode != 'click') { return }
    drawShape(event);
  });

function drawShape(event) {
    if(random) {
      const shape = Random()
      return new shape(ctx, {x: event.pageX, y: event.pageY}, getRandomNumber(30, 300)).render()
    }
    new currentShape(ctx, {x: event.pageX, y: event.pageY}, getRandomNumber(30, 300)).render()
  }
});
