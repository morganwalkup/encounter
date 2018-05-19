import React from 'react';
import { 
  getUserId,
  signOutUser,
} from '../../DatabaseFunctions/FirebaseFunctions';   
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import AppBar from 'material-ui/AppBar';
import Toolbar from 'material-ui/Toolbar';
import Typography from 'material-ui/Typography';
import Button from 'material-ui/Button';
import IconButton from 'material-ui/IconButton';
import MenuIcon from 'material-ui-icons/Menu';
import Drawer from 'material-ui/Drawer';
import EncounterDrawerContent from './EncounterDrawerContent';
import Hidden from 'material-ui/Hidden';
import { blueGrey } from 'material-ui/colors';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  subtle: PropTypes.bool,
};

class EncounterNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
      isUserSignedIn: false,
    };
  }
  
  /**
   * Called when the component mounts
   */
  componentDidMount() {
    //Set up user login listener
    getUserId((userid) => {
      this.setState({
        isUserSignedIn: (userid !== 'anonymous')
      });
    });
  }
  
  /**
   * Handles user click of the menu button (only visible on smaller screens)
   */
  handleMenuClick = () => {
    console.log("Menu clicked!");
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  }
  
  /**
   * Handles close request from nav drawer
   */
  handleClose = () => {
    this.setState(prevState => ({
      isDrawerOpen: false,
    }));
  }
  
  /**
   * Handles click of the "sign out" button by user
   */
  handleSignOut = () => {
    signOutUser();
  }
  
  render() {
    const { classes, hoverOnly } = this.props;
    const { isUserSignedIn } = this.state;
    
    //Conditionally apply styling
    let appBarClasses = [classes.appBar];
    if(hoverOnly === true) {
      appBarClasses.push(classes.hoverOnlyAppBar);
    }
    
    //Display "sign up" or "sign out" buttons depending on user login state
    let authenticationButton;
    if(isUserSignedIn) {
      authenticationButton = (
        <Button 
          raised 
          className={classes.signOut}
          onClick={this.handleSignOut}
          component={Link}
          to="/"
        >
          Sign Out
        </Button>
      );
    } else {
      authenticationButton = (
        <Button 
          color="primary" 
          raised 
          className={classes.signUp}
          component={Link}
          to="/signup"
        >
          Sign Up!
        </Button>
      );
    }
    
    //Display or hide encounter/character/monster links depending on user login state
    let siteLinks = [];
    if(isUserSignedIn) {
      siteLinks.push(
        <Button 
          color="contrast"
          component={Link}
          to="/encounters"
        >
          Encounters
        </Button>
      );
      siteLinks.push(
        <Button 
          color="contrast"
          component={Link}
          to="/characters"
        >
          Characters
        </Button>
      );
      siteLinks.push(
        <Button 
          color="contrast"
          component={Link}
          to="/monsters"
        >
          Monsters
        </Button>
      );
    }
    
    //Return component
    return (
      <div>
        <AppBar className={appBarClasses.join(' ')}>
          <Toolbar>
            <Typography 
              type="title" 
              color="inherit" 
              className={classes.title}
              component={Link}
              to="/"
            >
              Encounter!
            </Typography>

            <Hidden smDown>
              {siteLinks}
              {authenticationButton}
            </Hidden>
            
            <Hidden mdUp>
              <IconButton color="contrast" aria-label="Menu" onClick={this.handleMenuClick}>
                <MenuIcon/>
              </IconButton>
            </Hidden>
            
          </Toolbar>
        </AppBar>
        
        <Hidden mdUp>
          <Drawer
            anchor="right"
            open={this.state.isDrawerOpen}
            onClose={this.handleClose}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.handleClose}
              onKeyDown={this.handleClose}
            >
              <EncounterDrawerContent 
                isUserSignedIn={isUserSignedIn}
                onSignOut={this.handleSignOut}
              />
            </div>
          </Drawer>
        </Hidden>
        
      </div>
    );
  }
}

EncounterNav.propTypes = propTypes;

const styles = theme => ({
  appBar: {
    backgroundColor: blueGrey[900],
  },
  hoverOnlyAppBar: {
    opacity: 0,
    transition: 'opacity 0.4s',
    '&:hover': {
      opacity: 1.0,
    },
  },
  title: {
    flex: 1,
    textDecoration: 'none',
  },
  signUp: {
    marginLeft: 10,
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    }
  },
  signOut: {
    marginLeft: 10,
  }
});

export default withStyles(styles)(EncounterNav);