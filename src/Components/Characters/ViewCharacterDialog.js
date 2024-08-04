import React from 'react';
import PropTypes from 'prop-types';
import ViewCombatantDialog from '../CharactersAndMonsters/ViewCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  character: PropTypes.object,
};

class ViewCharacterDialog extends React.Component {
  
  /**
   * Handles close request from ViewCombatantDialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { character } = this.props;
    
    return (
      <ViewCombatantDialog
        isCharacter
        combatant={character}
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

ViewCharacterDialog.propTypes = propTypes;

const styles = { };

export default withStyles(styles)(ViewCharacterDialog);