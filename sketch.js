/*
 * FILE        : sketch.js
 * PROJECT     : Assignment 2
 * PROGRAMMER  : Bilal Syed
 * FIRST VERSION : 2025-10-17
 * DESCRIPTION : This file contains the primary p5.js sketch logic for the
 *               drawing application. It manages UI layout, drawing-board state,
 *               toolbar button configuration, and user interaction handling.
 */

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

/*
 * FUNCTION    : preload
 * DESCRIPTION : Loads toolbar button icons prior to sketch setup to ensure
 *               assets are available when drawing begins.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : setup
 * DESCRIPTION : Initializes the sketch by configuring layout dimensions,
 *               creating the canvas, preparing drawing board state, and
 *               instantiating toolbar buttons.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function setup() {
  buttonHeight = windowHeight / numOfButtons;

  setupScreenLayout();
  initializeDrawingBoardState();
  setupToolBarButtons();
}

/*
 * FUNCTION    : draw
 * DESCRIPTION : Executes the recurring render loop that updates the layout,
 *               drawing board visuals, and toolbar display every frame.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function draw() {
  drawLayout();
  drawDrawingBoard();
  drawToolBarButtons();
}

/*
 * FUNCTION    : setupScreenLayout
 * DESCRIPTION : Creates the p5.js canvas sized to the window and paints the
 *               initial toolbar and border regions.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function setupScreenLayout() {
  createCanvas(windowWidth, windowHeight);
  background(0,0,0);

  fill('#FFFFFF');
  rect(0, 0, toolBarWidth, windowHeight);
  
  fill('#ff0000ff');
  rect(toolBarWidth, 0, borderWidth, windowHeight);
}

/*
 * FUNCTION    : drawLayout
 * DESCRIPTION : Redraws the static UI regions each frame, including the
 *               toolbar, border, and mode indicator text.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : setupToolBarButtons
 * DESCRIPTION : Creates the toolbar button instances and assigns the
 *               functional callbacks that manipulate the drawing board state.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : drawToolBarButtons
 * DESCRIPTION : Renders each toolbar button onto the canvas to reflect their
 *               current appearance and icon imagery.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : drawDrawingBoard
 * DESCRIPTION : Coordinates the rendering of vertex connections, individual
 *               vertices, and the current pivot point on the drawing board.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function drawDrawingBoard() {
  drawVertexConnections();
  drawVertices();
  drawPivotPoint();
}

/*
 * FUNCTION    : drawVertexConnections
 * DESCRIPTION : Draws lines connecting the user-defined vertices using the
 *               specified styling rules for one, two, or multiple vertices.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : drawVertices
 * DESCRIPTION : Renders all stored vertices as red circles on top of any
 *               connecting lines.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : drawPivotPoint
 * DESCRIPTION : Displays the current pivot location as a green circle if it
 *               has been initialized.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function drawPivotPoint() {
  if (!pivotPoint) {
    return;
  }

  noStroke();
  fill('#00ff00');
  circle(pivotPoint.x, pivotPoint.y, pivotDiameter);
}

/*
 * FUNCTION    : mousePressed
 * DESCRIPTION : Handles mouse click events by routing them to toolbar buttons
 *               or processing drawing board interactions based on position.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
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

/*
 * FUNCTION    : handleDrawingBoardClick
 * DESCRIPTION : Applies drawing board interactions for clicks that occur
 *               outside the toolbar, either setting the pivot or adding a
 *               vertex depending on the current mode.
 * PARAMETERS  : number x : Horizontal click position.
 *             : number y : Vertical click position.
 * RETURNS     : void     : No return value.
 */
function handleDrawingBoardClick(x, y) {
  if (currentMode === 'setPivot') {
    pivotPoint.set(x, y);
    return;
  }

  vertices.push(createVector(x, y));
}

/*
 * FUNCTION    : rotateVerticesClockwise
 * DESCRIPTION : Rotates all vertices around the pivot point by the configured
 *               clockwise angle.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function rotateVerticesClockwise() {
  rotateVertices(-rotationAngleDegrees);
}

/*
 * FUNCTION    : rotateVerticesCounterClockwise
 * DESCRIPTION : Rotates all vertices around the pivot point by the configured
 *               counter-clockwise angle.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function rotateVerticesCounterClockwise() {
  rotateVertices(rotationAngleDegrees);
}

/*
 * FUNCTION    : rotateVertices
 * DESCRIPTION : Applies a rotation transform to every vertex around the pivot
 *               point using the supplied angle.
 * PARAMETERS  : number angleDegrees : Angle in degrees to rotate vertices.
 * RETURNS     : void                : No return value.
 */
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

