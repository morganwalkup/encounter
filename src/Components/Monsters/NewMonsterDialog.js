import React from 'react';
import PropTypes from 'prop-types';
import Monster from '../../Models/Monster';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      monster: new Monster()
    };
  }
  
  /**
   * Callback for textfield input,
   * Updates monster data in component state
   * @param fieldName - the name of the datafield being changed
   * @param value - the new value of the datafield
   */
  handleChange = (fieldName, value) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = value;
    this.setState({
      monster: monsterObj,
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
   * Saves the monster data to the database and closes the dialog
   */
  handleSave = () => {
    const imageFile = this.state.imageFile;
    const newMonster = Monster.copy(this.state.monster);
    
    if(imageFile === null) {
      newMonster.create();
    } else {
      newMonster.createWithImage(imageFile);
    }
    
    this.handleRequestClose();
    this.resetLocalMonsterData();
  }
  
  /**
   * Callback for 'CANCEL' click,
   * Closes the dialog
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  /**
   * Resets local monster data to default value
   */
  resetLocalMonsterData = () => {
    this.setState({
      imageFile: null,
      monster: new Monster()
    });
  }
  
  render() {
    const { monster } = this.state;
    
    return (
      <EditCombatantDialog 
        combatant={monster}
        isMonster
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

NewMonsterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(NewMonsterDialog);