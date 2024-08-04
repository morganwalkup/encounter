import React from 'react';
import PropTypes from 'prop-types';
import Button from 'material-ui/Button';
import EditIcon from 'material-ui-icons/Edit';
import { withStyles } from 'material-ui/styles';

const propTypes = {
  onImageChange: PropTypes.func,
  initialImgUrl: PropTypes.string,
};

class BackgroundUpload extends React.Component {
  constructor(props) {
    super(props);
    let initialImgUrl = props.initialImgUrl;
    if(initialImgUrl == null) {
      initialImgUrl = require('../../../images/DefaultEncounter.jpg');
    }
    this.state = {
      imageFile: '',
      imagePreviewUrl: initialImgUrl,
    };
  }

  /**
   * Handles the selection of a new image
   * @param event - The event raised by selection of a new image
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
        <div className={classes.backgroundContainer}>
          <img 
            src={imagePreviewUrl} 
            alt={""}
            className={classes.bgImg} 
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
            <Button fab component="span" className={classes.bgButton}>
              <EditIcon />
            </Button>
          </label>
        </div>
      </div>
    );
  }
}

BackgroundUpload.propTypes = propTypes;

const styles = {
  backgroundContainer: {
    position: 'relative',
    width: '100%',
    maxWidth: 500,
  },
  fileInput: {
    display: 'none',
  },
  bgImg: {
    width: '100%',
    height: 'auto',
    margin: '10px 0',
    boxShadow: '0px 2px 5px rgba(0,0,0,0.5)',
  },
  bgButton: {
    position: 'absolute',
    bottom: 0,
    right: 10,
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

export default withStyles(styles)(BackgroundUpload);