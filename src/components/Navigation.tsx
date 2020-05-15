//Imports
import React, { Component } from "react";

//Components
import { Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import '../assets/bootstrap.min.css';
import { LOGOUT, SETTINGS, MACHINES, HOME, LOGIN } from "../constants/routes";

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthed, IfFirebaseUnAuthed} from "@react-firebase/auth";
import { config } from "../config";

export default class Navigation extends Component{
    // constructor(props: Readonly<{}>){
    //     super(props);
    // }

    // user = firebase.auth().currentUser;

    render(){
            return(
                <FirebaseAuthProvider {...config} firebase={firebase}>
                    
                        <Navbar bg="dark" variant="dark">
                            <Navbar.Brand href="">Berry Harvest Optimizer</Navbar.Brand>
                            <Nav className="mr-auto">
                                <Link to={HOME} className="nav-link">Home</Link>
                                <Link to="/data" className="nav-link">Data</Link>
                                <Link to={MACHINES} className="nav-link">List</Link>
                                <IfFirebaseAuthed>
                                    {() => {
                                        return <>
                                                <Link to={SETTINGS} className="nav-link">Settings</Link>
                                                <Link to={HOME} className="nav-link" 
                                                    onClick={() => {
                                                        firebase.auth().signOut();
                                                    }}
                                                >
                                                    Logout
                                                </Link> 
                                                </>
                                    }}
                                </IfFirebaseAuthed>
                                <IfFirebaseUnAuthed>
                                    {() => {
                                            return <Link to={LOGIN} className="nav-link">Login</Link> 
                                    }}
                                </IfFirebaseUnAuthed>
                                
                            </Nav>
                            <FirebaseAuthConsumer>
                            {({ user }) => {
                                var userPhoto;
                                if(user != null){
                                    userPhoto = user.photoURL;
                                    console.log(userPhoto);
                                    return(
                                        <Navbar.Brand href={SETTINGS}>
                                        <img
                                            src={userPhoto}
                                            width="30"
                                            height="30"
                                            className="d-inline-block align-top"
                                            alt="React Bootstrap logo"
                                            style={{ borderRadius : "50%", border: '1px solid black' }}
                                        />
                                        </Navbar.Brand>
                                    );
                                }
                                userPhoto = null;
                            }}
                            </FirebaseAuthConsumer>
                            {/* <Form inline>
                            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
                            <Button variant="outline-info">Search</Button>
                            </Form> */}
                        </Navbar>
                </FirebaseAuthProvider>
            );
    }  
}
