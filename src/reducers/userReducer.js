const initialState = {
  firstName: "",
  lastName: "",
  userName: "",
  password: ""
};

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case "FirstName":
      return {
        ...state,
        firstName: action.payload
      };
    case "LastName":
      return {
        ...state,
        lastName: action.payload
      };
    case "UserName":
      return {
        ...state,
        userName: action.payload
      };
    case "Password":
      return {
        ...state,
        password: action.payload
      };
    default:
      return state;
  }
};
export default userReducer;
