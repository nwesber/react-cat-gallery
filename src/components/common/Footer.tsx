import React from 'react';
import { Container, Row, Col } from 'react-bootstrap';

const Footer: React.FC = () => (
    <Container fluid className="mt-5 bg-light py-3">
        <Row>
            <Col className="text-center">Cat Gallery © 2024</Col>
        </Row>
    </Container>
);

export default Footer;
