//Imports
import React, { Component } from 'react';

//Components
import { BrowserRouter, Router, Switch, Route, Link } from "react-router-dom";
import * as routes from "./constants/routes";

//Pages
import Home from "./screens/Home";
import Login from "./screens/Login";
import MachineList from "./screens/MachineList";
import Settings from "./screens/Settings";
import Logout from "./screens/Logout";

import { Navigation } from "./components/Navigation";

//CSS
import './styles/App.css';
import '../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { render } from '@testing-library/react';

//Firebase
import { firebase } from "./firebase";
import { withAuthorization } from "./firebase/withAuthorization";

//"Cannot find module './assets/logo.svg'" workaround. It just works.
const logo = require("./assets/logo.svg") as string;

//Navbar & router links
class AppComponent extends Component{
  constructor(props: any) {
    super(props);

    this.state = {
      authUser: null
    };
  }

  public componentDidMount() {
    firebase.auth.onAuthStateChanged((authUser: any) => {
      authUser
        ? this.setState(() => ({ authUser }))
        : this.setState(() => ({ authUser: null }));
    });
  }
  
  public render(){
    return(
      <BrowserRouter>
        <div className="App">
          <Navigation/>

          <Switch>
            <Route exact={true} path={routes.HOME} component={Home} />
            <Route exact={true} path={routes.LOGIN} component={Login} />
            <Route exact={true} path={routes.MACHINES} component={MachineList} />
            <Route exact={true} path={routes.LOGOUT} component={Logout} />
            <Route exact={true} path={routes.SETTINGS} component={Settings} />
          </Switch>
        </div>
      </BrowserRouter>
    );
  }
}

export const App = (AppComponent);