import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import BackgroundUpload from './BackgroundUpload';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  title: PropTypes.string,
  description: PropTypes.string,
  image: PropTypes.string,
  onImageChange: PropTypes.func.isRequired,
  onFieldChange: PropTypes.func.isRequired,
};

class EncounterDetails extends React.Component {
  
  /**
   * Handles changes in text field values
   * @param field - the name of the data field to update
   * @param event - the event raised by changing text field
   */
  handleChange = (field) => (event) => {
    this.props.onFieldChange(field, event.target.value);
  }
  
  /**
   * Handles changes in encounter background image
   * @param imageFile - the newly selected imageFile
   */
  handleImageChange = (imageFile) => {
    this.props.onImageChange(imageFile);
  }
    
  render() {
    const { classes } = this.props;  
      
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} md={10} lg={8}>
          <Typography 
            type="body2"
            className={classes.stepLabel}
          >
            Encounter Details:
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <TextField
            id="title"
            label="Title"
            type="text"
            className={classes.textField}
            defaultValue={this.props.title}
            onChange={this.handleChange('title')}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <TextField
            multiline
            rowsMax="3"
            id="description"
            label="Description"
            type="text"
            className={classes.textField}
            defaultValue={this.props.description}
            onChange={this.handleChange('description')}
            margin="normal"
          />
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <Typography 
            type="caption"
            className={classes.backgroundLabel}
          >
            Background:
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <BackgroundUpload
            onImageChange={this.handleImageChange} 
            initialImgUrl={this.props.image}
          />
        </Grid>
      </Grid>
    );
  }
}

EncounterDetails.propTypes = propTypes;

const styles = {
  stepLabel: {
    marginTop: 20,
  },
  textField: {
    width: '100%',
  },
  backgroundLabel: {
    marginTop: 20,
  }
};

export default withStyles(styles)(EncounterDetails);