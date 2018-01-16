import React from 'react';
import PropTypes from 'prop-types';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  classes: PropTypes.object.isRequired,
  label: PropTypes.string.isRequired,
  value: PropTypes.string.isRequired,
};

function StatBadge(props) {
  const { classes } = props;

  return(
    <div className={classes.badge}>
      <div className={classes.badgeValue}>
        {props.value}
      </div>
      <div className={classes.badgeLabel}>
        {props.label}
      </div>
    </div>
  );
}

StatBadge.propTypes = propTypes;

const styles = theme => ({
  badge: {
    margin: 2,
    width: '30%',
    borderRadius: '10%',
    background: theme.palette.grey[300],
    boxShadow: '0px 2px 5px rgba(0,0,0,0.8)',
    fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
  },
  badgeValue: {
    width: '100%',
    paddingTop: 5,
    textAlign: 'center',
    fontSize: '0.85em',
  },
  badgeLabel: {
    width: '100%',
    paddingTop: 0,
    paddingBottom: 4,
    textAlign: 'center',
    fontSize: '0.6em',
    color: 'grey',
    borderRadius: '0 0 10% 10%',
  },
});

export default withStyles(styles)(StatBadge);