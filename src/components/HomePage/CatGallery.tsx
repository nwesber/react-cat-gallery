import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useCatContext } from '../../context/CatContext';
import styles from './CatGallery.module.css';
import { usePagination } from '../../context/PaginationContext';
import { Link } from 'react-router-dom';
import { useFetchImages } from '../../hooks/useCatData';

/**
 * CatGallery displays a grid of cat images based on the selected breed.
 */
const CatGallery: React.FC = () => {
    // Access selected breed and pagination context.
    const { selectedBreed } = useCatContext();
    const { page, setPage } = usePagination();

    // Fetch images using the custom hook based on selected breed and current page.
    const { images, isLoading, error, hasMoreItems } = useFetchImages(selectedBreed, page, 10);

    // Function to load more images (next page).
    const handleMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>
            {/* Show error message if there was an error fetching the images. */}
            {error && 
                <div className="text-center mt-4 bg-red py-3 text-white">
                    {"Apologies but we could not load new cats for you at this time! Miau!"}
                </div>
            }
            
            {/* Display images in a responsive grid. */}
            <Row xs={1} md={2} lg={4} className="g-4">
                {images.length === 0 ? (
                    <div className="d-flex justify-content-center align-items-center w-100">
                        <div className='my-3'>No Cats Available</div>
                    </div>
                ) : (
                    images.map((cat, idx) => (
                        <Col key={idx}>
                            <Card className="h-100 shadow">
                                <div className={styles.cardContainer}>
                                    <Card.Img variant="top" src={cat.url} alt="Cat" className={styles.cardImage} loading="lazy" />
                                </div>
                                <Card.Body>
                                    <Link to={`/cats/${cat.id}`} className="btn btn-primary">View Details</Link>
                                </Card.Body>
                            </Card>
                        </Col>
                    ))
                )}
            </Row>
            
            {/* Button to load more images if not loading and more items are available. */}
            {!isLoading && hasMoreItems && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleMore}>Load More</button>
                </div>
            )}
        </>
    );
};

export default CatGallery;
