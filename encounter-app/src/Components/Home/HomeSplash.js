import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeSplash(props) {
  const { classes } = props;
  return(
    <div className={classes.splashContainer}>
      <img className={classes.squadHeader} src={require('../../images/squadhome.jpg')} alt=''/>
      <Grid container spacing={0} className={classes.splash}>
        <Grid item xs={6}>
        </Grid>
        <Grid item xs={12} lg={4} className={classes.callContainer}>
          <Typography type="display2" className={classes.tagline}>ENCOUNTER!</Typography>
          <Typography type="display1" className={classes.description}>
            Bring engaging combat to your tabletop games
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
    </div>
  );
}

const styles = theme => ({
  splashContainer: {
    width: '100vw',
    overflow: 'hidden',
  },
  squadHeader: {
    display: 'block',
    width: '100%',
    height: 'auto',
    backgroundColor: 'black',
    [theme.breakpoints.down('xs')]: {
      width: '200%',
    }
  },
  splash: {
    [theme.breakpoints.down('md')]: {
      color: 'black',
      backgroundColor: '#e4e4e4',
    },
    [theme.breakpoints.up('lg')]: {
      position: 'absolute',
      top: theme.spacing.unit * 14,
      color: 'white',
    }
  },
  callContainer: {
    padding: '0 30px',
    marginBottom: 30,
    textAlign: 'center',
  },
  tagline: {
    color: 'inherit',
    fontWeight: 'bold',
    letterSpacing: '2px',
    [theme.breakpoints.up('lg')]: {
      textShadow: '0px 2px 5px rgba(0,0,0,1)',
    }
  },
  description: {
    color: 'inherit',
    lineHeight: '60px',
    margin: '10px 0',
    [theme.breakpoints.up('lg')]: {
      textShadow: '0px 2px 5px rgba(0,0,0,1)',
    }
  },
  actionButton: {
    margin: '25px 0',
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    },
    transformOrigin: 'center',
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