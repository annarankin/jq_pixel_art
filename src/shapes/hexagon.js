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