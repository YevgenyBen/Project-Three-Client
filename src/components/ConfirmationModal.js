import React from "react";
import "./DetailedView.css"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Divider from '@material-ui/core/Divider';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        boxShadow: theme.shadows[5],
        padding: "30px",
    },
}));


function ConfirmationModal(props) {

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
                <Divider style={{ marginBottom: "15px" }} />
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