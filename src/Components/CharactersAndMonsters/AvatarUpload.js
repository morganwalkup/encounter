import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  onImageChange: PropTypes.func,
  initialImgUrl: PropTypes.string,
};

class AvatarUpload extends React.Component {
  constructor(props) {
    super(props);
    let defaultImage = require('../../images/combatants/Default.jpg');
    this.state = {
      imageFile: '',
      imagePreviewUrl: props.initialImgUrl || defaultImage,
    };
  }

  /**
   * Handles the selection of a new image
   * @param e - event raised on selection of a new image
   */
  handleImageChange = (event) => {
    event.preventDefault();
    let reader = new FileReader();
    let file = event.target.files[0];

    // Save file data in component state
    reader.onloadend = () => {
      this.setState({
        imageFile: file,
        imagePreviewUrl: reader.result
      });
    };

    // Store data in reader result as a data url
    reader.readAsDataURL(file);
    
    // Pass file up to parent components
    if(this.props.onImageChange) {
      this.props.onImageChange(file);
    }
  }

  render() {
    const { classes } = this.props;
    let { imagePreviewUrl } = this.state;

    return (
      <div>
        <div className={classes.avatarContainer}>
          <img 
            src={imagePreviewUrl} 
            alt={""}
            className={classes.charImg} 
          />
          <input
            accept="image/*"
            className={classes.fileInput}
            id="image-upload"
            multiple
            type="file"
            onChange={this.handleImageChange}
          />  
          <label htmlFor="image-upload">
            <Button fab component="span" className={classes.avatarButton}>
              <EditIcon />
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

AvatarUpload.propTypes = propTypes;

const styles = {
  avatarContainer: {
    position: 'relative',
  },
  fileInput: {
    display: 'none',
  },
  charImg: {
    height: 70,
    width: 70,
    borderRadius: '50%',
    margin: '10px 0',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
  },
  avatarButton: {
    position: 'absolute',
    top: 45,
    left: 40,
    width: 36,
    height: 36,
    color: 'black',
    backgroundColor: '#69f0ae',
    '&:hover': {
      backgroundColor: '#9fffe0',
    },
    '& span:first-of-type': {
      height: 10,
    },
    '& svg': {
      width: 15,
      height: 15,
    }
  },
};

export default withStyles(styles)(AvatarUpload);