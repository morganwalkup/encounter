import React from 'react';
import {
  getUserId,
  getMostRecentUserId,
  getAllEncounters,
  disconnectEncounters
} from '../../DatabaseFunctions/FirebaseFunctions';
import Grid from 'material-ui/Grid';
import PageHeader from '../CharactersAndMonsters/PageHeader';
import EncounterCard from './EncounterCard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import NewEncounterDialog from './NewEncounterDialog';
import EditEncounterDialog from './EditEncounterDialog';
import DeleteEncounterDialog from './DeleteEncounterDialog';
import { withStyles } from 'material-ui/styles';

class Encounters extends React.Component {
  constructor(props) {
    super(props);
    this.dialogOptions = {
      none: 0,
      create: 1,
      view: 2,
      edit: 3,
      del: 4,
    };
    this.state = {
      encounters: null,
      selectedEncounterId: null,
      selectedEncounter: null,
      openDialog: this.dialogOptions.none,
    };
  }
  
  /**
   * Called immediately after the component mounts
   */
  componentDidMount() {
    getUserId((userid) => {
      getAllEncounters(userid, (allEncounters) => {
        this.setState({
          encounters: allEncounters
        });
      });
    });
  }
  
  /**
   * Called prior to component unmounting
   */
  componentWillUnmount() {
    getUserId((userid) => {
      disconnectEncounters(userid);
    });
  }
  
  /**
   * Handles the closing of an encounter dialog
   */
  handleRequestClose = () => {
    this.setState({
      openDialog: this.dialogOptions.none,
    });
  }
  
  /**
   * Handles a "new encounter" click
   */
  handleClickNew = () => {
    this.setState({
      openDialog: this.dialogOptions.new,
    });
  }
  
  /**
   * Handles an encounter "edit" click
   */
  handleClickEdit = (encounterid) => {
    const encounter = this.state.encounters[encounterid];
    this.setState({
      selectedEncounterId: encounterid,
      selectedEncounter: encounter,
      openDialog: this.dialogOptions.edit,
    });
  }
  
  /**
   * Handles an encounter "delete" click
   */
  handleClickDelete = (encounterid) => {
    const encounter = this.state.encounters[encounterid];
    this.setState({
      selectedEncounterId: encounterid,
      selectedEncounter: encounter,
      openDialog: this.dialogOptions.del,
    });
  }
  
  render() {
    const { classes } = this.props;
    const { encounters } = this.state;
  
    //Generate Encounter Cards
    let encounterCards = [];
    const userid = getMostRecentUserId();
    for(var id in encounters) {
      let encounter = encounters[id];
      encounterCards.push(
        <Grid item xs={12} sm={6} lg={4} key={id}>
          <EncounterCard 
            userid={userid}
            id={id}
            img={encounter.image} 
            title={encounter.title} 
            description={encounter.description}
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
              title="Encounters"
              buttonText="New Encounter"
              onClickNew={this.handleClickNew}
            />
          </Grid>
          <Grid item xs={11} sm={11} lg={9} className={classes.encounterCardsContainer}>
            <Grid container spacing={0}>
              {encounterCards}
            </Grid>
          </Grid>
        </Grid>
        <Hidden smUp>
          <Button fab onClick={this.handleClickNew} className={classes.addButton}>
            <AddIcon />
          </Button>
        </Hidden>
        <NewEncounterDialog 
          open={this.state.openDialog === this.dialogOptions.new}
          onRequestClose={this.handleRequestClose}
        />
        <EditEncounterDialog
          id={this.state.selectedEncounterId}
          encounter={this.state.selectedEncounter}
          open={this.state.openDialog === this.dialogOptions.edit}
          onRequestClose={this.handleRequestClose}
        />
        <DeleteEncounterDialog
          id={this.state.selectedEncounterId}
          encounter={this.state.selectedEncounter}
          open={this.state.openDialog === this.dialogOptions.del}
          onRequestClose={this.handleRequestClose}
        />
      </div>
    );
  }
}

const styles = theme => ({
  encounterCardsContainer: {
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

export default withStyles(styles)(Encounters);