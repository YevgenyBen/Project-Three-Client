import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, withRouter, Redirect, useRouteMatch } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import Container from '@material-ui/core/Container';
import { useSelector } from "react-redux";
import AdminMenu from "../components/AdminMenu"
import Graph from "../components/Graph"
import GraphHolder from "../components/GraphHolder"
import Vacations from "../components/Vacations"


function AdminPage() {
    let { path, url } = useRouteMatch();
    //get all favortie, todo

    // useEffect(() => {

    // }, []);

    let currentUser = useSelector(state => state.currentUserReducer.currentUser)
    return (
        <div>
            <Header user={currentUser} />
            <BrowserRouter>

                <Switch>
                    <Route exact path="/Graph" component={GraphHolder} />
                    <Route path="/Vacations" component={Vacations} />

                    {/* <Route path="/AddVacation" component={AdminPage} /> */}
                    <Route path="/" component={AdminMenu} />
                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default withRouter(AdminPage);