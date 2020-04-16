//Imports
import React from 'react';

//Components
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Pages
import Home from "./screens/Home";
import Login from "./screens/Login";
import MachineList from "./screens/MachineList";
import Settings from "./screens/Settings";

//CSS
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import Navigation from './components/Navigation';

import firebase from "firebase/app";
import "firebase/auth";
import {FirebaseAuthProvider} from "@react-firebase/auth";
import { config } from "./config";

//"Cannot find module './assets/logo.svg'" workaround. It just works.
const logo = require("./assets/logo.svg") as string;

//Navbar & router links
function App() {
  return (
    <FirebaseAuthProvider firebase={firebase} {...config}>
    <Router>
    <div className="App">
      <Navigation/>

      <Switch>
        <Route exact path='/' component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/machineList" component={MachineList}/>
        <Route path="/settings" component={Settings}/>
      </Switch>
    </div>
    </Router>
    </FirebaseAuthProvider>
  );
}

export default App;
