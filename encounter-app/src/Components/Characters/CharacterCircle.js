import React from 'react';
import { withStyles } from 'material-ui/styles';

class CharacterCircle extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      maxHealth: props.hitPoints,
      health: props.hitPoints,
    };
  }
  
  
  render() {
    const { classes, img } = this.props;
    
    let imgPath = require('../../images/combatants/' + img);
    
    return (
      <div className={classes.combatantCircle}>
        <img className={classes.avatar} src={imgPath} alt={img} />
      </div>
    );
  }
}

const styles = {
  combatantCircle: {
    margin: 0,
    height: '100px',
    width: '100px',
    borderRadius: '50%',
    background: 'none',
  },
  avatar: {
    height: '100%',
    width: '100%',
    borderRadius: '50%',
  },
};

export default withStyles(styles)(CharacterCircle);