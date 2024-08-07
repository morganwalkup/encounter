import React from 'react';
import { getEncounter, 
         getCharacter, 
         getMonster 
        } from '../../DatabaseFunctions/FirebaseFunctions';
import Grid from 'material-ui/Grid';
import EncounterBackground from './EncounterBackground';
import NextCombatant from './NextCombatant';
import CombatantGroup from './CombatantGroup';
import CombatantDialog from './Combatant/CombatantDialog';
import SettingsDialog from './SettingsDialog';
import EncounterScreenFooter from './EncounterScreenFooter';
import { withStyles } from 'material-ui/styles';
import './EncounterScreen.css'; //Removes scrollbars on CombatantGroup divs

//=== Component ===
class EncounterScreen extends React.Component {
  
  constructor(props) {
    super(props);
    this.dialogOptions = {
      none: 'none',
      settings: 'settings',
      info: 'info',
    };
    this.state = {
      characters: null,
      monsters: null,
      charactersLoaded: false,
      monstersLoaded: false,
      bgImage: null,
      orderedCombatants: null,
      activeCombatantIndex: -1,
      openDialog: this.dialogOptions.none,
      infoDialogSubject: null,
    };
  }
  
  
  /**
   * Called immediately after the component mounts
   * Gets user id and encounter screen data
   */
  componentDidMount() {
    this.getEncounterScreenData();
  }
  
  /**
   * Called following a change in props or state
   * Orders combatants once all characters and monsters are loaded
   */
  componentDidUpdate(prevProps, prevState) {
    if(this.state.monstersLoaded && this.state.charactersLoaded && this.state.orderedCombatants == null) {
      this.setState({
        orderedCombatants: this.applyInitiativeOrder()
      });
    }
  }
  
  /**
   * Retrieves encounter data from database and saves it in state
   */
  getEncounterScreenData = () => {
    //Get user and encounter ids from url
    const userid = this.props.match.params.userid;
    const encounterid = this.props.match.params.encounterid;
    
    //Get encounter data from firebase
    getEncounter(userid, encounterid, encounter => {
      //Save background image and reset loading state
      this.setState({
        bgImage: encounter.image,
        charactersLoaded: false,
        monstersLoaded: false,
        orderedCombatants: null,
      });

      //Get data for characters in encounter
      let characters = encounter.characterIDs; //Ids of the characters
      if(characters != null) {
        for(let i = 0; i < characters.length; i++) {
          getCharacter(userid, characters[i], character => {
            //Overwrite id with character data
            characters[i] = character; 
            // On the last loop, save characters and indicate loading is done
            if(i === (characters.length - 1)) {
              this.setState({
                characters: characters,
                charactersLoaded: true,
              });
            }
          });
        }
      } else {
        this.setState({
          characters: null,
          charactersLoaded: true
        });
      }
      
      //Get data for monsters in encounter
      let monsters = encounter.monsterIDs; //Ids of the monsters
      if(monsters != null) {
        for(let i = 0; i < monsters.length; i++) {
          getMonster(userid, monsters[i], monster => {
            //Overwrite id with monster data
            monsters[i] = monster; 
            // On the last loop, save monsters and indicate loading is done
            if(i === (monsters.length - 1)) {
              this.setState({
                monsters: monsters,
                monstersLoaded: true,
              });
            }
          });
        }
      } else {
        this.setState({
          monsters: null,
          monstersLoaded: true,
        });
      }
      
    });
  }
  
  /** 
   * Handles user click of the 'continue' button
   */
  handleContinueClick = () => {
    this.activateNextCombatant();
  }
  
  /** 
   * Activates the next combatant in the initiative order
   */
  activateNextCombatant = () => {
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
  
  /**
   * Determine initiative order for combatants and sort them by the results
   */
  applyInitiativeOrder = () => {
    //Collect combatants
    let combatants = [];
    const characters = this.state.characters || [];
    const monsters = this.state.monsters || [];
    for(let character of characters) {
      if(character) {
        combatants.push(character);
      }
    }
    for(let monster of monsters) {
      if(monster) {
        combatants.push(monster);
      }
    }

    //Roll initiative for each combatant
    combatants.map((combatant) => 
      this.rollInitiative(combatant)
    );
    
    //Sort combatants based on initiative rolls
    this.initiativeBubbleSort(combatants);
    return combatants;
  }
  
  /**
   * Calculates initiative for the combatant
   */
  rollInitiative(combatant) {
    let roll = Math.floor((Math.random() * 21) + 1); //Returns number in range [1,20]
    let initiativeModifier = Math.floor((combatant.DEX - 10) / 2);
    let initiative = roll + initiativeModifier;
    combatant.initiative = initiative;
  }
  
  /**
   * Sorts combatants based on initiative
   */
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
  
  /**
   * Opens the settings dialog
   */
  handleSettingsClick = () => {
    this.setState({
      openDialog: this.dialogOptions.settings,
    });
  }
  
  /**
   * Opens the combatant info dialog
   */
  handleInfoClick = (combatant) => {
    this.setState({
      infoDialogSubject: combatant,
      openDialog: this.dialogOptions.info,
    });
  }
  
  /**
   * Closes all dialogs
   */
  handleRequestClose = () => {
    this.setState({
      openDialog: this.dialogOptions.none,
    });
  }
  
  /**
   * Renders the component
   */
  render() {
    const { bgImage, orderedCombatants, activeCombatantIndex, openDialog } = this.state;

    // Show loading screen while combatants are still loading
    if(orderedCombatants == null) {
      return null; //TODO: Return loading screen
    }
    
    // Get current and next combatants' names
    const currentCombatantName = (activeCombatantIndex === -1) ? "" : orderedCombatants[activeCombatantIndex].name;
    let nextCombatantIndex = activeCombatantIndex + 1;
    if(nextCombatantIndex === orderedCombatants.length) {
      nextCombatantIndex = 0;
    }
    const nextCombatantName = orderedCombatants[nextCombatantIndex].name;
    
    // Split ordered combatants into characters and monsters for display
    let orderedCharacters = [];
    let orderedMonsters = [];
    for(let i = 0; i < orderedCombatants.length; i++) {
      const combatant = orderedCombatants[i];
      if(combatant.LVL)
        orderedCharacters.push(combatant);
      else
        orderedMonsters.push(combatant);
    }
    
    // Return page structure
    return(
      <div>
        <EncounterBackground img={bgImage}/>
        <NextCombatant 
          currentName={currentCombatantName}
          nextName={nextCombatantName}
        />
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
          open={openDialog === this.dialogOptions.settings}
          onRequestClose={this.handleRequestClose}
        />
        <CombatantDialog 
          open={openDialog === this.dialogOptions.info}
          onRequestClose={this.handleRequestClose}
          combatant={this.state.infoDialogSubject}
        />
        <EncounterScreenFooter 
          onContinueClick={this.handleContinueClick}
          onSettingsClick={this.handleSettingsClick}
        />
      </div>
    );
  }
}

//=== Styles ===
const styles = {};

//=== Apply Styles ===
export default withStyles(styles)(EncounterScreen);