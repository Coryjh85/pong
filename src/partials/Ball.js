import { SVG_NS } from '../settings';

export default class Ball {

  constructor(boardWidth, boardHeight, radius) {
    this.boardWidth = boardWidth;
    this.boardHeight = boardHeight;
    this.radius = radius;
    this.direction = 1;
    this.bounces = 0
    this.ping = new Audio('./public/sounds/pong-03.wav');
    this.pong = new Audio('./public/sounds/pong-01.wav');
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


    this.vy2 = 0;
    while (this.vy2 === 0) {
      this.vy2 = Math.floor(Math.random() * 10 - 5);
    }
    this.vx2 = this.direction * (6 - Math.abs(this.vy2));
  }

  wallCollision() {
    const hitLeft = this.x - this.radius <= 0;
    const hitRight = this.x + this.radius >= this.boardWidth;
    const hitTop = this.y - this.radius <= 0;
    const hitBottom = this.y + this.radius >= this.boardHeight;

    if (hitLeft || hitRight) {
      this.vx = -this.vx;
    }

    if (hitTop || hitBottom) {
      this.vy = -this.vy;
    }
  }

  paddleCollision(player1, player2) {
    if (this.vx > 0) {
      let paddle = player2.coordinates(player2.x, player2.y, player2.width, player2.height);
      let [leftX, rightX, topY, bottomY] = paddle

      if (
        this.x + this.radius >= leftX
        && this.x + this.radius <= rightX
        && this.y >= topY
        && this.y <= bottomY) {
        this.vx = -this.vx * 1.05;
        this.ping.play()
        this.bounces++
      }
    }

    else {
      let paddle = player1.coordinates(player1.x, player1.y, player1.width, player1.height);
      let [leftX, rightX, topY, bottomY] = paddle

      if (
        this.x - this.radius <= rightX
        && this.x - this.radius >= leftX
        && this.y >= topY
        && this.y <= bottomY) {
        this.vx = -this.vx * 1.05;
        this.pong.play();
        this.bounces++
      }
    }
  }

  goal(player) {
    player.score++;
    this.reset();
    this.bounces = 0;
  }

  render(svg, player1, player2) {
    this.x += this.vx;
    this.y += this.vy;

    this.wallCollision();
    this.paddleCollision(player1, player2);

    let ball = document.createElementNS(SVG_NS, 'circle');
        ball.setAttributeNS(null, 'cx', this.x);
        ball.setAttributeNS(null, 'cy', this.y);
        ball.setAttributeNS(null, 'r', this.radius);
        ball.setAttributeNS(null, 'fill', 'yellow');
    svg.appendChild(ball);

    let ball2 = document.createElementNS(SVG_NS, 'circle');
        ball2.setAttributeNS(null, 'cx', this.x * (-1));
        ball2.setAttributeNS(null, 'cy', this.y * (-1));
        ball2.setAttributeNS(null, 'r', this.radius);
        ball2.setAttributeNS(null, 'fill', 'yellow');
    svg.appendChild(ball2);

    //Detect goal
    const rightGoal = this.x + this.radius >= this.boardWidth;
    const leftGoal = this.x - this.radius <= 0;

    if (rightGoal) {
      this.goal(player1)
      this.direction = 1;
    } else if (leftGoal) {
      this.goal(player2);
      this.direction = -1;
    }
  }
}