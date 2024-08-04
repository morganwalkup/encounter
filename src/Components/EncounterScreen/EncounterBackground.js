import React from 'react';
import { withStyles } from 'material-ui/styles';

function EncounterBackground(props) {
  const { classes, img } = props;
  
  const bgDivStyle = {
    backgroundImage: 'url(' + img + ')',
  };
  
  return(
    <div className={classes.bgDiv} style={bgDivStyle}>
      {/*<img src={img} alt="Encounter Background" className={classes.bgImage}/>*/}
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
    backgroundSize: 'cover',
    backgroundPosition: 'center',
  },
  bgImage: {
    overflow: 'none',
    width: '100vw',
    height: 'auto',
  }
});

export default withStyles(styles)(EncounterBackground);