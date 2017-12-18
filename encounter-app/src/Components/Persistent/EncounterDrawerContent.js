import React from 'react';
import { Link } from 'react-router-dom';
import List, { ListItem, ListItemText } from 'material-ui/List';
import Divider from 'material-ui/Divider';

import { withStyles } from 'material-ui/styles';

function EncounterDrawerContent(props) {
  const { classes } = props;
  
  return (
    <div className={classes.drawerContent}>
      <List>
        <ListItem button component={Link} to="/signup">
          <ListItemText primary="Sign Up!" />
        </ListItem>
      </List>
      <Divider />
      <List>
        <ListItem button component={Link} to="/encounters">
          <ListItemText primary="Encounters" />
        </ListItem>
        <ListItem button component={Link} to="/characters">
          <ListItemText primary="Characters" />
        </ListItem>
        <ListItem button component={Link} to="/monsters">
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