import { SVG_NS, KEYS, SCORE } from '../settings';
import Board from './Board';
import Paddle from './Paddle';
import Ball from './Ball';
import Score from './Score';
import Win from './Win';
export default class Game {

	constructor(element, width, height) {
		this.element = element;
		this.width = width;
		this.height = height;


		// Other code goes here...

		this.gameElement = document.getElementById(element);

		this.board = new Board(this.width, this.height);
		this.paddleWidth = 8,
			this.paddleHeight = 56,
			this.padding = 10

		this.player1 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			this.padding,
			((this.height - this.paddleHeight) / 2),
			KEYS.a,
			KEYS.z
		);

		this.player2 = new Paddle(
			this.height,
			this.paddleWidth,
			this.paddleHeight,
			(this.width - this.paddleWidth - this.padding),
			((this.height - this.paddleHeight) / 2),
			KEYS.up,
			KEYS.down
		);

		this.ball = new Ball(
			this.width,
			this.height,
			this.radius = 8,
		)

		this.ball2 = new Ball(
			this.width,
			this.height,
			this.radius = 8,
		)
this.pause=!this.pause
		document.addEventListener('keydown', event => {
			if (event.key === KEYS.spaceBar) {
				this.pause = !this.pause;
			}
		})

		this.player1Score = new Score(this.width / 2 - SCORE.distance - 30, SCORE.topDistance, SCORE.size)
		this.player2Score = new Score(this.width / 2 + SCORE.distance, SCORE.topDistance, SCORE.size)
		this.winner = new Win(this.width / 4, this.height / 2);
	}

	render() {

		if (this.pause) {
			return;
		}
		this.gameElement.innerHTML = '';

		let svg = document.createElementNS(SVG_NS, 'svg');
		svg.setAttributeNS(null, 'width', this.width);
		svg.setAttributeNS(null, 'height', this.height);
		svg.setAttributeNS(null, 'viewBox', `0 0 ${this.width} ${this.height}`);
		this.gameElement.appendChild(svg);

		this.board.render(svg)

		this.player1Score.render(svg, this.player1.score)
		this.player2Score.render(svg, this.player2.score)

		// Rendering in a winner announcement
		const player1Win = 'Player 1 Wins!';
		const player2Win = 'Player 2 Wins!';

		if (this.player1.score === 15) {
			this.winner.render(svg, player1Win);
			return;
		}

		else if (this.player2.score === 15) {
			this.winner.render(svg, player2Win);
			return;
		}

		//Doubles the paddle length of a player who is down by 5 or more
		if (this.player2.height < 60 && this.player1.score - this.player2.score >= 5) {
			this.player2.height = this.player2.height * 2
		}

		if (this.player1.height < 60 && this.player2.score - this.player1.score >= 5) {
			this.player1.height = this.player1.height * 2
		}

		this.player1.render(svg)
		this.player2.render(svg)
		this.ball.render(svg, this.player1, this.player2)
		if (this.ball.bounces >= 12) {
			this.ball2.render(svg, this.player1, this.player2)
		}
	}
}