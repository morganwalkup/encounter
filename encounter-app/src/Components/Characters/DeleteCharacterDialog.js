import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  character: PropTypes.object.isRequired,
};

class DeleteCharacterDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  handleDelete() {
    alert("Deleted");
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, character, ...other } = this.props;

    //Catch null character
    if(character === null) {
      return (
        <Dialog>
          <DialogContent>
            <h2>Character not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle className={classes.dialogTitle}>Delete Character</DialogTitle>
        <DialogContent>
          
          <List className={classes.list}>
            <Typography type="headline">
              Delete {character.name} forever?
            </Typography>
          </List>
          
        </DialogContent>
        
        <Divider />
        
        <DialogActions>
          <Button onClick={this.handleCancel} >
            Cancel
          </Button>
          <Button onClick={this.handleDelete} color="accent">
            Delete
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

DeleteCharacterDialog.PropTypes = propTypes;

const styles = {
  dialogTitle: {
    backgroundColor: blueGrey[900],
    padding: 15,
    paddingLeft: 24,
    '& > h2': {
      color: 'white', 
    }
  },
  list: {
    marginTop: 20,
    width: 300,
  },
};

export default withStyles(styles)(DeleteCharacterDialog);