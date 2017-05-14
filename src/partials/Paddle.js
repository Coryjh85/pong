import { SVG_NS } from '../settings';

export default class Paddle {

  constructor(boardHeight, width, height, x, y, up, down) {
    this.boardHeight = boardHeight;
    this.width = width;
    this.height = height;
    this.x = x;
    this.y = y;
    this.speed = 30;
    this.score = 0;

    document.addEventListener('keydown', event => {
      switch (event.key) {
        case up:
          this.up();
          break;
        case down:
          this.down();
          break;
      }
    });
  }

  coordinates(x, y, width, height) {
    let leftX = x;
    let rightX = x + width;
    let topY = y;
    let bottomY = y + height;
    return [leftX, rightX, topY, bottomY];
  }

  up() {
    this.y = Math.max(0, this.y - this.speed);
  }

  down() {
    this.y = Math.min(this.boardHeight - this.height, this.y + this.speed);
  }

  render(svg) {

    let rect1 = document.createElementNS(SVG_NS, 'rect');
    rect1.setAttributeNS(null, 'width', this.width);
    rect1.setAttributeNS(null, 'height', this.height);
    rect1.setAttributeNS(null, 'fill', 'blue');
    rect1.setAttributeNS(null, 'speed', this.speed);
    rect1.setAttributeNS(null, 'score', this.score);
    rect1.setAttributeNS(null, 'x', this.x);
    rect1.setAttributeNS(null, 'y', this.y);

    let rect2 = document.createElementNS(SVG_NS, 'rect');
    rect2.setAttributeNS(null, 'width', this.width);
    rect2.setAttributeNS(null, 'height', this.height);
    rect2.setAttributeNS(null, 'fill', '#253C82');
    rect2.setAttributeNS(null, 'speed', this.speed);
    rect2.setAttributeNS(null, 'score', this.score);
    rect2.setAttributeNS(null, 'x', this.x);
    rect2.setAttributeNS(null, 'y', this.y);

    svg.appendChild(rect1);
    svg.appendChild(rect2);
  }
}