// By Roni Kaufman
let sketch = function(p){
  let kMax;
  let step;
  let n = 80; // number of blobs
  let radius = 20; // diameter of the circle
  let inter = 1; // difference between the sizes of two blobs
  let maxNoise = 250;

  let noiseProg = (x) => (x);

  p.setup = function() {
    var cnv = p.createCanvas(500, 500);
    cnv.parent("lightBlob");
    //colorMode(HSB, 1);
  	p.angleMode(p.DEGREES);
    p.noFill();
  	//noLoop();
  	kMax = p.random(0.6, 1.0);
  	step = 0.01;
  	p.noStroke();
  }

  p.draw = function() {
  	p.blendMode(p.BLEND);
    p.background(0);
  	p.blendMode(p.ADD);
    let t = p.frameCount/150;
    for (let i = n; i > 0; i--) {
  		let alpha = p.pow(1 - noiseProg(i / n), 3);
  		let size = radius + i * inter;
  		let k = kMax * p.sqrt(i/n);
  		let noisiness = maxNoise * noiseProg(i / n);

  		p.fill(255, 0, 0, alpha*255);
      p.blob(size, p.width/2, p.height/2, k, t - i * step, noisiness);

  		p.fill(0, 255, 0, alpha*255);
      p.blob(size, p.width/2, p.height/2, k, t - i * step + 0.2, noisiness);

  		p.fill(0, 0, 255, alpha*255);
      p.blob(size, p.width/2, p.height/2, k, t - i * step + 0.4, noisiness);
    }
  }

  p.blob = function(size, xCenter, yCenter, k, t, noisiness) {
    p.beginShape();
  	let angleStep = 360 / 8;
    for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
      let r1, r2;
  		/*
      if (theta < PI / 2) {
        r1 = cos(theta);
        r2 = 1;
      } else if (theta < PI) {
        r1 = 0;
        r2 = sin(theta);
      } else if (theta < 3 * PI / 2) {
        r1 = sin(theta);
        r2 = 0;
      } else {
        r1 = 1;
        r2 = cos(theta);
      }
  		*/
  		r1 = p.cos(theta)+1;
  		r2 = p.sin(theta)+1;
      let r = size + p.noise(k * r1,  k * r2, t) * noisiness;
      let x = xCenter + r * p.cos(theta);
      let y = yCenter + r * p.sin(theta);
      p.curveVertex(x, y);
    }
    p.endShape();
  }
}

new p5(sketch, window.document.getElementById('lightBlob'));

document.getElementById("lightBlob").style = "position: absolute; right: 40px; top: 400px; z-index: 1;";
