let toolBarWidth = 150;
let borderWidth = 10;
let buttonWidth = toolBarWidth;
let buttonHeight;
let numOfButtons = 10;

let rotateCwIcon;
let rotateCcwIcon;
let moveLeftIcon;
let moveRightIcon;
let moveUpIcon;
let moveDownIcon;
let scaleUpIcon;
let scaleDownIcon;
let clearIcon;
let pivotIcon;

let rotateCwBtn;
let rotateCcwBtn;
let moveLeftBtn;
let moveRightBtn;
let moveUpBtn;
let moveDownBtn;
let scaleUpBtn;
let scaleDownBtn;
let clearBtn;
let pivotBtn;

function preload() {
  rotateCwIcon = loadImage('assets/clockwise.png');
  rotateCcwIcon = loadImage('assets/counter_clockwise.png');
  moveLeftIcon = loadImage('assets/arrowLeft.png');
  moveRightIcon = loadImage('assets/arrowRight.png');
  moveUpIcon = loadImage('assets/arrowUp.png');
  moveDownIcon = loadImage('assets/arrowDown.png');
  scaleUpIcon = loadImage('assets/up.png');
  scaleDownIcon = loadImage('assets/down.png');
  clearIcon = loadImage('assets/clear.png');
  pivotIcon = loadImage('assets/toggle.png');
}

function setup() {
  buttonHeight = windowHeight / numOfButtons;

  setupScreenLayout();
  setupToolBarButtons();
}

function draw() {
  drawToolBarButtons();
}

function setupScreenLayout() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);

  fill('#FFFFFF');
  rect(0, 0, toolBarWidth, windowHeight);
  
  fill('#ff0000ff');
  rect(toolBarWidth, 0, borderWidth, windowHeight);
}

function setupToolBarButtons() {
  rotateCwBtn = new ToolBarButton(0, 0, buttonWidth, buttonHeight, rotateCwIcon, () => {
    console.log("Rotate Clockwise");
  });
  rotateCcwBtn = new ToolBarButton(0, buttonHeight, buttonWidth, buttonHeight, rotateCcwIcon, () => {
    console.log("Rotate Counter-Clockwise");
  });
  moveLeftBtn = new ToolBarButton(0, buttonHeight * 2, buttonWidth, buttonHeight, moveLeftIcon, () => {
    console.log("Move Left");
  });
  moveRightBtn = new ToolBarButton(0, buttonHeight * 3, buttonWidth, buttonHeight, moveRightIcon, () => {
    console.log("Move Right");
  });
  moveUpBtn = new ToolBarButton(0, buttonHeight * 4, buttonWidth, buttonHeight, moveUpIcon, () => {
    console.log("Move Up");
  });
  moveDownBtn = new ToolBarButton(0, buttonHeight * 5, buttonWidth, buttonHeight, moveDownIcon, () => {
    console.log("Move Down");
  });
  scaleUpBtn = new ToolBarButton(0, buttonHeight * 6, buttonWidth, buttonHeight, scaleUpIcon, () => {
    console.log("Scale Up");
  });
  scaleDownBtn = new ToolBarButton(0, buttonHeight * 7, buttonWidth, buttonHeight, scaleDownIcon, () => {
    console.log("Scale Down");
  });
  clearBtn = new ToolBarButton(0, buttonHeight * 8, buttonWidth, buttonHeight, clearIcon, () => {
    console.log("Clear");
  });
  pivotBtn = new ToolBarButton(0, buttonHeight * 9, buttonWidth, buttonHeight, pivotIcon, () => {
    console.log("Set Pivot");
  });
}

function drawToolBarButtons() {
  rotateCwBtn.Draw();
  rotateCcwBtn.Draw();
  moveLeftBtn.Draw();
  moveRightBtn.Draw();
  moveUpBtn.Draw();
  moveDownBtn.Draw();
  scaleUpBtn.Draw();
  scaleDownBtn.Draw();
  clearBtn.Draw();
  pivotBtn.Draw();
}