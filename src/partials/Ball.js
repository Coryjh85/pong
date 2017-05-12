import { SVG_NS } from '../settings';

export default class Ball {

  constructor(boardWidth, boardHeight, radius) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.reset();
  }
reset() {
  this.x = this.boardWidth / 2;
  this.y = this.boardHeight / 2;
}
  render(svg) {

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', 'white');


    svg.appendChild(ball);

  }
}