import React, { useState } from "react";
import { withRouter, Link, useRouteMatch } from "react-router-dom";
import CssBaseline from '@material-ui/core/CssBaseline';
import Typography from '@material-ui/core/Typography';
import Container from '@material-ui/core/Container';
import { makeStyles } from '@material-ui/core/styles';
import AdminButton from "./AdminButton"
import EditModal from "./EditModal"
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
function AdminMenu(props) {
    const [open, setOpen] = useState(false);
    const classes = useStyles();

    const handleOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    return (
        <>
            <EditModal edit={false} open={open} handleClose={() => setOpen(false)} />
            <CssBaseline />
            <Container maxWidth="sm">
                <Typography component="div" className={"buttonHolder " + classes.root} >

                    <Link to="/Admin/Graph" className={"btnA"} >
                        <AdminButton text="Favorite Destinations" name={"btn"} background="132.jpg" />
                    </Link >
                    <Link to="/Admin/Vacations" className={"btnB"} >
                        <AdminButton text="View Vacations" name={"btn"} background="cities.jpg" />
                    </Link>
                    <div className={"btnC"} onClick={handleOpen}>
                        <AdminButton text="Add Vacation" name={"btn"} background="globe.jpg" />
                    </div>

                </Typography>
            </Container>
        </>
    )
}

export default withRouter(AdminMenu)