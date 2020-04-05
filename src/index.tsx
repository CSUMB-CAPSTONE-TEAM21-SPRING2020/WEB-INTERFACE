import React from 'react';
import ReactDOM from "react-dom";
import { BrowserRouter } from "react-router-dom";
import './styles/index.css';
import {App} from './App';
import * as serviceWorker from './serviceWorker';

//import FirebaseContext from './components/context';
//import Firebase from "./components/Firebase/firebase";
//temp solution until figure out the specific type Firebase returns.
//const FirebaseContext = React.createContext<any|null>(null);

ReactDOM.render(
        <App/>,
    document.getElementById("root")
);

//ReactDOM.render(<App />, document.getElementById('root'));

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
