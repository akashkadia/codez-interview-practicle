const initialstate = {
  history: [],
};

// reducers.js
const commonReducer = (state = initialstate, action) => {
  switch (action.type) {
    case "SEARCH_HISTORY_ACTION":
      return {
        ...state,
        history: [action.data,...state.history],
      };
    default:
      return state;
  }
};

export default commonReducer;
