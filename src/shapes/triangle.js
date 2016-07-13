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