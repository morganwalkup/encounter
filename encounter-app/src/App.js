import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Grid from 'material-ui/Grid';
import EncounterNav from './Components/Persistent/EncounterNav';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import Characters from './Components/Characters/Characters';
import Monsters from './Components/Monsters/Monsters';
import Encounters from './Components/Encounters/Encounters';
import EncounterScreen from './Components/EncounterScreen/EncounterScreen';
import EncounterFooter from './Components/Persistent/EncounterFooter';
import { withStyles } from 'material-ui/styles';

function App(props) {
  const { classes } = props;
  
  return(
    <Router>
    <div>
      {/* Navbar - Apply hoverOnly effect for encounter screen */}
      <Route path="/playencounter" children={({ match }) => (
        <EncounterNav hoverOnly={match ? true : false} />
      )}/>
      
      {/* Page Content */}
      <Grid 
        container 
        direction="column" 
        justify="space-between" 
        spacing={0} 
        className={classes.appContainer}
      >
        {/* Main page content */}
        <Grid item xs={12}>
          <Switch>
            <Route exact path="/" component={Home}/>
            <Route path="/signup" component={SignIn}/>
            <Route path="/encounters" component={Encounters}/>
            <Route path="/characters" component={Characters}/>
            <Route path="/monsters" component={Monsters}/>
            <Route path="/playencounter" component={EncounterScreen}/>
          </Switch>
        </Grid>
        
        {/* Page footer */}
        <Grid item xs={12}>
          <Switch>
            <Route path="/playencounter" />
            <Route path="/" component={EncounterFooter}/>
          </Switch>
        </Grid>
        
      </Grid>
    </div>
    </Router>
  );
}

const styles = ({
  appContainer: {
    minHeight: '100vh',
  }
});

export default withStyles(styles)(App);