/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};

/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {

/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId])
/******/ 			return installedModules[moduleId].exports;

/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			exports: {},
/******/ 			id: moduleId,
/******/ 			loaded: false
/******/ 		};

/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);

/******/ 		// Flag the module as loaded
/******/ 		module.loaded = true;

/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}


/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;

/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;

/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";

/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(0);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ function(module, exports, __webpack_require__) {

	const Square  = __webpack_require__(1)

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const Square = function Square(ctx, center, size){
	  this.ctx    = (function() { return ctx; })()
	  this.size   = (function() { return size; })()
	  this.center = (function() { return center; })()

	  this.fill = function fill() { draw() }
	  this.outline = function outline() { stroke() }

	  // Private functions
	  const stroke = function stroke() {
	    const sqr = new Path2D();
	    const sqrVertices = getVertices();

	    this.ctx.strokeStyle = 'rgb(200,200,200)';
	    sqr.moveTo(sqrVertices[0].x, sqrVertices[0].y);

	    sqrVertices.forEach(function(coords) {
	      sqr.lineTo(coords.x, coords.y)
	    })
	    this.ctx.stroke(sqr);
	  }.bind(this)

	  const draw = function draw(){
	    const sqr = new Path2D();
	    const sqrVertices = getVertices();
	                        
	    this.ctx.fillStyle = `rgb(${Math.round(center.y * 0.25)},${Math.round(center.y * 0.25)},${Math.round(center.y * 0.75)})`;
	    sqr.moveTo(sqrVertices[0].x, sqrVertices[0].y);

	    sqrVertices.forEach(function(coords) {
	      sqr.lineTo(coords.x, coords.y)
	    })
	    this.ctx.fill(sqr);
	  }.bind(this)

	  const getVertices = function getVertices() {
	    return ([ {x: center.x, y: center.y},
	      {x: center.x + size, y: center.y},
	      {x: center.x + size, y: center.y + size},
	      {x: center.x, y: center.y + size}
	    ])
	  }
	}

	module.exports = Square

/***/ }
/******/ ]);