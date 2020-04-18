const initialState = {
  maxBlocks: 1000,
  workspace: null,
  state: true,
};

const blocksReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_BLOCKS':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_CNT_BLOCKS':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_WORKSPACE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_STATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_SHOULDCHANGESTATE':
      return {
        ...state,
        ...action.payload,
      };
    case 'COLLECT_GEMS':
      return {
        ...state,
        ...action.payload,
      };
    case 'INIT_BLOCKLY_DIV':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default blocksReducer;
