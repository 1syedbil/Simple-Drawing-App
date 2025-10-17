/*
 * FILE        : toolbarButton.js
 * PROJECT     : Assignment 2
 * PROGRAMMER  : Bilal Syed
 * FIRST VERSION : 2025-10-17
 * DESCRIPTION : This file defines the ToolBarButton class which encapsulates
 *               drawing, hit-testing, and click handling logic for toolbar
 *               buttons within the drawing application.
 */

/*
 * NAME        : ToolBarButton
 * PURPOSE     : Represents a single interactive button in the toolbar. Each
 *               button stores its bounds, associated icon, and click handler,
 *               and exposes utilities to draw itself and respond to user input.
 */
class ToolBarButton {
  _onClick;
  /*
   * FUNCTION    : constructor
   * DESCRIPTION : Initializes a toolbar button with its screen bounds, icon, and
   *               click handler so it can be drawn and interacted with.
   * PARAMETERS  : number x_        : Horizontal position of the button.
   *             : number y_        : Vertical position of the button.
   *             : number width_    : Width of the button.
   *             : number height_   : Height of the button.
   *             : p5.Image btnIcon : Icon to display on top of the button.
   *             : function onClick_: Callback invoked when the button is clicked.
   * RETURNS     : void             : No return value.
   */
  constructor(x_, y_, width_, height_, btnIcon, onClick_) {
    this._x = x_;
    this._y = y_;
    this._width = width_;
    this._height = height_;
    this._onClick = onClick_;
    this._icon = btnIcon;
  }

  /*
   * FUNCTION    : TryClick
   * DESCRIPTION : Evaluates whether the provided coordinates fall within the
   *               button bounds and triggers its click handler when they do.
   * PARAMETERS  : number x : Horizontal position to test.
   *             : number y : Vertical position to test.
   * RETURNS     : void     : No return value.
   */
  TryClick(x, y) {
    if (this.ContainsPoint(x, y)) {
      this._onClick();
    }
  }

  /*
   * FUNCTION    : ContainsPoint
   * DESCRIPTION : Determines if a point lies within the rectangular bounds of
   *               the button.
   * PARAMETERS  : number x : Horizontal coordinate being tested.
   *             : number y : Vertical coordinate being tested.
   * RETURNS     : boolean  : True when the point is inside the button bounds.
   */
  ContainsPoint(x, y) {
    if (x > this._x && x < this._x + this._width) {
      if (y > this._y && y < this._y + this._height) {
        return true;
      }
    }
    return false;
  }

  /*
   * FUNCTION    : Draw
   * DESCRIPTION : Renders the button rectangle and its icon on the canvas using
   *               the current p5.js drawing context.
   * PARAMETERS  : none
   * RETURNS     : void : No return value.
   */
  Draw() {
    stroke(64);
    strokeWeight(3);
    fill(124);
    rect(this._x, this._y, this._width, this._height);
    image(this._icon, this._x, this._y, this._width, this._height);
  }
}
