import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import { Link } from 'react-router-dom';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  onContinueClick: PropTypes.func.isRequired,
  onSettingsClick: PropTypes.func.isRequired,
};

class EncounterScreenFooter extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      encounterStarted: false,
    };
  }
  
  /**
   * Handles user click of "start" or "continue" button
   */
  handleContinueClick = () => {
    this.setState({
      encounterStarted: true,
    });
    this.props.onContinueClick();
  }
  
  /**
   * Handles user click of the "settings" button
   */
  handleSettingsClick = () => {
    this.props.onSettingsClick();
  }
  
  render(){
    const { classes } = this.props;
  
    return(
      <div className={classes.footer}>
        <Button 
          color="contrast"
          component={Link}
          to="/"
        >
          &lt; Exit
        </Button>
        <Button color="contrast" onClick={this.handleContinueClick}>
          {this.state.encounterStarted ? "Continue" : "Start"}
        </Button>
        <Button color="contrast" onClick={this.handleSettingsClick}>
          Settings
        </Button>
      </div>
    ); 
  }
}

EncounterScreenFooter.propTypes = propTypes;

const styles = theme => ({
  footer: {
    boxSizing: 'content-box',
    position: 'absolute',
    top: '93vh',
    left: '0vw',
    width: '94%',
    height: '5vh',
    padding: '0 3% 2vh 3%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0px -10px 5px 5px rgba(0,0,0,0.8)',  
    opacity: 0.2,
    transition: 'opacity 0.4s',
    '&:hover': {
      opacity: 1.0,
    },
  },
});

export default withStyles(styles)(EncounterScreenFooter);