import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         updateMonster,
         updateMonsterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions'; 
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
      monster: Object.assign({}, props.monster)
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
        monster: Object.assign({}, nextProps.monster)
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
    getUserId((userid) => {
      const imageFile = this.state.imageFile;
      const monsterData = Object.assign({}, this.state.monster);
      
      if(imageFile == null) {
        updateMonster(userid, this.props.monsterid, monsterData);
        this.handleRequestClose();
      } else {
        updateMonsterWithImage(userid, this.props.monsterid, monsterData, imageFile);
        this.handleRequestClose();
      }
    });
  }
  
  /**
   * Callback for "CANCEL" click
   * Discards changes and closes the dialog
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  render() {
    const monster = this.state.monster;
    
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