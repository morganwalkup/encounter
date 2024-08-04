import React from 'react';
import PropTypes from 'prop-types';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

const propTypes = {
  imgSrc: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  onClickView: PropTypes.func,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

class CombatantCard extends React.Component {
  
  /**
   * Handles user click of the "view" button
   */
  handleClickView = () => {
    this.props.onClickView(this.props.id);
  }
  
  /**
   * Handles user click of the "edit" button
   */
  handleClickEdit = () => {
    this.props.onClickEdit(this.props.id);
  }
  
  /**
   * Handles user click of the "delete" button
   */
  handleClickDelete = () => {
    this.props.onClickDelete(this.props.id);
  }
  
  render() {
    const { classes, imgSrc, name } = this.props;

    return(
      <Grid container justify="center" spacing={0}>
        <Grid item xs={12} className={classes.cardContainer}>
          <div className={classes.card}>
            <div className={classes.avatarCircle}>
              <img className={classes.avatar} src={imgSrc} alt={""} />
            </div>
            <Typography type="title" component="h2" className={classes.cardTitle}>
              {name}
            </Typography>
            
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
                onClick={this.handleClickEdit}
              >
                Edit
              </Button>
              <Button 
                dense 
                color="accent" 
                className={classes.cardButton}
                onClick={this.handleClickDelete}
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

CombatantCard.propTypes = propTypes;

const styles = theme => ({
  cardContainer: {
    marginTop: 25,
  },
  card: {
    position: 'relative',
    width: '94%',
    minWidth: 290,
    margin: 'auto',
    marginBottom: 25,
    paddingLeft: 45,
    borderRadius: '5px 5px 3px 3px',
    boxSizing: 'border-box',
  },
  cardTitle: {
    color: 'white',
    fontWeight: 'bold',
    backgroundColor: blueGrey[900],
    padding: 10,
    paddingLeft: 75,
    borderRadius: '3px 3px 0 0',
    boxShadow: '0px 2px 3px rgba(0,0,0,0.4)',
  },
  cardActions: {
    padding: 4,
    paddingLeft: 70,
    marginRight: 3,
    boxShadow: '0px 2px 3px rgba(0,0,0,0.4)',
  },
  cardButton: {
    minWidth: 0,
  },
  avatarCircle: {
    position: 'absolute',
    top: -5,
    left: 0,
    height: 105,
    width: 105,
    borderRadius: '50%',
    border: 'solid thick',
    borderColor: blueGrey[900],
    boxShadow: '0px 2px 3px rgba(0,0,0,0.4)',
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: '50%',
    border: 'solid thick #69f0ae',
    backgroundColor: blueGrey[900],
  },
});

export default withStyles(styles)(CombatantCard);