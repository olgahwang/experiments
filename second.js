// Inspired By Roni Kaufman

let kMax;
let time;
let sk = 1;
let step;
let n = 130; // number of blobs
let radius = 0; // diameter of the circle
let inter = 0.05; // difference between the sizes of two blobs
let maxNoise = 500;
let tx, ty, mv=1;
let noiseProg = (x) => (x);

function setup() {
  let cnv = createCanvas(innerWidth, innerHeight*0.87);
  cnv.parent("secondExperiment");
  colorMode(HSB, 1);
	angleMode(DEGREES);
  noFill();
	//noLoop();
	kMax = random(0.6, 1.5);
	step = 0.01;
	noStroke();
  xx = innerWidth/2-100;
  yy = innerWidth/2-100;
}

function draw() {
  background(1, 0.9, 0.9);
  let t = frameCount/100;
  if (sk > 1 && frameCount%2 == 0){
    sk--;
  }
  if (xx != mouseX){
    mv = abs(xx - mouseX)/50;
    if (xx > mouseX){
      if (abs(xx-mouseX) > 40){
        xx-=3;
        sk=abs(xx-mouseX)/100;
      }
      if (maxNoise > 500){maxNoise=abs(xx - mouseX)*2;}
    } else {
      if (abs(xx-mouseX) > 40){
        xx+=3;
        sk=abs(xx-mouseX)/100;
      }
      if (maxNoise > 500){maxNoise=abs(xx - mouseX)*2;}
    }
  }

  if (yy != mouseY){
    mv = abs(yy - mouseY)/50;
    if (yy > mouseY){
      if (maxNoise > 500){maxNoise=abs(yy - mousey)*2;}
      if (abs(yy-mouseY) > 40){
        yy-=3;
        sk=abs(yy-mouseY)/100;
      }
    } else {
      if (abs(yy-mouseY) > 40){
        yy+=3;
        sk=abs(yy-mouseY)/100;
      }
      if (maxNoise > 500){maxNoise=abs(yy - mousey)*2;}
    }
  }

  for (let i = n; i > 0; i--) {
		let alpha = 1 - noiseProg(i / n);
		fill((alpha/7 + 0.6)%1, 1,1, alpha);
		let size = (radius + i * inter)*sk;
		let k = kMax * sqrt(i/n);
		let noisiness = maxNoise * noiseProg(i / n);
    console.log(sk);
    blob(size*mv, xx, yy, k, t - i * step, noisiness);
  }
}

function blob(size, xCenter, yCenter, k, t, noisiness) {
  beginShape();
	let angleStep = 360 / 10;
  for (let theta = 0; theta <= 360 + 2 * angleStep; theta += angleStep) {
    let r1, r2;
		r1 = cos(theta)+1;
		r2 = sin(theta)+1;
    let r = size + noise(k * r1,  k * r2, t) * noisiness;
    let x = xCenter + r * cos(theta);
    let y = yCenter + r * sin(theta);
    curveVertex(x, y);
  }
  endShape();
}
