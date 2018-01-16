import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';

const propTypes = {
  userid: PropTypes.string.isRequired,
  id: PropTypes.string.isRequired,
  img: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  description: PropTypes.string.isRequired,
  onClickEdit: PropTypes.func,
  onClickDelete: PropTypes.func,
};

class card extends React.Component {
  
  /** 
   * Handles user click of the "view" button
   */
  handleClickView = () => {
    this.props.onClickView();
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
    const { classes, img, title, userid, id } = this.props;

    return(
      <Grid container justify="center">
        <Grid item xs={12} className={classes.cardContainer}>
          <div className={classes.card}>
            <div className={classes.cardTop}>
              <img src={img} alt={""} className={classes.cardImage}/>
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
                  {this.props.description}
                </Typography>
              </Grid>
              {/*<Grid item xs={3}>
                <Button 
                  dense 
                  raised
                  component={Link}
                  to={"/playencounter/" + userid + "/" + id}
                  className={classes.playButton} 
                >
                  Play
                </Button>
              </Grid>*/}
            </Grid>
            <div className={classes.cardActions}>
              <Button 
                dense 
                component={Link}
                to={"/playencounter/" + userid + "/" + id}
                className={classes.cardButton} 
              >
                Play
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