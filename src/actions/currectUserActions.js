export const currentUserActions = {
    currentUser: val => {
        return {
            type: "currentUser",
            payload: val
        };
    },
    role: val => {
        return {
            type: "role",
            payload: val
        };
    },
    token: val => {
        return {
            type: "token",
            payload: val
        };
    }
}