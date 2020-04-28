const initialState = {
  modalIsOpen: false
};

const congratsReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'CHANGE_CONFIG_MODAL':
      return {
        ...state,
        ...action.payload
      };
    default:
      return state;
  }
};

export default congratsReducer;
