import React, { useEffect, useState } from "react";
import { Switch, Route, BrowserRouter, withRouter, Redirect, Link, useRouteMatch } from "react-router-dom";
import axios from "axios";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AdminButton from "./AdminButton"
import "./AdminMenu.css"

const useStyles = makeStyles({
    root: {
        border: 0,
        borderRadius: 3,
        height: 48,
        padding: '0 30px',
        marginTop: '200px',
    },
});
function AdminMenu() {
    const classes = useStyles();
    let { path, url } = useRouteMatch();

    return (
        <>
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" className={"buttonHolder " + classes.root} >

                    <Link to="/Graph" className={"btnA"} >
                        <AdminButton text="Graph" name={"btn"} background="132.jpg" />
                    </Link >
                    <Link to="/Vacations" className={"btnB"} >
                        <AdminButton text="View Vacations" name={"btn"} background="cities.jpg" />
                    </Link>
                    <Link to="/addVacations" className={"btnC"} >
                        <AdminButton text="Add Vacations" name={"btn"} background="globe.jpg" />
                    </Link>

                </Typography>
            </Container>
        </>
    )
}

export default withRouter(AdminMenu)