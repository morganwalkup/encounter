import React from 'react';
import PropTypes from 'prop-types';
import ViewCombatantDialog from '../CharactersAndMonsters/ViewCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  monster: PropTypes.object,
};

class ViewMonsterDialog extends React.Component {
  
  /**
   * Handles close request from ViewCombatantDialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { monster } = this.props;
    
    return (
      <ViewCombatantDialog
        isMonster
        combatant={monster}
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

ViewMonsterDialog.propTypes = propTypes;

const styles = { };

export default withStyles(styles)(ViewMonsterDialog);