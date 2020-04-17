import React, { useEffect, useState } from "react";
import "./DetailedView.css"
import Modal from '@material-ui/core/Modal';
import Backdrop from '@material-ui/core/Backdrop';
import DetailedView from "./DetailedView";
import { makeStyles } from '@material-ui/core/styles';


const useStyles = makeStyles(theme => ({
    modal: {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    paper: {
        backgroundColor: theme.palette.background.paper,
        border: '2px solid #000',
        boxShadow: theme.shadows[5],
        padding: theme.spacing(2, 4, 3),
    },
}));


function EditModal(props) {

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

            <DetailedView handleClose={props.handleClose} edit={props.edit} currentVacation={props.currentVacation} />

        </Modal>
    )

}

export default EditModal;