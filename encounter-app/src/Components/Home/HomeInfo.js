import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeInfo(props) {
  const { classes } = props;
  return(
    <Grid container justify="center" spacing={0} className={classes.splash}>
      <Grid item xs={11} md={12} className={classes.splashCardContainer}>
        <Grid container justify="center" spacing={8}>
          <Grid item xs={12} sm={4} md={3} lg={2}>
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
          <Grid item xs={12} sm={4} md={3} lg={2}>
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
          <Grid item xs={12} sm={4} md={3} lg={2}>
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
    backgroundColor: '#e4e4e4',
    //borderBottom: 'solid thick #FFFA58',
    //borderTop: 'solid thick #69f0ae'
  },
  tagline: {
    fontSize: '2em',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'black',
    margin: '25px 10px',
    marginBottom: '15px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
    textAlign: 'center',
  },
  splashCardContainer: {
    marginBottom: 45,
    [theme.breakpoints.down('sm')]: {
      marginBottom: 30,
    }
  },
  splashCard: {
    width: '100%',
    //margin: '0 5%',
    marginTop: 10,
    borderRadius: '5px 5px 3px 3px',
    minHeight: '100%',
    [theme.breakpoints.down('sm')]: {
      marginBottom: 10,
      minHeight: 0,
    }
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