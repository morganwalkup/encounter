import React from 'react';
import Button from 'material-ui/Button';

import { withStyles } from 'material-ui/styles';

function EncounterFooter(props) {
  const { classes, handleInitiativeClick } = props;
  
  return(
    <div className={classes.footer}>
      <Button color='contrast'>&lt; Exit</Button>
      <Button color='contrast' onClick={handleInitiativeClick}>Next Round</Button>
      <Button color='contrast'>Settings</Button>
    </div>
  );
}

const styles = theme => ({
  footer: {
    position: 'absolute',
    top: '93vh',
    left: '0vw',
    width: '94%',
    height: '5vh',
    padding: '0 3% 2vh 3%',
    backgroundColor: 'rgba(0,0,0,0.8)',
    display: 'flex',
    justifyContent: 'space-between',
    boxShadow: '0px -10px 5px 5px rgba(0,0,0,0.8)',  
    opacity: 0.2,
    transition: 'opacity 0.4s',
    '&:hover': {
      opacity: 1.0,
    },
  },
});

export default withStyles(styles)(EncounterFooter);