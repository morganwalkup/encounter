import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

const propTypes = {
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  onClickView: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

class card extends React.Component {
  
  handleClickView = () => {
    this.props.onClickView();
  }
  
  render() {
    const { classes, img, title } = this.props;
    const src = require('../../images/' + img);
    
    return(
      <Grid container justify="center">
        <Grid item xs={12} className={classes.cardContainer}>
          <div className={classes.card}>
            <div className={classes.cardTop}>
              <img src={src} alt={img} className={classes.cardImage}/>
            </div>
            <Grid container alignItems="center" spacing={0} className={classes.cardInfo}>
              <Grid item xs={9}>
                <Typography 
                  type="title" 
                  color="inherit"
                >
                  {title}
                </Typography>
                <Typography 
                  type="subheading" 
                  color="inherit"
                >
                  Description
                </Typography>
              </Grid>
              <Grid item xs={3}>
                <Button 
                  dense 
                  raised
                  className={classes.playButton} 
                >
                  Play
                </Button>
              </Grid>
            </Grid>
            <div className={classes.cardActions}>
              <Button 
                dense 
                className={classes.cardButton} 
                onClick={this.handleClickView}
              >
                View
              </Button>
              <Button 
                dense 
                className={classes.cardButton}
              >
                Edit
              </Button>
              <Button 
                dense 
                color="accent" 
                className={classes.cardButton}
              >
                Delete
              </Button>
            </div>
            
          </div>
        </Grid>
      </Grid>
    );
  }
}

card.propTypes = propTypes;

const styles = theme => ({
  cardContainer: {
    marginTop: 25,
  },
  card: {
    position: 'relative',
    width: '94%',
    margin: 'auto',
    marginBottom: 25,
    borderRadius: '5px 5px 3px 3px',
    boxSizing: 'border-box',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.4)',
  },
  cardTop: {
    position: 'relative',
    height: 150,
    overflow: 'hidden',
    backgroundColor: blueGrey[900],
  },
  cardImage: {
    width: '100%',
    height: 'auto',
  },
  cardInfo: {
    boxSizing: 'border-box',
    position: 'absolute',
    top: 90,
    height: 60,
    width: '100%',
    paddingLeft: 10,
    overflow: 'none',
    color: 'white',
    backgroundColor: 'rgba(0,0,0,0.5)',
  },
  cardActions: {
    display: 'flex',
    justifyContent: 'space-around',
    padding: 4,
  },
  playButton: {
    float: 'right',
    marginRight: 10,
  },
  cardButton: {
    minWidth: 0,
  },
});

export default withStyles(styles)(card);