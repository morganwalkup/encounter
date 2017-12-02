import React from 'react';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem, ListItemText, ListItemSecondaryAction } from 'material-ui/List';
import Switch from 'material-ui/Switch';
import { MenuItem } from 'material-ui/Menu';
import Select from 'material-ui/Select';
import Input, { InputLabel } from 'material-ui/Input';
import { FormControl } from 'material-ui/Form';
import { withStyles } from 'material-ui/styles';

class SettingsDialog extends React.Component {
    render() {
        const { classes, ...other } = this.props;
        
        return (
          <Dialog {...other}>
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