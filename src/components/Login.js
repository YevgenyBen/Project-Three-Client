import React, { useState } from "react";
import "typeface-roboto";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
import TextField from "@material-ui/core/TextField";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import Avatar from "@material-ui/core/Avatar";
import CssBaseline from "@material-ui/core/CssBaseline";
import { Link } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Box from "@material-ui/core/Box";
import { makeStyles } from "@material-ui/core/styles";
import Container from "@material-ui/core/Container";
import axios from "axios";
import CostumModal from "./CostumModal"
import { withRouter } from "react-router-dom";
import { loginActions } from "../actions/loginActions"
import { currentUserActions } from "../actions/currectUserActions"
import { useDispatch, useSelector } from "react-redux";

const useStyles = makeStyles({
  root: {
    minWidth: 275,
    maxWidth: 400,
    maxHeight: 600,
    position: "fixed",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)"
  },
  title: {
    fontSize: 14
  },
  pos: {
    marginBottom: 12
  },
  paper: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center"
  }
});

function Login(props) {

  const dispatch = useDispatch();


  const handleChange = event => {
    dispatch(loginActions[event.target.name](event.target.value));
  };

  var oLoginUser = {
    UserName: useSelector(state => state.loginReducer.UserName),
    Password: useSelector(state => state.loginReducer.Password)
  }

  const classes = useStyles();
  const [modalShow, setModalShow] = useState(false);


  const sendLogin = () => {

    console.log("sending user to login: ", oLoginUser);
    axios
      .post(`http://localhost:4001/login`, { oLoginUser })
      .then(res => {
        if (res.data.result === "success") {
          console.log("success: res.data", res.data);
          localStorage.setItem('token', res.data.token);
          //set redux state current user
          dispatch(currentUserActions["currentUser"](oLoginUser.UserName));
          dispatch(currentUserActions["role"](res.data.role));
          dispatch(currentUserActions["token"](res.data.token));
          const location = {
            pathname: '/Vacations',
            state: { username: oLoginUser.UserName }
          }
          props.history.push(location);
        }
        else {
          if (res.data.reason === "Bad user name or password")
            setModalShow(true)
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };

  return (
    <Container className={classes.root}>
      {modalShow ? <CostumModal registration={false} username="" msg="Bad user name or password" show={modalShow} onHide={() => setModalShow(false)} /> : null}
      <Paper elevation={10}>
        <Box p={3}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar>
              <DirectionsBoatIcon />
            </Avatar>
            {/* <Typography component="h1" variant="h5">
              Triper
            </Typography> */}
            <Box mt={1}>

              <Grid container spacing={2}>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    variant="standard"
                    required
                    fullWidth
                    id="User Name"
                    label="User Name"
                    name="UserName"
                    autoComplete="User Name"
                    value={useSelector(state => state.loginReducer.UserName)}
                  />
                </Grid>
                <Grid item xs={12}>
                  <TextField
                    onChange={handleChange}
                    variant="standard"
                    required
                    fullWidth
                    name="Password"
                    label="Password"
                    type="password"
                    id="password"
                    autoComplete="current-password"
                  />
                </Grid>
              </Grid>
              <Box mt={2}>
                <Button
                  onClick={sendLogin}
                  fullWidth
                  variant="contained"
                  color="primary"
                  className={classes.submit}>
                  Log In
                  </Button>
              </Box>
              <Box mt={1}>
                <Grid container justify="flex-end">
                  <Grid item>
                    <Link to="/SignUp" variant="body2">
                      Don't have an account? Sign Up
                      </Link>
                  </Grid>
                </Grid>
              </Box>

            </Box>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}

export default withRouter(Login);
