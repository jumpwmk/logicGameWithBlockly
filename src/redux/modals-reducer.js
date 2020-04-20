const initialState = {
  congrats: false,
  solution: false,
};

const modalsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CONFIG_MODAL':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default modalsReducer;
