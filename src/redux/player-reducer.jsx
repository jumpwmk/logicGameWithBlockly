import { SPRITE_SIZE } from '../config/constants';

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

const initialState = {
  direction: 'NORTH',
  spriteLocation: getSpriteLocation('NORTH', 0),
  position: [80, 360],
  begin_position: [80, 360],
  walkIndex: 0
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
