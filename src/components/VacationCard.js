import React, { useState } from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardHeader from '@material-ui/core/CardHeader';
import CardMedia from '@material-ui/core/CardMedia';
import CardContent from '@material-ui/core/CardContent';
import CardActions from '@material-ui/core/CardActions';
import IconButton from '@material-ui/core/IconButton';
import Typography from '@material-ui/core/Typography';
import { red } from '@material-ui/core/colors';
import FavoriteIcon from '@material-ui/icons/Favorite';
import ShareIcon from '@material-ui/icons/Share';
import { useDispatch, useSelector } from "react-redux";
import { updateActions } from "../actions/updateActions"
import axios from "axios";
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
}));



export default function VacationCard(props) {
  const [addMode] = useState(props.mode)
  const dispatch = useDispatch();

  let userName = useSelector(state => state.currentUserReducer.currentUser)

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

  return (
    <FadeInDiv >
      <FadeOutDownDiv>

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
            image={require('../assets/vac3.jpg')}
            title="Paella dish"
          />
          <CardContent >
            <Typography variant="body1" color="textPrimary" component="p">
              {"12.10.2020 - 15.10.2020"}
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
            <IconButton aria-label="share">
              <ShareIcon />
            </IconButton>
          </CardActions>
        </Card>

      </FadeOutDownDiv>
    </FadeInDiv>
  );
}
