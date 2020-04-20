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

function move(obj) {
  let { direction, id, coordinate } = obj;
  const tiles = store.getState().map.tiles;

  let COMMANDS = {
    xb: 'GO_NORTH',
    yf: 'GO_EAST',
    xf: 'GO_SOUTH',
    yb: 'GO_WEST',
  };

  let DIRECTION = {
    xb: { nx_ii: -1, nx_jj: 0 },
    yf: { nx_ii: 0, nx_jj: 1 },
    xf: { nx_ii: 1, nx_jj: 0 },
    yb: { nx_ii: 0, nx_jj: -1 },
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
    res: true,
  };
}

function turn(obj) {
  let { direction, command, id } = obj;
  let COMMANDS = { turnLeft: 'TURN_LEFT', turnRight: 'TURN_RIGHT' };

  console.log(obj);

  let DIRECTION_LEFT = {
    xb: 'yb',
    yf: 'xb',
    xf: 'yf',
    yb: 'xf',
  };
  let DIRECTION_RIGHT = {
    xb: 'yf',
    yf: 'xf',
    xf: 'yb',
    yb: 'xb',
  };
  if (command === 'turnLeft') direction = DIRECTION_LEFT[direction];
  if (command === 'turnRight') direction = DIRECTION_RIGHT[direction];
  return {
    command: COMMANDS[command],
    block: id,
    res: true,
    direction: direction,
  };
}

function collect(obj) {
  let { id, coordinate } = obj;
  const { floatingobj } = store.getState().map;
  let { ii, jj } = coordinate;

  if (
    floatingobj[ii][jj] === null ||
    floatingobj[ii][jj] === undefined ||
    floatingobj[ii][jj].chk
  )
    return { res: false, command: 'FAIL_COLLECT', block: id };
  if (floatingobj[ii][jj].visible) {
    floatingobj[ii][jj].chk = true;
    return {
      command: 'COLLECT',
      block: id,
      res: true,
    };
  }
}

function isOnTile(obj) {
  let { condition, id, coordinate } = obj;
  const { tileoverlay } = store.getState().map;

  let { ii, jj } = coordinate;

  const OVERLAY_TYPE = { 1: 'green', 2: 'black', 3: 'yellow' };

  if (tileoverlay[ii][jj]) {
    console.log('tileoverlay');
    console.log(tileoverlay[ii][jj].overlaytype, condition, OVERLAY_TYPE);
  }

  if (tileoverlay[ii][jj] !== null) {
    if (OVERLAY_TYPE[tileoverlay[ii][jj].overlaytype] === condition)
      return {
        block: id,
        res: true,
      };
  }
  return {
    block: id,
    res: false,
  };
}

function isPath(obj) {
  let { condition, direction, id, coordinate } = obj;
  const tiles = store.getState().map.tiles;

  let { ii, jj } = coordinate;
  let DIRECTION = { xb: 1, yf: 2, xf: 4, yb: 8 };

  let DIRECTION_LOOK = {
    xb: 'LOOK_xb',
    yf: 'LOOK_yf',
    xf: 'LOOK_xf',
    yb: 'LOOK_yb',
  };

  let DIRECTION_LEFT = {
    xb: 'yb',
    yf: 'xb',
    xf: 'yf',
    yb: 'xf',
  };
  let DIRECTION_RIGHT = {
    xb: 'yf',
    yf: 'xf',
    xf: 'yb',
    yb: 'xb',
  };

  if (condition === 'right') {
    direction = DIRECTION_RIGHT[direction];
  } else if (condition === 'left') {
    direction = DIRECTION_LEFT[direction];
  }

  if (tiles[ii][jj] & DIRECTION[direction]) {
    console.log('look failed!');
    return { command: DIRECTION_LOOK[direction], block: id, res: false };
  } else {
    console.log('look success!');
    return { command: DIRECTION_LOOK[direction], block: id, res: true };
  }
}

