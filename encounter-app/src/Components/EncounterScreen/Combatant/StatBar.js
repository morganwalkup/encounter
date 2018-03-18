import React from 'react';
import PropTypes from 'prop-types';
import StatBadge from './StatBadge';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  classes: PropTypes.object.isRequired,
  currentHP: PropTypes.string,
  initiative: PropTypes.string,
  speed: PropTypes.string,
  armorClass: PropTypes.string,
};

function StatBar(props) {
  const { classes } = props;

  return(
    <div className={classes.stats}> 
      {/*<StatBadge value={props.initiative} label='ITV' />*/}
      <StatBadge value={props.speed} label='SPD' />
      <StatBadge value={props.currentHP} label='HP' />
      <StatBadge value={props.armorClass} label='AC' />
    </div>
  );
}

StatBar.propTypes = propTypes;

const styles = theme => ({
  stats: {
    width: '90%',
    position: 'relative',
    margin: '-20% 5% 0 5%',
    display: 'flex', 
    justifyContent: 'center', 
    alignItems: 'center',
  },
});

export default withStyles(styles)(StatBar);