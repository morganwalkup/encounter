import React from 'react';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

class CombatantDialog extends React.Component {
    render() {
        const { classes, ...other } = this.props;
        
        const armorBlock = (
          <div className={classes.stat}>
            <Typography type="body1" align="center"><strong>WIS</strong></Typography>
            <Typography type="subheading" align="center">15 (+2)</Typography>
          </div>
        );
        
        return (
          <Dialog {...other}>
            <DialogTitle>Pip</DialogTitle>
            <DialogContent>
            
              <Divider />
              
              <List dense className={classes.list}>
                <ListItem disableGutters className={classes.statListItem}>
                  <Typography type="body1"><strong>Armor Class: </strong>15</Typography>
                </ListItem>
                <ListItem disableGutters className={classes.statListItem}>
                  <Typography type="body1"><strong>Hit Points: </strong>12</Typography>
                </ListItem>
                <ListItem disableGutters className={classes.statListItem}>
                  <Typography type="body1"><strong>Speed: </strong>30</Typography>
                </ListItem>
              </List>  
              
              <Divider />
              
              <List className={classes.list}>
                <ListItem disableGutters className={classes.statListItem}>
                  {armorBlock}
                  {armorBlock}
                  {armorBlock}
                </ListItem>
                <ListItem disableGutters className={classes.statListItem}>
                  {armorBlock}
                  {armorBlock}
                  {armorBlock}
                </ListItem>
              </List>
            </DialogContent>
          </Dialog>
        );
    }
}

const styles = {
    list: {
      width: 300,
    },
    statListItem: {
      display: 'flex',
      justifyContent: 'space-between',
    },
    stat: {
      margin: '0 12px',
    }
};

export default withStyles(styles)(CombatantDialog);