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
let vertices = [];
let pivotPoint;
let currentMode = 'addVertex';
const vertexDiameter = 6;
const pivotDiameter = 6;
const rotationAngleDegrees = 45;
const translationStep = 10;
const scaleUpFactor = 1.05;
const scaleDownFactor = 0.95;

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
  initializeDrawingBoardState();
  setupToolBarButtons();
}

function draw() {
  drawLayout();
  drawDrawingBoard();
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

function drawLayout() {
  background(0,0,0);

  fill('#FFFFFF');
  rect(0, 0, toolBarWidth, height);

  fill('#ff0000ff');
  rect(toolBarWidth, 0, borderWidth, height);

  const modeLabel = currentMode === 'setPivot' ? 'Mode: Set Pivot' : 'Mode: Add Vertices';
  noStroke();
  fill('#FFFFFF');
  textSize(16);
  textAlign(LEFT, TOP);
  text(modeLabel, getDrawingBoardLeft() + 10, 10);
}

function setupToolBarButtons() {
  toolbarButtons = [];
  const buttonConfigs = [
    { icon: rotateCwIcon, onClick: rotateVerticesClockwise },
    { icon: rotateCcwIcon, onClick: rotateVerticesCounterClockwise },
    { icon: moveLeftIcon, onClick: moveVerticesLeft },
    { icon: moveRightIcon, onClick: moveVerticesRight },
    { icon: moveUpIcon, onClick: moveVerticesUp },
    { icon: moveDownIcon, onClick: moveVerticesDown },
    { icon: scaleUpIcon, onClick: scaleVerticesUp },
    { icon: scaleDownIcon, onClick: scaleVerticesDown },
    { icon: clearIcon, onClick: clearDrawingBoard },
    { icon: pivotIcon, onClick: togglePivotPlacementMode }
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

function drawDrawingBoard() {
  drawVertexConnections();
  drawVertices();
  drawPivotPoint();
}

function drawVertexConnections() {
  if (vertices.length < 2) {
    return;
  }

  stroke('#0000ff');
  strokeWeight(3);
  noFill();

  if (vertices.length === 2) {
    line(vertices[0].x, vertices[0].y, vertices[1].x, vertices[1].y);
    return;
  }

  beginShape();
  vertices.forEach((vertexVector) => {
    vertex(vertexVector.x, vertexVector.y);
  });
  endShape(CLOSE);
}

function drawVertices() {
  if (vertices.length === 0) {
    return;
  }

  noStroke();
  fill('#ff0000');
  vertices.forEach((vertexVector) => {
    circle(vertexVector.x, vertexVector.y, vertexDiameter);
  });
}

function drawPivotPoint() {
  if (!pivotPoint) {
    return;
  }

  noStroke();
  fill('#00ff00');
  circle(pivotPoint.x, pivotPoint.y, pivotDiameter);
}

function mousePressed() {
  if (mouseX < 0 || mouseX > width || mouseY < 0 || mouseY > height) {
    return;
  }

  if (mouseX <= toolBarWidth) {
    toolbarButtons.forEach((button) => {
      button.TryClick(mouseX, mouseY);
    });
    return;
  }

  if (mouseX <= toolBarWidth + borderWidth) {
    return;
  }

  handleDrawingBoardClick(mouseX, mouseY);
}

function handleDrawingBoardClick(x, y) {
  if (currentMode === 'setPivot') {
    pivotPoint.set(x, y);
    return;
  }

  vertices.push(createVector(x, y));
}

function rotateVerticesClockwise() {
  rotateVertices(-rotationAngleDegrees);
}

function rotateVerticesCounterClockwise() {
  rotateVertices(rotationAngleDegrees);
}

function rotateVertices(angleDegrees) {
  if (vertices.length === 0 || !pivotPoint) {
    return;
  }

  const angle = radians(angleDegrees);
  vertices.forEach((vertexVector) => {
    const offset = createVector(vertexVector.x - pivotPoint.x, vertexVector.y - pivotPoint.y);
    offset.rotate(angle);
    vertexVector.set(pivotPoint.x + offset.x, pivotPoint.y + offset.y);
  });
}

function moveVerticesLeft() {
  translateVertices(-translationStep, 0);
}

function moveVerticesRight() {
  translateVertices(translationStep, 0);
}

function moveVerticesUp() {
  translateVertices(0, -translationStep);
}

function moveVerticesDown() {
  translateVertices(0, translationStep);
}

function translateVertices(deltaX, deltaY) {
  if (vertices.length === 0) {
    return;
  }

  vertices.forEach((vertexVector) => {
    vertexVector.add(deltaX, deltaY);
  });
}

function scaleVerticesUp() {
  scaleVertices(scaleUpFactor);
}

function scaleVerticesDown() {
  scaleVertices(scaleDownFactor);
}

function scaleVertices(scaleFactor) {
  if (vertices.length === 0 || !pivotPoint) {
    return;
  }

  vertices.forEach((vertexVector) => {
    const offsetX = vertexVector.x - pivotPoint.x;
    const offsetY = vertexVector.y - pivotPoint.y;
    vertexVector.set(
      pivotPoint.x + offsetX * scaleFactor,
      pivotPoint.y + offsetY * scaleFactor
    );
  });
}

function clearDrawingBoard() {
  initializeDrawingBoardState();
}

function togglePivotPlacementMode() {
  currentMode = currentMode === 'setPivot' ? 'addVertex' : 'setPivot';
}

function initializeDrawingBoardState() {
  vertices = [];
  const drawingBoardLeft = getDrawingBoardLeft();
  const drawingBoardCenterX = drawingBoardLeft + getDrawingBoardWidth() / 2;
  pivotPoint = createVector(drawingBoardCenterX, height / 2);
  currentMode = 'addVertex';
}

function getDrawingBoardLeft() {
  return toolBarWidth + borderWidth;
}

function getDrawingBoardWidth() {
  return width - getDrawingBoardLeft();
}
