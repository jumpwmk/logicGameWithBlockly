const initialState = {};

const mapReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'ADD_TILES':
      return {
        ...state,
        ...action.payload,
      };
    case 'CHANGE_FLOATING_OBJ':
      return {
        ...state,
        ...action.payload,
      };
    default:
      return state;
  }
};

export default mapReducer;
