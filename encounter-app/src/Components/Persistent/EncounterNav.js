import React from 'react';
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

//=== Props ===
const propTypes = {
  subtle: PropTypes.bool,
};

//=== Component ===
class EncounterNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }
  
  handleClick = () => {
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  }
  
  render() {
    const {classes, hoverOnly} = this.props;
    
    let appBarClasses = [classes.appBar];
    if(hoverOnly === true) {
      appBarClasses.push(classes.hoverOnlyAppBar);
    }
    
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
              <Button 
                color="contrast"
                component={Link}
                to="/encounters"
              >
                Encounters
              </Button>
              <Button 
                color="contrast"
                component={Link}
                to="/characters"
              >
                Characters
              </Button>
              <Button 
                color="contrast"
                component={Link}
                to="/monsters"
              >
                Monsters
              </Button>
              <Button 
                color="primary" 
                raised 
                className={classes.signUp}
                component={Link}
                to="/signup"
              >
                Sign Up!
              </Button>
            </Hidden>
            
            <Hidden mdUp>
              <IconButton color="contrast" aria-label="Menu">
                <MenuIcon onClick={this.handleClick}/>
              </IconButton>
            </Hidden>
            
          </Toolbar>
        </AppBar>
        
        <Hidden mdUp>
          <Drawer
            anchor="right"
            open={this.state.isDrawerOpen}
            onClose={this.handleClick}
          >
            <div
              tabIndex={0}
              role="button"
              onClick={this.handleClick}
              onKeyDown={this.handleClick}
            >
              <EncounterDrawerContent />
            </div>
          </Drawer>
        </Hidden>
        
      </div>
    );
  }
}

//=== Assign Props ===
EncounterNav.propTypes = propTypes;

//=== Styles ===
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
  },
  signUp: {
    marginLeft: 10,
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    }
  },
});

//=== Apply Styles ===
export default withStyles(styles)(EncounterNav);