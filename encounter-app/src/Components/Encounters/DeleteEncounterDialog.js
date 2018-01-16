import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         deleteEncounter
        } from '../../DatabaseFunctions/FirebaseFunctions';
import DeleteDialog from '../CharactersAndMonsters/DeleteDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  id: PropTypes.string,
  encounter: PropTypes.object,
};

class DeleteEncounterDialog extends React.Component {
  
  /**
   * Handles close requests from the delete dialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Deletes an encounter from the database
   */
  handleDelete = () => {
    // Get user id
    getUserId((userid) => {
      //Delete encounter from database
      deleteEncounter(userid, this.props.id);
    });
    
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
    const { encounter } = this.props;
    
    //Catch null character
    if(encounter == null) {
      return <div></div>;
    }
    
    return (
      <DeleteDialog
        objectName={encounter.title}
        objectType={'encounter'}
        open={this.props.open}
        onDelete={this.handleDelete}
        onRequestClose={this.handleRequestClose}
      />
    );
  }
}

DeleteEncounterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(DeleteEncounterDialog);