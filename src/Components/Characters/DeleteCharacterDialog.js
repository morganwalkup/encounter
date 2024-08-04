import React from 'react';
import PropTypes from 'prop-types';
import Character from '../../Models/Character';
import DeleteDialog from '../CharactersAndMonsters/DeleteDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  characterid: PropTypes.string,
  character: PropTypes.object,
};

class DeleteCharacterDialog extends React.Component {
  
  /**
   * Handles close requests from the delete dialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Deletes a character from the database
   */
  handleDelete = () => {
    // Delete character
    const character = Character.copy(this.props.character);
    character.deleteChar();
    // Close the dialog
    this.handleRequestClose();
  }
  
  /** 
   * Handles user clicks of the "Cancel" button
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { character } = this.props;
    
    //Catch null character
    if(character == null) {
      return <div></div>;
    }
    
    return (
      <DeleteDialog
        objectName={character.name}
        objectType={'character'}
        open={this.props.open}
        onDelete={this.handleDelete}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

DeleteCharacterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(DeleteCharacterDialog);