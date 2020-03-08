import React from "react";
import "typeface-roboto";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import Button from "@material-ui/core/Button";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";

class Header extends React.Component {
  render() {
    return (
      <AppBar color="primary">
        <Toolbar>
          <Grid
            container
            direction="row"
            justify="space-between"
            alignItems="flex-end">
            <Typography variant="h6">Triper</Typography>

            <Typography variant="h6">Button</Typography>
          </Grid>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Header;
