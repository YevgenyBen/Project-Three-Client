import React from "react";
import { Switch, Route, BrowserRouter, withRouter } from "react-router-dom";
import Header from "../components/Header";
import { useSelector } from "react-redux";
import AdminMenu from "../components/AdminMenu"
import GraphHolder from "../components/GraphHolder"
import Vacations from "../components/Vacations"
import DetailedView from "../components/DetailedView"
import ProtectedRoute from "../components/ProtectedRoute"
import PrivateRoute from "../components/PrivateRoute"


function AdminPage(props) {


    let currentUser = useSelector(state => state.currentUserReducer.currentUser)
    return (
        <div>
            <Header user={currentUser} />
            <BrowserRouter>
                <Switch>
                    {/* <Route exact path="/Admin/Graph" component={GraphHolder} />
                <Route exact path="/Admin/Vacations" component={Vacations} />
                <Route exact path="/Admin/Add" component={DetailedView} />         
                <Route exact path="/Admin" component={AdminMenu} /> */}
                    <ProtectedRoute exact path="/Admin/Graph">
                        <GraphHolder />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/Admin/Vacations">
                        <Vacations />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/Admin/Add">
                        <DetailedView />
                    </ProtectedRoute>
                    <ProtectedRoute exact path="/Admin">
                        <AdminMenu />
                    </ProtectedRoute>

                </Switch>
            </BrowserRouter>
        </div>
    )
}

export default withRouter(AdminPage);