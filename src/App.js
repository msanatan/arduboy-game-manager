import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Sidebar from './Sidebar';
import './App.css';

function App() {
  return (
    <Container fluid className="d-flex flex-column h-100">
      <Row className="flex-fill">
        <Col md="4" className="sidebar-container">
          <Sidebar />
        </Col>
        <Col md="8">
          <p>Game details to come here soon</p>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
