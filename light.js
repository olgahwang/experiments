// By Roni Kaufman
let lightSketch = function(p){
  let kMax;
  let step;
  let n = 80; // number of blobs
  let radius = 20; // diameter of the circle
  let inter = 1; // difference between the sizes of two blobs
  let maxNoise = 250;

  let noiseProg = (x) => (x);

  p.setup = function() {
    var cnv = p.createCanvas(400, 400);
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

new p5(lightSketch, window.document.getElementById('lightBlob'));

let typeSketch = function(s) {
  let str =
  "Sanjee is magic* musician creator love world smart amazing smart exciting maker partner geek real blessed";
  let str_arr = [];

  let font;
  let sdgreg;

  s.preload = function() {
    font = s.loadFont("./Brown-Regular-Alt.otf");
  }

  s.setup = function() {
    var introCanvas = s.createCanvas(s.windowWidth*0.99, s.windowHeight*0.85, s.WEBGL);
    introCanvas.parent("intro");
    s.colorMode(s.HSB, 360, 100, 100, 100);
    let strs = str.split(" ");
    for (let i = 0; i < strs.length*20; i++) {
      let x = s.random(-s.width / 2, s.width / 2);
      let y = s.random(-s.height / 2, s.height / 2);
      let z = s.random(-s.width*10, s.width);
      str_arr.push(new Type(strs[i%strs.length], x, y, z));
    }
  }

  s.draw = function() {
    s.background(0,0,0);
  	s.orbitControl();
    for (let i = 0; i < str_arr.length; i++) {
      str_arr[i].update();
      str_arr[i].display();
    }
  }

  class Type {
    constructor(_str, _x, _y, _z) {
      this.str = _str;
      this.x = _x;
      this.y = _y;
      this.z = _z;
    }

    update() {
      this.z += 10;
      if(this.z > s.width/2){
      	this.z = -s.width*5;
      }
    }

    display() {
      s.push();
      s.translate(this.x, this.y, this.z);
      s.textAlign(s.CENTER, s.CENTER);
      s.textFont(font);
      s.textSize(100);
  		s.fill(0,0,100);
      s.text(this.str, 0, 0);
      s.pop();
    }
  }

}
new p5(typeSketch, window.document.getElementById('intro'));

let circleInteraction = function(p) {
  var points = [];//array of points that will form the initial circle.
  const r = 150;//radius of the initial circle.

  p.setup = function() {
    var cnv = p.createCanvas(600, 600);
    cnv.parent("interactiveCircle");
    p.pixelDensity(5);
    p.background(250);
    p.angleMode(p.DEGREES);
    p.stroke(0);

    // fill(0);
    p.noFill();

    //definition of the initial circle.
    for (i = 0; i <= 360; i += 1) {
      var x = p.width / 2 + r * p.cos(i);
      var y = p.height / 2 + r * p.sin(i);
      points.push(new Point(x, y));
    }

  }

  p.draw = function() {
    p.background(250);//toogle to display history og the path.
    p.strokeWeight(1);
    p.drawShape();
  }

  class Point {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }

    show() {
      point(this.x, this.y);
    }

  //add noise to each point to corrupt the initial circle.
    obfuscate() {
      var gridScale = 0.1;
      var noiseScale = 15;
      var distance = p.dist(p.mouseX, p.mouseY, this.x, this.y);

      if (distance < 30) {
        //messing around with randomness will produce different results.
        let xoff = p.map(p.noise(this.x * gridScale, this.y * gridScale), 0, 1, -noiseScale, noiseScale);
        let yoff = p.map(p.noise(this.x + 500 * gridScale, this.y * gridScale), 0, 1, -noiseScale, noiseScale);

        this.x += xoff;
        this.y += yoff;
        // this.x+=random(-noiseScale,noiseScale);
        //this.y+=random(-noiseScale,noiseScale);
      }
    }

  }

  //draw the circle or the corrupted shape.
  p.drawShape = function() {
    p.beginShape();
    for (i = 0; i < points.length; i++) {
      p.curveVertex(points[i].x, points[i].y);
      points[i].obfuscate();
      // points[i].show();
    }
    p.endShape(p.CLOSE);

  }
}

new p5(circleInteraction, window.document.getElementById('interactiveCircle'));

let particlesSketch = function(p){
    /*
  Magical trail shader 2

  Inspired by takawo's sketch:
  	https://www.openprocessing.org/sketch/853212

  Author:
    Jason Labbe

  Site:
    jasonlabbe3d.com

  Controls:
  	- Move the mouse to create particles.
  	- Hold the middle mouse button to fade away particles.
  */

  const MAX_TRAIL_COUNT = 30;

  var colorScheme = ["#0A1B28", "#071F43", "#357D7E", "#35EEEE", "#919DF0"];
  var trail = [];
  var particles = [];

  p.setup = function() {
    let canvas = p.createCanvas(p.windowWidth, p.windowHeight);
  	canvas.canvas.oncontextmenu = () => false;  // Removes right-click menu.
    canvas.parent("prtcls");
  	p.noCursor();
  }

  p.draw = function() {
  	p.blendMode(p.BLEND);
  	p.background(0);
  	p.blendMode(p.SCREEN);

  	// Trim end of trail.
  	trail.push([p.mouseX, p.mouseY]);

  	let removeCount = 1;
  	if (p.mouseIsPressed && p.mouseButton == p.CENTER) {
  		removeCount++;
  	}

  	for (let i = 0; i < removeCount; i++) {
  		if (trail.length == 0) {
  			break;
  		}

  		if (p.mouseIsPressed || trail.length > MAX_TRAIL_COUNT) {
  			trail.splice(0, 1);
  		}
  	}

  	// Spawn particles.
  	if (trail.length > 1) {
  		let mouse = new p5.Vector(p.mouseX, p.mouseY);
  		mouse.sub(p.mouseX, p.mouseY);
  		if (mouse.mag() > 5) {
  			mouse.normalize();
  			for (let i = 0; i < 3; i++) {
  				particles.push(new Particle(p.mouseX, p.mouseY, mouse.x, mouse.y));
  			}
  		}
  	}

  	// Move and kill particles.
  	for (let i = particles.length - 1; i > -1; i--) {
  		particles[i].move();
  		if (particles[i].vel.mag() < 0.1) {
  			particles.splice(i, 1);
  		}
  	}

  	// Draw trail.
  	p.drawingContext.shadowColor = p.color(0, 125, 255);

  	for (let i = 0; i < trail.length; i++) {
  		let mass = i * 1.5;
  		p.drawingContext.shadowBlur = mass;

  		p.stroke(0);
  		p.strokeWeight(mass);
  		p.point(trail[i][0], trail[i][1]);
  	}

  	// Draw particles.
  	for (let i = 0; i < particles.length; i++) {
  		let p = particles[i];
  		let mass = p.mass * p.vel.mag() * 0.6;

  		p.drawingContext.shadowColor = color(colorScheme[p.colorIndex]);
  		p.drawingContext.shadowBlur = mass;

  		p.stroke(0);
  		p.strokeWeight(mass);
  		p.point(p.pos.x, p.pos.y);

  		p.stroke(255);
  		p.strokeWeight(mass * 0.05);
  		p.point(p.pos.x, p.pos.y);
  	}
  }
}

new p5(particlesSketch, window.document.getElementById('prtcls'));
