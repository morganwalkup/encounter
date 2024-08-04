import React from 'react';
import PropTypes from 'prop-types';
import * as dnd from '../../Utilities/DndFunctions';
import Dialog, { DialogContent } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  isCharacter: PropTypes.bool,
  combatant: PropTypes.object,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class ViewCombatantDialog extends React.Component {
  
  /**
   * Handles close request from CRUD Dialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { classes, combatant, isCharacter } = this.props;
    
    //Catch null character
    if(combatant === null) {
      return (
        <Dialog open={this.props.open}>
          <DialogContent>
            <h2>Combatant not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
  
    //Gather stat values for display
    const statValues = [];
    if(isCharacter) {
      statValues.push({ name: 'LVL', value: combatant.LVL });
    } else {
      statValues.push({ name: 'CR', value: combatant.CR });
    }
    statValues.push(
      { name: 'AC', value: combatant.AC },
      { name: 'HP', value: combatant.HP },
      { name: 'SPD', value: combatant.SPD }
    );
    
    //Gather ability score values for display
    const abilityScoreValues = [
      { name: 'STR', value: combatant.STR, mod: dnd.calculateModifier(combatant.STR) },
      { name: 'DEX', value: combatant.DEX, mod: dnd.calculateModifier(combatant.DEX) },
      { name: 'CON', value: combatant.CON, mod: dnd.calculateModifier(combatant.CON) },
      { name: 'INT', value: combatant.INT, mod: dnd.calculateModifier(combatant.INT) },
      { name: 'WIS', value: combatant.WIS, mod: dnd.calculateModifier(combatant.WIS) },
      { name: 'CHA', value: combatant.CHA, mod: dnd.calculateModifier(combatant.CHA) }
    ];
    
    //Generate stat value labels
    const stats = statValues.map((stat) => (
      <div className={classes.stat} key={stat.name}>
        <Typography type="body1" align="center">
          <strong>{stat.name}</strong>
        </Typography>
        <Typography type="subheading" align="center">
          {stat.value}
        </Typography>
      </div>
    ));
    
    //Genereate ability score labels
    const abilityScores = abilityScoreValues.map((score) => (
      <div className={classes.abilityScore} key={score.name}>
        <Typography type="body1" align="center">
          <strong>{score.name}</strong>
        </Typography>
        <Typography type="subheading" align="center">
          {score.value} ({score.mod})
        </Typography>
      </div>
    ));
    
    return (
      <CRUDDialog 
        title={(isCharacter) ? "View Character" : "View Monster"}
        onCloseClick={this.handleRequestClose}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
        actions={
          <Button onClick={this.handleRequestClose}>Close</Button>
        }
      >
        <div className={classes.topSection}>
          <img className={classes.avatar} src={combatant.image} alt={""} />
          <Typography type="headline" className={classes.combatantName}>
            {combatant.name}
          </Typography>
        </div>
      
        <Divider />
        
        <List dense className={classes.list}>
          <ListItem disableGutters className={classes.statListItem}>
            {stats}
          </ListItem>
        </List>  
        
        <Divider />
        
        <List className={classes.list}>
          <ListItem disableGutters className={classes.statListItem}>
            {abilityScores}
          </ListItem>
        </List>
      </CRUDDialog>
    );
  }
}

ViewCombatantDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  avatar: {
    height: 70,
    width: 70,
    borderRadius: '50%',
    margin: '10px 0',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
    backgroundColor: blueGrey[900],
  },
  combatantName: {
    display: 'inline',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  list: {
    width: 300,
    margin: '0 auto',
  },
  statListItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stat: {
    minWidth: 75,
  },
  abilityScore: {
    minWidth: 100,
    '&:nth-child(n+4)': {
      marginTop: 20,
    }
  }
};

export default withStyles(styles)(ViewCombatantDialog);