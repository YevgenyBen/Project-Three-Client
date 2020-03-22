export const UserActions = {
  TYPE: val => {
    return {
      type: "TYPE",
      payload: val
    };
  },
  FirstName: val => {
    return {
      type: "FirstName",
      payload: val
    };
  },
  LastName: val => {
    return {
      type: "LastName",
      payload: val
    };
  },
  UserName: val => {
    return {
      type: "UserName",
      payload: val
    };
  },
  Password: val => {
    return {
      type: "Password",
      payload: val
    };
  },
  PasswordVerification: val => {
    return {
      type: "PasswordVerification",
      payload: val
    };
  }
};
