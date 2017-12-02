import React from 'react';
import ReactDOM from 'react-dom';
import Combatant from './Combatant/Combatant';
import { withStyles } from 'material-ui/styles';

class CombatantGroup extends React.Component {
  
  scrollToActiveCombatant = (combatant) => {
    const combatantNode = ReactDOM.findDOMNode(combatant);
    const cgNode = ReactDOM.findDOMNode(this);
    const paddingTop = 20;
    cgNode.scrollTo(0, combatantNode.offsetTop - paddingTop);
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
        onActive={this.scrollToActiveCombatant}
      />
    );

    return(
      <div className={cgClassnames.join(' ')}>
          {generatedCombatants}
      </div>
    ); 
  }
}

const styles = ({
  combatantGroup: {
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