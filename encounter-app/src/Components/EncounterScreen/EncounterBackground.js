import React from 'react';
import { withStyles } from 'material-ui/styles';

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

function EncounterBackground(props) {
  const { classes, img } = props;
  
  let imgPath = require('../../images/' + img);
  
  return(
    <div className={classes.bgDiv}>
      <img src={imgPath} alt="Encounter Background" className={classes.bgImage}/>
    </div>
  );
}

export default withStyles(styles)(EncounterBackground);