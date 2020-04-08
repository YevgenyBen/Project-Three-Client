import React, { useEffect, useState } from "react";
import { withRouter, Redirect } from "react-router-dom";
import axios from "axios";
import Header from "../components/Header";
import VacationCard from "../components/VacationCard"
import Container from '@material-ui/core/Container';
import { useSelector } from "react-redux";
import Vacations from "../components/Vacations"
import "./UserPage.css"

function UserPage(props) {
    return (
        <Vacations />
    )
}

export default withRouter(UserPage);