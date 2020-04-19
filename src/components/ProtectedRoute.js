import React from "react";
import { Route, Redirect } from "react-router-dom";
import { useSelector } from "react-redux";


function ProtectedRoute({ children, ...rest }) {
    const role = useSelector(state => state.currentUserReducer.role)
    return (
        <Route
            {...rest}
            render={({ location }) =>
                (role === 2) ? (
                    children
                ) : (
                        <Redirect
                            to={{
                                pathname: "/Vacations",
                                state: { from: location }
                            }}
                        />
                    )
            }
        />
    )
}
export default ProtectedRoute