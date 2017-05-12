import { SVG_NS } from '../settings';

export default class Ball {

  constructor(boardWidth, boardHeight, radius) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.direction = 1;
    this.reset();
  }
  reset() {
    this.x = this.boardWidth / 2;
    this.y = this.boardHeight / 2;

    //generate a random # between -5 and 5 but not 0
    this.vy = 0;
    while (this.vy === 0) {
      this.vy = Math.floor(Math.random() * 10 - 5);
    }

    // also a number between -5 and 5 based on the vy
    this.vx = this.direction * (6 - Math.abs(this.vy));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

  if(hitLeft || hitRight){
    this.vx = -this.vx;
  }

  if(hitTop || hitBottom){
    this.vy = -this.vy;
  }
}

  render(svg) {

    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();

    let ball = document.createElementNS(SVG_NS, 'circle');
    ball.setAttributeNS(null, 'cx', this.x);
    ball.setAttributeNS(null, 'cy', this.y);
    ball.setAttributeNS(null, 'r', this.radius);
    ball.setAttributeNS(null, 'fill', 'white');


    svg.appendChild(ball);

  }
}