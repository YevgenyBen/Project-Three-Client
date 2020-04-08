import React from "react";
import "typeface-roboto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import Grid from "@material-ui/core/Grid";
import { useDispatch, useSelector } from "react-redux";
import ExitToAppOutlinedIcon from '@material-ui/icons/ExitToAppOutlined';
import Tooltip from '@material-ui/core/Tooltip';
import IconButton from '@material-ui/core/IconButton';
import { withRouter } from "react-router-dom";
import { currentUserActions } from "../actions/currectUserActions"

function Header(props) {
  const dispatch = useDispatch()

  const logOut = () => {
    dispatch(currentUserActions["currentUser"](""));
    dispatch(currentUserActions["token"](""));
    dispatch(currentUserActions["role"](""));
    localStorage.removeItem('token');
    const location = {
      pathname: '/'
    }
    props.history.push(location);
  }
  return (
    <AppBar style={{ backgroundColor: "#006064" }}>
      <Toolbar>
        <Grid
          container
          direction="row"
          justify="space-between"
          alignItems="flex-end">
          <Avatar>
            <DirectionsBoatIcon />
          </Avatar>
          <Typography variant="h6">
            {useSelector(state => state.currentUserReducer.currentUser)}
            <IconButton
              size="small"
              color="inherit"
              onClick={logOut}
            >
              <Tooltip
                title="Log Out"
                enterDelay={0}
              >
                <ExitToAppOutlinedIcon>
                </ExitToAppOutlinedIcon>
              </Tooltip>
            </IconButton>
          </Typography>
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

export default withRouter(Header);
