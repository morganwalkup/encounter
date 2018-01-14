import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         deleteMonster
        } from '../../DatabaseFunctions/FirebaseFunctions';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List from 'material-ui/List';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  monsterid: PropTypes.string,
  monster: PropTypes.object,
};

class DeleteMonsterDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  handleDelete = () => {
    // Get user id
    getUserId((userid) => {
      //Delete monster from database
      deleteMonster(userid, this.props.monsterid);
    });
    
    // Close the dialog
    this.handleRequestClose();
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, monster, } = this.props;

    //Catch null monster
    if(monster === null) {
      return (
        <Dialog open={this.props.open}>
          <DialogContent>
            <h2>Monster not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
    
    return (
      <CRUDDialog
        title="Delete Monster"
        action="delete"
        onDelete={this.handleDelete}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
      >
        <List className={classes.list}>
          <Typography type="headline">
            Delete <strong>{monster.name}</strong> forever?
          </Typography>
        </List>
      </CRUDDialog>
    );
  }
}

DeleteMonsterDialog.propTypes = propTypes;

const styles = {
  list: {
    marginTop: 20,
    marginBottom: 20,
    width: 300,
  },
};

export default withStyles(styles)(DeleteMonsterDialog);