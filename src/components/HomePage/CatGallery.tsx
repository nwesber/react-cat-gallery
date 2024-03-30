import React from 'react';
import { Card, Row, Col } from 'react-bootstrap';
import { useCatContext } from '../../context/CatContext';
import styles from './CatGallery.module.css';
import { usePagination } from '../../context/PaginationContext';
import { Link } from 'react-router-dom';
import { useFetchImages } from '../../hooks/useCatData';

const CatGallery: React.FC = () => {
    const { selectedBreed } = useCatContext();
    const { page, setPage } = usePagination();
    const { images, isLoading, error, hasMoreItems } = useFetchImages(selectedBreed, page, 10);

    const handleMore = () => {
        setPage(prevPage => prevPage + 1);
    };

    return (
        <>

            {error && <div className="text-center mt-4 bg-red py-3 text-white">{"Apologies but we could not load new cats for you at this time! Miau!"}</div>}
            
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

            {!isLoading && hasMoreItems && (
                <div className="text-center mt-4">
                    <button className="btn btn-primary" onClick={handleMore}>Load More</button>
                </div>
            )}
        </>
    );
};

export default CatGallery;
