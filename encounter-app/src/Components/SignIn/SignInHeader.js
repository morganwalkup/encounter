import React from 'react';
import Grid from 'material-ui/Grid';
import SplashBackground from '../../images/dndphbfaded.jpg';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

class SignInHeader extends React.Component {
  render() {
    const { classes } = this.props;
    return(
      <Grid container spacing={0} justify="center" className={classes.splash}>
        <Grid item xs={12}>
          <Typography className={classes.tagline}>Sign In</Typography>
        </Grid>
      </Grid>
    );
  }
}

const styles = theme => ({
  splash: {
    width: '100%',
    paddingTop: theme.spacing.unit * 8,
    backgroundImage: "url(" + SplashBackground + ")",
    backgroundSize: '100% auto',
    backgroundRepeat: 'no-repeat',
    backgroundColor: 'black',
  },
  tagline: {
    fontSize: '2em',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'white',
    margin: '10px 20px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
  },
});

export default withStyles(styles)(SignInHeader);