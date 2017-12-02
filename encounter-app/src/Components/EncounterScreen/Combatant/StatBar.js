import React from 'react';
import PropTypes from 'prop-types';
import StatBadge from './StatBadge';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

function StatBar(props) {
  const { classes } = props;

  return(
    <div className={classes.stats}> 
      <StatBadge value={props.initiative} label='ITV' />
      <StatBadge value={props.speed} label='SPD' />
      <StatBadge value={props.armorClass} label='AC' />
      <Button 
        raised 
        className={classes.statBtn}
      >STATS</Button>
    </div>
  );
}

StatBar.propTypes = {
  classes: PropTypes.object.isRequired,
};

const styles = theme => ({
  stats: {
    width: '90%',
    position: 'relative',
    margin: '-20% 5% 0 5%',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
  statBtn: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%',
    opacity: '0',
    '&:hover': {
      //opacity: '1.0',
    }
  },
});

export default withStyles(styles)(StatBar);