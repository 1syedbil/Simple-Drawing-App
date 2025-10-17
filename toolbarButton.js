class ToolBarButton {
  _onClick;
  constructor(x_, y_, width_, height_, btnIcon, onClick_) {
    this._x = x_;
    this._y = y_;
    this._width = width_;
    this._height = height_;
    this._onClick = onClick_;
    this._icon = btnIcon;
  }

  TryClick(x, y) {
    if (this.ContainsPoint(x, y)) {
      this._onClick();
    }
  }

  ContainsPoint(x, y) {
    if (x > this._x && x < this._x + this._width) {
      if (y > this._y && y < this._y + this._height) {
        return true;
      }
    }
    return false;
  }

  Draw() {
    stroke(64);
    strokeWeight(3);
    fill(124);
    rect(this._x, this._y, this._width, this._height);
    image(this._icon, this._x, this._y, this._width, this._height);
  }
}