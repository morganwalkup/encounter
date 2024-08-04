import React from 'react';
import PropTypes from 'prop-types';
import Slide from 'material-ui/transitions/Slide';
import Dialog, { DialogTitle, DialogContent, DialogActions, withMobileDialog } from 'material-ui/Dialog';
import Divider from 'material-ui/Divider';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
  title: PropTypes.string,
  multistep: PropTypes.bool,
  actions: PropTypes.object,
};

/**
 * Opening transition animation
 */
function Transition(props) {
  return <Slide direction="up" {...props} />;
}

class CRUDDialog extends React.Component {
  
  /**
   * Callback for dialog close request
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Callback for close action click
   */
  handleCloseClick = () => {
    this.props.onCloseClick();
    this.props.onRequestClose();
  }
  
  /**
   * Callback for cancel action click
   */
  handleCancel = () => {
    this.props.onCancel();
  }
  
  /**
   * Callback for save action click
   */
  handleSave = () => {
    this.props.onSave();
  }
  
  /**
   * Callback for delete action click
   */
  handleDelete = () => {
    this.props.onDelete();
  }
  
  render() {
    const { title, children, multistep, actions, classes } = this.props;
    
    //Prevent background scrolling
    if(this.props.open) {
      document.body.classList.add(classes.dontScroll);
    } else {
      document.body.classList.remove(classes.dontScroll);
    }
    
    //Conditionally apply styling for multistep actions
    let actionsClass = null;
    if(multistep) {
      actionsClass = classes.multistep;
    }
    
    return (
      <Dialog 
        fullScreen={this.props.fullScreen}
        open={this.props.open}
        transition={Transition}
        disableBackdropClick
        onClose={this.handleRequestClose} 
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle className={classes.dialogTitle}>
            {title}
        </DialogTitle>
        <DialogContent className={classes.dialogContent}>
          {children}
        </DialogContent>
        
        <Divider />
        
        <DialogActions className={actionsClass}>
          {actions}
        </DialogActions>
      </Dialog>
    );
  }
}

CRUDDialog.propTypes = propTypes;

const styles = {
  dialogTitle: {
    backgroundColor: blueGrey[900],
    padding: 15,
    paddingLeft: 24,
    '& > h2': {
      color: 'white', 
    }
  },
  dialogContent: {
    paddingBottom: 0,
  },
  dontScroll: {
    position: 'fixed',
    overflow: 'hidden'
  },
  multistep: {
    '& > div': {
      width: '100%',
    }
  }
};

export default withStyles(styles)(withMobileDialog()(CRUDDialog));