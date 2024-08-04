import React from 'react';
import { withStyles } from 'material-ui/styles';
    
class AdSense extends React.Component {
    componentDidMount() {
        let adsbygoogle = window.adsbygoogle || [];
        adsbygoogle.push({
            google_ad_client: "ca-pub-6258496511290980",
            enable_page_level_ads: true
          });
    }
    
    render() {
        const { classes } = this.props;
        
        return (
            <div className={classes.adContainer}>
            </div>
        );
    }
}

const styles = {
    adContainer: {
        width: '100%',
        maxHeight: '200px'
    }
};

export default withStyles(styles)(AdSense);