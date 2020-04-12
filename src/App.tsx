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

//"Cannot find module './assets/logo.svg'" workaround. It just works.
const logo = require("./assets/logo.svg") as string;

//Navbar & router links
function App() {
  return (
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

  );
}

export default App;
