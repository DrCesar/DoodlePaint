
export function pointsToSvg(points) {
  if (points.length > 0) {
    let path = `M${points[0].x} ${points[0].y}`;
    points.forEach(point => {
      path = `${path} L${point.x} ${point.y}`;
    });
    return path;
  } 
  return '';
}

class Reaction {

  constructor() {
    this.gestures = [];
    this._offsetX = 0;
    this._offsetY = 0;
  }

  pointsToSvg(points) {
    const offsetX = this._offsetX;
    const offsetY = this._offsetY;

    if (points.length > 0) {
      let path = `M${points[0].x - offsetX} ${points[0].y - offsetY}`;
      points.forEach(point => {
        path = `${path} L${point.x - offsetX} ${point.y - offsetY}`;
      });
      return path;
    } 
    return '';
  }
}
export default Reaction;