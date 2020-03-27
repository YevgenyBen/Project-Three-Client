import React from 'react';
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


const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 300,
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
  const classes = useStyles();

  return (
    <Card
      className={classes.root}
      raised
    >
      <CardHeader style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:"10px 0px 0px 0"
      }}
        title={props.destination}
      />
      <CardHeader style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        padding:"5px 0px 10px 0px "
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
        <Typography style={{ margin: "20px 0px 40px 0px" }} variant="body2" color="textSecondary" component="p">
          {props.description}
        </Typography>
      </CardContent>
      <CardActions style={{ bottom: "0", position: "absolute" }} disableSpacing>
        <IconButton aria-label="add to favorites">
          <FavoriteIcon />
        </IconButton>
        <IconButton aria-label="share">
          <ShareIcon />
        </IconButton>
      </CardActions>

    </Card>

  );
}
