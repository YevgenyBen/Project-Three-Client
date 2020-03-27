import React, { useEffect, useState } from "react";
import "typeface-roboto";
import Paper from "@material-ui/core/Paper";
import Button from "@material-ui/core/Button";
// import TextField from "@material-ui/core/TextField";
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
import CostumModal from "./CostumModal"

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
  // const [firstName, setFirstName] = useState("");
  // const [lastName, setLastName] = useState("");
  // const [userName, setUserName] = useState("");
  // const [password, setPassword] = useState("");
  const [oUser, setoUser] = useState({});
  const [modalShow, setModalShow] = useState(false);

  const oUserT = {
    first_name: "",
    last_name: "",
    user_name: "",
    password: "",
    passwordVerification: ""
  };

  oUserT.first_name = useSelector(state => state.signUpReducer.firstName);
  oUserT.last_name = useSelector(state => state.signUpReducer.lastName);
  oUserT.user_name = useSelector(state => state.signUpReducer.userName);
  oUserT.password = useSelector(state => state.signUpReducer.password);
  oUserT.passwordVerification = useSelector(state => state.signUpReducer.PasswordVerification);


  // console.log("oUserT:",oUserT);


  const sendRegistration = () => {

    console.log("sending user to signup: ", oUser);
    axios
      .post(`http://localhost:4001/login/signup`, { oUser })
      .then(res => {
        // console.log(res);
        console.log("success: ", res.data);
        if (res.data.result === "success")
          localStorage.setItem('token', res.data.token);
        else {
          if (res.data.reason === "user name taken")
            setModalShow(true)
        }
      })
      .catch(function (error) {
        console.log("error: ", error);
      });
  };


  useEffect(() => {
    setoUser({ ...oUserT })
  }, [oUserT.first_name, oUserT.last_name, oUserT.user_name, oUserT.passwordVerification, oUserT.password])


  const classes = useStyles();
  return (

    <Container className={classes.root}>
      {
        modalShow
          ?
          <CostumModal
            registration={true}
            msg="  is taken, Please choose another username"
            username={oUserT.user_name}
            show={modalShow}
            onHide={() => setModalShow(false)}
          />
          :
          null
      }
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
              <form className={classes.form} noValidate>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <CostumTextField id={"FirstName"} label={"First Name"} type={"Text"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"LastName"} label={"Last Name"} type={"Text"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"UserName"} label={"User Name"} type={"Text"} />
                  </Grid>
                  <Grid item xs={12}>
                    <CostumTextField id={"Password"} label={"Password"} type={"Password"} />
                  </Grid>
                  <Grid item xs={12}>

                    {(oUser.password === oUser.passwordVerification) ?
                      <CostumTextField error={false} id={"PasswordVerification"} label={"Password Verification"} type={"Password"} /> : 
                      <CostumTextField error={true} id={"PasswordVerification"} label={"Password Verification"} type={"Password"} />}
                  </Grid>
                </Grid>
                <Box mt={2}>
                  {(oUserT.first_name && oUserT.last_name && oUserT.password && oUserT.passwordVerification && oUserT.user_name) ?
                    <Button
                      onClick={sendRegistration}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                    >
                      Sign Up

                  </Button> : <Button
                      onClick={sendRegistration}
                      fullWidth
                      variant="contained"
                      color="primary"
                      className={classes.submit}
                      disabled>
                      Please fill in all fields
                  </Button>
                  }

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
