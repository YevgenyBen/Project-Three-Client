
import React from "react";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserPage from "./UserPage"
import AdminPage from "./AdminPage"
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute"

function Main(props) {
  const currentUser = useSelector(state => state.currentUserReducer.currentUser)
  return (
    <BrowserRouter>
      {currentUser ? (currentUser !== "Admin" ? <Redirect to="/Vacations" /> : <Redirect to="/Admin" />) :
        <Redirect to="/SignUp" />
      }
      <Switch>

        <ProtectedRoute path="/Admin">
          <AdminPage />
        </ProtectedRoute>
        <Route exact path="/Vacations" component={UserPage} />
        <Route exact path="/" component={Signup} />
        <Route exact path="/SignUp" component={Login} />
      </Switch>
    </BrowserRouter>
  );
}

export default withRouter(Main)
