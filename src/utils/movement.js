import { store } from '../redux/store';
import { MAP_W, MAP_H } from '../config/constants';

export function attemptMove(nxtMove) {
  console.log(nxtMove);

  let direction = store.getState().player.facing;
  const oldPos = store.getState().player.position;

  const { newPos, nxtDirection } = getNewPosition(direction, nxtMove);

  direction = nxtDirection;

  if (nxtMove === 'TURN_RIGHT' || nxtMove === 'TURN_LEFT') {
    dispatchMove(direction, newPos);
  } else if (
    observeBoundaries(newPos) &&
    observeImpassable(oldPos, direction)
  ) {
    dispatchMove(direction, newPos);
  }
}

export function attemptCollect() {
  const pos = store.getState().player.position;
  const { floatingobj } = store.getState().map;
  if (!floatingobj[pos[0]][pos[1]] || !floatingobj[pos[0]][pos[1]].visible) {
    return;
  }
  floatingobj[pos[0]][pos[1]].visible = false;
  dispatchMap(floatingobj);
}

function getNewPosition(direction, nxtMove) {
  const oldPos = store.getState().player.position;
  const newPos = [oldPos[0], oldPos[1]];
  switch (nxtMove) {
    case 'TURN_RIGHT':
      switch (direction) {
        case 'xb':
          return { nxtDirection: 'yf', newPos: newPos };
        case 'yf':
          return { nxtDirection: 'xf', newPos: newPos };
        case 'xf':
          return { nxtDirection: 'yb', newPos: newPos };
        case 'yb':
          return { nxtDirection: 'xb', newPos: newPos };
        default:
      }
      break;
    case 'TURN_LEFT':
      switch (direction) {
        case 'xb':
          return { nxtDirection: 'yb', newPos: newPos };
        case 'yf':
          return { nxtDirection: 'xb', newPos: newPos };
        case 'xf':
          return { nxtDirection: 'yf', newPos: newPos };
        case 'yb':
          return { nxtDirection: 'xf', newPos: newPos };
        default:
      }
      break;
    case 'STRAIGHT':
      switch (direction) {
        case 'xb':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0] - 1, oldPos[1]]
          };
        case 'yf':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0], oldPos[1] + 1]
          };
        case 'xf':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0] + 1, oldPos[1]]
          };
        case 'yb':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0], oldPos[1] - 1]
          };
        default:
      }
      break;
    default:
  }
}

function dispatchMove(direction, newPos) {
  store.dispatch({
    type: 'MOVE_PLAYER',
    payload: {
      position: newPos,
      facing: direction
    }
  });
}

function dispatchMap(floatingobj) {
  store.dispatch({
    type: 'CHANGE_FLOATING_OBJ',
    payload: {
      floatingobj: floatingobj
    }
  });
}

function observeBoundaries(newPos) {
  return (
    newPos[0] >= 0 && newPos[0] < MAP_W && newPos[1] >= 0 && newPos[1] < MAP_H
  );
}

function observeImpassable(oldPos, direction) {
  const tiles = store.getState().map.tiles;
  const y = oldPos[1];
  const x = oldPos[0];

  const nowTile = tiles[y][x];
  const DIRECTION = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 4,
    WEST: 8
  };

  return (nowTile & DIRECTION[direction]) === 0;
}

export default function handleMovement(player) {
  return player;
}
