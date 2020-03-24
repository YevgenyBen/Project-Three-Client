import React from "react";
import { Switch, Route,BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserPage from './UserPage'

class Main extends React.Component {
  render() {
    return (
      <BrowserRouter>
        <Switch>
          <Route path="/Vacations" component={UserPage} />
          <Route path="/SignUp" component={Signup} />
          <Route path="/" component={Login} />
        </Switch>
      </BrowserRouter>
    );
  }
}

export default Main;
