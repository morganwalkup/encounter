import React from 'react';
import Grid from 'material-ui/Grid';
import encounters from '../../EncounterData/encounters.json';
import PageHeader from '../CharactersAndMonsters/PageHeader';
import EncounterCard from './EncounterCard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import NewEncounterDialog from './NewEncounterDialog';
import ViewEncounterDialog from './ViewEncounterDialog';
import { withStyles } from 'material-ui/styles';

class Encounters extends React.Component {
  
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
      openDialog: this.dialogOptions.none,
    };
  }
  
  //Handles the closing of an encounter dialog
  handleRequestClose = () => {
    this.setState({
      openDialog: this.dialogOptions.none,
    });
  }
  
  //Handles an encounter "view" click
  handleClickView = () => {
    this.setState({
      openDialog: this.dialogOptions.view,
    });
  }
  
  //Handles a "new encounter" click
  handleClickNew = () => {
    this.setState({
      openDialog: this.dialogOptions.new,
    });
  }
  
  render() {
    const { classes } = this.props;
  
    //Generate Encounter Cards
    const encounterCards = encounters.map((encounter) => (
      <Grid item xs={12} sm={6} lg={4} key={encounter.id}>
        <EncounterCard 
          img={encounter.background} 
          title={encounter.title} 
          onClickView={this.handleClickView}
        />
      </Grid>
    ));
    
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
        <ViewEncounterDialog
          encounter={null}
          open={this.state.openDialog === this.dialogOptions.view}
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