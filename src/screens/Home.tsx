import React, { Component } from "react";
import firebase from "firebase/app";
import "firebase/auth";
import 'firebase/firestore';
import {FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthedAnd, IfFirebaseAuthed} from "@react-firebase/auth";
import { config } from "../config";
//import firebase from '../config';

//var user = firebase.auth().currentUser;
//var name: {} | null | undefined, email, photoUrl, uid, emailVerified;

// if (user != null) {
//   name = user.displayName;
//   email = user.email;
//   photoUrl = user.photoURL;
//   emailVerified = user.emailVerified;
//   uid = user.uid;
// }

//firebase.initializeApp(config);

export default class Home extends Component {
    render() {
        return (
            <div>
                <FirebaseAuthProvider {...config} firebase={firebase}>
                <FirebaseAuthConsumer>
                {({ isSignedIn, user, providerId }) => {
                    var db = firebase.firestore();
                    if(user != null){
                        db.collection('users').doc(user.uid).get().then(function(doc) {
                            if(!doc.exists){
                                db.collection('users').doc(user.uid).set({
                                    name: user.displayName,
                                });
                            }
                        });
                    }
                    return (
                    <pre style={{ height: 300, overflow: "auto" }}>
                        {JSON.stringify({ isSignedIn, user, providerId }, null, 2)}
                    </pre>
                    );
                }}
                </FirebaseAuthConsumer>
                <div>
                <IfFirebaseAuthed>
                    {() => {
                    return <div>You are authenticated</div>;
                    }}
                </IfFirebaseAuthed>
                <IfFirebaseAuthedAnd
                    filter={({ providerId }) => providerId !== "anonymous"}
                >
                    {({ providerId }) => {
                    return <div>You are authenticated with {providerId}</div>;
                    }}
                </IfFirebaseAuthedAnd>
                </div>
                </FirebaseAuthProvider>

            </div>
        );
    }
}