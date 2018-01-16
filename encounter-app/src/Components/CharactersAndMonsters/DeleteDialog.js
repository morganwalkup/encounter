import React from 'react';
import PropTypes from 'prop-types';
import CRUDDialog from './CRUDDialog';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  objectName: PropTypes.string,
  objectType: PropTypes.oneOf(['character', 'monster', 'encounter']),
  open: PropTypes.bool,
  onDelete: PropTypes.func,
  onRequestClose: PropTypes.func,
};

class DeleteDialog extends React.Component {
  
  /**
   * Handles close request from CRUDDialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Handles user click of the "Delete" button
   */
  handleDelete = () => {
    this.props.onDelete();
  }
  
  /**
   * Handles user click of the "Cancel" button
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, objectType, objectName } = this.props;
    
    //Catch null objectName
    if(objectName == null) {
      return (
        <div>Error: No name given to delete dialog</div>
      );
    }
    
    //Determine title based on object type
    let title = "";
    switch(objectType) {
      case 'character':
        title = "Delete Character";
        break;
      case 'monster':
        title = "Delete Monster";
        break;
      case 'encounter':
        title = "Delete Encounter";
        break;
      default:
        break;
    }
    
    return (
      <CRUDDialog
        title={title}
        onDelete={this.handleDelete}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
        actions={
          <div>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={this.handleDelete} color="accent">Delete</Button> 
          </div>
        }
      >
        <List className={classes.list}>
          <Typography type="headline">
            Delete <strong>{objectName}</strong> forever?
          </Typography>
        </List>
      </CRUDDialog>
    );
  }
}

DeleteDialog.propTypes = propTypes;

const styles = {
  list: {
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
};

export default withStyles(styles)(DeleteDialog);