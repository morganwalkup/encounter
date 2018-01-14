import React from 'react';
import PropTypes from 'prop-types';
import * as dnd from '../../../Utilities/DndFunctions';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  combatant: PropTypes.object.isRequired,
};

class CombatantDialog extends React.Component {
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { classes, combatant } = this.props;
    
    //Catch null combatant
    if(combatant === null) {
      return <div></div>;
    }
    
    const abilityScores = [
      {
        name: 'STR',
        value: combatant.STR,
        mod: dnd.calculateModifier(combatant.STR)
      },
      {
        name: 'DEX',
        value: combatant.DEX,
        mod: dnd.calculateModifier(combatant.DEX)
      },
      {
        name: 'CON',
        value: combatant.CON,
        mod: dnd.calculateModifier(combatant.CON)
      },
      {
        name: 'INT',
        value: combatant.INT,
        mod: dnd.calculateModifier(combatant.INT)
      },
      {
        name: 'WIS',
        value: combatant.WIS,
        mod: dnd.calculateModifier(combatant.WIS)
      },
      {
        name: 'CHA',
        value: combatant.CHA,
        mod: dnd.calculateModifier(combatant.CHA)
      }
    ];
    
    const abilities = abilityScores.map((score) => (
      <div className={classes.stat}>
        <Typography type="body1" align="center">
          <strong>{score.name}</strong>
        </Typography>
        <Typography type="subheading" align="center">
          {score.value} ({score.mod})
        </Typography>
      </div>
    ));
    
    return (
      <Dialog onClose={this.handleRequestClose} open={this.props.open}>
        <DialogTitle>{combatant.name}</DialogTitle>
        <DialogContent>
        
          <Divider />
          
          <List dense className={classes.list}>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Armor Class: </strong>{combatant.AC}
              </Typography>
            </ListItem>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Hit Points: </strong>{combatant.HP}
              </Typography>
            </ListItem>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Speed: </strong>{combatant.SPD}
              </Typography>
            </ListItem>
          </List>  
          
          <Divider />
          
          <List className={classes.list}>
            <ListItem disableGutters className={classes.statListItem}>
              {abilities}
            </ListItem>
          </List>
          
        </DialogContent>
      </Dialog>
    );
  }
}

CombatantDialog.PropTypes = propTypes;

const styles = {
    list: {
      width: 300,
    },
    statListItem: {
      display: 'flex',
      flexWrap: 'wrap',
      justifyContent: 'space-between',
    },
    stat: {
      minWidth: 100,
      '&:nth-child(n+4)': {
        marginTop: 20,
      }
    }
};

export default withStyles(styles)(CombatantDialog);