import React from 'react';
import {
  BrowserRouter as Router,
  Route,
  Switch,
} from 'react-router-dom';
import Reboot from 'material-ui/Reboot';
import Grid from 'material-ui/Grid';
import EncounterNav from './Components/Persistent/EncounterNav';
import Home from './Components/Home/Home';
import SignIn from './Components/SignIn/SignIn';
import Characters from './Components/Characters/Characters';
import Monsters from './Components/Monsters/Monsters';
import Encounters from './Components/Encounters/Encounters';
import EncounterScreen from './Components/EncounterScreen/EncounterScreen';
import RevHitsBannerAd from './Components/Persistent/RevHitsBannerAd';
import EncounterFooter from './Components/Persistent/EncounterFooter';
import { withStyles } from 'material-ui/styles';
import * as firebase from 'firebase';

function App(props) {
  const { classes } = props;
  
  // Configure firebase
  if(firebase.apps.length === 0) {
    const config = {
      apiKey: "AIzaSyBjC4MMGZ1TeXso6WuLgj5I3VqeIxq61Dg",
      authDomain: "encounter-49be9.firebaseapp.com",
      databaseURL: "https://encounter-49be9.firebaseio.com",
      projectId: "encounter-49be9",
      storageBucket: "encounter-49be9.appspot.com",
      messagingSenderId: "52182315576"
    };
    firebase.initializeApp(config);
  }
  
  return(
    <Router>
    <div>
      {/* Reset browser styling */}
      <Reboot />
      
      {/* Navbar - Apply effects for specific pages */}
      <Switch>
        <Route exact path="/" render={()=>
          <EncounterNav homeScreen/>
        }/>
        <Route path="/playencounter" render={()=>
          <EncounterNav hoverOnly/>}
        />
        <Route component={EncounterNav}/>
      </Switch>
      
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
            <Route path="/playencounter/:userid/:encounterid" component={EncounterScreen}/>
          </Switch>
        </Grid>
        
        {/* Ad banner */}
        <Grid item xs={12}>
          <Switch>
            <Route path="/playencounter" />
            <Route path="/" component={RevHitsBannerAd}/>
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
    width: '100%',
    overflow: 'hidden',
  }
});

export default withStyles(styles)(App);