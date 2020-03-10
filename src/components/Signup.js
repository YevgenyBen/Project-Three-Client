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

function Login() {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [userName, setUserName] = useState("");
  const [password, setPassword] = useState("");

  const handleChange = event => {
    switch (event.target.name) {
      case "First Name": {
        setFirstName(event.target.value);
      }
      case "Last Name": {
        setLastName(event.target.value);
      }
      case "User Name": {
        setUserName(event.target.value);
      }
      case "password": {
        setPassword(event.target.value);
      }
    }
  };

  const sendRegistration = () => {
    let oUser = {
      first_name: firstName,
      last_name: lastName,
      user_name: userName,
      password: password
    };
    console.log(oUser);
    axios.post(`http://localhost:4001/login/signup`, { oUser }).then(res => {
      console.log(res);
      console.log(res.data);
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
                    <TextField
                      onChange={handleChange}
                      variant="outlined"
                      required
                      fullWidth
                      id="First Name"
                      label="First Name"
                      name="First Name"
                      autoComplete="First Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="Last Name"
                      label="Last Name"
                      name="Last Name"
                      autoComplete="Last Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      id="User Name"
                      label="User Name"
                      name="User Name"
                      autoComplete="User Name"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <TextField
                      variant="outlined"
                      required
                      fullWidth
                      name="password"
                      label="Password Verification"
                      type="password"
                      id="password"
                      autoComplete="current-password"
                    />
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

export default Login;
