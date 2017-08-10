# Polygon2

A simple 2d polygon library, for example:

```JavaScript
  var Vec2 = require("lib-vec2").Vec2;
  var Polygon2 = require("lib-polygon2").Polygon2;

  # construct from array of Vec2
  var p = new Polygon2([new Vec2(0, 0), new Vec2(10, 10), new Vec2(10, 20)]);

  # construct from another polygon
  var p2 = Polygon2.fromPolygon2(p);

  # access the vectors
  p.vectors;

  # get the axis aligned bounding box
  var bBox = p.axisAlignedBox();

  # box area
  var area = bBox.area();

  # box intersection
  var ABox2 = require("lib-polygon2").ABox2;
  var bBox2 = new ABox2(new Vec2(0, 0), new Vec2(10, 10));

  if (bBox.intersects(bBox2)) ...
  
  # split the boxes into 4
  var quad = bBox.quad();

  # can be transformed with a affine matrix
  var MatA = require("lib-vec2").MatA;

  var t = MatA.translate(new Vec2(10, 10));
  var pt = p.affineTransform(t);

```
