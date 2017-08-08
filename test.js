var Vec2 = require("lib-vec2").Vec2;
var MatA = require("lib-vec2").MatA;
var ABox2 = require("./index").ABox2;
var Polygon2 = require("./index").Polygon2;
var expect = require("chai").expect;

describe("ABox2 is an axis aligned box", function() {
  describe("ABox2 can be constructed", function() {
    it("can be constructed with two vectors", function() {
      var v1 = new Vec2(1, 2);
      var v2 = new Vec2(10, 10);
      var b = new ABox2(v1, v2);
      expect(b.tl).to.deep.equal(v1);
      expect(b.br).to.deep.equal(v2);
      v2.x = 99;
      expect(b.br).to.deep.equal(v2);
    });
    it("can be constructed with another ABox2", function() {
      var v1 = new Vec2(1, 2);
      var v2 = new Vec2(10, 10);
      var b = new ABox2(v1, v2);
      var b1 = ABox2.withABox2(b);
      v1.x = 100;
      expect(b1.tl.x).to.equal(1);
      expect(b1.tl.y).to.equal(2);
      expect(b1.br.x).to.equal(10);
      expect(b1.br.y).to.equal(10);
    });
  });
  describe("ABox2 has an area", function() {
    it("can be calculated", function() {
      var v1 = new Vec2(1, 2);
      var v2 = new Vec2(10, 10);
      var b = new ABox2(v1, v2);
      expect(b.area()).to.equal(72);
    });
  });
  describe("ABox2 can test for intersection of another Abox2", function() {
    it("can test for intersection", function() {
      var box = new ABox2(new Vec2(0, 0), new Vec2(10, 10));
      var boxes = [new ABox2(new Vec2(-10, -10), new Vec2(0, 0)),
        new ABox2(new Vec2(0, -10), new Vec2(10, 0)),
        new ABox2(new Vec2(10, -10), new Vec2(20, 0))
      ];
      boxes.forEach(b => expect(box.intersects(b)).to.be.true);
    });
    it("can test for non-intersection", function() {
      var box = new ABox2(new Vec2(0, 0), new Vec2(10, 10));
      var boxes = [new ABox2(new Vec2(-10, -10), new Vec2(-0.1, -0.1))];
      boxes.forEach(b => expect(box.intersects(b)).to.be.false);
    });
  });
});

describe("Polygon2 is a collection of Vec2's", function() {
  describe("Polygon2 can be constructed", function() {
    it("can be constructed with an array of vectors", function() {
      var vectors = [new Vec2(1, 2), new Vec2(3, 4), new Vec2(5, 5)];
      var p = new Polygon2(vectors);
      expect(p.vectors).to.deep.equal(vectors);
      vectors[0].x = 99;
      expect(vectors[0].x).to.equal(99);
      expect(p.vectors[0].x).to.equal(1);
    });
    it("can be constructed with another polygon", function() {
      var vectors = [new Vec2(1, 2), new Vec2(3, 4), new Vec2(5, 5)];
      var p1 = new Polygon2(vectors);
      var p2 = Polygon2.withPolygon2(p1);
      expect(p1.vectors).to.deep.equal(p2.vectors);
      vectors[0].x = 99;
      p1.vectors[0].x = 66;
      expect(vectors[0].x).to.equal(99);
      expect(p1.vectors[0].x).to.equal(66);
      expect(p2.vectors[0].x).to.equal(1);
    });
  });
  describe("Polygon2 can be transformed", function() {
    it("can be transformed with an affine transform matrix", function() {
      var t = MatA.translate(new Vec2(10, 10));
      var vectors = [new Vec2(1, 2), new Vec2(3, 4), new Vec2(5, 5)];
      var p = new Polygon2(vectors);
      var p1 = p.affineTransform(t);
      expect(p1.vectors[0].x).to.equal(11);
      expect(p1.vectors[0].y).to.equal(12);
      expect(p1.vectors[1].x).to.equal(13);
      expect(p1.vectors[1].y).to.equal(14);
      expect(p1.vectors[2].x).to.equal(15);
      expect(p1.vectors[2].y).to.equal(15);
    });
  });
  describe("Polygon2 can calculate an axis aligned bounding box", function() {
    it("can construct an axis aligned bounding box", function() {
      var vectors = [new Vec2(1, 20), new Vec2(3, 4), new Vec2(5, 15)];
      var p1 = new Polygon2(vectors);
      var b = p1.axisAlignedBox();
      expect(b.tl.x).to.equal(1);
      expect(b.tl.y).to.equal(4);
      expect(b.br.x).to.equal(5);
      expect(b.br.y).to.equal(20);
    });
  });
});
