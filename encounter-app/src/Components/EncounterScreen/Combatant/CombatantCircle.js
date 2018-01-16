import React from 'react';
import Paper from 'material-ui/Paper';
import Avatar from 'material-ui/Avatar';
import HealthBar from './HealthBar';
import DamageInteractable from './DamageInteractable';
import { withStyles } from 'material-ui/styles';

class CombatantCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHealth: Number(props.hitPoints),
      health: Number(props.hitPoints),
    };
  }
  
  /**
   * Handles the application of damage to a combatant
   * Updates hit points based on damage taken
   * @param damage - number representing the points of damage taken
   */
  handleDamage = (damage) => {
    let newHealth = this.state.health - damage;
    if(newHealth > this.state.maxHealth)
      newHealth = this.state.maxHealth;
    else if (newHealth < 0)
      newHealth = 0;
      
    this.setState({
      health: newHealth,
    });
  }
  
  render() {
    const { classes, img } = this.props;
    
    return (
      <Paper className={classes.combatantCircle}>
        <Avatar src={img} className={classes.avatar} />
        <HealthBar max={this.state.maxHealth} value={this.state.health}/>
        <DamageInteractable onDamage={this.handleDamage}/>
      </Paper>
    );
  }
}

const styles = theme => ({
  combatantCircle: {
    position: 'relative',
    margin: '0 7%',
    height: 'auto',
    width: '86%',
    borderRadius: '50%',
    background: 'none',
  },
  avatar: {
    height: '100%',
    width: '100%',
  },
});

export default withStyles(styles)(CombatantCircle);