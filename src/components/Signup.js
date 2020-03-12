import React, { useState, useEffect } from "react";
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
import CostumTextField from "./CostumTextField";
import { useSelector } from "react-redux";

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

function Signup() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [oUser, setoUser] = useState({});
  var oUserT = {
    first_name: "",
    last_name: "",
    user_name: "",
    password: ""
  };

  oUserT.first_name = useSelector(state => state.userReducer.firstName);
  oUserT.last_name = useSelector(state => state.userReducer.lastName);
  oUserT.user_name = useSelector(state => state.userReducer.userName);
  oUserT.password = useSelector(state => state.userReducer.password);
  console.log(oUserT);
  //   useEffect(() => {
  //     setoUser(oUserT);
  //   }, [oUserT]);

  //   setoUser(oUserT);

  //   setFirstName(oUser.first_name);
  //   setLastName(oUser.last_name);
  //   setUserName(oUser.user_name);
  //   setPassword(oUser.password);

  const sendRegistration = () => {
    // let oUser = {
    //   first_name: firstName,
    //   last_name: lastName,
    //   user_name: userName,
    //   password: password
    // };
    console.log(oUser);
    axios
      .post(`http://localhost:4001/login/signup`, { oUser })
      .then(res => {
        console.log(res);
        console.log(res.data);
      })
      .catch(function(error) {
        console.log(error);
      });
  };

  const classes = useStyles();
  return (
    <Container className={classes.root}>
      <Paper elevation={10}>
        <Box p={3}>
          <CssBaseline />
          <div className={classes.paper}>
            <Avatar className={classes.avatar}>
              <DirectionsBoatIcon />
            </Avatar>
            {/* <Typography component="h1" variant="h5">
              Triper
            </Typography> */}
            <Box mt={1}>
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CostumTextField error={true} id={"FirstName"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"LastName"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"UserName"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"Password"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"Password Verification"} />
                  </Grid>
                </Grid>
                <Box mt={2}>
                  <Button
                    onClick={sendRegistration}
                    fullWidth
                    variant="contained"
                    color="primary"
                    className={classes.submit}>
                    Sign Up
                  </Button>
                </Box>
                <Box mt={1}>
                  <Grid container justify="flex-end">
                    <Grid item>
                      <Link to="/" variant="body2">
                        Already have an account? Sign in
                      </Link>
                    </Grid>
                  </Grid>
                </Box>
              </form>
            </Box>
          </div>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
