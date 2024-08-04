import React from 'react';
import PropTypes from 'prop-types';
import CombatantCircle from './CombatantCircle';
import StatBar from './StatBar';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  combatant: PropTypes.object,
  onActive: PropTypes.func,
  onInfoClick: PropTypes.func,
};

class Combatant extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentHP: this.props.combatant.HP,
    };
  }
  
  /**
   * Called after the component updates with new props or state
   */
  componentDidUpdate() {
    if(this.props.combatant.isActive) {
      this.props.onActive(this);
    }
  }
  
  /**
   * Handles user click of combatant name
   */
  handleInfoClick = () => {
    this.props.onInfoClick(this.props.combatant);
  }
  
  /**
   * Handles a change in combatant's health
   */
  handleHealthChange = (newHealth) => {
    this.setState({
      currentHP: newHealth
    });
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
        <CombatantCircle 
          onHealthChange={this.handleHealthChange}
          hitPoints={combatant.HP} 
          img={combatant.image}
        />
        <StatBar 
          currentHP={this.state.currentHP}
          speed={combatant.SPD}
          initiative={combatant.initiative.toString()}
          armorClass={combatant.AC}
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

Combatant.propTypes = propTypes;

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