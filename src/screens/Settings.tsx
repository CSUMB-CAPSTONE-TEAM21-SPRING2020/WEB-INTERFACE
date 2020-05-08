// ****************************************************************************************************************
// Created by: Sebastian Ruiz
// Last modified: 5/8/20
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
      this.state = {
        machineArray: ['machine_1', 'machine_2', 'machine_3'], value,
      };
      this.getUID = this.getUID.bind(this);
      this.handleChange = this.handleChange.bind(this);
      this.addMachine = this.addMachine.bind(this);
      this.deleteMachine = this.deleteMachine.bind(this);
    };

    // ****************************************************************************************************************
    // componentDidMount: queries database for user's document and adds their machines to component state
    // ****************************************************************************************************************
    // componentDidMount(){
      // let uid = this.getUID();
      // db.collection('users').doc(uid).get()
      //   .then(snapshot => {
      //     if(snapshot.exists){
      //       let data = snapshot.data();
      //       this.setState( { machineArray: data!.machines});
      //     }
      //     else{
      //       console.log('Error fetching data');
      //     }
      //     });
    // };

    // ****************************************************************************************************************
    // getUID: returns the user's uid from cookies
    // ****************************************************************************************************************
    getUID() {
      let index = document.cookie.indexOf('uid=')
      let uid = '';
      for(let i = index + 4; i < document.cookie.length; i++){
        if( document.cookie[i] === ';'){
          break;
        }
        else{
          uid = uid + document.cookie[i];
        }
      }
      return uid;
    };

    // ****************************************************************************************************************
    // updateCounter: increases the counter state var, counter value used to asign eventKeys
    // ****************************************************************************************************************
    // updateCounter(){
    //   console.log()
    // }


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
    async addMachine(event: any){
        event.preventDefault();
        // let uid = this.getUID();
        let machine = this.state.value;
        this.setState({value: ''});
        if ( machine == '' || machine == null){
          alert('Input not valid');
        }
        else{
              let machineArray =  this.state.machineArray
              machineArray.push(machine);
              machineArray.sort();
              this.setState({machineArray});
        }
    };
    // ****************************************************************************************************************
    // deleteMachine: this function is triggered by the delete button on the accordion toggle section in each machine card
    // ****************************************************************************************************************
    async deleteMachine(event: any){
        event.preventDefault();
        let machine = event.target.id;
        let machineArray = this.state.machineArray;
        let i = machineArray.indexOf(machine);
        if(i > -1){
          machineArray.splice(i,1);
          this.setState({machineArray});
        }

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
                                       <button id={machine} onClick={this.deleteMachine}>Remove</button>
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
