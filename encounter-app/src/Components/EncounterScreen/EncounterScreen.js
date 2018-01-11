import React from 'react';
import * as firebase from 'firebase';
import Grid from 'material-ui/Grid';
import EncounterBackground from './EncounterBackground';
import CombatantGroup from './CombatantGroup';
import CombatantDialog from './Combatant/CombatantDialog';
import SettingsDialog from './SettingsDialog';
import EncounterFooter from './EncounterFooter';
import { withStyles } from 'material-ui/styles';
import './EncounterScreen.css';

//=== Component ===
class EncounterScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      characters: null,
      monsters: null,
      bgImage: null,
      orderedCombatants: null,
      activeCombatantIndex: -1,
      isSettingsDialogOpen: false,
      infoDialogSubject: null,
      isInfoDialogOpen: false,
    };
  }
  
  //Called immediately after the component mounts
  componentDidMount() {
    //Listen for user login changes
    firebase.auth().onAuthStateChanged((user) => {
      //Save user id, or 'anonymous' if no user is logged in
      this.setState({
        userid: (user) ? user.uid : 'anonymous'
      });
      
      //Get user and encounter ids
      const userid = this.state.userid;
      const encounterid = "-L2NcF1lrtXt6UMVMDDm";
      
      //Get encounter data from firebase
      const encounterRef = firebase.database().ref(userid + '/encounters/' + encounterid);
      encounterRef.once('value', snapshot => {
        let encounter = snapshot.val();
        
        //Get data for characters in encounter
        let characters = encounter.characters; //Ids of the characters
        for(let i = 0; i < characters.length; i++) {
          firebase.database().ref(userid + '/characters/' + characters[i]).once('value', snapshot => {
            characters[i] = snapshot.val(); //Overwrite id with character data
            // On the last loop, save characters to state and order combatants
            if(i === (characters.length - 1)) {
              this.setState({
                characters: characters,
              });
              //TODO: Please find a way to only call this once
              this.setState({
                orderedCombatants: this.applyInitiativeOrder(),
              });
            }
          });
        }
        
        //Get data for monsters in encounter
        let monsters = encounter.monsters; //Ids of the monsters
        for(let i = 0; i < monsters.length; i++) {
          firebase.database().ref(userid + '/monsters/' + monsters[i]).once('value', snapshot => {
            monsters[i] = snapshot.val(); //Overwrite id with monster data
            // On the last loop, save monsters to state and order combatants
            if(i === (monsters.length - 1)) {
              this.setState({
                monsters: monsters,
              });
              //TODO: Please find a way to only call this once
              this.setState({
                orderedCombatants: this.applyInitiativeOrder(),
              });
            }
          });
        }
        
        //Save background image url
        this.setState({
          bgImage: encounter.image,
        });
        
      });
    });
  }
  
  //Called just before the component unmounts
  componentWillUnmount() {
    //Get user id
    const userid = this.state.userid;
    const encounterid = "-L2NcF1lrtXt6UMVMDDm";
    //Disconnect this component's state from firebase
    firebase.database().ref(userid + '/encounters/' + encounterid).off();
  }
  
  //Activates the next combatant in the initiative order
  handleContinueClick = () => {
    //Temp storage for state variables
    let activeIndex = this.state.activeCombatantIndex;
    const combatants = this.state.orderedCombatants;
    //Deactivate active combatant
    if(activeIndex !== -1) {
      combatants[activeIndex].isActive = false;
    }
    //Activate next combatant
    activeIndex = (activeIndex + 1) % combatants.length;
    combatants[activeIndex].isActive = true;
    
    //Update state
    this.setState({
      orderedCombatants: combatants,
      activeCombatantIndex: activeIndex,
    });
  }
  
  //Determine initiative for combatants and sort them by the results
  applyInitiativeOrder = () => {

    if(this.state.characters == null || this.state.monsters == null) {
      console.log(this.state.characters);
      console.log(this.state.monsters);
      console.log("Null combatants");
      return null;
    }

    //Collect combatants
    let combatants = [];
    for(let i = 0; i < this.state.characters.length; i++) {
      let character = this.state.characters[i];
      character.isCharacter = true;
      combatants.push(character);
    }
    for(let i = 0; i < this.state.monsters.length; i++) {
      let monster = this.state.monsters[i];
      monster.isCharacter = false;
      combatants.push(monster);
    }
    
    //Roll initiative for combatants
    combatants.map((currentValue) => 
      this.rollInitiative(currentValue)
    );
    //Sort combatants based on initiative rolls
    this.initiativeBubbleSort(combatants);
    return combatants;
  }
  
  //Calculates initiative for the combatant
  rollInitiative(combatant) {
    let roll = Math.floor((Math.random() * 21) + 1); //Returns number in range [1,20]
    let initiativeModifier = Math.floor((combatant.DEX - 10) / 2);
    let initiative = roll + initiativeModifier;
    combatant.initiative = initiative;
  }
  
  //Sorts combatants based on initiative
  initiativeBubbleSort(combatants) {
    let len = combatants.length;
    for (var i = len-1; i >= 0; i--){
      for(var j = 1; j <= i; j++){
        if(combatants[j-1].initiative < combatants[j].initiative){
          var temp = combatants[j-1];
          combatants[j-1] = combatants[j];
          combatants[j] = temp;
        }
      }
    }
    return combatants;
  }
  
  //Opens the settings dialog
  handleSettingsClick = () => {
    this.setState({
      isSettingsDialogOpen: true,
    });
  }
  
  //Opens the combatant info dialog
  handleInfoClick = (combatant) => {
    this.setState({
      infoDialogSubject: combatant,
      isInfoDialogOpen: true,
    });
  }
  
  //Closes the settings dialog
  handleRequestClose = () => {
    this.setState({
      isSettingsDialogOpen: false,
      isInfoDialogOpen: false,
    });
  }
  
  //Renders the component
  render() {
    const { bgImage, orderedCombatants } = this.state;

    // Return if combatants are still loading
    if(orderedCombatants == null) {
      return null; //TODO: Return loading screen
    }
    
    // Split ordered combatants into characters and monsters for display
    let orderedCharacters = [];
    let orderedMonsters = [];
    for(let i = 0; i < orderedCombatants.length; i++) {
      const combatant = orderedCombatants[i];
      if(combatant.isCharacter)
        orderedCharacters.push(combatant);
      else
        orderedMonsters.push(combatant);
    }
    
    return(
      <div>
        <EncounterBackground img={bgImage}/>
        <Grid container spacing={0} justify="space-between">
          <Grid item xs={6} sm={4} lg={2}>
            <CombatantGroup 
              combatants={orderedCharacters}
              onInfoClick={this.handleInfoClick}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CombatantGroup 
              rightSide
              combatants={orderedMonsters} 
              onInfoClick={this.handleInfoClick}
            />
          </Grid>
        </Grid>
        <SettingsDialog 
          open={this.state.isSettingsDialogOpen}
          onRequestClose={this.handleRequestClose}
        />
        <CombatantDialog 
          open={this.state.isInfoDialogOpen}
          onRequestClose={this.handleRequestClose}
          combatant={this.state.infoDialogSubject}
        />
        <EncounterFooter 
          onContinueClick={this.handleContinueClick}
          onSettingsClick={this.handleSettingsClick}
        />
      </div>
    );
  }
}

//=== Styles ===
const styles = ({
  //none
});

//=== Apply Styles ===
export default withStyles(styles)(EncounterScreen);