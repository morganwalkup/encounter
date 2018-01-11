import React from 'react';
import { withStyles } from 'material-ui/styles';

function EncounterBackground(props) {
  const { classes, img } = props;
  
  return(
    <div className={classes.bgDiv}>
      <img src={img} alt="Encounter Background" className={classes.bgImage}/>
    </div>
  );
}

const styles = theme => ({
  bgDiv: {
    position: 'fixed',
    top: 0,
    left: 0,
    height: '100vh',
    width: '100vw',
    zIndex: '-1',
    backgroundColor: 'black',
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',      
  },
  bgImage: {
    overflow: 'none',
    width: '100vw',
    height: 'auto',
  }
});

export default withStyles(styles)(EncounterBackground);