import React from 'react';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import ExampleBg1 from '../../images/dndphb.jpg';
import ExampleBg2 from '../../images/battlefield.jpg';
import ExampleBg3 from '../../images/battlefield2.jpg';
import ExampleBg4 from '../../images/battlefield3.jpg';
import Typography from 'material-ui/Typography';
import { GridList, GridListTile, GridListTileBar } from 'material-ui/GridList';
import IconButton from 'material-ui/IconButton';
import PlayCircleFilled from 'material-ui-icons/PlayCircleFilled';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

function HomeExamples(props) {
  const { classes } = props;
  
  const exampleEncounters = [
    {
      bg: ExampleBg1,
      title: 'Frost Giant\'s Lair',
      subtitle: 'Example 1',
      link: '/playencounter/anonymous/-L2w26doG8h7187XOw5W',
    },
    {
      bg: ExampleBg2,
      title: 'Moonball Arena',
      subtitle: 'Example 2',
      link: '/playencounter/anonymous/-L2w2P4q-IKXPMyfMf1V',
    },
    {
      bg: ExampleBg3,
      title: 'Moonlit Night',
      subtitle: 'Example 3',
      link: '/playencounter/anonymous/-L2wSJj56TNpUaS1FyPf',
    },
    {
      bg: ExampleBg4,
      title: 'Crescent Cavern',
      subtitle: 'Example 4',
      link: '/playencounter/anonymous/-L2wSRYyAwEziXvV1Sx5',
    }
  ];
  
  return(
    <Grid container spacing={0} className={classes.examples}>
      <Grid item xs={12} >
        <Typography className={classes.tagline}>Encounter Examples</Typography>
      </Grid>
      <Grid item xs={12} className={classes.examplesContainer}>
        <Grid container justify="center" spacing={0}>
          <Grid item xs={11} md={8} >
              <div className={classes.container}>
                <GridList cellHeight={160} className={classes.gridList}>
                
                { exampleEncounters.map((example) => (
                  <GridListTile key={example.bg}>
                    <img src={example.bg} alt={example.title} />
                    <GridListTileBar
                      title={example.title}
                      subtitle={example.subtitle}
                      actionIcon={
                        <IconButton
                          component={Link}
                          to={example.link}
                        >
                          <PlayCircleFilled color="contrast" />
                        </IconButton>
                      }
                    />
                  </GridListTile>
                ))}
                
                </GridList>
              </div>
          </Grid>
        </Grid>
      </Grid>
      <Grid item xs={12}>
        <Button 
          raised 
          component={Link}
          to="/encounters"
          className={classes.buildButton}
        >
          Build your own!
        </Button>
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
  },
  tagline: {
    fontSize: '2em',
    fontWeight: 'bold',
    letterSpacing: '1px',
    color: 'white',
    margin: '25px 10px',
    textShadow: '0px 2px 5px rgba(0,0,0,1)',
    textAlign: 'center',
  },
  examplesContainer: {
    marginBottom: '10px',  
  },
  buildButton: {
    display: 'block',
    width: 160,
    margin: '0 auto',
    marginBottom: '50px',
    textAlign: 'center',
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