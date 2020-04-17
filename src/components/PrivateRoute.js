import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import AdminPage from "../pages/AdminPage"
import axios from "axios"
import { useSelector } from "react-redux";

class PrivateRoute extends React.Component {

    constructor(props, context) {
        super(props, context);
        var userToken = localStorage.getItem("token");
        var header = `authorization: bearer ${userToken}`;
        this.state = {
            isLoading: true,
            isLoggedIn: null,
            authenticate: () => {
                axios.get(`http://localhost:4001/users/auth `, { headers: { header } }).then((result) => {
                    if (result.data.UserName === "Admin") {
                        console.log("true")
                        this.setState(() => ({ isLoading: false, isLoggedIn: true }));
                    }
                    else {
                        console.log("false")
                        this.setState(() => ({ isLoading: false, isLoggedIn: false }));
                    }
                })
            }
        };

    }


    render() {
        return (

            this.state.isLoading ? null :
                this.state.isLoggedIn ?
                    <Route path={this.props.path} component={this.props.component} exact={this.props.exact} /> :
                    <Redirect to={{ pathname: '/Vacations', state: { from: this.props.location } }} />
        )
    }
}

export default PrivateRoute;