import React from 'react';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

function NameBar(props) {
    const { classes } = props;

    return (
      <div>
        <Button color='contrast' className={classes.nameButton}>
            {props.name}
        </Button>
      </div>
    );
}

const styles = theme => ({
   nameButton: {
    textTransform: 'none',
    fontSize: '1.15em',
    width: '100%',
    marginTop: '5px',
    textShadow: '0px 3px 10px rgba(0,0,0,1)',
   }
});

export default withStyles(styles)(NameBar);