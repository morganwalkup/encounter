import React from 'react';
import Grid from 'material-ui/Grid';
import characters from '../../EncounterData/players.json';
import CharactersHeader from './CharactersHeader';
import CharacterCard from './CharacterCard';
import Hidden from 'material-ui/Hidden';
import Button from 'material-ui/Button';
import AddIcon from 'material-ui-icons/Add';
import ViewCharacterDialog from './ViewCharacterDialog';
import EditCharacterDialog from './EditCharacterDialog';
import DeleteCharacterDialog from './DeleteCharacterDialog';
import NewCharacterDialog from './NewCharacterDialog';
import { withStyles } from 'material-ui/styles';

class Characters extends React.Component {
  
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
      selectedCharacter: characters[0],
    };
  }
  
  //Handles the closing of all dialogs
  handleRequestClose = () => {
    this.setState({
      openDialog: this.dialogOptions.none,
    });
  }
  
  //Handles a character view click
  handleClickView = (characterId) => {
    this.setState({
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.view,
    });
  }
  
  //Handles a character edit click
  handleClickEdit = (characterId) => {
    this.setState({
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.edit,
    });
  }
  
  //Handles a character delete click
  handleClickDelete = (characterId) => {
    this.setState({
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.del,
    });
  }
  
  //Handles a new character click
  handleClickNew = () => {
    this.setState({
      openDialog: this.dialogOptions.new,
    });
  }
  
  //Returns a character whose id matches the given index
  //Returns null if the character is not found
  getCharacter(characterId) {
    for(let i = 0; i < characters.length; i++) {
      if(characters[i].id === characterId) {
        return characters[i];
      }
    }
    return null;
  }
  
  render() {
    const { classes } = this.props;
  
    //Generate Character Cards
    const characterCards = characters.map((character) => (
      <Grid item xs={12} sm={6} lg={4} key={character.id}>
        <CharacterCard 
          id={character.id}
          img={character.image} 
          name={character.name} 
          onClickView={this.handleClickView}
          onClickEdit={this.handleClickEdit}
          onClickDelete={this.handleClickDelete}
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
          <Button fab className={classes.addButton} onClick={this.handleClickNew}>
            <AddIcon />
          </Button>
        </Hidden>
        <ViewCharacterDialog 
          character={this.state.selectedCharacter}
          open={this.state.openDialog === this.dialogOptions.view}
          onRequestClose={this.handleRequestClose}
        />
        <EditCharacterDialog 
          character={this.state.selectedCharacter}
          open={this.state.openDialog === this.dialogOptions.edit}
          onRequestClose={this.handleRequestClose}
        />
        <DeleteCharacterDialog 
          character={this.state.selectedCharacter}
          open={this.state.openDialog === this.dialogOptions.del}
          onRequestClose={this.handleRequestClose}
        />
        <NewCharacterDialog
          open={this.state.openDialog === this.dialogOptions.new}
          onRequestClose={this.handleRequestClose}
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