function parsingMovement(code) {
  let COUNTS = {};

  const { floatingobj, tiles } = store.getState().map;

  let tmp_condition = [];
  let condition_id = null;
  let condition_res = false;
  let lines = code.split('\n');
  let direction = store.getState().player.facing;
  let pos = store.getState().player.position;
  let ii = pos[0];
  let jj = pos[1];

  let tmpGemsCoordinate = [];

  let commands = [];
  let blocks = [];

  let lastBlock = null;

  let ticks = 400; // set time out
  let { cntGems, maxGems } = store.getState().blocks;
  console.log('start running code here');

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
    console.log(line[0], line[1]);

    lastBlock = id;

    if (line[1] === 'end') {
      if (COUNTS[line[0]]) {
        if (COUNTS[line[0]].type === 'loop') {
          COUNTS[line[0]].count--;
          if (COUNTS[line[0]].count > 0) {
            i = COUNTS[line[0]].begin;
          }
        } else if (COUNTS[line[0]].type === 'if') {
          const res = tmp_condition.pop();
          if (tmp_condition.length === 0) {
            condition_id = null;
            condition_res = false;
          } else {
            const tmp = tmp_condition.pop();
            condition_id = tmp.condition_id;
            condition_res = tmp.condition_res;
          }
          delete COUNTS[line[0]];
        }
      }
    } else if (
      line[1] === 'else' &&
      line[0] in COUNTS &&
      COUNTS[line[0]].res === false
    ) {
      // it chagne the condition in this but it doesn't change the condition in tmp it will affect in line 245
      condition_res = true;
      condition_id = line[0];
    } else if (
      line[1] === 'else' &&
      line[0] in COUNTS &&
      COUNTS[line[0]].res === true
    ) {
      condition_res = false;
      condition_id = line[0];
    } else if (condition_id && condition_res === false) {
      continue;
    } else if (line[1] === 'if_tile') {
      // console.log('if_tile');
      // console.log(line[1], line[2]);
      const res = isOnTile({
        condition: line[2],
        id: line[0],
        coordinate: { ii: ii, jj: jj },
      });
      console.log(res);
      if (res.res) {
        condition_id = res.block;
        condition_res = true;
        COUNTS[line[0]] = { res: true, type: 'if' };
      } else {
        condition_id = res.block;
        condition_res = false;
        COUNTS[line[0]] = { res: false, type: 'if' };
      }
      tmp_condition.push({ condition_id, condition_res });
    } else if (line[1] === 'if_path') {
      const res = isPath({
        condition: line[2],
        id: line[0],
        coordinate: { ii: ii, jj: jj },
        direction: direction,
      });
      console.log(res);
      if (res.res) {
        condition_id = res.block;
        condition_res = true;
        COUNTS[line[0]] = { res: true, type: 'if' };
      } else {
        condition_id = res.block;
        condition_res = false;
        COUNTS[line[0]] = { res: false, type: 'if' };
      }
      tmp_condition.push({ condition_id, condition_res });
      commands.push(res.command);
      blocks.push(res.block);
    } else if (line[1] === 'else_if') {
      /// not done yet
    } else if (condition_id === null || condition_res) {
      if (line[1] === 'moveForward') {
        const res = move({ direction, id, coordinate: { ii: ii, jj: jj } });
        if (res.res) {
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
        console.log(line[0], line[1]);
        const res = turn({ direction, command: line[1], id: line[0] });
        commands.push(res.command);
        blocks.push(res.block);
        direction = res.direction;
      } else if (line[1] === 'collect') {
        const res = collect({ id: line[0], coordinate: { ii: ii, jj: jj } });
        if (res.res) {
          cntGems++;
          commands.push(res.command);
          blocks.push(res.block);
          tmpGemsCoordinate.push({ ii, jj });
        } else {
          commands.push(res.command);
          blocks.push(res.block);
          break;
        }
      } else if (line[1] === 'for') {
        if (line[2] === 'INFINITY') {
          COUNTS[line[0]] = { count: 100, begin: i, type: 'loop' };
        } else {
          COUNTS[line[0]] = {
            count: parseInt(line[2]),
            begin: i,
            type: 'loop',
          };
        }
      }
    }
  }
  while (tmpGemsCoordinate.length) {
    const tmp = tmpGemsCoordinate.pop();
    floatingobj[tmp.ii][tmp.jj].chk = false;
  }
  if (tiles[ii][jj] & FINAL && cntGems === maxGems) {
    commands.push('FINISH');
    blocks.push(lastBlock);
    return { commands, blocks, res: 'SUCCESS' };
  } else if (ticks === 0) {
    commands.push('NULL');
    blocks.push(lastBlock);
    console.log(commands);
    return { commands, blocks, res: 'TIMEOUT' };
  } else {
    commands.push('NULL');
    blocks.push(lastBlock);
    console.log(commands);
    return { commands, blocks, res: 'FAILURE' };
  }
}

export default parsingMovement;
