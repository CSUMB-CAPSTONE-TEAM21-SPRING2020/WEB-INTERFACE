import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';
import '../styles/Settings.css';

export default class Settings extends Component {
    render() {
        return (
          <div className="auth-wrapper">
          <div className="auth-inner">
          <div className="App">
              <div className="my_machines">
                  <Accordion defaultActiveKey="">
                    <Card className="machine-card">
                      <Accordion.Toggle as={Card.Header} eventKey="0">
                        Machine ID:
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="0">
                        <Card.Body>
                          <button id="0">Remove</button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="machine-card">
                      <Accordion.Toggle as={Card.Header} eventKey="1">
                        Machine ID:
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="1">
                        <Card.Body>
                          <button id="1">Remove</button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                    <Card className="machine-card">
                      <Accordion.Toggle as={Card.Header} eventKey="2">
                        Machine ID:
                      </Accordion.Toggle>
                      <Accordion.Collapse eventKey="2">
                        <Card.Body>
                          <button id="2">Remove</button>
                        </Card.Body>
                      </Accordion.Collapse>
                    </Card>
                  </Accordion>
              </div>
              <div className="machine_add_form">
                <form>
                    <h3>Add Machines</h3>
                    <label>Machine ID</label><br/>
                    <input type="text" id="m_id" value=""/><br/>
                    <button type="submit">Submit</button>
                </form>
              </div>
          </div>
          </div>
          </div>
        );
    }
}
