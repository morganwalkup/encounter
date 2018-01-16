import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         createMonster,
         createMonsterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions';
import EditCombatantDialog from '../CharactersAndMonsters/EditCombatantDialog';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2FDefault.jpg?alt=media&token=d67e681c-849f-4160-923a-5c87acd3b48a";
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
      monster: Object.assign({}, this.defaultState)
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
    // Get user id and upload monster data to database
    getUserId((userid) => {
      const imageFile = this.state.imageFile;
      const monsterData = Object.assign({}, this.state.monster);
      
      if(imageFile === null) {
        createMonster(userid, monsterData);
        this.handleRequestClose();
        this.resetLocalMonsterData();
      } else {
        createMonsterWithImage(userid, monsterData, imageFile);
        this.handleRequestClose();
        this.resetLocalMonsterData();
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
   * Resets local monster data to default value
   */
  resetLocalMonsterData = () => {
    this.setState({
      imageFile: null,
      monster: Object.assign({}, this.defaultState)
    });
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

NewMonsterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(NewMonsterDialog);