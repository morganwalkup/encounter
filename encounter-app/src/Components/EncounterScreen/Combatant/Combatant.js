import React from 'react';
import CombatantCircle from './CombatantCircle';
import StatBar from './StatBar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

class Combatant extends React.Component {
  componentDidUpdate() {
    if(this.props.combatant.isActive) {
      this.props.onActive(this);
    }
  }
  
  handleInfoClick = () => {
    this.props.onInfoClick(this.props.combatant);
  }
  
  render() {
    const {classes, combatant} = this.props;
    
    //Assemble Combatant css classes
    const combatantClasses = [classes.base];
    if(combatant.isActive) {
      combatantClasses.push(classes.active);
    }
    
    return (
      <div className={combatantClasses.join(' ')}>
        <CombatantCircle hitPoints={combatant.hit_points} img={combatant.image}/>
        <StatBar 
          //hitPoints={combatant.hit_points}
          speed={combatant.speed}
          initiative={combatant.initiative}
          armorClass={combatant.armor_class}
        />
        <Button color='contrast' 
          onClick={this.handleInfoClick} 
          className={classes.nameButton}
        >
          {combatant.name}
        </Button>
      </div>
    );
  }
}

const styles = ({
  base: {
    position: 'relative',
    width: '52%',
    height: 'auto',
    marginBottom: '18%', 
    '&:last-child': {
      paddingBottom: '8vh',
    }
  },
  active: {
    transition: 'width 0.4s',
    width: '75%',
  },
  nameButton: {
    textTransform: 'none',
    fontSize: '1.15em',
    width: '100%',
    marginTop: '5px',
    textShadow: '0px 3px 10px rgba(0,0,0,1)',
  }
});

export default withStyles(styles)(Combatant);