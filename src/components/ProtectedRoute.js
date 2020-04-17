import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, Redirect } from "react-router-dom";
import AdminPage from "../pages/AdminPage"
import axios from "axios"
import { useSelector } from "react-redux";


function ProtectedRoute({ children, ...rest }) {
    // const [auth, setAuth] = useState()

    const role = useSelector(state => state.currentUserReducer.role)
    console.log('role: ', role);

    // const userToken = useSelector(state => state.currentUserReducer.token)
    // var header = `authorization: bearer ${userToken}`;

    // const auth = async () => {
    //     console.log("before")
    //     let result = await axios.get(`http://localhost:4001/users/auth `, { headers: { header } })
    //     console.log(result)
    //     console.log("after")
    //     if (result.data.UserName === "Admin") {
    //         console.log("true")
    //         return true
    //     }
    //     else {
    //         console.log("false")
    //         return false
    //     }

    // }

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