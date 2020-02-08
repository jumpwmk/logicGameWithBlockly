const initialState = {
  facing: 'yf',
  position: [5, 2],
  begin_position: [5, 2]
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      return {
        ...action.payload
      };
    case 'INIT_PLAYER':
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
