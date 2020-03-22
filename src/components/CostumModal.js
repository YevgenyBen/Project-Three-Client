import 'bootstrap/dist/css/bootstrap.min.css';
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'
import React, {useEffect,useState} from "react";
import Typography from '@material-ui/core/Typography';

function CostumModal(props){

    const [show, setShow] = useState(true);

    const handleClose = () => setShow(false);
    // const handleShow = () => setShow(true);

    return(
        <>
        {/* <Button variant="primary" onClick={handleShow}>
        Launch demo modal
      </Button> */}

      <Modal onHide={props.onHide} show={props.show} centered>
        <Modal.Header closeButton>
          <Modal.Title>Registration error</Modal.Title>
        </Modal.Header>
        <Modal.Body>Username <Typography variant={'h5'} display={'inline'}>
            {props.username}
                </Typography> is taken, Please choose another</Modal.Body>
            
             
        {/* <Modal.Footer>
        </Modal.Footer> */}
      </Modal>
      </>
    )
}

export default CostumModal;