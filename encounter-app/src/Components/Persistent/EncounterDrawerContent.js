import React from 'react';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';

function EncounterDrawerContent(props) {
  const { classes } = props;
  
  return (
    <div className={classes.drawerContent}>
      <List>
        <ListItem button>
          <ListItemText primary="Sign Up!" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button>
          <ListItemText primary="Encounters" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Characters" />
        </ListItem>
        <ListItem button>
          <ListItemText primary="Monsters" />
        </ListItem>
      </List>
    </div>
  );
}

const styles = theme => ({
  drawerContent: {
    width: 200,
    background: theme.palette.background.paper,
  },
});

export default withStyles(styles)(EncounterDrawerContent);