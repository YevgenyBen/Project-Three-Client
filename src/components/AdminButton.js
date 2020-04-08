import React, { useEffect, useState } from "react";
import { makeStyles } from '@material-ui/core/styles';

function AdminButton(props) {

    const useStyles = makeStyles({
        root: {
            border: 1,
            borderRadius: "50%",
            width: "220px",
            height: "220px",
            boxShadow: "10px 10px 20px",
            backgroundImage: `url(${props.background})`,
            backgroundSize: "100% 100%"

        },
    });
    const classes = useStyles();
    return (
        <div className={props.name + " " + classes.root} >
            <div className="container">
                <div className="overlay">
                    <div className="text">{props.text}</div>
                </div>
            </div>
        </div>

    )
}

export default AdminButton