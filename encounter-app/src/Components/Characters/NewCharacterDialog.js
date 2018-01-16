import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         createCharacter,
         createCharacterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewCharacterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fcharacters%2FDefault.jpg?alt=media&token=d67e681c-849f-4160-923a-5c87acd3b48a";
    this.defaultState = {
      name: "",
      image: this.defaultImage,
      LVL: "",
      AC: "",
      HP: "",
      SPD: "",
      STR: "",
      DEX: "",
      CON: "",
      INT: "",
      WIS: "",
      CHA: ""
    };
    this.state = {
      imageFile: null,
      character: Object.assign({}, this.defaultState)
    };
  }
  
  /**
   * Callback for textfield input,
   * Updates character data in component state
   * @param fieldName - the name of the datafield being changed
   * @param value - the new value of the datafield
   */
  handleChange = (fieldName, value) => {
    let characterObj = this.state.character;
    characterObj[fieldName] = value;
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
      imageFile: imageFile,
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
    // Get user id and upload character data to database
    getUserId((userid) => {
      const imageFile = this.state.imageFile;
      const characterData = Object.assign({}, this.state.character);
      
      if(imageFile === null) {
        createCharacter(userid, characterData);
        this.handleRequestClose();
        this.resetLocalCharacterData();
      } else {
        createCharacterWithImage(userid, characterData, imageFile);
        this.handleRequestClose();
        this.resetLocalCharacterData();
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
    this.setState({
      imageFile: null,
      character: Object.assign({}, this.defaultState)
    });
  }
  
  render() {
    const { character } = this.state;
    
    return (
      <EditCombatantDialog 
        combatant={character}
        isCharacter
        open={this.props.open}
        onRequestClose={this.handleRequestClose}
        onFieldChange={this.handleChange}
        onImageChange={this.handleImageChange}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
      />
    );
  }
}

NewCharacterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(NewCharacterDialog);