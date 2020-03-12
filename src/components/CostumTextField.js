import React, { useState } from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { UserActions } from "../actions/UserActions";

function CostumTextField(props) {
  const dispatch = useDispatch();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = event => {
    console.log(event.target.value);
    dispatch(UserActions[event.target.name](event.target.value));
  };
  return (
    <TextField
      onChange={handleChange}
      variant="outlined"
      required
      fullWidth
      error={props.error ? props.error : props.error}
      id={props.id}
      label={props.id}
      name={props.id}
      autoComplete={props.id}
    />
  );
}

export default CostumTextField;
