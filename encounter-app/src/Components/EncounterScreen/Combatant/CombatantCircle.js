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
      maxHealth: props.hitPoints,
      health: props.hitPoints,
    };
  }
  
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
    
    let imgPath = require('../../../images/combatants/' + img);
    
    return (
      <Paper className={classes.combatantCircle}>
        <Avatar src={imgPath} className={classes.avatar} />
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