import React from 'react';
import PropTypes from 'prop-types';
import {
  getUserId,
  getAllMonsters,
  disconnectMonsters
} from '../../../DatabaseFunctions/FirebaseFunctions';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import CombatantTable from './CombatantTable';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  selectedMonsterIds: PropTypes.array,
  onMonsterSelect: PropTypes.func,
};

class MonsterSelection extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      monsters: null,
      selectedMonsterIndices: null
    };
  }
  
  /**
   * Called immediately after the component mounts
   */
  componentDidMount() {
    getUserId((userid) => {
       getAllMonsters(userid, (allMonsters) => {
         //Get selected monster indices
         const ids = this.props.selectedMonsterIds;
         let indices = [];
         if(ids != null) {
           let charIndex = 0;
           for(let i = 0; i < ids.length; i++) {
             charIndex = 0;
             for(let id in allMonsters) {
               if(ids[i] === id) {
                 indices.push(charIndex);
               }
               charIndex = charIndex + 1;
             }
           }
         }
         //Save monsters and selected indices
         this.setState({
           monsters: allMonsters,
           selectedMonsterIndices: indices, 
         });
       });
    });
  }
  
  /**
   * Called prior to component unmounting
   */
  componentWillUnmount() {
    getUserId((userid) => {
      disconnectMonsters(userid);
    });
  }
  
  /**
   * Handles a change in the selection of monsters within the CombatantTable
   * @param selectedIndices - array of indices for the selected monster rows
   */
  handleSelectionChange = (selection) => {
    //Save selected monster indices
    this.setState({
      selectedMonsterIndices: selection
    });
    //Send monster ids to parent component
    const selectedMonsterIds = selection.map((index) => {
      return Object.keys(this.state.monsters)[index]; 
    });
    this.props.onMonsterSelect(selectedMonsterIds);
  }
  
  render() {
    const { classes } = this.props;
    const { monsters, selectedMonsterIndices } = this.state;
    
    //Structure character data into rows for CombatantTable
    let monsterRows = [];
    for(let id in monsters) {
      monsterRows.push(monsters[id]);
    }
    
    return (
      <Grid container spacing={0} justify="center">
        <Grid item xs={12} md={10} lg={8}>
          <Typography 
            type="body2"
            className={classes.stepLabel}
          >
            Select Monsters:
          </Typography>
        </Grid>
        <Grid item xs={12} md={10} lg={8}>
          <CombatantTable 
            combatants={monsterRows}
            selectedCombatants={selectedMonsterIndices}
            onSelectionChange={this.handleSelectionChange}
          />
        </Grid>
      </Grid>
    );
  }
}

MonsterSelection.propTypes = propTypes;

const styles = {
  gridContainer: {
    width: '100%',
  },
  stepLabel: {
    marginTop: 20,
    marginBottom: 20,
  }
};

export default withStyles(styles)(MonsterSelection);
