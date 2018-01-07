import React from 'react';
import * as firebase from 'firebase';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import ImageUpload from './ImageUpload';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

class NewCharacterDialog extends React.Component {
  
  constructor(props) {
    super(props);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fcharacters%2Fdefault%2FDefault.jpg?alt=media&token=9129590d-c338-40fc-b50c-c6002387f4ea";
    this.state = {
      image: null,
      character: {
        name: null,
        image: defaultImage,
        LVL: null,
        AC: null,
        HP: null,
        SPD: null,
        STR: null,
        DEX: null,
        CON: null,
        INT: null,
        WIS: null,
        CHA: null
      }
    };
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
  
  // Callback for ImageUpload
  // Saves file reference in state
  // imageFile: the new image file provided by ImageUpload
  handleImageChange = (imageFile) => {
    this.setState({
      image: imageFile,
    });
  }
  
  // Callback for dialog close request
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  // Callback for 'SAVE' click,
  // Saves the character data to firebase and closes the dialog
  handleSave = () => {
    // Create new character id in firebase
    const dbCharacters = firebase.database().ref().child('characters');
    const newCharId = dbCharacters.push().key;
    
    // Check for character image and upload data accordingly
    const imageFile = this.state.image;
    if(imageFile == null) {
      
      // Upload changes to firebase
      this.uploadCharacterData(newCharId);
      // Close the dialog
      this.handleRequestClose();
      // Reset local character data
      this.resetLocalCharacterData();
      
    } else {
      
      // Upload character image
      const imageUpload = this.uploadCharacterImage(newCharId);
      imageUpload.on('state_changed', null, null, () => {
        // On successful upload, update character image data
        const imageUrl = imageUpload.snapshot.downloadURL;
        let characterObj = this.state.character;
        characterObj["image"] = imageUrl;
        this.setState({
          character: characterObj,
        });
        // Upload changes to firebase
        this.uploadCharacterData(newCharId);
        // Close the dialog
        this.handleRequestClose();
        // Reset local character data
        this.resetLocalCharacterData();
      });
      
    }
  }
  
  // Callback for 'CANCEL' click,
  // Closes the dialog
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  // Uploads a new character image to firebase
  // Returns file upload task for progress monitoring
  uploadCharacterImage = (charId) => {
    const imageFile = this.state.image;
    const imageMetaData = { 
      contentType: imageFile.type,
    };
    const storageRef = firebase.storage().ref();
    const fileDestination = storageRef.child('userid/images/characters/' + charId);
    const fileUpload = fileDestination.put(imageFile, imageMetaData);
    
    return fileUpload;
  }
  
  // Updates existing character data in firebase according to component state
  uploadCharacterData = (characterId) => {
    const dbCharacters = firebase.database().ref().child('characters');
    const updatedCharacter = {
      [characterId]: this.state.character
    };
    dbCharacters.update(updatedCharacter);
  }
  
  // Resets local character data to default values
  resetLocalCharacterData = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fcharacters%2Fdefault%2FDefault.jpg?alt=media&token=9129590d-c338-40fc-b50c-c6002387f4ea";
    this.setState({
      character: {
        name: null,
        image: defaultImage,
        LVL: null,
        AC: null,
        HP: null,
        SPD: null,
        STR: null,
        DEX: null,
        CON: null,
        INT: null,
        WIS: null,
        CHA: null
      },
    });
  }
  
  render() {
    const { classes, ...other } = this.props;
    const { character } = this.state;
    
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
      <Dialog onRequestClose={this.handleRequestClose} className={classes.dialog} {...other}>
        <DialogTitle className={classes.dialogTitle}>New Character</DialogTitle>
        <DialogContent className={classes.dialogContent}>
        
          <div className={classes.topSection}>
            <ImageUpload 
              onImageChange={this.handleImageChange} 
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
  characterName: {
    display: 'inline',
    marginTop: -3,
    marginLeft: 20,
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