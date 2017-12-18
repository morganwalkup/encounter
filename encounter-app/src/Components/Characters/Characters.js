import React from 'react';
import Grid from 'material-ui/Grid';
import characters from '../../EncounterData/players.json';
import CharactersHeader from './CharactersHeader';
import CharacterCard from './CharacterCard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import CharacterDialog from './CharacterDialog';
import { withStyles } from 'material-ui/styles';

class Characters extends React.Component {
  
  constructor(props) {
    super(props);
    this.state = {
      isCharacterDialogOpen: false,
    };
  }
  
  //Handles the closing of a character dialog
  handleRequestClose = () => {
    this.setState({
      isCharacterDialogOpen: false,
    });
  }
  
  //Handles a character view click
  handleClickView = () => {
    this.setState({
      isCharacterDialogOpen: true,
    });
  }
  
  render() {
    const { classes } = this.props;
  
    //Generate Character Cards
    const characterCards = characters.map((character) => (
      <Grid item xs={12} sm={6} lg={4} key={character.id}>
        <CharacterCard 
          img={character.image} 
          name={character.name} 
          onClickView={this.handleClickView}
        />
      </Grid>
    ));
    
    return (
      <div>
        <Grid container direction="row" justify="center" spacing={0}>
          <Grid item xs={12}>
            <CharactersHeader />
          </Grid>
          <Grid item xs={11} sm={11} lg={9} className={classes.charCardsContainer}>
            <Grid container spacing={0}>
              {characterCards}
            </Grid>
          </Grid>
        </Grid>
        <Hidden smUp>
          <Button fab className={classes.addButton}>
            <AddIcon />
          </Button>
        </Hidden>
        <CharacterDialog 
          open={this.state.isCharacterDialogOpen}
          onRequestClose={this.handleRequestClose}
          combatant={characters[0]}
        />
      </div>
    );
  }
}

const styles = theme => ({
  charCardsContainer: {
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

export default withStyles(styles)(Characters);