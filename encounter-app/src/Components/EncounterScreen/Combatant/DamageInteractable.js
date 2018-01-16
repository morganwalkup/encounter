import React from 'react';
import Button from 'material-ui/Button';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

class DamageInteractable extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      damage: '',
      showDamageInput: false,
    };
  }
  
  /**
   * Handles user click on this component
   */
  handleClick = () => {
    this.setState({
      showDamageInput: true,
    });
  };

  /**
   * Handles change of the damage textfield
   * @param event - event raised by textfield value change
   */
  handleChange = event => {
    this.setState({
      damage: event.target.value,
    });
  };
  
  /**
   * Handles user keypress when this component is focused
   * Applies input damage on 'Enter'
   * @param event - event raised by user keypress
   */
  handleKeyPress = event => {
    if(event.key === 'Enter') {
      this.setState({
        damage: '',
        showDamageInput: false,
      });
      this.props.onDamage(event.target.value);
    }
  }
  
  /**
   * Handles un-focusing of this component
   */
  handleBlur = () => {
    this.setState({
      damage: '',
      showDamageInput: false,
    });
  }
  
  render() {
    const { classes } = this.props;
    
    //Conditionally apply style elements
    let damageClasses = [classes.damage];
    let damageInteractable;
    if(this.state.showDamageInput === true) {
      damageClasses.push(classes.activeDamage);
      damageInteractable = 
        <TextField
          value={this.state.damage}
          onChange={this.handleChange}
          onKeyPress={this.handleKeyPress}
          onBlur={this.handleBlur}
          type="number"
          className={classes.damageInput}
          margin="dense"
          autoFocus
        />;
    } else {
      damageClasses.push(classes.inactiveDamage);
      damageInteractable =
        <Button 
          color='contrast' 
          onClick={this.handleClick}
        >DMG</Button>;
    }
    
    return (
      <div className={damageClasses.join(' ')}>
        {damageInteractable}
      </div>
    );
  }
}

const styles = theme => ({
  damage: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '101%',
    height: '101%',
    borderRadius: '50%',
    background: 'rgba(0,0,0,0.5)',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
  },
  inactiveDamage: {
    opacity: 0,
    '&:hover': {
      opacity: 1,
    },
  },
  activeDamage: {
    opacity: 1,
  },
  damageInput: {
    width: '45%',
    background: 'rgba(255,255,255,0.8)',
    padding: '2% 5%',
    borderRadius: 2,
    float: 'none',
  },
});

export default withStyles(styles)(DamageInteractable);