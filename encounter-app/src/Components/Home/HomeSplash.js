import React from 'react';
import {
  Link,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import SplashBackground from '../../images/dndphbfaded.jpg';
import Typography from 'material-ui/Typography';
import Card, { CardActions, CardContent } from 'material-ui/Card';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeSplash(props) {
  const { classes } = props;
  return(
    <Grid container spacing={0} className={classes.splash}>
      <Grid item xs={12}>
        <Typography className={classes.tagline}>Visual Combat for D&D</Typography>
      </Grid>
      <Grid item xs={12} className={classes.splashCardContainer}>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={12} sm={4} md={3}>
            <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Characters
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Create intrepid, daring adventurers and their stalwart allies
                </Typography>
              </CardContent>
              <CardActions className={classes.splashCardActions}>
                <Button raised component={Link} to="/characters">
                  Create a Character
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
             <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Encounters
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Pit your characters against fearsome foes in the arena of your choice
                </Typography>
              </CardContent>
              <CardActions className={classes.splashCardActions}>
                <Button raised>
                  Create an Encounter
                </Button>
              </CardActions>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
             <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Monsters
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Craft unspeakable horrors to oppose and endanger your adventurers
                </Typography>
              </CardContent>
              <CardActions className={classes.splashCardActions}>
                <Button raised>
                  Create a Monster
                </Button>
              </CardActions>
            </Card>
          </Grid>
        </Grid>
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
  tagline: {
    fontSize: '2em',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'white',
    margin: '25px 10px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
    textAlign: 'center',
  },
  splashCardContainer: {
    marginBottom: 30,
  },
  splashCard: {
    width: '80%',
    margin: '0 10%',
    borderRadius: '5px 5px 3px 3px',
  },
  splashCardTitle: {
    color: 'white',
    backgroundColor: blueGrey[900],
    padding: '10px',
    margin: 0,
    borderRadius: '3px 3px 0 0',
  },
  splashCardActions: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
  }
});

export default withStyles(styles)(HomeSplash);