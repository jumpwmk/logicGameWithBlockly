/*
  map:
  1 -> wall NORTH
  2 -> wall EAST
  4 -> wall SOUTH
  8 -> wall WEST
  16 -> has gems
  32 -> has enemy
  1024 -> the way out
*/

/*
  action:
  GO_NORTH
  GO_EAST
  GO_SOUTH
  GO_WEST
  LOOK_NORTH
  LOOK_EAST
  LOOK_SOUTH
  LOOK_WEST
  FAIL_FORWARD
  TURN_RIGHT
  TURN_LEFT
  NULL
  FINISH
*/

/*
  result:

*/

/* 
  The parsingMovement will return
  code: array of actions
  block: array of blocks that relate to the code
  result: the result after running the code
*/

import { store } from '../redux/store';
import { FINAL } from '../config/tile';

function move(direction, id, coordinate) {
  const tiles = store.getState().map.tiles;

  let COMMANDS = {
    xb: 'GO_NORTH',
    yf: 'GO_EAST',
    xf: 'GO_SOUTH',
    yb: 'GO_WEST'
  };

  let DIRECTION = {
    xb: { nx_ii: -1, nx_jj: 0 },
    yf: { nx_ii: 0, nx_jj: 1 },
    xf: { nx_ii: 1, nx_jj: 0 },
    yb: { nx_ii: 0, nx_jj: -1 }
  };

  let { ii, jj } = coordinate;

  if (
    (direction === 'xb' && (tiles[ii][jj] & 1) > 0) ||
    (direction === 'yf' && (tiles[ii][jj] & 2) > 0) ||
    (direction === 'xf' && (tiles[ii][jj] & 4) > 0) ||
    (direction === 'yb' && (tiles[ii][jj] & 8) > 0)
  ) {
    return { res: false, command: 'FAIL_FORWARD', block: id };
  }

  console.log(direction);

  let { nx_ii, nx_jj } = DIRECTION[direction];

  ii = ii + nx_ii;
  jj = jj + nx_jj;

  return {
    command: 'STRAIGHT', /// test using straight instead of going in the direction
    block: id,
    coordinate: { ii, jj },
    res: true
  };
}

function turn(direction, command, id) {
  let COMMANDS = { turnLeft: 'TURN_LEFT', turnRight: 'TURN_RIGHT' };

  let DIRECTION_LEFT = {
    xb: 'yb',
    yf: 'xb',
    xf: 'yf',
    yb: 'xf'
  };
  let DIRECTION_RIGHT = {
    xb: 'yf',
    yf: 'xf',
    xf: 'yb',
    yb: 'xb'
  };
  if (command === 'turnLeft') direction = DIRECTION_LEFT[direction];
  if (command === 'turnRight') direction = DIRECTION_RIGHT[direction];
  return {
    command: COMMANDS[command],
    block: id,
    res: true,
    direction: direction
  };
}

function isPath(direction, command, id, coordinate) {
  const tiles = store.getState().map.tiles;

  let { ii, jj } = coordinate;
  let DIRECTION = { xb: 1, yf: 2, xf: 4, yb: 8 };

  let DIRECTION_LOOK = {
    xb: 'LOOK_xb',
    yf: 'LOOK_yf',
    xf: 'LOOK_xf',
    yb: 'LOOK_yb'
  };

  let DIRECTION_LEFT = {
    xb: 'yb',
    yf: 'xb',
    xf: 'yf',
    yb: 'xf'
  };
  let DIRECTION_RIGHT = {
    xb: 'yf',
    yf: 'xf',
    xf: 'yb',
    yb: 'xb'
  };

  if (command === 'right') {
    direction = DIRECTION_RIGHT[direction];
  } else if (command === 'left') {
    direction = DIRECTION_LEFT[direction];
  }

  if (tiles[ii][jj] & DIRECTION[direction]) {
    return { command: DIRECTION_LOOK[direction], block: id, res: false };
  }
  return { command: DIRECTION_LOOK[direction], block: id, res: true };
}

function parsingMovement(code) {
  let counts = {};

  const tiles = store.getState().map.tiles;

  let lines = code.split('\n');
  let direction = store.getState().player.facing;
  let pos = store.getState().player.position;
  let ii = pos[0];
  let jj = pos[1];

  let commands = [];
  let blocks = [];

  let ticks = 400; // set time out

  for (let i = 0; i < lines.length - 1; i++) {
    ticks--;
    if (ticks === 0) {
      break;
    }
    let line = lines[i].trim().split(' ');
    let id = line[0];
    if (tiles[ii][jj] & FINAL) {
      break;
    }
    if (line[1] === 'moveForward') {
      const res = move(direction, id, { ii: ii, jj: jj });
      if (res.res === true) {
        commands.push(res.command);
        blocks.push(res.block);
        ii = res.coordinate.ii;
        jj = res.coordinate.jj;
      } else {
        commands.push(res.command);
        blocks.push(res.block);
        break;
      }
    } else if (line[1] === 'turnRight' || line[1] === 'turnLeft') {
      const res = turn(direction, line[1], line[0]);
      commands.push(res.command);
      blocks.push(res.block);
      direction = res.direction;
    } else if (line[1] === 'for') {
      if (line[2] === 'INFINITY') {
        counts[line[0]] = { count: 100, begin: i };
      } else {
        counts[line[0]] = { count: parseInt(line[2]), begin: i };
      }
    } else if (line[1] === 'end') {
      counts[line[0]].count--;
      if (counts[line[0]].count > 0) {
        i = counts[line[0]].begin;
      }
    }
  }

  if (tiles[ii][jj] & FINAL) {
    commands.push('FINISH');
    blocks.push(null);
    return { commands, blocks, res: 'SUCCESS' };
  } else if (ticks === 0) {
    commands.push('NULL');
    blocks.push(null);
    console.log(commands);
    return { commands, blocks, res: 'TIMEOUT' };
  } else {
    commands.push('NULL');
    blocks.push(null);
    console.log(commands);
    return { commands, blocks, res: 'FAILURE' };
  }
}

export default parsingMovement;
