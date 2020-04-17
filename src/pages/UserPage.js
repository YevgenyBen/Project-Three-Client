import React from "react";
import { withRouter } from "react-router-dom";

import Vacations from "../components/Vacations"
import "./UserPage.css"

function UserPage(props) {
    return (
        <Vacations />
    )
}

export default withRouter(UserPage);