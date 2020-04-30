import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import update from 'immutability-helper';

import firebase, { database } from "firebase/app";
import 'firebase/firestore';
import { FirestoreProvider, FirestoreCollection } from "@react-firebase/firestore";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import { config } from "../../src/config";

firebase.initializeApp(config);
var db = firebase.firestore();

//getting most recent data from firestore based on timestamp
let dataRef = db.collection('berries/machine1/data').orderBy("timestamp", "desc").limit(1);

// let machineNames = db.collection('berries').get()
//   .then(snapshot => {
//     snapshot.forEach(doc => {      
//       console.log(doc.data());
//       machineArray.push(doc.data().name);
//       console.log("machine array: " + machineArray);
//     });
//   })
//   .catch(err => {
//     console.log('Error getting documents', err);
// });

// let machineData = db.collection('berries/' + machineArray[0] + '/data').get()
// .then(snapshot => {
//   snapshot.forEach(doc => {
//     if(doc.exists){
//       console.log(doc.data());
//     }else{
//       console.log("suffering");
//     }      
//     //machineArray.push(doc.data().name);
//     //console.log("machine array: " + machineArray);
//   });
// })
// .catch(err => {
//   console.log('Error getting documents', err);
// });


let observer = dataRef.onSnapshot(docSnapshot => {
  console.log(`Received doc snapshot: ${docSnapshot}`);
  // ...
}, err => {
  console.log(`Encountered error: ${err}`);
});

//observer looks for changes in snapshot - probably not functioning
// let observer = dataRef.onSnapshot(querySnapshot => {
//   querySnapshot.docChanges().forEach(change => {
//     if (change.type === 'added') {
//       //console.log('New data: ', change.doc.data());
//     }
//     if (change.type === 'modified') {
//       //console.log('Modified data: ', change.doc.data());
//     }
//     if (change.type === 'removed') {
//       //console.log('Removed data: ', change.doc.data());
//     }
//   });
// }, err => {
//   console.log(`Encountered error: ${err}`);
// });

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
    //aaaahhh
    var machines_Data: any[] = [];
    // var machine2: any[] = [];
    // var machine3: any[] = [];
    var machineArray: any[] = [];
    this.state = {
      machines_Data,
      machineArray
    };
  };

  //TODO: Shift to storing in the 2D array
  //TODO: Render accordian via 2d array
  componentDidMount() {
    db.collection('berries').get()
      .then(snapshot => {
        snapshot.forEach(doc => {
          console.log(doc.id);
          db.collection('berries/' + doc.id + '/data').orderBy("timestamp", "desc").limit(1)
          .get()
          .then(querySnapshot => {
            const data = querySnapshot.docs.map(m_doc => m_doc.data());
            console.log(data);
            const tmp_data = this.state.machines_Data;
            // Add item to it
            tmp_data.push({ [doc.id] : data });
            // Set state
            this.setState({ machines_Data: tmp_data });
            console.log(tmp_data);
          });

          //Data observers
          db.collection('berries/' + doc.id + '/data').orderBy("timestamp", "desc").limit(1).onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                console.log('New data: ', change.doc.data());
                //update the state
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState(update(this.state, {
                  machines_Data: {
                    [doc.id]: {
                      $set: data
                    }
                  }
                }));
              }
              if (change.type === 'modified') {
                console.log('Modified data: ', change.doc.data());
                //update the state
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState(update(this.state, {
                  machines_Data: {
                    [doc.id]: {
                      $set: data
                    }
                  }
                }));
              }
              if (change.type === 'removed') {
                console.log('Removed data: ', change.doc.data());
              }
            });
          }, err => {
            console.log(`Encountered error: ${err}`);
          });
        })
      });
    }

    createAccordion = () => {
      let dyn_Accordion = []
  
      // Outer loop to create parent
      for (let i = 0; i < this.state.machines_Data.length; i++) {
        let {arr} = this.state.machines_Data;
        dyn_Accordion.push(
          <Card className="machine-card">
            <Accordion.Toggle as={Card.Header} eventKey="0">
              Machine No. {i}
            </Accordion.Toggle>
            <Accordion.Collapse eventKey="0">
              <Card.Body>
                {arr.map((d: { ripe: number; unripe: number; }, index: any) => (
                  <>
                    <p>Ripe: {d.ripe}</p>
                    <p>Unripe: {d.unripe}</p>
                  </>
                ))}
              </Card.Body>
            </Accordion.Collapse>
        </Card>
        )

      }
      return dyn_Accordion
    }

    render() {
        return (
          <FirestoreProvider {...config} firebase={firebase}>
            <FirebaseAuthProvider {...config} firebase={firebase}>
              <div className="auth-wrapper">
                <div className="auth-inner">
                  <div className="App">
                    <Accordion defaultActiveKey="">
                      {this.createAccordion()}
                      </Accordion>
                    </div>
                  </div>
                </div>
              </FirebaseAuthProvider>
            </FirestoreProvider>
        );
    }
}
