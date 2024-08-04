import React from 'react';
import PropTypes from 'prop-types';
import CRUDDialog from '../CharactersAndMonsters/CRUDDialog';
import List, { ListItem } from 'material-ui/List';
import Divider from 'material-ui/Divider';
import TextField from 'material-ui/TextField';
import AvatarUpload from '../CharactersAndMonsters/AvatarUpload';
import Button from 'material-ui/Button';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  combatant: PropTypes.object,
  isCharacter: PropTypes.bool,
  isNew: PropTypes.bool,
  open: PropTypes.bool,
  onRequestClose: PropTypes.func,
  onFieldChange: PropTypes.func,
  onImageChange: PropTypes.func,
  onSave: PropTypes.func,
  onCancel: PropTypes.func,
};

class EditCombatantDialog extends React.Component {
  
  /**
   * Callback for textfield input
   * @param fieldName - the name of the changed textfield
   */
  handleChange = (fieldName) => (event) => {
    this.props.onFieldChange(fieldName, event.target.value);
  }
  
  /**
   * Callback for AvatarUpload
   * @param imageFile - the new image file provided by AvatarUpload
   */
  handleImageChange = (imageFile) => {
    this.props.onImageChange(imageFile);
  }
  
  /**
   * Callback for dialog close request
   */
  handleRequestClose = () => {
    this.props.onRequestClose();
  }
  
  /**
   * Callback for 'SAVE' click,
   */
  handleSave = () => {
    this.props.onSave();
  }
  
  /**
   * Callback for 'CANCEL' click,
   */
  handleCancel = () => {
    this.props.onCancel();
  }
  
  render() {
    const { isCharacter, isNew, combatant, classes } = this.props;
    
    //Get dialog title
    let dialogTitle = null;
    if(isNew) {
      dialogTitle = (isCharacter) ? "New Character" : "New Monster";
    } else {
      dialogTitle = (isCharacter) ? "Edit Character" : "Edit Monster";
    }
    
    //Get initial avatar url for AvatarUpload
    let initialAvatarUrl = null;
    if(combatant.image != null) {
      initialAvatarUrl = combatant.image;
    }
    
    //Gather stat values for display
    const statValues = [];
    if(isCharacter) {
      statValues.push({ name: 'LVL', value: combatant.LVL });
    } else {
      statValues.push({ name: 'CR', value: combatant.CR });
    }
    statValues.push(
      { name: 'AC', value: combatant.AC },
      { name: 'HP', value: combatant.HP },
      { name: 'SPD', value: combatant.SPD }
    );
    
    //Gather ability score values for display
    const abilityScoreValues = [
      { name: 'STR', value: combatant.STR },
      { name: 'DEX', value: combatant.DEX },
      { name: 'CON', value: combatant.CON },
      { name: 'INT', value: combatant.INT },
      { name: 'WIS', value: combatant.WIS },
      { name: 'CHA', value: combatant.CHA }
    ];
    
    //Generate stat value textfields
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
    
    //Generate ability score text fields
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
        title={dialogTitle}
        onSave={this.handleSave}
        onCancel={this.handleCancel}
        onRequestClose={this.handleRequestClose}
        open={this.props.open}
        actions={
          <div>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={this.handleSave} color="primary">Save</Button> 
          </div>
        }
      >
        
        <div className={classes.topSection}>
          <AvatarUpload 
            initialImgUrl={initialAvatarUrl}
            onImageChange={this.handleImageChange} 
          />
          <TextField
            required
            type="text"
            label="Name"
            defaultValue={combatant.name}
            className={classes.combatantName}
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

EditCombatantDialog.propTypes = propTypes;

const styles = {
  topSection: {
    width: 300,
    margin: '0 auto',
    display: 'flex',
    alignItems: 'center',
  },
  combatantName: {
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

export default withStyles(styles)(EditCombatantDialog);