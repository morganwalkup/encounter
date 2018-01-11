import React from 'react';
import * as firebase from 'firebase';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

class NewMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2FDefault.jpg?alt=media&token=09401431-a9d6-4e21-a204-f5a4e95390c3";
    this.state = {
      image: null,
      monster: {
        name: null,
        image: defaultImage,
        CR: null,
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
  // Updates monster data in component state
  handleChange = (fieldName) => (event) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = event.target.value;
    this.setState({
      monster: monsterObj,
    });
  }
  
  // Callback for AvatarUpload
  // Saves file reference in state
  // imageFile: the new image file provided by AvatarUpload
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
  // Saves the monster data to firebase and closes the dialog
  handleSave = () => {
    // Create new monster id in firebase
    const dbmonsters = firebase.database().ref().child('monsters');
    const newCharId = dbmonsters.push().key;
    
    // Check for monster image and upload data accordingly
    const imageFile = this.state.image;
    if(imageFile == null) {
      
      // Upload changes to firebase
      this.uploadmonsterData(newCharId);
      // Close the dialog
      this.handleRequestClose();
      // Reset local monster data
      this.resetLocalmonsterData();
      
    } else {
      
      // Upload monster image
      const AvatarUpload = this.uploadmonsterImage(newCharId);
      AvatarUpload.on('state_changed', null, null, () => {
        // On successful upload, update monster image data
        const imageUrl = AvatarUpload.snapshot.downloadURL;
        let monsterObj = this.state.monster;
        monsterObj["image"] = imageUrl;
        this.setState({
          monster: monsterObj,
        });
        // Upload changes to firebase
        this.uploadmonsterData(newCharId);
        // Close the dialog
        this.handleRequestClose();
        // Reset local monster data
        this.resetLocalmonsterData();
      });
      
    }
  }
  
  // Callback for 'CANCEL' click,
  // Closes the dialog
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  // Uploads a new monster image to firebase
  // Returns file upload task for progress monitoring
  uploadmonsterImage = (charId) => {
    const imageFile = this.state.image;
    const imageMetaData = { 
      contentType: imageFile.type,
    };
    const storageRef = firebase.storage().ref();
    const userid = firebase.auth().currentUser.uid;
    const fileDestination = storageRef.child(userid + '/images/monsters/' + charId);
    const fileUpload = fileDestination.put(imageFile, imageMetaData);
    
    return fileUpload;
  }
  
  // Updates existing monster data in firebase according to component state
  uploadmonsterData = (monsterId) => {
    const userid = firebase.auth().currentUser.uid;
    const dbmonsters = firebase.database().ref().child(userid + '/monsters');
    const updatedmonster = {
      [monsterId]: this.state.monster
    };
    dbmonsters.update(updatedmonster);
  }
  
  // Resets local monster data to default values
  resetLocalmonsterData = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2Fdefault%2FDefault.jpg?alt=media&token=9129590d-c338-40fc-b50c-c6002387f4ea";
    this.setState({
      monster: {
        name: null,
        image: defaultImage,
        CR: null,
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
    const { monster } = this.state;
    
    //Catch null monster
    if(monster === null) {
      return (
        <Dialog>
          <DialogContent>
            <h2>monster not found</h2>
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
        value: monster.STR
      },
      {
        name: 'DEX',
        value: monster.DEX
      },
      {
        name: 'CON',
        value: monster.CON
      },
      {
        name: 'INT',
        value: monster.INT
      },
      {
        name: 'WIS',
        value: monster.WIS
      },
      {
        name: 'CHA',
        value: monster.CHA
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
        <DialogTitle className={classes.dialogTitle}>New monster</DialogTitle>
        <DialogContent className={classes.dialogContent}>
        
          <div className={classes.topSection}>
            <AvatarUpload 
              onImageChange={this.handleImageChange} 
            />
            <TextField
              required
              type="text"
              label="Name"
              defaultValue={monster.name}
              className={classes.monsterName}
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
  monsterName: {
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

export default withStyles(styles)(NewMonsterDialog);