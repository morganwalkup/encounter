import React from 'react';
import Grid from 'material-ui/Grid';
import characters from '../../EncounterData/players.json';
import CharactersHeader from './CharactersHeader';
import CharacterCard from './CharacterCard';
import { withStyles } from 'material-ui/styles';

function Characters(props) {
  const { classes } = props;
  
  //Generate Character Cards
  const characterCards = characters.map((character) => (
    <Grid item xs={12} sm={6} lg={4} key={character.id}>
      <CharacterCard img={character.image} name={character.name}/>
    </Grid>
  ));
  
  return (
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
  );
}

const styles = theme => ({
  charCardsContainer: {
    paddingBottom: 60,
  },
  footer: {
    alignSelf: 'flex-end',
  }
});

export default withStyles(styles)(Characters);