import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         updateMonster,
         updateMonsterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions'; 
import Dialog, { DialogContent } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  monsterid: PropTypes.string,
  monster: PropTypes.object,
};

class EditMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      image: null,
      monster: Object.assign({}, props.monster)
    };
  }
  
  // Called when the component receives new props
  componentWillReceiveProps(nextProps) {
    if(nextProps !== this.props) {
      this.setState({
        image: null,
        monster: Object.assign({}, nextProps.monster)
      });
    }
  }
  
  // Callback for AvatarUpload
  // Saves file reference in state
  // file: the new image file provided by AvatarUpload
  handleImageChange = (imageFile) => {
    this.setState({
      image: imageFile,
    });
  }
  
  // Callback for textfield input,
  // Updates monster data in component state
  handleChange = (fieldName) => (event) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = event.target.value;
    this.setState({
      monster: monsterObj,
    });
  }
  
  // Callback for dialog close request
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  // Callback for 'SAVE' click,
  // Saves altered monster data to firebase and closes the dialog
  handleSave = () => {
    getUserId((userid) => {
      const imageFile = this.state.image;
      if(imageFile == null) {
        
        // Update monster data in database immediately
        updateMonster(userid, this.props.monsterid, this.state.monster);
        // Close the dialog
        this.handleRequestClose();
        
      } else {
        
        // Upload monster image and update monster in database
        const imageUpload = updateMonsterWithImage(userid, this.props.monsterid, this.state.monster, imageFile);
        imageUpload.on('state_changed', null, null, () => {
          // Close the dialog
          this.handleRequestClose();
        });

      }
    });
  }
  
  // Callback for "CANCEL" click
  // Discards changes and closes the dialog
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  // Renders the component
  render() {
    const { classes, } = this.props;
    const monster = this.state.monster;

    //Catch null monster
    if(monster === null) {
      return (
        <Dialog open={this.props.open}>
          <DialogContent>
            <h2>Monster not found</h2>
          </DialogContent>
        </Dialog>
      );
    }
    
    //Get initial avatar url for AvatarUpload
    let initialAvatarUrl = null;
    if(monster.image != null) {
      initialAvatarUrl = monster.image;
    }
    
    //Generate visuals for monster stats
    const statValues = [
      {
        name: 'LVL',
        value: monster.LVL
      },
      {
        name: 'AC',
        value: monster.AC
      },
      {
        name: 'HP',
        value: monster.HP
      },
      {
        name: 'SPD',
        value: monster.SPD
      }
    ];
    const stats = statValues.map((stat) => (
      <div className={classes.stat} key={stat.name}>
        <TextField
          required
          type="number"
          label={stat.name}
          defaultValue={stat.value}
          className={classes.textField}
          onChange={this.handleChange(stat.name)}
        />
      </div>
    ));
    
    //Generate visuals for monster ability scores
    const abilityScoreValues = [
      {
        name: 'STR',
        value: monster.STR
      },
      {
        name: 'DEX',
        value: monster.DEX
      },
      {
        name: 'CON',
        value: monster.CON
      },
      {
        name: 'INT',
        value: monster.INT
      },
      {
        name: 'WIS',
        value: monster.WIS
      },
      {
        name: 'CHA',
        value: monster.CHA
      }
    ];
    const abilityScores = abilityScoreValues.map((score) => (
      <div className={classes.abilityScore} key={score.name}>
        <TextField
          required
          type="number"
          label={score.name}
          defaultValue={score.value}
          className={classes.textField}
          onChange={this.handleChange(score.name)}
        />
      </div>
    ));
    
    return (
      <CRUDDialog 
        title="Edit Monster"
        action="update"
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
      >

        <div className={classes.topSection}>
          <AvatarUpload 
            onImageChange={this.handleImageChange} 
            initialImgUrl={initialAvatarUrl}
          />
          <TextField
            required
            type="text"
            label="Name"
            defaultValue={monster.name}
            className={classes.monsterName}
            onChange={this.handleChange('name')}
          />
        </div>
      
        <Divider />
        
        <List dense className={classes.list}>
          <ListItem disableGutters className={classes.statListItem}>
            {stats}
          </ListItem>
        </List>  
        
        <Divider />
        
        <List className={classes.list}>
          <ListItem disableGutters className={classes.statListItem}>
            {abilityScores}
          </ListItem>
        </List>
        
      </CRUDDialog>
    );
  }
}

EditMonsterDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: '100%',
    display: 'flex',
    alignItems: 'center',
  },
  monsterName: {
    display: 'inline',
    marginTop: -3,
    marginLeft: 20,
  },
  list: {
    width: 300,
    margin: '0 auto',
  },
  statListItem: {
    display: 'flex',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  stat: {
    width: 75,
  },
  abilityScore: {
    width: 100,
    '&:nth-child(n+4)': {
      marginTop: 20,
    }
  },
  textField: {
    width: '80%',
    margin: '0 10%',
  }
};

export default withStyles(styles)(EditMonsterDialog);