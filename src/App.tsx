//Imports
import React from 'react';

//Components
import { BrowserRouter as Router, Switch, Route, Link } from "react-router-dom";
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";

//Pages
import Home from "./screens/Home";
import Login from "./screens/Login";

//CSS
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';

//"Cannot find module './assets/logo.svg'" workaround. It just works.
const logo = require("./assets/logo.svg") as string;

//Navbar & router links
function App() {
  return (
    <Router> 
    <div className="App">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Berry Harvest Optimizer</Navbar.Brand>
          <Nav className="mr-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/login" className="nav-link">Login</Link>
            <Link to="/data" className="nav-link">Data</Link>
          </Nav>
        <Form inline>
          <FormControl type="text" placeholder="Search" className="mr-sm-2" />
          <Button variant="outline-info">Search</Button>
        </Form>
      </Navbar>

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
