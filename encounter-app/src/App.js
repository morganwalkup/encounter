import React from 'react';
import EncounterNav from './Components/Persistent/EncounterNav';
import EncounterScreen from './Components/EncounterScreen/EncounterScreen';
import Home from './Components/Home/Home';
import { withStyles } from 'material-ui/styles';

const styles = theme => ({

});

function App() {
  return(
    <div>
      <EncounterNav subtle/>
      <EncounterScreen />
      {/*<Home />*/}
    </div>
  );
}

export default withStyles(styles)(App);