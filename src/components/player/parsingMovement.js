import { attemptMove } from './movement';

// import './BlocklyInterface';

function parsingMovement(code) {
  console.log(code.split('\n'));
  for (let i = 0; i < code.lenght; i++) {
    console.log(code[1].trim());
    attemptMove('STRAIGHT');
  }
}

export default parsingMovement;
