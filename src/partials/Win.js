import { SVG_NS } from '../settings';

export default class Win {
  constructor(x, y, size) {
    this.x = x;
    this.y = y;
    this.size = size;
  }

  render(svg, win) {
    let winner = document.createElementNS(SVG_NS, 'text');
        winner.setAttributeNS(null, 'x', this.x);
        winner.setAttributeNS(null, 'y', this.y);
        winner.setAttributeNS(null, 'fill', 'white');
        winner.setAttributeNS(null, 'font-size', 30);
        winner.setAttributeNS(null, 'font-family', 'Silkscreen Web');
        winner.textContent = win;

    svg.appendChild(winner);
  }
}