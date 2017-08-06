"use strict";

var Vec2 = require("lib-vec2").Vec2;

class ABox2 {
  constructor(tl, br) {
    this.tl = tl;
    this.br = br;
  }

  static withABox2(b) {
    return new ABox2(Vec2.withVec2(b.tl), Vec2.withVec2(b.br));
  }

  area() {
    var a = this.br.sub(this.tl);
    return Math.abs(a.x * a.y);
  }
}

class Polygon2 {
  constructor(vectors) {
    this.vectors = vectors.map(v => new Vec2(v.x, v.y));
  }

  static withPolygon2(p) {
    return new Polygon2(p.vectors.map(v => new Vec2(v.x, v.y)));
  }

  affineTransform(m) {
    return new Polygon2(this.vectors.map(v => m.mulV(v)));
  }

  axisAlignedBox() {
    var min = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
    var max = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
    for(var i in this.vectors) {
      min.x = Math.min(min.x, this.vectors[i].x);
      min.y = Math.min(min.y, this.vectors[i].y);
      max.x = Math.max(max.x, this.vectors[i].x);
      max.y = Math.max(max.y, this.vectors[i].y);
    }
    return new ABox2(min, max);
  }
}

module.exports.ABox2 = ABox2;
module.exports.Polygon2 = Polygon2;
