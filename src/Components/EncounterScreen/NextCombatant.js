import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';

//=== Props ===
const propTypes = {
  classes: PropTypes.object.isRequired,
  currentName: PropTypes.string,
  nextName: PropTypes.string,
};

//=== Component ===
class NextCombatant extends React.Component {
  render() {
    const { classes, currentName, nextName } = this.props;  
      
    return(
      <div>
        <Grid container spacing={0} justify="center" className={classes.container}>
          <Grid item xs={3} sm={4} lg={6}>
            <Typography 
              align="center" 
              color="inherit" 
              type="title"
            >
            {currentName}
            </Typography>
            <Typography 
              align="center" 
              color="inherit" 
              type="subheading"
              className={classes.nextName}
            >
            Next up: {nextName}
            </Typography>
          </Grid>
        </Grid>
      </div>
    );
  }
}

NextCombatant.propTypes = propTypes;

//=== Styles ===
const styles = {
  container: {
    width: "100vw",
    position: "fixed",
    top: 0,
    left: 0,
    padding: 15,
    textShadow: "0px 3px 10px rgba(0,0,0,1)",
    color: "white",
  },
  nextName: {
    opacity: "0.5",
  }
};

//=== Apply Styles ===
export default withStyles(styles)(NextCombatant);