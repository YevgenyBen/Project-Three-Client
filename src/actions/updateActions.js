export const updateActions = {
    update: val => {
        return {
            type: "update",
            payload: !val
        };
    },
}