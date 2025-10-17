let toolBarWidth = 150;
let borderWidth = 10;

function setup() {
  setupScreenLayout();
}

function draw() {
  
}

function setupScreenLayout() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);

  fill('#FFFFFF');
  rect(0, 0, toolBarWidth, windowHeight);
  
  fill('#686868ff');
  rect(toolBarWidth, 0, borderWidth, windowHeight);
}
