import React from 'react';
import PropTypes from 'prop-types';
import Encounter from '../../Models/Encounter';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import EncounterDialogStepper from './EncounterDialogContent/EncounterDialogStepper';
import EncounterDetails from './EncounterDialogContent/EncounterDetails';
import CharacterSelection from './EncounterDialogContent/CharacterSelection';
import MonsterSelection from './EncounterDialogContent/MonsterSelection';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool.isRequired,
  onRequestClose: PropTypes.func,
};

class NewEncounterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      activeDialogStep: 0,
      imageFile: null,
      encounter: new Encounter(),
    };
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
    const imageFile = this.state.imageFile;
    const newEncounter = Encounter.copy(this.state.encounter);
    
    if(imageFile === null) {
      newEncounter.create();
    } else {
      newEncounter.createWithImage(imageFile);
    }
    
    this.handleRequestClose();
    this.resetComponentState();
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
    encounterObj.characterIDs = selectedCharacterIds;
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
    encounterObj.monsterIDs = selectedMonsterIds;
    this.setState({
      encounter: encounterObj
    });
  }
  
  /**
   * Resets the component's state to default values
   */
  resetComponentState = () => {
    this.setState({
      activeDialogStep: 0,
      imageFile: null,
      encounter: new Encounter(),
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
          title="New Encounter"
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

NewEncounterDialog.propTypes = propTypes;

const styles = {};

export default withStyles(styles)(NewEncounterDialog);