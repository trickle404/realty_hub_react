const initialState = {
    userData: null,
};

export const rootReducer = (state = initialState, action) => {
    switch (action.type) {
      case 'SET_USER_DATA':
        return {
          ...state,
          userData: action.payload,
        };
      default:
        return state;
    }
};