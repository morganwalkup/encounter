import React from 'react';
import Grid from 'material-ui/Grid';
import EncounterBackground from './EncounterBackground';
import CombatantGroup from './CombatantGroup';
import CombatantDialog from './Combatant/CombatantDialog';
import SettingsDialog from './SettingsDialog';
import EncounterFooter from './EncounterFooter';
import { withStyles } from 'material-ui/styles';
import './EncounterScreen.css';
import encounter from '../../EncounterData/encounter.json';

//=== Component ===
class EncounterScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      orderedCombatants: this.applyInitiativeOrder(),
      activeCombatantIndex: -1,
      isSettingsDialogOpen: false,
      infoDialogSubject: null,
      isInfoDialogOpen: false,
    };
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
  
  //Applies initiative order to combatants
  applyInitiativeOrder() {
    //Collect combatants
    let combatants = encounter.players.concat(encounter.enemies);
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
    let initiativeModifier = Math.floor((combatant.dexterity - 10) / 2);
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
  
  render() {
    const players = [];
    const enemies = [];
    for(var i = 0; i < this.state.orderedCombatants.length; i++) {
      if(this.state.orderedCombatants[i].isAlly)
        players.push(this.state.orderedCombatants[i]);
      else
        enemies.push(this.state.orderedCombatants[i]);
    }
    
    return(
      <div>
        <EncounterBackground img={encounter.background}/>
        <Grid container spacing={0} justify="space-between">
          <Grid item xs={6} sm={4} lg={2}>
            <CombatantGroup 
              combatants={players}
              onInfoClick={this.handleInfoClick}
            />
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CombatantGroup 
              rightSide
              combatants={enemies} 
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