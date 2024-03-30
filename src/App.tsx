import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import { Container } from 'react-bootstrap';
import { CatProvider } from './context/CatContext';
import HomePage from './components/HomePage/HomePage';
import Header from './components/common/Header';
import Footer from './components/common/Footer';
import CatDetails from './components/SingleCatPage/CatDetails';

const App: React.FC = () => {
    return (
        <Router>
            <CatProvider>
                <Header/>
                <Container>
                    <Routes>
                        <Route path="/" element={<HomePage />} />
                        <Route path="/cats/:catId" element={<CatDetails />} />
                    </Routes>
                </Container>
                <Footer/>
            </CatProvider>
        </Router>
    );
};

export default App;
