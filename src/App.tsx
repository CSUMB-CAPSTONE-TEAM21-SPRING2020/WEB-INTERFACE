//Imports
import React from 'react';
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";

//Components
import Home from "./components/Home";
import Login from "./components/Login";

//"Cannot find module './assets/logo.svg'" workaround. It just works.
const logo = require("./assets/logo.svg") as string;

//Navbar & router links
function App() {
  return (
    <Router> 
    <div className="App">
      <nav className="navbar navbar-expand-lg navbar-light fixed-top">
        <div className="container">
          <Link className="navbar-brand" to={"/"}>Berry Harvest Optimizer</Link>
          <div className="collapse navbar-collapse" id="navbarTogglerDemo02">
            <ul className="navbar-nav ml-auto">
              <li className="nav-item">
                <Link className="nav-link" to={"/"}>Home</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/login"}>Login</Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" to={"/data"}>Data</Link>
              </li>
            </ul>
          </div>
        </div>
      </nav>
      
      <div className="auth-wrapper">
        <div className="auth-inner">
          <Switch>
            <Route exact path='/' component={Home} />
            <Route path="/login" component={Login} />
          </Switch>
        </div>
      </div>
    </div>
    </Router>
  );
}

export default App;
