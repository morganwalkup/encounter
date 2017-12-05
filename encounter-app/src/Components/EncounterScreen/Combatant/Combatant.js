import React from 'react';
import CombatantCircle from './CombatantCircle';
import StatBar from './StatBar';
import NameBar from './NameBar';
import { withStyles } from 'material-ui/styles';

class Combatant extends React.Component {
  componentDidUpdate() {
    if(this.props.combatant.isActive) {
      this.props.onActive(this);
    }
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
        <NameBar name={combatant.name}/>
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
  }
});

export default withStyles(styles)(Combatant);