import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import ImageUpload from './ImageUpload';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  characterid: PropTypes.string.isRequired,
  character: PropTypes.object.isRequired,
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
  
  // Callback for ImageUpload
  // Saves file reference in state
  // file: the new image file provided by ImageUpload
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
    const imageFile = this.state.image;
    if(imageFile == null) {
      
      // Upload revised character data to firebase immediately
      this.uploadCharacterData();
      // Close the dialog
      this.handleRequestClose();
      
    } else {
      
      // Upload new character image
      const imageUpload = this.uploadCharacterImage();
      imageUpload.on('state_changed', null, null, () => {
        // On successful upload, update character image data
        const imageUrl = imageUpload.snapshot.downloadURL;
        let characterObj = this.state.character;
        characterObj["image"] = imageUrl;
        this.setState({
          character: characterObj,
        });
        // Upload revised character data to firebase
        this.uploadCharacterData();
        // Close the dialog
        this.handleRequestClose();
      });
      
    }
  }
  
  // Callback for "CANCEL" click
  // Discards changes and closes the dialog
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  // Uploads a new character image to firebase
  // Returns file upload task for progress monitoring
  uploadCharacterImage = () => {
    const imageFile = this.state.image;
    const imageMetaData = { 
      contentType: imageFile.type,
    };
    const storageRef = firebase.storage().ref();
    const charId = this.props.characterid;
    const fileDestination = storageRef.child('userid/images/characters/' + charId);
    const fileUpload = fileDestination.put(imageFile, imageMetaData); 
    
    return fileUpload;
  }
  
  // Uploads character data to firebase according to component state
  uploadCharacterData = () => {
    const dbCharacters = firebase.database().ref().child('characters');
    const updatedCharacter = {
      [this.props.characterid]: this.state.character
    };
    dbCharacters.update(updatedCharacter);
  }
  
  render() {
    const { classes, ...other } = this.props;
    const character = this.state.character;

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
    
    let initialAvatarUrl = null;
    if(character.image != null) {
      initialAvatarUrl = character.image;
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
        <DialogTitle className={classes.dialogTitle}>Edit Character</DialogTitle>
        <DialogContent className={classes.dialogContent}>
        
          <div className={classes.topSection}>
            <ImageUpload 
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

EditCharacterDialog.PropTypes = propTypes;

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

export default withStyles(styles)(EditCharacterDialog);