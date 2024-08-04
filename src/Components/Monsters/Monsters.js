import React from 'react';
import { 
  getUserId,
  getAllMonsters,
  disconnectMonsters
} from '../../DatabaseFunctions/FirebaseFunctions';
import Grid from 'material-ui/Grid';
import PageHeader from '../CharactersAndMonsters/PageHeader';
import CombatantCard from '../CharactersAndMonsters/CombatantCard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ViewMonsterDialog from './ViewMonsterDialog';
import EditMonsterDialog from './EditMonsterDialog';
import DeleteMonsterDialog from './DeleteMonsterDialog';
import NewMonsterDialog from './NewMonsterDialog';
import { withStyles } from 'material-ui/styles';

class Monsters extends React.Component {
  constructor(props) {
    super(props);
    this.dialogOptions = {
      none: 'none',
      create: 'create',
      view: 'view',
      edit: 'edit',
      del: 'delete',
    };
    this.state = {
      userid: 'anonymous',
      monsters: null,
      openDialog: this.dialogOptions.none,
      selectedMonsterId: null,
      selectedMonster: null,
    };
  }
  
  /**
   * Called immedately after the component mounts
   */
  componentDidMount() {
    //Listen for user login changes
    getUserId((userId) => {
      //Link component state to character data in database
      getAllMonsters(userId, (allMonsters) => {
        this.setState({
          monsters: allMonsters
        });
      });
    });
  }
  
  /**
   * Called just before the component unmounts
   */
  componentWillUnmount() {
    //Get user id
    getUserId((userid) => {
      //Disconnect this component from the database
      disconnectMonsters(userid);
    });
  }
  
  /**
   * Handles the closing of all dialogs
   */
  handleRequestClose = () => {
    this.setState({
      openDialog: this.dialogOptions.none,
    });
  }
  
  /**
   * Handles a monster view click
   */
  handleClickView = (monsterId) => {
    this.setState({
      selectedMonsterId: monsterId,
      selectedMonster: this.getMonster(monsterId),
      openDialog: this.dialogOptions.view,
    });
  }
  
  /**
   * Handles a monster edit click
   */
  handleClickEdit = (monsterId) => {
    this.setState({
      selectedMonsterId: monsterId,
      selectedMonster: this.getMonster(monsterId),
      openDialog: this.dialogOptions.edit,
    });
  }
  
  /**
   * Handles a monster delete click
   */
  handleClickDelete = (monsterId) => {
    this.setState({
      selectedMonsterId: monsterId,
      selectedMonster: this.getMonster(monsterId),
      openDialog: this.dialogOptions.del,
    });
  }
  
  /**
   * Handles a new monster click
   */
  handleClickNew = () => {
    this.setState({
      selectedMonsterId: null,
      selectedMonster: null,
      openDialog: this.dialogOptions.new,
    });
  }
  
  /**
   * Retrieves monster with the given id
   * @param monsterId - the unique id of the desired monster
   * @return The monster with the given id, or null if no monster is found
   */
  getMonster(monsterId) {
    const monsters = this.state.monsters;
    for(let i = 0; i < monsters.length; i++) {
      if(monsters[i].id === monsterId) {
        return monsters[i];
      }
    }
  }
  
  render() {
    const { classes } = this.props;
    const { monsters, selectedMonsterId, selectedMonster } = this.state;
    
    //Generate Character Cards
    let combatantCards = [];
    if(monsters) {
      combatantCards = monsters.map(monster => 
        <Grid item xs={12} sm={6} lg={4} key={monster.id}>
          <CombatantCard 
            id={monster.id}
            imgSrc={monster.image} 
            name={monster.name} 
            onClickView={this.handleClickView}
            onClickEdit={this.handleClickEdit}
            onClickDelete={this.handleClickDelete}
          />
        </Grid>
      );
    }
    
    return (
      <div>
        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item xs={12}>
            <PageHeader 
              onClickNew={this.handleClickNew}
              title="Monsters"
              buttonText="New Monster"
            />
          </Grid>
          <Grid item xs={11} sm={12} md={11} lg={9} className={classes.cardsContainer}>
            <Grid container spacing={0}>
              {combatantCards}
            </Grid>
          </Grid>
        </Grid>
        <Hidden smUp>
          <Button fab className={classes.addButton} onClick={this.handleClickNew}>
            <AddIcon />
          </Button>
        </Hidden>
        <ViewMonsterDialog 
          monster={selectedMonster}
          open={this.state.openDialog === this.dialogOptions.view}
          onRequestClose={this.handleRequestClose}
        />
        <EditMonsterDialog 
          monsterid={selectedMonsterId}
          monster={selectedMonster}
          open={this.state.openDialog === this.dialogOptions.edit}
          onRequestClose={this.handleRequestClose}
        />
        <DeleteMonsterDialog 
          monsterid={selectedMonsterId}
          monster={selectedMonster}
          open={this.state.openDialog === this.dialogOptions.del}
          onRequestClose={this.handleRequestClose}
        />
        <NewMonsterDialog
          open={this.state.openDialog === this.dialogOptions.new}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const styles = theme => ({
  cardsContainer: {
    paddingBottom: 60,
  },
  footer: {
    alignSelf: 'flex-end',
  },
  addButton: {
    position: "fixed",
    bottom: 0,
    right: 0,
    margin: 10,
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    }
  },
});

export default withStyles(styles)(Monsters);