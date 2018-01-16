// Import FirebaseAuth and firebase.
import React from 'react';
import { FirebaseAuth } from 'react-firebaseui';
import firebase from 'firebase';
import SignInHeader from './SignInHeader';
import Grid from 'material-ui/Grid';
import Typography from 'material-ui/Typography';
import Card, { CardContent } from 'material-ui/Card';
import { withStyles } from 'material-ui/styles';
import { blueGrey } from 'material-ui/colors';


// Configure FirebaseUI.
const firebaseui = require('firebaseui');
let uiConfig = {
  // Popup signin flow rather than redirect flow.
  signInFlow: 'popup',
  // Redirect to index after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
  signInSuccessUrl: '/',
  // Display Email and Google as auth providers.
  signInOptions: [
    firebase.auth.EmailAuthProvider.PROVIDER_ID,
    firebase.auth.GoogleAuthProvider.PROVIDER_ID,
  ],
  credentialHelper: firebaseui.auth.CredentialHelper.NONE,
}; 

class SignIn extends React.Component {
  render() {
    const { classes } = this.props;
      
    return (
      <div>
        <SignInHeader />
        <Grid container justify="center" spacing={0}>
          <Grid item xs={12} sm={8} md={6} lg={4}>
            <Card className={classes.splashCard}>
              <Typography type="title" component="h2" align='center' className={classes.splashCardTitle}>
                Sign In Options
              </Typography>
              <CardContent>
                <Typography type='subheading' component="p" align='center'>
                  Sign in to your existing account or create a new one:
                </Typography>
                <FirebaseAuth 
                  uiConfig={uiConfig} 
                  firebaseAuth={firebase.auth()}
                  className={classes.authContainer}
                />
              </CardContent>
            </Card>
          </Grid>
        </Grid>
      </div>
    );
  }
}

const styles = ({
  splashCard: {
    width: '80%',
    margin: '10%',
    borderRadius: '5px 5px 3px 3px',
  },
  splashCardTitle: {
    color: 'white',
    backgroundColor: blueGrey[900],
    padding: '10px',
    margin: 0,
    borderRadius: '3px 3px 0 0',
  },
  splashCardActions: {
    display: 'flex',
    justifyContent: 'center',
    paddingBottom: 10,
  },
  authContainer: {
    margin: '5 20',
  }
});

export default withStyles(styles)(SignIn);