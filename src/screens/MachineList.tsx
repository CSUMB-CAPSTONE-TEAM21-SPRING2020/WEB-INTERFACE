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
    var machine1: any[] = [];
    var machine2: any[] = [];
    var machine3: any[] = [];
    var machineArray: any[] = [];
    this.state = {
      machine1,
      machine2,
      machine3,
      machineArray
    };
  };

  accordian(){
    this.state.machineArray.forEach((element: any) => {
     return(
      <>
      <Accordion.Toggle as={Card.Header} eventKey="0">
        Machine No. 1
      </Accordion.Toggle>
      <Accordion.Collapse eventKey="0" key = {element}>
        <Card.Body>
          {/* <p>{JSON.stringify(this.state.Data, null, 2)}</p> */}
          
          {this.state.element.map((d: { ripe: number; unripe: number; }, index: any) => (
            <>
              <p>Ripe: {d.ripe}</p>
              <p>Unripe: {d.unripe}</p>
            </>
          ))}
        </Card.Body>
      </Accordion.Collapse>
      </>
     );
    });
  }

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
            this.setState({ [doc.id]: data });
          });

          //Data observers
          db.collection('berries/' + doc.id + '/data').orderBy("timestamp", "desc").limit(1).onSnapshot(querySnapshot => {
            querySnapshot.docChanges().forEach(change => {
              if (change.type === 'added') {
                console.log('New data: ', change.doc.data());
                //update the state
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState({ [doc.id]: data });
              }
              if (change.type === 'modified') {
                console.log('Modified data: ', change.doc.data());
                //update the state
                const data = querySnapshot.docs.map(doc => doc.data());
                this.setState({ [doc.id]: data });
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

    // db.collection('berries/machine1/data').orderBy("timestamp", "desc").limit(1)
    // //db.collection('berries')
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data);
    //     this.setState({ machine1: data });
    //   });

    //   db.collection('berries/machine2/data').orderBy("timestamp", "desc").limit(1)
    // //db.collection('berries')
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data);
    //     this.setState({ machine2: data });
    //   });

    //   db.collection('berries/machine3/data').orderBy("timestamp", "desc").limit(1)
    // //db.collection('berries')
    //   .get()
    //   .then(querySnapshot => {
    //     const data = querySnapshot.docs.map(doc => doc.data());
    //     console.log(data);
    //     this.setState({ machine3: data });
    //   });

    //   dataRef.onSnapshot(querySnapshot => {
    //     querySnapshot.docChanges().forEach(change => {
    //       if (change.type === 'added') {
    //         console.log('New data: ', change.doc.data());
    //         //update the state
    //         const data = querySnapshot.docs.map(doc => doc.data());
    //         this.setState({ Data: data });
    //       }
    //       if (change.type === 'modified') {
    //         console.log('Modified data: ', change.doc.data());
    //       }
    //       if (change.type === 'removed') {
    //         console.log('Removed data: ', change.doc.data());
    //       }
    //     });
    //   }, err => {
    //     console.log(`Encountered error: ${err}`);
    //   });
    // }

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
                            {/* <p>{JSON.stringify(this.state.Data, null, 2)}</p> */}
                            
                            {this.state.machine1.map((d: { ripe: number; unripe: number; }, index: any) => (
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
                          {this.state.machine2.map((d: { ripe: number; unripe: number; }, index: any) => (
                              <>
                                <p>Ripe: {d.ripe}</p>
                                <p>Unripe: {d.unripe}</p>
                              </>
                            ))}
                          </Card.Body>
                        </Accordion.Collapse>
                      </Card>
                      <Card className="machine-card">
                        <Accordion.Toggle as={Card.Header} eventKey="2">
                          Machine No. 3
                        </Accordion.Toggle>
                        <Accordion.Collapse eventKey="2">
                          <Card.Body>
                          {this.state.machine3.map((d: { ripe: number; unripe: number; }, index: any) => (
                            <>
                              <p>Ripe: {d.ripe}</p>
                              <p>Unripe: {d.unripe}</p>
                            </>
                          ))}
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
