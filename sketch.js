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

let toolbarButtons = [];
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
  toolbarButtons = [];
  const buttonConfigs = [
    { icon: rotateCwIcon, onClick: () => console.log("Rotate Clockwise") },
    { icon: rotateCcwIcon, onClick: () => console.log("Rotate Counter-Clockwise") },
    { icon: moveLeftIcon, onClick: () => console.log("Move Left") },
    { icon: moveRightIcon, onClick: () => console.log("Move Right") },
    { icon: moveUpIcon, onClick: () => console.log("Move Up") },
    { icon: moveDownIcon, onClick: () => console.log("Move Down") },
    { icon: scaleUpIcon, onClick: () => console.log("Scale Up") },
    { icon: scaleDownIcon, onClick: () => console.log("Scale Down") },
    { icon: clearIcon, onClick: () => console.log("Clear") },
    { icon: pivotIcon, onClick: () => console.log("Set Pivot") }
  ];

  buttonConfigs.forEach((config, index) => {
    const button = new ToolBarButton(
      0,
      buttonHeight * index,
      buttonWidth,
      buttonHeight,
      config.icon,
      config.onClick
    );
    toolbarButtons.push(button);
  });

  [
    rotateCwBtn,
    rotateCcwBtn,
    moveLeftBtn,
    moveRightBtn,
    moveUpBtn,
    moveDownBtn,
    scaleUpBtn,
    scaleDownBtn,
    clearBtn,
    pivotBtn
  ] = toolbarButtons;
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
