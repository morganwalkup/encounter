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

class EncounterScreen extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      orderedCombatants: this.calculateInitiativeOrder(),
      activeCombatantIndex: -1,
    };
  }
  
  runEncounter = () => {
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
  
  calculateInitiativeOrder() {
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
  
  rollInitiative(combatant) {
    let roll = Math.floor((Math.random() * 21) + 1); //Returns number in range [1,20]
    let initiativeModifier = Math.floor((combatant.dexterity - 10) / 2);
    let initiative = roll + initiativeModifier;
    combatant.initiative = initiative;
  }
  
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
            <CombatantGroup combatants={players}/>
          </Grid>
          <Grid item xs={6} sm={4} lg={2}>
            <CombatantGroup combatants={enemies} rightSide />
          </Grid>
        </Grid>
        <SettingsDialog open={false}/>
        <CombatantDialog open={false}/>
        <EncounterFooter handleInitiativeClick={this.runEncounter}/>
      </div>
    );
  }
}

const styles = ({
});

export default withStyles(styles)(EncounterScreen);