import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         deleteCharacter
        } from '../../DatabaseFunctions/FirebaseFunctions';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  characterid: PropTypes.string,
  character: PropTypes.object,
};

class DeleteCharacterDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  handleDelete = () => {
    // Get user id
    getUserId((userid) => {
      //Delete character from database
      deleteCharacter(userid, this.props.characterid);
    });
    
    // Close the dialog
    this.handleRequestClose();
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, character, } = this.props;

    //Catch null character
    if(character === null) {
      return (
        <Dialog open={this.props.open}>
          <DialogContent>
            <h2>Character not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <CRUDDialog
        title="Delete Character"
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
            Delete <strong>{character.name}</strong> forever?
          </Typography>
        </List>
      </CRUDDialog>
    );
  }
}

DeleteCharacterDialog.propTypes = propTypes;

const styles = {
  list: {
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
};

export default withStyles(styles)(DeleteCharacterDialog);