import React from 'react';
import PropTypes from 'prop-types';
import { getUserId,
         createMonster,
         createMonsterWithImage,
        } from '../../DatabaseFunctions/FirebaseFunctions';
import Dialog, { DialogContent, withMobileDialog } from 'material-ui/Dialog';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
};

class NewMonsterDialog extends React.Component {
  constructor(props) {
    super(props);
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2FDefault.jpg?alt=media&token=09401431-a9d6-4e21-a204-f5a4e95390c3";
    this.state = {
      image: null,
      monster: {
        name: null,
        image: defaultImage,
        LVL: null,
        AC: null,
        HP: null,
        SPD: null,
        STR: null,
        DEX: null,
        CON: null,
        INT: null,
        WIS: null,
        CHA: null
      }
    };
  }
  
  /**
   * Callback for textfield input,
   * Updates monster data in component state
   */
  handleChange = (fieldName) => (event) => {
    let monsterObj = this.state.monster;
    monsterObj[fieldName] = event.target.value;
    this.setState({
      monster: monsterObj,
    });
  }
  
  /**
   * Callback for AvatarUpload
   * Saves file reference in state
   * @param imageFile - the new image file provided by AvatarUpload
   */
  handleImageChange = (imageFile) => {
    this.setState({
      image: imageFile,
    });
  }
  
  /**
   * Callback for dialog close request
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Callback for 'SAVE' click,
   * Saves the monster data to the database and closes the dialog
   */
  handleSave = () => {
    // Get user id
    getUserId((userid) => {
      // Check for monster image and upload data accordingly
      const imageFile = this.state.image;
      if(imageFile == null) {
        // Upload monster to database
        createMonster(userid, this.state.monster);
        // Close the dialog
        this.handleRequestClose();
        // Reset local monster data
        this.resetLocalMonsterData();
      } else {
        // Upload monster image and monster to database
        const imageUpload = createMonsterWithImage(userid, this.state.monster, imageFile);
        // Wait for successful upload
        imageUpload.on('state_changed', null, null, () => {
          // Close the dialog
          this.handleRequestClose();
          // Reset local monster data
          this.resetLocalMonsterData();
        });
      }
    });
    
  }
  
  /**
   * Callback for 'CANCEL' click,
   * Closes the dialog
   */
  handleCancel = () => {
    this.handleRequestClose();
  }
  
  /**
   * Resets local monster data to default value
   */
  resetLocalMonsterData = () => {
    const defaultImage = "https://firebasestorage.googleapis.com/v0/b/encounter-49be9.appspot.com/o/admin%2Fimages%2Fmonsters%2FDefault.jpg?alt=media&token=09401431-a9d6-4e21-a204-f5a4e95390c3";
    this.setState({
      monster: {
        name: null,
        image: defaultImage,
        LVL: null,
        AC: null,
        HP: null,
        SPD: null,
        STR: null,
        DEX: null,
        CON: null,
        INT: null,
        WIS: null,
        CHA: null
      },
    });
  }
  
  render() {
    const { classes, } = this.props;
    const { monster } = this.state;
    
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
        title="New Monster"
        action="create"
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
      >
        
        <div className={classes.topSection}>
          <AvatarUpload 
            onImageChange={this.handleImageChange} 
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

NewMonsterDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: 300,
    margin: '0 auto',
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
  },
};

export default withStyles(styles)(withMobileDialog()(NewMonsterDialog));