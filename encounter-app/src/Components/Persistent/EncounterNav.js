import React from 'react';
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

class EncounterNav extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      isDrawerOpen: false,
    };
  }
  
  handleCLick = () => {
    this.setState(prevState => ({
      isDrawerOpen: !prevState.isDrawerOpen,
    }));
  }
  
  render() {
    const {classes, subtle} = this.props;
    
    let appBarClasses = [classes.appBar];
    if(subtle) {
      appBarClasses.push(classes.hiddenAppBar);
    }
    
    return (
      <div>
        <AppBar className={appBarClasses.join(' ')}>
          <Toolbar>
            <Typography type="title" color="inherit" className={classes.title}>
              Encounter!
            </Typography>
            <Hidden smDown>
              <Button color='contrast'>Encounters</Button>
              <Button color='contrast'>Characters</Button>
              <Button color='contrast'>Monsters</Button>
              <Button color='primary' raised className={classes.signUp}>
                Sign Up!
              </Button>
            </Hidden>
            <Hidden mdUp>
              <IconButton color="contrast" aria-label="Menu">
                <MenuIcon onClick={this.handleCLick}/>
              </IconButton>
            </Hidden>
          </Toolbar>
        </AppBar>
        <Hidden mdUp>
          <Drawer
            anchor="right"
            open={this.state.isDrawerOpen}
            onRequestClose={this.handleCLick}
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

const styles = theme => ({
  appBar: {
    backgroundColor: blueGrey[900],
  },
  hiddenAppBar: {
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

export default withStyles(styles)(EncounterNav);