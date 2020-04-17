import React, { useEffect, useState } from "react";
import "./DetailedView.css"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import DetailedView from "./DetailedView";
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: "10px",
    },
}));


function ConfirmationModal(props) {

    const [open, setOpen] = useState(props.open);


    const classes = useStyles();

    return (
        <Modal
            aria-labelledby="transition-modal-title"
            aria-describedby="transition-modal-description"
            className={classes.modal}
            open={props.open}
            onClose={props.handleClose}
            closeAfterTransition
            BackdropComponent={Backdrop}
            BackdropProps={{
                timeout: 500,
            }}
        >
            <div className={classes.paper}>
                <div style={{ textAlign: "center" }}>Delete vacation to {props.currentVacation.destination}?</div>
                <div>
                    <Button
                        size="small"

                        variant="contained"
                        onClick={props.delete}
                    >Delete</Button>
                    <Button
                        size="small"

                        variant="contained"
                        style={{ float: "right" }}
                        onClick={props.handleClose}
                    >Cancel</Button>
                </div>
            </div>
        </Modal>
    )

}

export default ConfirmationModal;