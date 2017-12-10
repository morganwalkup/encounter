import React from 'react';
import Grid from 'material-ui/Grid';
import EncounterNav from './Components/Persistent/EncounterNav';
import EncounterScreen from './Components/EncounterScreen/EncounterScreen';
import Home from './Components/Home/Home';
import Characters from './Components/Characters/Characters';
import EncounterFooter from './Components/Persistent/EncounterFooter';
import { withStyles } from 'material-ui/styles';

function App(props) {
  const { classes } = props;
  
  return(
    <div>
      <EncounterNav subtle/>
      <Grid 
        container 
        direction="column" 
        justify="space-between" 
        spacing={0} 
        className={classes.appContainer}
      >
        <Grid item xs={12}>
          <EncounterScreen />
          {/*<Home />*/}
          {/*<Characters />*/}
        </Grid>
        {/*<Grid item xs={12}>
          <EncounterFooter/>
        </Grid>*/}
      </Grid>
    </div>
  );
}

const styles = ({
  appContainer: {
    minHeight: '100vh',
  }
});

export default withStyles(styles)(App);