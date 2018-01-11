import React from 'react';
import PropTypes from 'prop-types';
import * as firebase from 'firebase';
import Dialog, { DialogTitle, DialogContent, DialogActions } from 'material-ui/Dialog';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import Button from 'material-ui/Button';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  monsterid: PropTypes.string.isRequired,
  monster: PropTypes.object.isRequired,
};

class EditMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      monster: Object.assign({}, props.monster)
    };
  }
  
  // Called when the component receives new props
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        image: null,
        monster: Object.assign({}, nextProps.monster)
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
  // Updates monster data in component state
  handleChange = (fieldName) => (event) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = event.target.value;
    this.setState({
      monster: monsterObj,
    });
  }
  
  // Callback for dialog close request
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  // Callback for 'SAVE' click,
  // Saves altered monster data to firebase and closes the dialog
  handleSave = () => {
    const imageFile = this.state.image;
    if(imageFile == null) {
      
      // Upload revised monster data to firebase immediately
      this.uploadmonsterData();
      // Close the dialog
      this.handleRequestClose();
      
    } else {
      
      // Upload new monster image
      const AvatarUpload = this.uploadmonsterImage();
      AvatarUpload.on('state_changed', null, null, () => {
        
        // On successful upload, update monster image data
        const imageUrl = AvatarUpload.snapshot.downloadURL;
        let monsterObj = this.state.monster;
        monsterObj["image"] = imageUrl;
        this.setState({
          monster: monsterObj,
        });
        // Upload revised monster data to firebase
        this.uploadmonsterData();
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
  
  // Uploads a new monster image to firebase
  // Returns file upload task for progress monitoring
  uploadmonsterImage = () => {
    const imageFile = this.state.image;
    const imageMetaData = { 
      contentType: imageFile.type,
    };
    const storageRef = firebase.storage().ref();
    const userid = firebase.auth().currentUser.uid;
    const charId = this.props.monsterid;
    const fileDestination = storageRef.child(userid + '/images/monsters/' + charId);
    const fileUpload = fileDestination.put(imageFile, imageMetaData); 
    
    return fileUpload;
  }
  
  // Uploads monster data to firebase according to component state
  uploadmonsterData = () => {
    const userid = firebase.auth().currentUser.uid;
    const dbmonsters = firebase.database().ref().child(userid + '/monsters');
    const updatedmonster = {
      [this.props.monsterid]: this.state.monster
    };
    dbmonsters.update(updatedmonster);
  }
  
  // Renders the component
  render() {
    const { classes, ...other } = this.props;
    const monster = this.state.monster;

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
    
    //Get initial avatar url for AvatarUpload
    let initialAvatarUrl = null;
    if(monster.image != null) {
      initialAvatarUrl = monster.image;
    }
    
    //Generate visuals for monster stats
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
    
    //Generate visuals for monster ability scores
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
        <DialogTitle className={classes.dialogTitle}>Edit monster</DialogTitle>
        <DialogContent className={classes.dialogContent}>
        
          <div className={classes.topSection}>
            <AvatarUpload 
              onImageChange={this.handleImageChange} 
              initialImgUrl={initialAvatarUrl}
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

EditMonsterDialog.PropTypes = propTypes;

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

export default withStyles(styles)(EditMonsterDialog);