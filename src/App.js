import React from 'react';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';
import Navbar from 'react-bootstrap/Navbar';
import Button from 'react-bootstrap/Button';
import './App.css';

function App() {
  return (
    <Container fluid className="d-flex flex-column h-100 p-0">
      <Navbar bg="dark" variant="dark">
        <Navbar.Brand className="mx-auto">Arduboy Game Manager</Navbar.Brand>
      </Navbar>
      <Row className="h-100">
        <Col xs={{ span: 4, offset: 4 }} className="align-self-center">
          <Button variant="primary" size="lg" block>Upload Hex</Button>
        </Col>
      </Row>
    </Container>
  );
}

export default App;
