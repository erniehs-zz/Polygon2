"use strict";

var Vec2 = require("lib-vec2").Vec2;
var Math2 = require("lib-math2").Math2;

class ABox2 {
  constructor(tl, br) {
    this.tl = tl;
    this.br = br;
  }

  static withABox2(b) {
    return new ABox2(Vec2.withVec2(b.tl), Vec2.withVec2(b.br));
  }

  static withVec2s(vectors) {
    var min = new Vec2(Number.MAX_VALUE, Number.MAX_VALUE);
    var max = new Vec2(Number.MIN_VALUE, Number.MIN_VALUE);
    for(var i in vectors) {
      min.x = Math.min(min.x, vectors[i].x);
      min.y = Math.min(min.y, vectors[i].y);
      max.x = Math.max(max.x, vectors[i].x);
      max.y = Math.max(max.y, vectors[i].y);
    }
    return new ABox2(min, max);
  }

  area() {
    var a = this.br.sub(this.tl);
    return Math.abs(a.x * a.y);
  }

  intersects(b) {
    return (Math2.between(this.tl.x, b.tl.x, b.br.x) || Math2.between(this.br.x, b.tl.x, b.br.x)) &&
      (Math2.between(this.tl.y, b.tl.y, b.br.y) || Math2.between(this.br.y, b.tl.y, b.br.y));
  }

  quad() {
    var m = this.tl.add(this.br.sub(this.tl).div(2));
    return [new ABox2(Vec2.withVec2(this.tl), Vec2.withVec2(m)),
      new ABox2(new Vec2(m.x, this.tl.y), new Vec2(this.br.x, m.y)),
      new ABox2(new Vec2(this.tl.x, m.y), new Vec2(m.x, this.br.y)),
      new ABox2(Vec2.withVec2(m), Vec2.withVec2(this.br))];
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
    return ABox2.withVec2s(this.vectors);
  }
}

module.exports.ABox2 = ABox2;
module.exports.Polygon2 = Polygon2;
