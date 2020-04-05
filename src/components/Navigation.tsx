import * as React from "react";
import { Link } from "react-router-dom";

import { AuthUserContext } from "../firebase/AuthUserContext";

import '../../node_modules/bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Form, FormControl, Button } from "react-bootstrap";
import * as routes from "../constants/routes";

export const Navigation = () => (
    <AuthUserContext.Consumer>
        {authUser => (authUser ? <NavigationAuth /> : <NavigationNonAuth />)}
    </AuthUserContext.Consumer>
);

const NavigationAuth = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Berry Harvest Optimizer</Navbar.Brand>
            <Nav className="mr-auto">
            <Link to="/" className="nav-link">Home</Link>
            <Link to={routes.MACHINES} className="nav-link">List</Link>
            <Link to="/data" className="nav-link">Data</Link>
            <Link to={routes.SETTINGS} className="nav-link">Settings</Link>
            <Link to={routes.LOGOUT} className="nav-link">Logout</Link>
            </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form>
    </Navbar>
);

const NavigationNonAuth = () => (
    <Navbar bg="dark" variant="dark">
        <Navbar.Brand href="">Berry Harvest Optimizer</Navbar.Brand>
            <Nav className="mr-auto">
            <Link to={routes.HOME} className="nav-link">Home</Link>
            <Link to={routes.LOGIN} className="nav-link">Login</Link>
            <Link to="/data" className="nav-link">Data</Link>
            <Link to={routes.MACHINES} className="nav-link">List</Link>
            </Nav>
        <Form inline>
            <FormControl type="text" placeholder="Search" className="mr-sm-2" />
            <Button variant="outline-info">Search</Button>
        </Form>
    </Navbar>
);