/*
 * FUNCTION    : moveVerticesLeft
 * DESCRIPTION : Translates all vertices left by the configured translation
 *               step.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function moveVerticesLeft() {
  translateVertices(-translationStep, 0);
}

/*
 * FUNCTION    : moveVerticesRight
 * DESCRIPTION : Translates all vertices right by the configured translation
 *               step.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function moveVerticesRight() {
  translateVertices(translationStep, 0);
}

/*
 * FUNCTION    : moveVerticesUp
 * DESCRIPTION : Moves all vertices upward by the configured translation
 *               distance.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function moveVerticesUp() {
  translateVertices(0, -translationStep);
}

/*
 * FUNCTION    : moveVerticesDown
 * DESCRIPTION : Moves all vertices downward by the configured translation
 *               distance.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function moveVerticesDown() {
  translateVertices(0, translationStep);
}

/*
 * FUNCTION    : translateVertices
 * DESCRIPTION : Applies a uniform translation to every vertex using the
 *               provided offsets.
 * PARAMETERS  : number deltaX : Horizontal translation amount.
 *             : number deltaY : Vertical translation amount.
 * RETURNS     : void          : No return value.
 */
function translateVertices(deltaX, deltaY) {
  if (vertices.length === 0) {
    return;
  }

  vertices.forEach((vertexVector) => {
    vertexVector.add(deltaX, deltaY);
  });
}

/*
 * FUNCTION    : scaleVerticesUp
 * DESCRIPTION : Increases the size of the vertex shape relative to the pivot
 *               point by the configured scale-up factor.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function scaleVerticesUp() {
  scaleVertices(scaleUpFactor);
}

/*
 * FUNCTION    : scaleVerticesDown
 * DESCRIPTION : Reduces the size of the vertex shape relative to the pivot
 *               point by the configured scale-down factor.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function scaleVerticesDown() {
  scaleVertices(scaleDownFactor);
}

/*
 * FUNCTION    : scaleVertices
 * DESCRIPTION : Adjusts the distance of each vertex from the pivot point by
 *               a supplied scaling factor.
 * PARAMETERS  : number scaleFactor : Multiplier applied to vertex offsets.
 * RETURNS     : void               : No return value.
 */
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

/*
 * FUNCTION    : clearDrawingBoard
 * DESCRIPTION : Resets the drawing board by clearing vertices and restoring
 *               the pivot to its default location.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function clearDrawingBoard() {
  initializeDrawingBoardState();
}

/*
 * FUNCTION    : togglePivotPlacementMode
 * DESCRIPTION : Switches between vertex-adding mode and pivot-setting mode
 *               and updates the mode indicator accordingly.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function togglePivotPlacementMode() {
  currentMode = currentMode === 'setPivot' ? 'addVertex' : 'setPivot';
}

/*
 * FUNCTION    : initializeDrawingBoardState
 * DESCRIPTION : Resets vertex storage and positions the pivot at the center
 *               of the drawing board area.
 * PARAMETERS  : none
 * RETURNS     : void : No return value.
 */
function initializeDrawingBoardState() {
  vertices = [];
  const drawingBoardLeft = getDrawingBoardLeft();
  const drawingBoardCenterX = drawingBoardLeft + getDrawingBoardWidth() / 2;
  pivotPoint = createVector(drawingBoardCenterX, height / 2);
  currentMode = 'addVertex';
}

/*
 * FUNCTION    : getDrawingBoardLeft
 * DESCRIPTION : Calculates the x-coordinate where the drawing board area
 *               begins, accounting for the toolbar and border widths.
 * PARAMETERS  : none
 * RETURNS     : number : Left edge x-coordinate of the drawing board.
 */
function getDrawingBoardLeft() {
  return toolBarWidth + borderWidth;
}

/*
 * FUNCTION    : getDrawingBoardWidth
 * DESCRIPTION : Computes the width of the drawing board area based on the
 *               overall canvas dimensions.
 * PARAMETERS  : none
 * RETURNS     : number : Width in pixels available for drawing.
 */
function getDrawingBoardWidth() {
  return width - getDrawingBoardLeft();
}
