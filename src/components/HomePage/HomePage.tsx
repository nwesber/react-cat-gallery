import React from 'react';
import CatBreedSelector from './CatBreedSelector';
import CatGallery from './CatGallery';
import { PaginationProvider } from '../../context/PaginationContext';

/**
 * This is the HomePage component. It's what users see first.
 */
const HomePage: React.FC = () => {
    return (
        <div className='my-3'>
            <h1>Welcome to the Cat Gallery</h1>
            <PaginationProvider>
                <CatBreedSelector />
                <CatGallery />
            </PaginationProvider>
        </div>
    );
};

export default HomePage;
