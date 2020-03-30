export const loginActions = {
  Password: val => {
    return {
      type: "Password",
      payload: val
    };
  },
  UserName: val => {
    return {
      type: "UserName",
      payload: val
    };
  }
}