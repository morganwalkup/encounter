import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         createCharacter,
         createCharacterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions';
import Dialog, { DialogContent, withMobileDialog } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewCharacterDialog extends React.Component {
  constructor(props) {
    super(props);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fcharacters%2FDefault.jpg?alt=media&token=d67e681c-849f-4160-923a-5c87acd3b48a";
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
  
  /**
   * Callback for textfield input,
   * Updates character data in component state
   */
  handleChange = (fieldName) => (event) => {
    let characterObj = this.state.character;
    characterObj[fieldName] = event.target.value;
    this.setState({
      character: characterObj,
    });
  }
  
  /**
   * Callback for AvatarUpload
   * Saves file reference in state
   * @param imageFile - the new image file provided by AvatarUpload
   */
  handleImageChange = (imageFile) => {
    this.setState({
      image: imageFile,
    });
  }
  
  /**
   * Callback for dialog close request
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Callback for 'SAVE' click,
   * Saves the character data to the database and closes the dialog
   */
  handleSave = () => {
    // Get user id
    getUserId((userid) => {
      // Check for character image and upload data accordingly
      const imageFile = this.state.image;
      if(imageFile == null) {
        // Upload character to database
        createCharacter(userid, this.state.character);
        // Close the dialog
        this.handleRequestClose();
        // Reset local character data
        this.resetLocalCharacterData();
      } else {
        // Upload character image and character to database
        const imageUpload = createCharacterWithImage(userid, this.state.character, imageFile);
        // Wait for successful upload
        imageUpload.on('state_changed', null, null, () => {
          // Close the dialog
          this.handleRequestClose();
          // Reset local character data
          this.resetLocalCharacterData();
        });
      }
    });
    
  }
  
  /**
   * Callback for 'CANCEL' click,
   * Closes the dialog
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  /**
   * Resets local character data to default value
   */
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
    const { classes, } = this.props;
    const { character } = this.state;
    
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
      <CRUDDialog 
        title="New Character"
        action="create"
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

NewCharacterDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: 300,
    margin: '0 auto',
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
  },
};

export default withStyles(styles)(withMobileDialog()(NewCharacterDialog));