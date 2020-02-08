const initialState = {
  maxBlocks: 1000
};

const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_MAX_BLOCKS':
      return {
        ...action.payload
      };
    default:
      return state;
  }
};

export default blocksReducer;
