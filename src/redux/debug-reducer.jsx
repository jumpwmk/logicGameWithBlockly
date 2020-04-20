const initialState = {
  status: false,
  commands: [],
  blocks: [],
  idx: 0,
  res: false,
};

const debugReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'INIT_DEBUG':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_IDX_DEBUG':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default debugReducer;
