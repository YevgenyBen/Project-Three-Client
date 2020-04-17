import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import EditIcon from '@material-ui/icons/Edit';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';

import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../actions/updateActions"

import axios from "axios";

import EditModal from "./EditModal"
import ConfirmationModal from "./ConfirmationModal"


//animations
import styled, { keyframes } from "styled-components";
import { fadeIn, FadeOut } from 'react-animations';
const FadeInAnimation = keyframes`${fadeIn}`;
const FadeInDiv = styled.div`
  animation:  3s ${FadeInAnimation};
`;

const FadeOutDownAnimation = keyframes`${FadeOut}`;
const FadeOutDownDiv = styled.div`
  animation:  3s ${FadeOutDownAnimation};
`;
//animations


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
    minHeight: 500,
    maxHeight: 500,
    position: "relative"

  },
  media: {
    height: 0,
    paddingTop: '56.25%', // 16:9
  },
  avatar: {
    backgroundColor: red[500],
  },
  modal: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  paper: {
    backgroundColor: theme.palette.background.paper,
    border: '2px solid #000',
    boxShadow: theme.shadows[5],
    // padding: theme.spacing(2, 4, 3),
  },
}));



export default function VacationCard(props) {
  const [addMode] = useState(props.mode)

  //edit modal
  const [open, setOpen] = useState(false);
  //confirmation modal
  const [openConfirm, setOpenConfirm] = useState(false);

  const currentVacation = {
    id: props.id,
    destination: props.destination,
    price: props.price,
    description: props.description,
    picture: props.picture,
    to_date: props.to_date.substring(0, 10),
    from_date: props.from_date.substring(0, 10),
  }

  //edit modal
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  //confirmation modal
  const handleConfirmOpen = () => {
    setOpenConfirm(true);
  };

  const handleConfirmClose = () => {
    setOpenConfirm(false);
  };
  const dispatch = useDispatch();

  let userName = useSelector(state => state.currentUserReducer.currentUser)
  let role = useSelector(state => state.currentUserReducer.role)

  const classes = useStyles();

  const changeFavorite = (vacationId) => {
    console.log("current addmode:", addMode)
    if (addMode) {
      console.log('vacationId: ', vacationId);
      axios
        .post(`http://localhost:4001/users/add`, {
          user_name: userName,
          vacationId: vacationId
        })
        .then(res => {
          if (res.data.result === "success") {
            console.log("success: res.data", res.data);
            dispatch(updateActions["update"](true));

          }
          else {
            console.log("failure: res.data", res.data);
          }
        })
    } else {
      axios
        .post(`http://localhost:4001/users/delete`, {
          user_name: userName,
          vacationId: vacationId
        })
        .then(res => {
          if (res.data.result === "success") {
            console.log("success: res.data", res.data);
            dispatch(updateActions["update"](true));

          }
          else {
            console.log("failure: res.data", res.data);
          }
        })
    }
  };

  const deleteVacation = (vacationId) => {
    var userToken = localStorage.getItem("token");
    var header = `authorization: bearer ${userToken}`;
    axios
      .post(`http://localhost:4001/vacations/delete`, { id: vacationId }, { headers: { header } })
      .then(res => {
        if (res.data.result === "success") {
          console.log("success");
          setOpenConfirm(false)
        }
        else {
          console.log("failure: res.data", res.data);
          setOpenConfirm(false)
        }
      })
  }

  return (
    <FadeInDiv >
      <FadeOutDownDiv>

        <ConfirmationModal delete={() => deleteVacation(props.id)} open={openConfirm} handleClose={() => setOpenConfirm(false)} currentVacation={currentVacation} />
        <EditModal edit={true} open={open} handleClose={() => setOpen(false)} currentVacation={currentVacation} />

        <Card
          className={classes.root}
          raised
        >
          <CardHeader style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "10px 0px 0px 0"
          }}
            title={props.destination}
          />
          <CardHeader style={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            padding: "5px 0px 10px 0px "
          }}
            subheader={props.price + '\u20AC'}
          />
          <CardMedia
            className={classes.media}
            image={require('../assets/' + props.picture)}
            title="Paella dish"
          />
          <CardContent >
            <Typography variant="body1" color="textPrimary" component="p">
              {props.from_date.substring(0, 10)}&emsp;&emsp;&emsp;-&emsp;&emsp;&emsp;{props.to_date.substring(0, 10)}
            </Typography>
            <Typography style={{ margin: "20px 0px 40px 0px", overflow: "auto", maxHeight: 135 }} variant="body2" color="textSecondary" component="p">
              {props.description}
            </Typography>
          </CardContent>
          <CardActions style={{ bottom: "0", position: "absolute" }} disableSpacing>
            <IconButton
              onClick={() => changeFavorite(props.id)}
              color={props.color}
              aria-label="add to favorites"
              id={props.id}
            >
              <FavoriteIcon />
            </IconButton>
            {role === 2 ?
              <>
                <IconButton
                  aria-label="delete"
                  // onClick={() => deleteVacation(props.id)}
                  onClick={handleConfirmOpen}
                >
                  <DeleteForeverIcon />
                </IconButton>
                <IconButton
                  onClick={handleOpen}
                  aria-label="edit"
                >
                  <EditIcon />
                </IconButton>
              </> : null}
          </CardActions>
        </Card>

      </FadeOutDownDiv>
    </FadeInDiv>
  );
}
