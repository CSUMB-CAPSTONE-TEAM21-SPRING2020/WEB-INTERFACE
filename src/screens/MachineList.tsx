import React, { Component } from "react";
import Accordion from 'react-bootstrap/Accordion';
import Card from 'react-bootstrap/Card';


export default class MachineList extends Component {
    render() {
        return (
            <div className="App">
      <Accordion defaultActiveKey="">
        <Card className="machine-card">
          <Accordion.Toggle as={Card.Header} eventKey="0">
            Machine No. 1
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="0">
            <Card.Body>
              <p>% Green: 70</p>
              <p>% Blue: 20</p>
              <p>% Other: 10</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="machine-card">
          <Accordion.Toggle as={Card.Header} eventKey="1">
            Machine No. 2
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="1">
            <Card.Body>
              <p>% Green: 7</p>
              <p>% Blue: 69</p>
              <p>% Other: 24</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
        <Card className="machine-card">
          <Accordion.Toggle as={Card.Header} eventKey="2">
            Machine No. 3
          </Accordion.Toggle>
          <Accordion.Collapse eventKey="2">
            <Card.Body>
              <p>% Green: 11</p>
              <p>% Blue: 88</p>
              <p>% Other: 1</p>
            </Card.Body>
          </Accordion.Collapse>
        </Card>
      </Accordion>
    </div>
        );
    }
}