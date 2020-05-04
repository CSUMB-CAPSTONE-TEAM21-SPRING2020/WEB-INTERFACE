// ****************************************************************************************************************
// Created by: Sebastian Ruiz
// Last modified: 4/29/20
// Desc: This is the component class for the settings page, handles linking users to machines.
//       A user can add or remove machines on their account.
// ****************************************************************************************************************
import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import '../styles/Settings.css';
import firebase from "firebase";
import "firebase/auth";
import 'firebase/firestore';
import {FirebaseAuthProvider, FirebaseAuthConsumer, IfFirebaseAuthedAnd, IfFirebaseAuthed} from "@react-firebase/auth";
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import { config } from "../../src/config";

var db = firebase.firestore(); 

export default class Settings extends React.Component<any, any>{

    constructor(props: any){
      super(props);
      var machineArray: any[] = [];
      var value: string = '';
      // var counter: number = 0;
      this.state = {
        machineArray, value,
      };
      this.addMachine = this.addMachine.bind(this);
      this.getUID = this.getUID.bind(this);
      this.handleChange = this.handleChange.bind(this);
      // this.updateCounter = this.updateCounter.bind(this);
    };

    // ****************************************************************************************************************
    // componentDidMount: queries database for user's document and adds their machines to component state
    // ****************************************************************************************************************
    componentDidMount(){
      let uid = this.getUID();
      db.collection('users').doc(uid).get()
        .then(snapshot => {
          if(snapshot.exists){
            let data = snapshot.data();
            this.setState( { machineArray: data!.machines});
          }
          else{
            console.log('Error fetching data');
          }
          });
    };

    // ****************************************************************************************************************
    // getUID: returns the user's uid from cookies
    // ****************************************************************************************************************
    getUID() {
      let arr = document.cookie.split('=;');
      return arr[0];
    };

    // ****************************************************************************************************************
    // updateCounter: increases the counter state var, counter value used to asign eventKeys
    // ****************************************************************************************************************



    // ****************************************************************************************************************
    // handleChange: updates the state var value to the current value of the input field for machine id.
    // ****************************************************************************************************************
    handleChange(event: any){
      this.setState({value: event.target.value});
    };

    // ****************************************************************************************************************
    // addMachine: this function is triggered by the submit button for the machine id input feild,
    //             the function updates the document associated with the user and adds the machine id from the
    //             input field to a list of machines linked to the user.
    // ****************************************************************************************************************
    async addMachine() {
      let uid = this.getUID();
      if ( this.state.value == '' || this.state.value == null){
        alert('Input not valid');
      }
      else{
        let arr = this.state.machineArray;
        arr.push(this.state.value);
        let docRef = db.collection('users').doc(uid);
        await docRef.update({
            machines: arr
        })
        .then(function() {
            console.log("Document successfully updated!");
        })
        .catch(function(error) {
            console.error("Error updating document: ", error);
        });
      }
      alert('wait');
    };

    // ****************************************************************************************************************
    // render: provides the list of machines and form for adding machines.
    // ****************************************************************************************************************

    render() {
        return (
        <div id='settings_div'>
          <FirestoreProvider {...config} firebase={firebase}>
            <FirebaseAuthProvider {...config} firebase={firebase}>
                <div className="auth-wrapper">
                  <div className="auth-inner">
                    <div className="App">
                        <h3>My Machines</h3>
                        <div className="my_machines">
                            <Accordion defaultActiveKey="hello">
                            {this.state.machineArray.map( (machine: any) =>  {
                                return(
                                  <Card className="machine-card" key={machine}>
                                   <Accordion.Toggle as={Card.Header} eventKey={'key' + machine}>
                                     {machine}
                                   </Accordion.Toggle>
                                   <Accordion.Collapse eventKey= {'key' + machine}>
                                     <Card.Body>
                                       <button id={machine}>Remove</button>
                                     </Card.Body>
                                   </Accordion.Collapse>
                                 </Card>
                                )
                              }
                            )}
                            </Accordion>
                        </div>
                        <div className="machine_add_form">
                          <form>
                          <br></br>
                              <h3>Add Machines</h3>
                              <label>Machine ID</label><br/>
                              <input type="text"  value={this.state.value} onChange={this.handleChange}/><br/>
                              <button type="submit" onClick={this.addMachine}>Submit</button>
                          </form>
                        </div>
                  </div>
                </div>
              </div>
              </FirebaseAuthProvider>
              </FirestoreProvider>
            </div>
        );
    };
}
