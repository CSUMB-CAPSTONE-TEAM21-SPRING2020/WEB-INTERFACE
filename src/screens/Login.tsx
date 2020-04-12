import React, { Component } from "react";
import '../styles/Login.css';

import StyledFirebaseAuth from 'react-firebaseui/StyledFirebaseAuth';
import firebase, { auth } from '../config';

var uiConfig = {
    // Popup signin flow rather than redirect flow.
    signInFlow: 'redirect',
    // Redirect to /signedIn after sign in is successful. Alternatively you can provide a callbacks.signInSuccess function.
    signInSuccessUrl: '/',
    // We will display Google and Facebook as auth providers.
    signInOptions: [
      firebase.auth.GoogleAuthProvider.PROVIDER_ID,
      firebase.auth.EmailAuthProvider.PROVIDER_ID
    ]
  };

export default class Login extends Component {
    constructor(props: Readonly<{}>){
        super(props);
        this.state = {
            username: '',
            user: null 
        }
    }

    componentDidMount() {
        auth.onAuthStateChanged((user) => {
            if (user) {
            this.setState({ user });
            } 
        });
    }

    render(){
        return (
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <h3>Login</h3>
                    <StyledFirebaseAuth uiConfig={uiConfig} firebaseAuth={firebase.auth()}/>
                </div>
            </div>
        );
        
            /*
            <div className="auth-wrapper">
                <div className="auth-inner">
                    <form>
                        <h3>Login</h3>

                        <div className="form-group">
                            <label>Username</label>
                            <input type="email" className="form-control" placeholder="Enter username" />
                        </div>

                        <div className="form-group">
                            <label>Password</label>
                            <input type="password" className="form-control" placeholder="Enter password" />
                        </div>

                        <button type="submit" className="btn btn-primary btn-block">Submit</button>
                        <p className="forgot-password text-right">
                            Forgot <a href="#">password?</a>
                        </p>
                        <hr/>
                        
                        <div>
                            <button
                                onClick={() => {
                                    const googleAuthProvider = new firebase.auth.GoogleAuthProvider();
                                    firebase.auth().signInWithPopup(googleAuthProvider);
                                }}>
                                Sign In with Google
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        );*/
    }
}