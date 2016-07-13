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