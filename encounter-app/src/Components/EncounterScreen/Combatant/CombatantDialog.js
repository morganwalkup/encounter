import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  combatant: PropTypes.object.isRequired,
};

class CombatantDialog extends React.Component {
  
  calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);
    if(modifier >= 0) {
      modifier = ("+" + modifier);
    } else {
      modifier = ("-" + modifier);
    }
    return modifier;
  }
  
  render() {
    const { classes, combatant, ...other } = this.props;
    
    //Catch null combatant
    if(combatant === null) {
      return <div></div>;
    }
    
    const abilityScores = [
      {
        name: 'STR',
        value: combatant.strength,
        mod: this.calculateModifier(combatant.strength)
      },
      {
        name: 'DEX',
        value: combatant.dexterity,
        mod: this.calculateModifier(combatant.dexterity)
      },
      {
        name: 'CON',
        value: combatant.constitution,
        mod: this.calculateModifier(combatant.constitution)
      },
      {
        name: 'INT',
        value: combatant.intelligence,
        mod: this.calculateModifier(combatant.intelligence)
      },
      {
        name: 'WIS',
        value: combatant.wisdom,
        mod: this.calculateModifier(combatant.wisdom)
      },
      {
        name: 'CHA',
        value: combatant.charisma,
        mod: this.calculateModifier(combatant.charisma)
      }
    ];
    
    const abilities = abilityScores.map((score) => 
      <div className={classes.stat}>
        <Typography type="body1" align="center">
          <strong>{score.name}</strong>
        </Typography>
        <Typography type="subheading" align="center">
          {score.value} ({score.mod})
        </Typography>
      </div>
    );
    
    return (
      <Dialog {...other}>
        <DialogTitle>{combatant.name}</DialogTitle>
        <DialogContent>
        
          <Divider />
          
          <List dense className={classes.list}>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Armor Class: </strong>{combatant.armor_class}
              </Typography>
            </ListItem>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Hit Points: </strong>{combatant.hit_points}
              </Typography>
            </ListItem>
            <ListItem disableGutters className={classes.statListItem}>
              <Typography type="body1">
                <strong>Speed: </strong>{combatant.speed}
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