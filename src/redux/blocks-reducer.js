const initialState = {
  maxBlocks: 1000,
  workspace: null,
  state: true
};

const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MAX_BLOCKS':
      return {
        ...state,
        ...action.payload
      };
    case 'CHANGE_WORKSPACE':
      return {
        ...state,
        ...action.payload
      };
    case 'CHANGE_STATE':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default blocksReducer;
