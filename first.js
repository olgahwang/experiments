//Reference:
//Aatish Bhatia https://p5js.org/examples/interaction-wavemaker.html
// Orbiters by Dave Whyte https://beesandbombs.tumblr.com/post/45513650541/orbiters

let t = 0; // time variable
let fnt;
let r = 10, g = 100, b = 20;

function setup() {
  let myCanvas = createCanvas(600, 600);
  myCanvas.parent("myCanvas");
  noStroke();

  fnt = loadFont('./Antonym-Regular.ttf');
}

function draw() {
  if (r < 255 && g < 255){
    r++;
    g++;
  } else {r = 0; g = frameCount%255; b = 0;}
  fill(r, g, b);
  background(40, 20); // translucent background (creates trails)

  // make a x and y grid of ellipses
  for (let x = 0; x <= width; x = x + 60) {
    for (let y = 0; y <= height; y = y + 60) {
      // starting point of each circle depends on mouse position
      const xAngle = map(mouseX, 0, width, -4 * PI, 4 * PI, true);
      const yAngle = map(mouseY, 0, height, -4 * PI, 4 * PI, true);
      // and also varies based on the particle's location
      const angle = xAngle * (x / width) + yAngle * (y / height);

      // each particle moves in a circle
      const myX = x + 20 * cos(2 * PI * t + angle);
      const myY = y + 20 * sin(2 * PI * t + angle);
      textFont(fnt);
      textSize(20);
      text("IT'S FINE",myX, myY); // draw particle
    }
  }

  t = t + 0.01; // update time
}
