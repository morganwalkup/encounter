import React from 'react';
import PropTypes from 'prop-types';
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
    const defaultImageURL = "";
    this.state = {
      activeDialogStep: 0,
      imageFile: null,
      encounter: {
        title: null,
        description: null,
        image: defaultImageURL,
        characters: [],
        monsters: [],
      }
    };
  }
  
  handleRequestClose = () => {
    this.props.onRequestClose();
  };
  
  handleSave = () => {
    this.setState({
      activeDialogStep: 0
    });
    this.handleRequestClose();
  }
  
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  handleNext = () => {
    this.setState({
      activeDialogStep: (this.state.activeDialogStep + 1)
    });
  }
  
  handleBack = () => {
    this.setState({
      activeDialogStep: (this.state.activeDialogStep - 1)
    });
  }
  
  handleCharacterSelect = (selectedCharacterIds) => {
    const encounterObj = this.state.encounter;
    encounterObj.characters = selectedCharacterIds;
    this.setState({
      encounter: encounterObj
    });
  }
  
  handleMonsterSelect = (selectedMonsterIds) => {
    const encounterObj = this.state.encounter;
    encounterObj.characters = selectedMonsterIds;
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

const styles = {

};

export default withStyles(styles)(NewEncounterDialog);