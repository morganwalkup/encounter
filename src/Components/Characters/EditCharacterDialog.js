import React from 'react';
import PropTypes from 'prop-types';
import Character from '../../Models/Character';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
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
      imageFile: null,
      character: Character.copy(props.character)
    };
  }
  
  /**
   * Called when the component receives new props
   * @param nextProps - the props to be received
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        imageFile: null,
        character: Character.copy(nextProps.character)
      });
    }
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
   * Callback for textfield input,
   * Updates character data in component state
   * @param fieldName - the name of the data field to be changed
   * @param value - the new value of the data field
   */
  handleChange = (fieldName, value) => {
    let characterObj = this.state.character;
    characterObj[fieldName] = value;
    this.setState({
      character: characterObj,
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
   * Saves altered character data to firebase and closes the dialog
   */
  handleSave = () => {
    const imageFile = this.state.imageFile;
    const newCharacter = Character.copy(this.state.character);
    
    if(imageFile == null) {
      newCharacter.update();
    } else {
      newCharacter.updateWithImage(imageFile);
    }
    
    this.handleRequestClose();
  }
  
  /**
   * Callback for "CANCEL" click
   * Discards changes and closes the dialog
   */
  handleCancel = () => {
    this.handleRequestClose();
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

EditCharacterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(EditCharacterDialog);