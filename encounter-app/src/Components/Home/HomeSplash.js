import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import SplashBackground from '../../images/squadfadedflipped.jpg';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeSplash(props) {
  const { classes } = props;
  return(
    <Grid container spacing={0} className={classes.splash}>
      <Grid item xs={0} md={6}>
      </Grid>
      <Grid item xs={12} md={6} className={classes.callContainer}>
        <Typography type="display3" className={classes.tagline}>Visual Combat for Tabletop Games</Typography>
        <Typography type="display1" className={classes.description}>
          <em>Encounter!</em> makes combat engaging, fluid, and simple. Sign up now to see the difference.
        </Typography>
        <Button
          raised 
          className={classes.actionButton}
          component={Link}
          to="/signup"
        >
          Sign Up!
        </Button>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  splash: {
    width: '100%',
    height: 'auto',
    minHeight: 450,
    paddingTop: theme.spacing.unit * 8,
    backgroundImage: "url(" + SplashBackground + ")",
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
    borderBottom: 'solid thick #69f0ae',
  },
  callContainer: {
    padding: '0 30px',
    marginTop: 10,
    marginBottom: 30,
  },
  tagline: {
    fontWeight: 'bold',
    color: 'white',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
  },
  description: {
    color: 'white',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
  },
  actionButton: {
    margin: '25px 0',
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    },
    transformOrigin: 'left',
    transform: 'scale(1.5)',
  },
  splashCard: {
    width: '90%',
    margin: '0 5%',
    marginTop: 10,
    borderRadius: '5px 5px 3px 3px',
  },
  splashCardTitle: {
    color: 'white',
    backgroundColor: blueGrey[900],
    padding: '10px',
    margin: 0,
    borderRadius: '3px 3px 0 0',
  },
  splashCardContent: {
    //minHeight: 155,
  },
  splashCardActions: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
    textAlign: 'center',
  }
});

export default withStyles(styles)(HomeSplash);