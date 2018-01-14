import React from 'react';
import PropTypes from 'prop-types';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  encounter: PropTypes.object,
};

class ViewEncounterDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  };
  
  handleSave= () => {
    
  }
  
  handleCancel = () => {
    
  }

  render() {

    return (
      <div>
        <CRUDDialog
          fullScreen
          open={this.props.open}
          onRequestClose={this.handleRequestClose}
          onCloseClick={this.handleRequestClose}
          title="View Encounter"
          action="read"
          onCancel={this.handleCancel}
        >
        </CRUDDialog>
      </div>
    );
  }
}

ViewEncounterDialog.propTypes = propTypes;

const styles = {
  
};

export default withStyles(styles)(ViewEncounterDialog);