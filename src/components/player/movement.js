import store from '../../config/store';
import { SPRITE_SIZE, MAP_WIDTH, MAP_HEIGHT } from '../../config/constants';

export function attemptMove(nxtMove) {
  console.log(nxtMove);

  let direction = store.getState().player.direction;
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

function getSpriteLocation(direction, walkIndex) {
  switch (direction) {
    case 'SOUTH':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 0}px`;
    case 'EAST':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 1}px`;
    case 'WEST':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 2}px`;
    case 'NORTH':
      return `${SPRITE_SIZE * walkIndex}px ${SPRITE_SIZE * 3}px`;
    default:
  }
}

function getNewPosition(direction, nxtMove) {
  const oldPos = store.getState().player.position;
  const newPos = [oldPos[0], oldPos[1]];
  switch (nxtMove) {
    case 'TURN_RIGHT':
      switch (direction) {
        case 'WEST':
          return { nxtDirection: 'NORTH', newPos: newPos };
        case 'EAST':
          return { nxtDirection: 'SOUTH', newPos: newPos };
        case 'NORTH':
          return { nxtDirection: 'EAST', newPos: newPos };
        case 'SOUTH':
          return { nxtDirection: 'WEST', newPos: newPos };
        default:
      }
      break;
    case 'TURN_LEFT':
      switch (direction) {
        case 'WEST':
          return { nxtDirection: 'SOUTH', newPos: newPos };
        case 'EAST':
          return { nxtDirection: 'NORTH', newPos: newPos };
        case 'NORTH':
          return { nxtDirection: 'WEST', newPos: newPos };
        case 'SOUTH':
          return { nxtDirection: 'EAST', newPos: newPos };
        default:
      }
      break;
    case 'STRAIGHT':
      switch (direction) {
        case 'WEST':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0] - SPRITE_SIZE, oldPos[1]]
          };
        case 'EAST':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0] + SPRITE_SIZE, oldPos[1]]
          };
        case 'NORTH':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0], oldPos[1] - SPRITE_SIZE]
          };
        case 'SOUTH':
          return {
            nxtDirection: direction,
            newPos: [oldPos[0], oldPos[1] + SPRITE_SIZE]
          };
        default:
      }
      break;
    default:
  }
}

function getWalkIndex() {
  const walkIndex = store.getState().player.walkIndex;

  return walkIndex >= 7 ? 0 : walkIndex + 1;
}

function dispatchMove(direction, newPos) {
  let walkIndex = getWalkIndex();

  store.dispatch({
    type: 'MOVE_PLAYER',
    payload: {
      position: newPos,
      direction,
      walkIndex,
      spriteLocation: getSpriteLocation(direction, walkIndex)
    }
  });
}

function observeBoundaries(newPos) {
  return (
    newPos[0] >= 0 &&
    newPos[0] <= MAP_WIDTH - SPRITE_SIZE &&
    newPos[1] >= 0 &&
    newPos[1] <= MAP_HEIGHT - SPRITE_SIZE
  );
}

function observeImpassable(oldPos, direction) {
  const tiles = store.getState().map.tiles;
  const y = oldPos[1] / SPRITE_SIZE;
  const x = oldPos[0] / SPRITE_SIZE;

  const nowTile = tiles[y][x];
  const DIRECTION = {
    NORTH: 1,
    EAST: 2,
    SOUTH: 4,
    WEST: 8
  };

  return (nowTile & DIRECTION[direction]) === 0;
}

// function handleKeyDown(event) {
//   event.preventDefault();
//   console.log('key pressed: ', event.keyCode);
//   switch (event.keyCode) {
//     case 37:
//       return attemptMove('LEFT');
//     case 38:
//       return attemptMove('STRAIGHT');
//     case 39:
//       return attemptMove('RIGHT');
//     default:
//       console.log('key not mapped: ', event.keyCode);
//   }
// }

export default function handleMovement(player) {
  return player;
}
