import React from 'react';
import Grid from 'material-ui/Grid';
import HomeSplash from './HomeSplash';
import HomeInfo from './HomeInfo';
import HomeExamples from './HomeExamples';
import EncounterFooter from '../Persistent/EncounterFooter';
import { withStyles } from 'material-ui/styles';

function Home(props) {
  return(
    <div>
      <Grid container spacing={0}>
        <Grid item xs={12}>
          <HomeSplash />
        </Grid>
        <Grid item xs={12}>
          <HomeInfo />
        </Grid>
        <Grid item xs={12}>
          <HomeExamples />
        </Grid>
        <Grid item xs={12}>
          <EncounterFooter />
        </Grid>
      </Grid>
    </div>
  );
}

const styles = ({
});

export default withStyles(styles)(Home);