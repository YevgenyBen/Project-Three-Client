const initialState = {
    update: true,
};

const updateReducer = (state = initialState, action) => {
    switch (action.type) {
        case "update":
            return {
                ...state,
                update: !state.update
            };
        default:
            return state;
    }
}

export default updateReducer;