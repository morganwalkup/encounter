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
  open: PropTypes.bool,
  character: PropTypes.object,
};

class ViewCharacterDialog extends React.Component {
  
  /**
   * Handles close request from CRUD Dialog
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { classes, character, } = this.props;
    
    //Catch null character
    if(character === null) {
      return (
        <Dialog open={this.props.open}>
          <DialogContent>
            <h2>Character not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
  
    const statValues = [
      {
        name: 'LVL',
        value: character.LVL
      },
      {
        name: 'AC',
        value: character.AC
      },
      {
        name: 'HP',
        value: character.HP
      },
      {
        name: 'SPD',
        value: character.SPD
      }
    ];
    
    const abilityScoreValues = [
      {
        name: 'STR',
        value: character.STR,
        mod: dnd.calculateModifier(character.STR)
      },
      {
        name: 'DEX',
        value: character.DEX,
        mod: dnd.calculateModifier(character.DEX)
      },
      {
        name: 'CON',
        value: character.CON,
        mod: dnd.calculateModifier(character.CON)
      },
      {
        name: 'INT',
        value: character.INT,
        mod: dnd.calculateModifier(character.INT)
      },
      {
        name: 'WIS',
        value: character.WIS,
        mod: dnd.calculateModifier(character.WIS)
      },
      {
        name: 'CHA',
        value: character.CHA,
        mod: dnd.calculateModifier(character.CHA)
      }
    ];
    
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
        title="View Character"
        onCloseClick={this.handleRequestClose}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
        actions={
          <Button onClick={this.handleRequestClose}>Close</Button>
        }
      >
        <div className={classes.topSection}>
          <img className={classes.avatar} src={character.image} alt={""} />
          <Typography type="headline" className={classes.characterName}>
            {character.name}
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

ViewCharacterDialog.propTypes = propTypes;

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
  characterName: {
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

export default withStyles(styles)(ViewCharacterDialog);