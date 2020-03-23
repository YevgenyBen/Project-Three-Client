const initialState = {
    UserName: "",
    Password: ""
};

const loginReducer = (state = initialState, action) => {
    switch (action.type) {
        case "UserName":
            return {
                ...state,
                UserName: action.payload
            };
        case "Password":
            return {
                ...state,
                Password: action.payload
            };
        default:
            return state;
    }
}

export default loginReducer;