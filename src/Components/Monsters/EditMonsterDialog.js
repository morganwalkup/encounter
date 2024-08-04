import React from 'react';
import PropTypes from 'prop-types';
import Monster from '../../Models/Monster';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  monsterid: PropTypes.string,
  monster: PropTypes.object,
};

class EditMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      imageFile: null,
      monster: Monster.copy(this.props.monster)
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
        monster: Monster.copy(nextProps.monster)
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
   * Updates monster data in component state
   * @param fieldName - the name of the data field to be changed
   * @param value - the new value of the data field
   */
  handleChange = (fieldName, value) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = value;
    this.setState({
      monster: monsterObj,
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
   * Saves altered monster data to firebase and closes the dialog
   */
  handleSave = () => {
    const imageFile = this.state.imageFile;
    const newMonster = Monster.copy(this.state.monster);
    
    if(imageFile == null) {
      newMonster.update();
    } else {
      newMonster.updateWithImage(imageFile);
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
    const { monster } = this.state;
    
    return (
      <EditCombatantDialog
        combatant={monster}
        isMonster
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

EditMonsterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(EditMonsterDialog);