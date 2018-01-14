import React from 'react';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

class EncounterDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      title: "",
      desc: "",
      imageFile: null,
    };
  }    
  
  handleChange = (field) => (event) => {
    this.setState({
      [field]: event.value
    });
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
            defaultValue={this.state.title}
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
            defaultValue={this.state.desc}
            onChange={this.handleChange('desc')}
            margin="normal"
          />
        </Grid>
      </Grid>
    );
  }
}

const styles = {
  stepLabel: {
    marginTop: 20,
  },
  textField: {
    width: '100%',
  },
};

export default withStyles(styles)(EncounterDetails);