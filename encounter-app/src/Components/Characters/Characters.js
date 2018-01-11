import React from 'react';
import * as firebase from 'firebase';
import Grid from 'material-ui/Grid';
import PageHeader from '../CharactersAndMonsters/PageHeader';
import CombatantCard from '../CharactersAndMonsters/CombatantCard';
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
      userid: 'anonymous',
      characters: null,
      openDialog: this.dialogOptions.none,
      selectedCharacterId: null,
      selectedCharacter: null,
    };
  }
  
  //Called immedately after the component mounts
  componentDidMount() {
    //Listen for user login changes
    firebase.auth().onAuthStateChanged((user) => {
      //Save user id, or 'anonymous' if no user is logged in
      this.setState({
        userid: (user) ? user.uid : 'anonymous'
      });

      //Connect this component's state to the user's characters in firebase
      const userid = this.state.userid;
      firebase.database().ref(userid + '/characters').on('value', snapshot => {
        this.setState({
          characters: snapshot.val()
        });
      });
    });
  }
  
  //Called just before the component unmounts
  componentWillUnmount() {
    //Get user id
    const userid = firebase.auth().currentUser.uid;
    //Disconnect this component's state from 'characters' in firebase
    firebase.database().ref(userid + '/characters').off();
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
      selectedCharacterId: characterId,
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.view,
    });
  }
  
  //Handles a character edit click
  handleClickEdit = (characterId) => {
    this.setState({
      selectedCharacterId: characterId,
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.edit,
    });
  }
  
  //Handles a character delete click
  handleClickDelete = (characterId) => {
    this.setState({
      selectedCharacterId: characterId,
      selectedCharacter: this.getCharacter(characterId),
      openDialog: this.dialogOptions.del,
    });
  }
  
  //Handles a new character click
  handleClickNew = () => {
    this.setState({
      selectedCharacterId: null,
      selectedCharacter: null,
      openDialog: this.dialogOptions.new,
    });
  }
  
  //Returns a character whose id matches the given index,
  //returns null if the character is not found
  getCharacter(characterId) {
    return this.state.characters[characterId];
  }
  
  render() {
    const { classes } = this.props;
    const characters = this.state.characters;
  
    //Generate Character Cards
    let CombatantCards = [];
    for(var id in characters) {
      let character = characters[id];
      CombatantCards.push(
        <Grid item xs={12} sm={6} lg={4} key={id}>
          <CombatantCard 
            id={id}
            imgSrc={character.image} 
            name={character.name} 
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
              title="Characters"
              buttonText="New Character"
            />
          </Grid>
          <Grid item xs={11} sm={12} md={11} lg={9} className={classes.charCardsContainer}>
            <Grid container spacing={0}>
              {CombatantCards}
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
          characterid={this.state.selectedCharacterId}
          character={this.state.selectedCharacter}
          open={this.state.openDialog === this.dialogOptions.edit}
          onRequestClose={this.handleRequestClose}
        />
        <DeleteCharacterDialog 
          characterid={this.state.selectedCharacterId}
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