import React from 'react';
import Grid from 'material-ui/Grid';
import ExampleBg1 from '../../images/dndphb.jpg';
import ExampleBg2 from '../../images/battlefield.jpg';
import ExampleBg3 from '../../images/battlefield2.jpg';
import ExampleBg4 from '../../images/battlefield3.jpg';
import Typography from 'material-ui/Typography';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleFilled from 'material-ui-icons/PlayCircleFilled';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeExamples(props) {
  const { classes } = props;
  return(
    <Grid container spacing={0} className={classes.examples}>
      <Grid item xs={12} >
        <Typography className={classes.tagline}>Encounter Examples</Typography>
      </Grid>
      <Grid item xs={12} className={classes.examplesContainer}>
        <Grid container justify="center" spacing={16}>
          <Grid item xs={11} md={8} >
              <div className={classes.container}>
                <GridList cellHeight={160} className={classes.gridList}>
                  <GridListTile key={ExampleBg1}>
                    <img src={ExampleBg1} alt={'Frost Giant Lair'} />
                    <GridListTileBar
                      title={"Frost Giant's Lair"}
                      subtitle={<span>Example 1</span>}
                      actionIcon={
                        <IconButton>
                          <PlayCircleFilled color="rgba(255, 255, 255, 0.54)" />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                  <GridListTile key={ExampleBg2}>
                    <img src={ExampleBg2} alt={'The HexBall Arena'} />
                    <GridListTileBar
                      title={'The HexBall Arena'}
                      subtitle={<span>Example 2</span>}
                      actionIcon={
                        <IconButton>
                          <PlayCircleFilled color="rgba(255, 255, 255, 0.54)" />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                  <GridListTile key={ExampleBg3}>
                    <img src={ExampleBg3} alt={'Moonlit Camp'} />
                    <GridListTileBar
                      title={'MoonLit Camp'}
                      subtitle={<span>Example 3</span>}
                      actionIcon={
                        <IconButton>
                          <PlayCircleFilled color="rgba(255, 255, 255, 0.54)" />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                  <GridListTile key={ExampleBg4}>
                    <img src={ExampleBg4} alt={'Crescent Cavern'} />
                    <GridListTileBar
                      title={'Crescent Cavern'}
                      subtitle={<span>Example 4</span>}
                      actionIcon={
                        <IconButton>
                          <PlayCircleFilled color="rgba(255, 255, 255, 0.54)" />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                </GridList>
              </div>
          </Grid>
        </Grid>
      </Grid>
    </Grid>
  );
}

const styles = theme => ({
  examples: {
    width: '100%',
    height: 'auto',
    minHeight: 450,
    backgroundColor: blueGrey[900],
    borderTop: 'solid thick #69f0ae',
  },
  tagline: {
    fontSize: '2em',
    color: 'white',
    margin: '25px 10px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
    textAlign: 'center',
  },
  examplesContainer: {
    marginBottom: '50px',  
  },
  container: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'center',
    overflow: 'hidden',
  },
  gridList: {
    width: '100%',
    height: 'auto',
    boxShadow: '0px 2px 5px black',
  },
});

export default withStyles(styles)(HomeExamples);