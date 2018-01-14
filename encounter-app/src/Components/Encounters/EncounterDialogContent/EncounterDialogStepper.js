import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';
import MobileStepper from 'material-ui/MobileStepper';
import Button from 'material-ui/Button';
import KeyboardArrowLeft from 'material-ui-icons/KeyboardArrowLeft';
import KeyboardArrowRight from 'material-ui-icons/KeyboardArrowRight';

const propTypes = {
  activeStep: PropTypes.number.isRequired,
  onNext: PropTypes.func.isRequired,
  onBack: PropTypes.func.isRequired,
  onCancel: PropTypes.func.isRequired,
  onSave: PropTypes.func.isRequired,
};

class EncounterDialogStepper extends React.Component {
      
  handleNext = () => {
    this.props.onNext();
  }   
  
  handleBack = () => {
    this.props.onBack();
  }
  
  handleCancel = () => {
    this.props.onCancel();
  }
  
  handleSave = () => {
    this.props.onSave();
  }
    
  render() {
    const { classes, activeStep } = this.props;

    const cancelButton = (
      <Button dense onClick={this.handleCancel}>
        Cancel
      </Button>
    );
    
    const backButton = (
      <Button dense onClick={this.handleBack}>
        <KeyboardArrowLeft /> Back
      </Button>
    );
    
    const nextButton = (
      <Button dense onClick={this.handleNext}>
        Next <KeyboardArrowRight />
      </Button>
    );
    
    const saveButton = (
      <Button dense color="primary" onClick={this.handleSave}>
        Save
      </Button>
    );
    
    return (
      <MobileStepper
        type="dots"
        steps={3}
        position="static"
        activeStep={activeStep}
        className={classes.stepper}
        backButton={(activeStep === 0) ? cancelButton : backButton}
        nextButton={(activeStep === 2) ? saveButton : nextButton}
      />
    );
  }
}

EncounterDialogStepper.propTypes = propTypes;

const styles = {
  stepper: {
    width: '100%',
    margin: '0 auto',
    background: 'none',
  },
};

export default withStyles(styles)(EncounterDialogStepper);