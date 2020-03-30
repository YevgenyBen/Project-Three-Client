const initialState = {
    currentUser: "",
    role: "",
    token: ""
};

const currentUserReducer = (state = initialState, action) => {
    switch (action.type) {
        case "currentUser":
            return {
                ...state,
                currentUser: action.payload
            };
        case "role":
            return {
                ...state,
                role: action.payload
            };
        case "token":
            return {
                ...state,
                token: action.payload
            };
        default:
            return state;
    }
}


export default currentUserReducer;