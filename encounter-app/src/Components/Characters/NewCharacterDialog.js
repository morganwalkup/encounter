import React from 'react';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

class NewCharacterDialog extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      character: {
        id: null,
        name: "",
        image: "Default.jpg",
        level: null,
        armor_class: null,
        hit_points: null,
        speed: null,
        strength: null,
        dexterity: null,
        constitution: null,
        intelligence: null,
        wisdom: null,
        charisma: null
      }
    };
  }
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  handleSave() {
    alert("save");
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const { classes, ...other } = this.props;
    const { character } = this.state;
    const src = require('../../images/combatants/' + character.image);
    
    //Catch null character
    if(character === null) {
      return (
        <Dialog>
          <DialogContent>
            <h2>Character not found</h2>
          </DialogContent>
        </Dialog>
      );
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
        value: character.strength
      },
      {
        name: 'DEX',
        value: character.dexterity
      },
      {
        name: 'CON',
        value: character.constitution
      },
      {
        name: 'INT',
        value: character.intelligence
      },
      {
        name: 'WIS',
        value: character.wisdom
      },
      {
        name: 'CHA',
        value: character.charisma
      }
    ];
    
    const stats = statValues.map((stat) => (
      <div className={classes.stat} key={stat.name}>
        <TextField
          required
          label={stat.name}
          defaultValue={stat.value}
          className={classes.textField}
          margin="normal"
        />
      </div>
    ));
    
    const abilityScores = abilityScoreValues.map((score) => (
      <div className={classes.abilityScore} key={score.name}>
        <TextField
          required
          label={score.name}
          defaultValue={score.value}
          className={classes.textField}
          margin="normal"
        />
      </div>
    ));
    
    return (
      <Dialog onRequestClose={this.handleRequestClose} className={classes.dialog} {...other}>
        <DialogTitle className={classes.dialogTitle}>New Character</DialogTitle>
        <DialogContent className={classes.dialogContent}>
        
          <div className={classes.topSection}>
            <img className={classes.avatar} src={src} alt={"img"} />
            <TextField
              required
              label="Name"
              defaultValue={character.name}
              className={classes.characterName}
              margin="normal"
            />
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
        
        <Divider />
        
        <DialogActions>
          <Button onClick={this.handleCancel} >
            Cancel
          </Button>
          <Button onClick={this.handleSave} color="primary">
            Save
          </Button>
        </DialogActions>
      </Dialog>
    );
  }
}

const styles = {
  dialog: {
    position: 'absolute',
  },
  dialogTitle: {
    backgroundColor: blueGrey[900],
    padding: 15,
    paddingLeft: 24,
    '& > h2': {
      color: 'white', 
    }
  },
  dialogContent: {
    paddingBottom: 0,
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
    marginTop: -3,
    marginLeft: 12,
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
    width: 75,
  },
  abilityScore: {
    width: 100,
    '&:nth-child(n+4)': {
      marginTop: 20,
    }
  },
  textField: {
    width: '80%',
    margin: '0 10%',
  }
};

export default withStyles(styles)(NewCharacterDialog);