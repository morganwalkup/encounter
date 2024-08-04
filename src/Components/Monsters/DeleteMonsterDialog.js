import React from 'react';
import PropTypes from 'prop-types';
import Monster from '../../Models/Monster';
import DeleteDialog from '../CharactersAndMonsters/DeleteDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  monsterid: PropTypes.string,
  monster: PropTypes.object,
};

class DeleteMonsterDialog extends React.Component {
  
  /**
   * Handles close requests from the delete dialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Deletes a monster from the database
   */
  handleDelete = () => {
    // Delete monster
    const monster = Monster.copy(this.props.monster);
    monster.deleteMonster();
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
    const { monster } = this.props;
    
    //Catch null monster
    if(monster == null) {
      return <div></div>;
    }
    
    return (
      <DeleteDialog
        objectName={monster.name}
        objectType={'monster'}
        open={this.props.open}
        onDelete={this.handleDelete}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

DeleteMonsterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(DeleteMonsterDialog);