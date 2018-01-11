import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  monsterid: PropTypes.string.isRequired,
  monster: PropTypes.object.isRequired,
};

class DeleteMonsterDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  handleDelete = () => {
    // Get reference to 'monsters' in firebase
    const db = firebase.database();
    const userid = firebase.auth().currentUser.uid;
    const dbmonsters = db.ref().child(userid + '/monsters');
    
    // Delete monster from firebase
    const removedmonster = {
      [this.props.monsterid]: null
    };
    dbmonsters.update(removedmonster);
    
    // Delete monster image from firebase storage
    const storageRef = firebase.storage().ref();
    const charId = this.props.monsterid;
    const imagePath = storageRef.child(userid + '/images/monsters/' + charId);
    imagePath.delete().then(function() {
      // File deleted successfully
    }).catch(function(error) {
      console.log(error);
    });
    
    // Close the dialog
    this.handleRequestClose();
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, monster, ...other } = this.props;

    //Catch null monster
    if(monster === null) {
      return (
        <Dialog>
          <DialogContent>
            <h2>monster not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle className={classes.dialogTitle}>Delete monster</DialogTitle>
        <DialogContent>
          
          <List className={classes.list}>
            <Typography type="headline">
              Delete {monster.name} forever?
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

DeleteMonsterDialog.PropTypes = propTypes;

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

export default withStyles(styles)(DeleteMonsterDialog);