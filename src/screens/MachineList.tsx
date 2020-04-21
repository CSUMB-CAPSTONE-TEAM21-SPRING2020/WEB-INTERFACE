import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';

import firebase, { database } from "firebase/app";
import 'firebase/firestore';
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import { config } from "../../src/config";

firebase.initializeApp(config);
var db = firebase.firestore();

//getting most recent data from firestore based on timestamp
let dataRef = db.collection('berries/machine1/data').orderBy("timestamp", "desc").limit(1);

let machineData = dataRef.get()
  .then(snapshot => {
    snapshot.forEach(doc => {      
      console.log('Ripe: ' + doc.data().ripe);
      console.log('Unripe: ' + doc.data().unripe);
      console.log('Timestamp: ' + doc.data().timestamp);
    });
  })
  .catch(err => {
    console.log('Error getting documents', err);
});

//Real-time data observer - probably not functioning
let observer = dataRef.onSnapshot(querySnapshot => {
  console.log(`Received query snapshot of size ${querySnapshot.size}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});



//Incase we need a custom object
// class Machine {
//   ripe: number;
//   unripe: number;
//   //timestamp: string;
//   constructor (ripe: number, unripe: number) {
//       this.ripe = ripe;
//       this.unripe = unripe;
//       //this.timestamp = timestamp;
//   }
//   toString() {
//       return 'Ripe: ' + this.ripe + '\nUnripe: ' + this.unripe;
//   }
// }

export default class MachineList extends React.Component<any, any>{
  //functioning constructor
  constructor(props: any){
    super(props);
    const Data: any[] = [];
    this.state = {
      Data
    };
  };

  componentDidMount() {
    db.collection('berries/machine1/data').orderBy("timestamp", "desc").limit(1)
      .get()
      .then(querySnapshot => {
        const data = querySnapshot.docs.map(doc => doc.data());
        console.log(data);
        this.setState({ Data: data });
      });
  }
    render() {
        return (
          <FirestoreProvider {...config} firebase={firebase}>
            <FirebaseAuthProvider {...config} firebase={firebase}>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <div className="App">
                    <Accordion defaultActiveKey="">
                      <Card className="machine-card">
                        <Accordion.Toggle as={Card.Header} eventKey="0">
                          Machine No. 1
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="0">
                          <Card.Body>
                            <p>{JSON.stringify(this.state.Data, null, 2)}</p>
                            
                            {this.state.Data.map((d: { ripe: number; unripe: number; }, index: any) => (
                              <>
                                <p>Ripe: {d.ripe}</p>
                                <p>Unripe: {d.unripe}</p>
                              </>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="machine-card">
                        <Accordion.Toggle as={Card.Header} eventKey="1">
                          Machine No. 2
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="1">
                          <Card.Body>
                            <p>% Green: 7</p>
                            <p>% Blue: 69</p>
                            <p>% Other: 24</p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="machine-card">
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                          Machine No. 3
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                            <p>% Green: 11</p>
                            <p>% Blue: 88</p>
                            <p>% Other: 1</p>
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      </Accordion>
                    </div>
                  </div>
                </div>
              </FirebaseAuthProvider>
            </FirestoreProvider>
        );
    }
}
