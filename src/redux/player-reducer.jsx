const initialState = {
  facing: 'yf',
  position: [5, 2],
  beginPosition: [5, 2]
};

const playerReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'MOVE_PLAYER':
      return {
        ...state,
        ...action.payload
      };
    case 'INIT_PLAYER':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default playerReducer;
