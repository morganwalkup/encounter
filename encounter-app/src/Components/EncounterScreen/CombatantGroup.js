import React from 'react';
import PropTypes from 'prop-types';
import ReactDOM from 'react-dom';
import Combatant from './Combatant/Combatant';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  rightSide: PropTypes.bool,
  combatants: PropTypes.array,
  onInfoClick: PropTypes.func.isRequired,
};

class CombatantGroup extends React.Component {
  
  handleActiveCombatant = (combatant) => {
    this.scrollToActiveCombatant(combatant);
  }
  
  handleInfoClick = (combatant) => {
    this.props.onInfoClick(combatant);
  }
  
  scrollToActiveCombatant = (combatant) => {
    const combatantNode = ReactDOM.findDOMNode(combatant);
    const cgNode = ReactDOM.findDOMNode(this);
    const paddingTop = 20;
    cgNode.scrollTo({
      top: combatantNode.offsetTop - paddingTop,
      left: 0,
      behavior: 'smooth',
    });
  }
  
  render() {
    const { classes, combatants } = this.props;
    
    //Assemble CombatantGroup css classes
    const cgClassnames = [classes.combatantGroup];
    if(this.props.rightSide) {
      cgClassnames.push(classes.rightSide);
    }
    
    //Generate combatants
    const generatedCombatants = combatants.map((combatant, index) =>
      <Combatant 
        key={index}
        combatant={combatant}
        onActive={this.handleActiveCombatant}
        onInfoClick={this.handleInfoClick}
      />
    );

    return(
      <div className={cgClassnames.join(' ')}>
        {generatedCombatants}
      </div>
    ); 
  }
}

CombatantGroup.propTypes = propTypes;

const styles = ({
  combatantGroup: {
    padding: '0 5px',
    paddingTop: '5vh',
    height: '95vh',
    overflow: 'auto',
    position: 'relative',
  },
  rightSide: {
    '& >*': {
      float: 'right',
    }
  },
});

export default withStyles(styles)(CombatantGroup);