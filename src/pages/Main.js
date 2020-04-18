import React from "react";
import { Switch, Route, withRouter, Redirect, BrowserRouter } from "react-router-dom";
import Login from "../components/Login";
import Signup from "../components/Signup";
import UserPage from "./UserPage"
import AdminPage from "./AdminPage"
import axios from "axios"
import { useSelector } from "react-redux";
import ProtectedRoute from "../components/ProtectedRoute"
import PrivateRoute from "../components/PrivateRoute"

function Main(props) {
  const currentUser = useSelector(state => state.currentUserReducer.currentUser)
  console.log(currentUser)
  const userToken = useSelector(state => state.currentUserReducer.token)
  var header = `authorization: bearer ${userToken}`;

  const auth = async (currentUser, userToken) => {
    let result = await axios.get(`http://localhost:4001/users/auth `, { headers: { header } })
    console.log(result)
    if (result.data.UserName === "Admin") {
      console.log("true")
      return true
    }
    else {
      console.log("false")
      return false
    }

  }
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
