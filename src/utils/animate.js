import parsingMovement from './parsingMovement';
import { attemptMove } from '../components/player/movement';
import sleep from './sleep';
import { store } from '../redux/store';

async function animate(code, workspace) {
  console.log(code);
  let { commands, blocks, res } = parsingMovement(code);

  for (let i = 0; i < commands.length; i++) {
    if (store.getState().blocks.state) break;
    let command = commands[i];
    let block = blocks[i];
    console.log(command, block);
    if (
      command === 'STRAIGHT' ||
      command === 'TURN_RIGHT' ||
      command === 'TURN_LEFT'
    )
      attemptMove(command);
    else if (command === 'FINISH') {
      console.log('success');
    } else if (command === 'FAIL_FORWARD') {
      console.log('failure');
    } else if (command === 'NULL') {
      console.log('null');
    }
    workspace.highlightBlock(block);
    await sleep(500);
  }
  return res;
}

export default animate;
