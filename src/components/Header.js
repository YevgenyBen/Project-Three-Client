import React from "react";
import "typeface-roboto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Avatar from "@material-ui/core/Avatar";
import DirectionsBoatIcon from "@material-ui/icons/DirectionsBoat";
import Grid from "@material-ui/core/Grid";

function Header (props){
    return (
      <AppBar style={{backgroundColor:"#006064"}}>
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end">
                        <Avatar>
              <DirectionsBoatIcon />
            </Avatar>

    <Typography variant="h6">{props.user}</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    );
}

export default Header;
