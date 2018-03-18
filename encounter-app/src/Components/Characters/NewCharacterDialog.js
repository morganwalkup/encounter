import React from 'react';
import PropTypes from 'prop-types';
import Character from '../../Models/Character';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewCharacterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      character: new Character()
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
    const imageFile = this.state.imageFile;
    const newCharacter = Character.copy(this.state.character);
    
    if(imageFile === null) {
      newCharacter.create();
    } else {
      newCharacter.createWithImage(imageFile);
    }
    
    this.handleRequestClose();
    this.resetLocalCharacterData();
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
      character: new Character()
    });
  }
  
  render() {
    const { character } = this.state;
    
    return (
      <EditCombatantDialog 
        combatant={character}
        isCharacter
        isNew
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