import { attemptMove, attemptCollect } from './movement';

async function animateOneAction(obj) {
  const { command, block, workspace } = obj;
  if (
    command === 'STRAIGHT' ||
    command === 'TURN_RIGHT' ||
    command === 'TURN_LEFT'
  )
    attemptMove(command);
  else if (command === 'COLLECT') {
    attemptCollect();
  } else if (command === 'FINISH') {
    console.log('success');
  } else if (command === 'FAIL_FORWARD') {
    console.log('failure');
  } else if (command === 'NULL') {
    console.log('null');
  }
  workspace.highlightBlock(block);
}

export default animateOneAction;
