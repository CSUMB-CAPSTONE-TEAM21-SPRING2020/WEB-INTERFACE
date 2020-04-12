import React, { Component } from "react";
import firebase from '../config';

var user = firebase.auth().currentUser;
var name: {} | null | undefined, email, photoUrl, uid, emailVerified;

if (user != null) {
  name = user.displayName;
  email = user.email;
  photoUrl = user.photoURL;
  emailVerified = user.emailVerified;
  uid = user.uid;
}

export default class Login extends Component {
    render() {
        return (
            <div>
                <p>Home page under construction</p>
                <p>Welcome {name}!</p>

            </div>
        );
    }
}