import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import SplashBackground from '../../images/squadfaded.jpg';
import Typography from 'material-ui/Typography';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  onClickNew: PropTypes.func,
  title: PropTypes.string.isRequired,
  buttonText: PropTypes.string.isRequired,
};

class PageHeader extends React.Component {
  
  /**
   * Handles user click of "new" button
   */
  handleClickNew = () => {
    this.props.onClickNew();
  }
  
  render() {
    const { classes, title, buttonText } = this.props;
    return(
      <Grid container spacing={0} justify="center" className={classes.splash}>
        <Grid item xs={12} md={12} lg={9}>
          <Typography className={classes.tagline}>{title}</Typography>
        </Grid>
        <Grid item xs={12} md={12} lg={9}>
          <Hidden xsDown>
            <Button raised className={classes.newButton} onClick={this.handleClickNew}>{buttonText}</Button>
          </Hidden>
        </Grid>
      </Grid>
    );
  }
}

PageHeader.propTypes = propTypes;

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
    margin: '10px 10px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
  },
  newButton: {
    marginLeft: 10,
    marginBottom: 25,
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    }
  },
});

export default withStyles(styles)(PageHeader);