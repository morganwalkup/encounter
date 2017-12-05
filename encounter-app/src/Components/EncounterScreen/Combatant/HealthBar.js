import React from 'react';
import { CircularProgress } from 'material-ui/Progress';
import { withStyles } from 'material-ui/styles';

class CombatantCircle extends React.Component {
  render() {
    const { classes } = this.props;
    
    let classNames = [];
    classNames.push(classes.healthBar);
    if(this.props.value / this.props.max > 0.5) {
      classNames.push(classes.fullHealth);
    } else if (this.props.value / this.props.max > 0.25) {
      classNames.push(classes.midHealth);
    } else {
      classNames.push(classes.lowHealth);
    }

    return (
      <CircularProgress
        mode="determinate"
        min={0}
        max={this.props.max}
        value={this.props.value}
        thickness={2.5}
        className={classNames.join(' ')}
      />
    );
  }
}

const styles = theme => ({
  healthBar: {
    height: '110% !important',
    width: '110% !important',
    position: 'absolute',
    top: '-5%',
    left: '-5%',
  },
  fullHealth: {
    color: '#69f0ae',
  },
  midHealth: {
    color: '#FFFA58',
  },
  lowHealth: {
    color: '#EE6055',
  },
});

export default withStyles(styles)(CombatantCircle);