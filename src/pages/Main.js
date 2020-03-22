import React from "react";
import { Switch, Route } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserPage from './UserPage'

class Main extends React.Component {
  render() {
    return (
      <Switch>
        {/* <Route path="/about"></Route>
      <Route path="/users"></Route> */}
        <Route path="/Vacations" component={UserPage} />
        <Route path="/SignUp" component={Signup} />
        <Route path="/" component={Login} />
      </Switch>
    );
  }
}

export default Main;
