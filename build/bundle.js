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

	const Hex     = __webpack_require__(1)
	const Triangle = __webpack_require__(2)
	const Square  = __webpack_require__(3)

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


/***/ },
/* 1 */
/***/ function(module, exports) {

	const Hexagon = function Hexagon(ctx, coords, size){
	  this.ctx    = (function() { return ctx; })()
	  this.size   = (function() { return size; })()
	  this.coords = (function() { return coords; })()

	  this.render = function render(){
	    drawHex()
	  }

	  // Private functions
	  const drawHex = function drawHex(){
	    const hex = new Path2D();
	    const hexVertices = getHexVertices();
	                        
	    this.ctx.fillStyle = `rgb(${Math.round(coords.y * 0.25)},${Math.round(coords.y * 0.25)},${Math.round(coords.y * 0.75)})`;
	    hex.moveTo(hexVertices[0].x, hexVertices[0].y);

	    hexVertices.forEach(function(hexCoords) {
	      hex.lineTo(hexCoords.x, hexCoords.y)
	    })
	    this.ctx.fill(hex);
	  }.bind(this)

	  const getHexVertices = function getHexVertices() {
	    const emptyArray = createNumberArray(6)
	    const hexVertices = emptyArray.map(hexCorner);
	    return hexVertices;
	  }

	  const hexCorner = function hexCorner(el, index) {
	    const angleDegree = 60 * index;
	    const angleRadius = Math.PI / 180 * angleDegree;
	    return({x: (this.coords.x + this.size/2 * Math.cos(angleRadius)),
	            y: (this.coords.y + this.size/2 * Math.sin(angleRadius)) })
	  }.bind(this)

	  const createNumberArray = function createNumberArray(length) {
	    return Array.apply([], Array(length)).map((el, index) => index)
	  }
	}

	module.exports = Hexagon

/***/ },
/* 2 */
/***/ function(module, exports) {

	const Triangle = function Triangle(ctx, coords, size){
	  this.ctx    = (function() { return ctx; })()
	  this.size   = (function() { return size; })()
	  this.coords = (function() { return coords; })()

	  this.render = function render(){
	    draw()
	  }

	  // Private functions
	  const draw = function draw(){
	    const tri = new Path2D();
	    const triVertices = getTriVertices();
	                        
	    this.ctx.fillStyle = `rgb(${Math.round(coords.y * 0.25)},${Math.round(coords.y * 0.25)},${Math.round(coords.y * 0.75)})`;
	    tri.moveTo(triVertices[0].x, triVertices[0].y);

	    triVertices.forEach(function(triCoords) {
	      tri.lineTo(triCoords.x, triCoords.y)
	    })
	    this.ctx.fill(tri);
	  }.bind(this)

	  const getTriVertices = function getTriVertices() {
	    const offset = size/2
	    return ([ {x: coords.x, y: coords.y - offset},
	      {x: coords.x + offset, y: coords.y + offset},
	      {x: coords.x - offset, y: coords.y + offset}
	    ])
	  }
	}

	module.exports = Triangle

/***/ },
/* 3 */
/***/ function(module, exports) {

	const Square = function Square(ctx, center, size){
	  this.ctx    = (function() { return ctx; })()
	  this.size   = (function() { return size; })()
	  this.center = (function() { return center; })()

	  this.render = function render(){
	    draw()
	  }

	  // Private functions
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
	    const offset = size/2
	    return ([ {x: center.x - offset, y: center.y - offset},
	      {x: center.x + offset, y: center.y - offset},
	      {x: center.x + offset, y: center.y + offset},
	      {x: center.x - offset, y: center.y + offset}
	    ])
	  }
	}

	module.exports = Square

/***/ }
/******/ ]);