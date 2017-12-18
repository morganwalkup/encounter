import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeInfo(props) {
  const { classes } = props;
  return(
    <Grid container spacing={0} className={classes.splash}>
      <Grid item xs={12}>
        <Typography className={classes.tagline}>So Much to Love!</Typography>
      </Grid>
      <Grid item xs={12} className={classes.splashCardContainer}>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={12} sm={4} md={3}>
            <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Polished Animations
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Breathe life into combat with smooth animations
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
             <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Initiative Tracking
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  We take care of the little things, so you can focus on running the game
                </Typography>
              </CardContent>
            </Card>
          </Grid>
          <Grid item xs={12} sm={4} md={3}>
             <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Stat Blocks
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Detailed stats are only a click away
                </Typography>
              </CardContent>
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
    backgroundColor: blueGrey[900],
    borderBottom: 'solid thick #FFFA58',
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

export default withStyles(styles)(HomeInfo);