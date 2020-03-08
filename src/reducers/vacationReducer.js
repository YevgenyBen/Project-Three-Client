const initialState = {
  type: ""
};
const filterReducer = (state = initialState, action) => {
  switch (action.type) {
    case "TYPE":
      return {
        ...state,
        type: action.payload
      };
    default:
      return state;
  }
};
export default vacationReducer;
