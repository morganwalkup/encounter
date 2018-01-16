import React from 'react';
import PropTypes from 'prop-types';
import {
  getUserId,
  updateEncounter,
  updateEncounterWithImage
} from '../../DatabaseFunctions/FirebaseFunctions';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import EncounterDialogStepper from './EncounterDialogContent/EncounterDialogStepper';
import EncounterDetails from './EncounterDialogContent/EncounterDetails';
import CharacterSelection from './EncounterDialogContent/CharacterSelection';
import MonsterSelection from './EncounterDialogContent/MonsterSelection';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  id: PropTypes.string,
  encounter: PropTypes.object,
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
};

class EditEncounterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDialogStep: 0,
      imageFile: null,
      encounter: Object.assign({}, this.props.encounter),
    };
  }
  
  /**
   * Called when the component receives new props
   */
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        imageFile: null,
        encounter: Object.assign({}, nextProps.encounter)
      });
    }
  }
  
  /**
   * Handles close request from dialogs
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  };
  
  /**
   * Handles user click of "cancel" button
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  /**
   * Handles user click of "next" button
   */
  handleNext = () => {
    this.setState({
      activeDialogStep: (this.state.activeDialogStep + 1)
    });
  }
  
  /**
   * Handles user click of "back" button
   */
  handleBack = () => {
    this.setState({
      activeDialogStep: (this.state.activeDialogStep - 1)
    });
  }
  
  /**
   * Callback for user 'save' click
   * Saves encounter data to firebase and closes the dialog
   */
  handleSave = () => {
    //Get user id and save encounter to database
    getUserId((userid) => {
      const imageFile = this.state.imageFile;
      const encounterid = this.props.id;
      const encounterData = Object.assign({}, this.state.encounter);
      if(imageFile === null) {
        updateEncounter(userid, encounterid, encounterData);
      } else {
        updateEncounterWithImage(userid, encounterid, encounterData, imageFile);
      }
      this.handleRequestClose();
      this.setState({
        activeDialogStep: 0
      });
    });
  }
  
  /**
   * Handles change in textfield value
   * @param field - the data field to update
   * @param newValue - the new value of the data field
   */
  handleFieldChange = (field, newValue) => {
    const encounterObj = this.state.encounter;
    encounterObj[field] = newValue;
    this.setState({
      encounter: encounterObj
    });
  }
  
  /**
   * Handles a change in the selected encounter background image
   * @param imageFile - the newly selected image file
   */
  handleImageChange = (imageFile) => {
    this.setState({
      imageFile: imageFile
    });
  }
  
  /**
   * Handles selection of new characters within the CharacterSelection step
   * @param selectedCharacterIds - an array containing unique ids of the selected characters
   */
  handleCharacterSelect = (selectedCharacterIds) => {
    const encounterObj = this.state.encounter;
    encounterObj.characters = selectedCharacterIds;
    this.setState({
      encounter: encounterObj
    });
  }
  
  /**
   * Handles selection of new monsters within the MonsterSelection step
   * @param selectedMonsterIds - an array containing unique ids of the selected monsters
   */
  handleMonsterSelect = (selectedMonsterIds) => {
    const encounterObj = this.state.encounter;
    encounterObj.monsters = selectedMonsterIds;
    this.setState({
      encounter: encounterObj
    });
  }

  render() {
    const { activeDialogStep } = this.state;
    
    const dialogSteps = [
      <EncounterDetails 
        title={this.state.encounter.title}
        description={this.state.encounter.description}
        image={this.state.encounter.image}
        imageFile={this.state.imageFile}
        onFieldChange={this.handleFieldChange} 
        onImageChange={this.handleImageChange}
      />,
      <CharacterSelection 
        selectedCharacterIds={this.state.encounter.characters}
        onCharacterSelect={this.handleCharacterSelect} 
      />,
      <MonsterSelection 
        selectedMonsterIds={this.state.encounter.monsters}
        onMonsterSelect={this.handleMonsterSelect} 
      />
    ];
    
    return (
      <div>
        <CRUDDialog
          fullScreen
          multistep
          open={this.props.open}
          onRequestClose={this.handleRequestClose}
          title="Edit Encounter"
          onSave={this.handleSave}
          onCancel={this.handleCancel}
          actions={
            <EncounterDialogStepper 
              activeStep={activeDialogStep}
              onNext={this.handleNext}
              onBack={this.handleBack}
              onCancel={this.handleCancel}
              onSave={this.handleSave}
            />
          }
        >
          {dialogSteps[activeDialogStep]}
        </CRUDDialog>
      </div>
    );
  }
}

EditEncounterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(EditEncounterDialog);