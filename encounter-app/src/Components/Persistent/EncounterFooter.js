import React from 'react';
import Grid from 'material-ui/Grid';
//import Typography from 'material-ui/Typography';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';
import Typography from 'material-ui/Typography';

function EncounterFooter(props) {
  const { classes } = props;
  return(
    <Grid container spacing={0} className={classes.footerContainer}>
      <Grid item xs={12} >
        <Grid container spacing={0}>
          <Grid item xs={12} >
            <Typography type="body1" className={classes.disclaimer}>
            {`Wizards of the Coast, Dungeons & Dragons, and their logos are trademarks of Wizards of the Coast LLC in the United States and other countries.
            © 2016 Wizards. All rights reserved.
            Encounter! is not affiliated with, endorsed, sponsored, or specifically approved by Wizards of the Coast LLC.
            Encounter! May use the trademarks and other intellectual property of Wizards of the Coast LLC,
            which is permitted under Wizard's fan site policy. 
            For example, Dungeons & Dragons® is a trademark[s] of Wizards of the Coast.
            For more information about Wizards of the Coast or any of Wizard's trademarks or other intellectual property, 
            please visit their website at (www.wizards.com).`} 
            </Typography>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  footerContainer: {
    width: '100%',
    height: 'auto',
    backgroundColor: blueGrey[900],
    borderTop: 'solid thick #69f0ae',
    padding: '10px'
  },
  disclaimer: {
    color: 'rgba(255,255,255,0.5)',
  }
});

export default withStyles(styles)(EncounterFooter);