import React from 'react';
import PropTypes from 'prop-types';
import {
  getUserId,
  getAllCharacters,
  disconnectCharacters
} from '../../../DatabaseFunctions/FirebaseFunctions';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CombatantTable from './CombatantTable';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  selectedCharacterIds: PropTypes.array,
  onCharacterSelect: PropTypes.func,
};

class CharacterSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      characters: null,
      selectedCharacterIndices: null
    };
  }
  
  /**
   * Called immediately after the component mounts
   */
  componentDidMount() {
    getUserId((userid) => {
       getAllCharacters(userid, (allCharacters) => {
         //Get selected character indices
         const ids = this.props.selectedCharacterIds;
         let indices = [];
         if(ids != null) {
           let charIndex = 0;
           for(let i = 0; i < ids.length; i++) {
             charIndex = 0;
             for(let id in allCharacters) {
               if(ids[i] === id) {
                 indices.push(charIndex);
               }
               charIndex = charIndex + 1;
             }
           }
         }
         //Save characters and selected indices
         this.setState({
           characters: allCharacters,
           selectedCharacterIndices: indices, 
         });
       });
    });
  }
  
  /**
   * Called prior to component unmounting
   */
  componentWillUnmount() {
    getUserId((userid) => {
      disconnectCharacters(userid);
    });
  }
  
  /**
   * Handles a change in the selection of characters within the CombatantTable
   * @param selectedIndices - array of indices for the selected character rows
   */
  handleSelectionChange = (selectedIndices) => {
    //Save selected character indices
    this.setState({
      selectedCharacterIndices: selectedIndices
    });
    //Send character ids to parent component
    const selectedCharacterIds = selectedIndices.map((index) => {
      return Object.keys(this.state.characters)[index]; 
    });
    this.props.onCharacterSelect(selectedCharacterIds);
  }
  
  render() {
    const { classes } = this.props;
    const { characters, selectedCharacterIndices } = this.state;
    
    //Structure character data into rows for CombatantTable
    let characterRows = [];
    for(let id in characters) {
      characterRows.push(characters[id]);
    }
    
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} md={10} lg={8}>
          <Typography 
            type="body2"
            className={classes.stepLabel}
          >
            Select Characters:
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <CombatantTable 
            isCharacterTable
            combatants={characterRows}
            selectedCombatants={selectedCharacterIndices}
            onSelectionChange={this.handleSelectionChange}
          />
        </Grid>
      </Grid>
    );
  }
}

CharacterSelection.propTypes = propTypes;

const styles = {
  gridContainer: {
    width: '100%',
  },
  stepLabel: {
    marginTop: 20,
    marginBottom: 20,
  }
};

export default withStyles(styles)(CharacterSelection);
