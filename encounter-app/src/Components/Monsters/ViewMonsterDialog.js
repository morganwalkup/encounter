import React from 'react';
import PropTypes from 'prop-types';
import Dialog, { DialogTitle, DialogContent } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import Typography from 'material-ui/Typography';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  monster: PropTypes.object.isRequired,
};

class ViewMonsterDialog extends React.Component {
  
  //Calculates the modifier for a particular ability score value
  //abilityScore: a monster's ability score value
  calculateModifier(abilityScore) {
    let modifier = Math.floor((abilityScore - 10) / 2);
    if(modifier >= 0) {
      modifier = ("+" + modifier);
    }
    return modifier;
  }
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  render() {
    const { classes, monster, ...other } = this.props;
    
    //Catch null monster
    if(monster === null) {
      return (
        <Dialog>
          <DialogContent>
            <h2>Monster not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
  
    const statValues = [
      {
        name: 'CR',
        value: monster.CR
      },
      {
        name: 'AC',
        value: monster.AC
      },
      {
        name: 'HP',
        value: monster.HP
      },
      {
        name: 'SPD',
        value: monster.SPD
      }
    ];
    
    const abilityScoreValues = [
      {
        name: 'STR',
        value: monster.STR,
        mod: this.calculateModifier(monster.STR)
      },
      {
        name: 'DEX',
        value: monster.DEX,
        mod: this.calculateModifier(monster.DEX)
      },
      {
        name: 'CON',
        value: monster.CON,
        mod: this.calculateModifier(monster.CON)
      },
      {
        name: 'INT',
        value: monster.INT,
        mod: this.calculateModifier(monster.INT)
      },
      {
        name: 'WIS',
        value: monster.WIS,
        mod: this.calculateModifier(monster.WIS)
      },
      {
        name: 'CHA',
        value: monster.CHA,
        mod: this.calculateModifier(monster.CHA)
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
        <DialogTitle className={classes.dialogTitle}>View monster</DialogTitle>
        <DialogContent>
        
          <div className={classes.topSection}>
            <img className={classes.avatar} src={monster.image} alt={""} />
            <Typography type="headline" className={classes.monsterName}>
              {monster.name}
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

ViewMonsterDialog.PropTypes = propTypes;

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
    backgroundColor: blueGrey[900],
  },
  monsterName: {
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

export default withStyles(styles)(ViewMonsterDialog);