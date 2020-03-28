let str =
"Sanjee is magic* musician creator love world smart amazing smart exciting maker partner geek real blessed";
let str_arr = [];

let font;
let sdgreg;

function preload() {
  font = loadFont("../fonts/Brown-Regular-Alt.otf");
}

function setup() {
  var introCanvas = createCanvas(windowWidth*0.99, windowHeight*0.8, WEBGL);
  introCanvas.parent("intro");
  colorMode(HSB, 360, 100, 100, 100);
  let strs = str.split(" ");
  for (let i = 0; i < strs.length*20; i++) {
    let x = random(-width / 2, width / 2);
    let y = random(-height / 2, height / 2);
    let z = random(-width*10, width);
    str_arr.push(new Type(strs[i%strs.length], x, y, z));
  }
}

function draw() {
  background(0,0,0);
	orbitControl();
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
    if(this.z > width/2){
    	this.z = -width*5;
    }
  }

  display() {
    push();
    translate(this.x, this.y, this.z);
    textAlign(CENTER, CENTER);
    textFont(font);
    textSize(100);
		fill(0,0,100);
    text(this.str, 0, 0);
    pop();
  }
}

// Inspired By Roni Kaufman
