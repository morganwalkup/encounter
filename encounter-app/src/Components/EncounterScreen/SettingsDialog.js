import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func.isRequired,
};

class SettingsDialog extends React.Component {
  
  /**
   * Handles close request from dialogs
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }

  render() {
    const { classes, open } = this.props;
    
    return (
      <Dialog onClose={this.handleRequestClose} open={open}>
        <DialogTitle>Settings</DialogTitle>
        <DialogContent>
          <List className={classes.settingsList} >
            <ListItem disableGutters>
              <ListItemText primary="Show Enemy Health"/>
              <ListItemSecondaryAction>
                <Switch className={classes.settingSwitch}/>
              </ListItemSecondaryAction>
            </ListItem>
          </List>
          <FormControl className={classes.formControl}>
            <InputLabel htmlFor="bg-stretch">Background Stretch</InputLabel>
            <Select
              value="h"
              input={<Input id="bg-stretch" />}
            >
              <MenuItem value="none">None</MenuItem>
              <MenuItem value="h">Horizontal</MenuItem>
              <MenuItem value="v">Vertical</MenuItem>
            </Select>
          </FormControl>
        </DialogContent>
      </Dialog>
    );
  }
}

SettingsDialog.propTypes = propTypes;

const styles = {
  settingsList: {
    width: 300,
  },
  settingSwitch: {
      marginRight: -15,
  },
  formControl: {
      width: '100%',
  }
};

export default withStyles(styles)(SettingsDialog);