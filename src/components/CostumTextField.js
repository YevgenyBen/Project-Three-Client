import React from "react";
import TextField from "@material-ui/core/TextField";
import { useDispatch } from "react-redux";
import { UserActions } from "../actions/UserActions";

function CostumTextField(props) {
  const dispatch = useDispatch();

  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");

  const handleChange = event => {
    // console.log(event.target.name);
    dispatch(UserActions[event.target.name](event.target.value));
  };
  return (
    <TextField
      onChange={handleChange}
      variant="standard"
      required
      fullWidth
      error={props.error}
      id={props.id}
      label={props.label}
      name={props.id}
      autoComplete={props.id}
      type={props.type}
    />
  );
}

export default CostumTextField;
