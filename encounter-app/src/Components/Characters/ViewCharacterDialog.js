import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  character: PropTypes.object.isRequired,
};

class ViewCharacterDialog extends React.Component {
  
  //Calculates the modifier for a particular ability score value
  //abilityScore: a character's ability score value
  calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);
    if(modifier >= 0) {
      modifier = ("+" + modifier);
    } else {
      modifier = ("-" + modifier);
    }
    return modifier;
  }
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { classes, character, ...other } = this.props;
    const src = require('../../images/combatants/' + character.image);
    
    //Catch null character
    if(character === null) {
      return <div></div>;
    }
    
    const statValues = [
      {
        name: 'LVL',
        value: character.level
      },
      {
        name: 'AC',
        value: character.armor_class
      },
      {
        name: 'HP',
        value: character.hit_points
      },
      {
        name: 'SPD',
        value: character.speed
      }
    ];
    
    const abilityScoreValues = [
      {
        name: 'STR',
        value: character.strength,
        mod: this.calculateModifier(character.strength)
      },
      {
        name: 'DEX',
        value: character.dexterity,
        mod: this.calculateModifier(character.dexterity)
      },
      {
        name: 'CON',
        value: character.constitution,
        mod: this.calculateModifier(character.constitution)
      },
      {
        name: 'INT',
        value: character.intelligence,
        mod: this.calculateModifier(character.intelligence)
      },
      {
        name: 'WIS',
        value: character.wisdom,
        mod: this.calculateModifier(character.wisdom)
      },
      {
        name: 'CHA',
        value: character.charisma,
        mod: this.calculateModifier(character.charisma)
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
      <Dialog onRequestClose={this.handleRequestClose} {...other}>
        <DialogTitle className={classes.dialogTitle}>View Character</DialogTitle>
        <DialogContent>
        
          <div className={classes.topSection}>
            <img className={classes.avatar} src={src} alt={"img"} />
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
          
        </DialogContent>
      </Dialog>
    );
  }
}

ViewCharacterDialog.PropTypes = propTypes;

const styles = {
  dialogTitle: {
    backgroundColor: blueGrey[900],
    padding: 15,
    paddingLeft: 24,
    '& > h2': {
      color: 'white', 
    }
  },
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
  },
  characterName: {
    display: 'inline',
    paddingLeft: 10,
    fontWeight: 'bold',
  },
  list: {
    width: 300,
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