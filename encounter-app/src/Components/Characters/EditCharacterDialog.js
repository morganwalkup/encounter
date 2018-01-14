import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         updateCharacter,
         updateCharacterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions'; 
import Dialog, { DialogContent } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  characterid: PropTypes.string,
  character: PropTypes.object,
};

class EditCharacterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      character: Object.assign({}, props.character)
    };
  }
  
  // Called when the component receives new props
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        image: null,
        character: Object.assign({}, nextProps.character)
      });
    }
  }
  
  // Callback for AvatarUpload
  // Saves file reference in state
  // file: the new image file provided by AvatarUpload
  handleImageChange = (imageFile) => {
    this.setState({
      image: imageFile,
    });
  }
  
  // Callback for textfield input,
  // Updates character data in component state
  handleChange = (fieldName) => (event) => {
    let characterObj = this.state.character;
    characterObj[fieldName] = event.target.value;
    this.setState({
      character: characterObj,
    });
  }
  
  // Callback for dialog close request
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  // Callback for 'SAVE' click,
  // Saves altered character data to firebase and closes the dialog
  handleSave = () => {
    getUserId((userid) => {
      const imageFile = this.state.image;
      if(imageFile == null) {
        
        // Update character data in database immediately
        updateCharacter(userid, this.props.characterid, this.state.character);
        // Close the dialog
        this.handleRequestClose();
        
      } else {
        
        // Upload character image and update character in database
        const imageUpload = updateCharacterWithImage(userid, this.props.characterid, this.state.character, imageFile);
        imageUpload.on('state_changed', null, null, () => {
          // Close the dialog
          this.handleRequestClose();
        });

      }
    });
  }
  
  // Callback for "CANCEL" click
  // Discards changes and closes the dialog
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  // Renders the component
  render() {
    const { classes, } = this.props;
    const character = this.state.character;

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
    
    //Get initial avatar url for AvatarUpload
    let initialAvatarUrl = null;
    if(character.image != null) {
      initialAvatarUrl = character.image;
    }
    
    //Generate visuals for character stats
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
    const stats = statValues.map((stat) => (
      <div className={classes.stat} key={stat.name}>
        <TextField
          required
          type="number"
          label={stat.name}
          defaultValue={stat.value}
          className={classes.textField}
          onChange={this.handleChange(stat.name)}
        />
      </div>
    ));
    
    //Generate visuals for character ability scores
    const abilityScoreValues = [
      {
        name: 'STR',
        value: character.STR
      },
      {
        name: 'DEX',
        value: character.DEX
      },
      {
        name: 'CON',
        value: character.CON
      },
      {
        name: 'INT',
        value: character.INT
      },
      {
        name: 'WIS',
        value: character.WIS
      },
      {
        name: 'CHA',
        value: character.CHA
      }
    ];
    const abilityScores = abilityScoreValues.map((score) => (
      <div className={classes.abilityScore} key={score.name}>
        <TextField
          required
          type="number"
          label={score.name}
          defaultValue={score.value}
          className={classes.textField}
          onChange={this.handleChange(score.name)}
        />
      </div>
    ));
    
    return (
      <CRUDDialog 
        title="Edit Character"
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
        actions={
          <div>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={this.handleSave} color="primary">Save</Button> 
          </div>
        }
      >

        <div className={classes.topSection}>
          <AvatarUpload 
            onImageChange={this.handleImageChange} 
            initialImgUrl={initialAvatarUrl}
          />
          <TextField
            required
            type="text"
            label="Name"
            defaultValue={character.name}
            className={classes.characterName}
            onChange={this.handleChange('name')}
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
        
      </CRUDDialog>
    );
  }
}

EditCharacterDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  characterName: {
    display: 'inline',
    marginTop: -3,
    marginLeft: 20,
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

export default withStyles(styles)(EditCharacterDialog);