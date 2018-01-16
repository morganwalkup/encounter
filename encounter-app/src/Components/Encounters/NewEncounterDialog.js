import React from 'react';
import PropTypes from 'prop-types';
import {
  getUserId,
  createEncounter,
  createEncounterWithImage
} from '../../DatabaseFunctions/FirebaseFunctions';
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
    this.defaultImageURL = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fencounters%2FDefaultEncounter.jpg?alt=media&token=41e728ac-1167-4436-bd44-e40c533595b4";
    this.defaultEncounter = {
      title: null,
      description: null,
      image: this.defaultImageURL,
      characters: [],
      monsters: [],
    };
    this.state = {
      activeDialogStep: 0,
      imageFile: null,
      encounter: Object.assign({}, this.defaultEncounter),
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
    //Get user id and save encounter to database
    getUserId((userid) => {
      const imageFile = this.state.imageFile;
      const encounterData = Object.assign({}, this.state.encounter);
      if(imageFile === null) {
        createEncounter(userid, encounterData);
        this.resetComponentState();
        this.handleRequestClose();
      } else {
        createEncounterWithImage(userid, encounterData, imageFile);
        this.resetComponentState();
        this.handleRequestClose();
      }
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
  
  /**
   * Resets the component's state to default values
   */
  resetComponentState = () => {
    this.setState({
      activeDialogStep: 0,
      imageFile: null,
      encounter: Object.assign({}, this.defaultEncounter),
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