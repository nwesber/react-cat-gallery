import React from 'react';
import { Navbar, Container } from 'react-bootstrap';

/**
 * Header component for the application.
 */
const Header: React.FC = () => (
    <Navbar bg="light" variant="light" className='shadow'>
        <Container>
            <Navbar.Brand href="/">Cat Gallery</Navbar.Brand>
        </Container>
    </Navbar>
);

export default Header;
