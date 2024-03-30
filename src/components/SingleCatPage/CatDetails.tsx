import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Card, Spinner, Button, Row, Col, Breadcrumb } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { Cat } from '../../models/catModels';
import { fetchCatDetails } from '../../api/CatApi';

const CatDetails: React.FC = () => {
    const { catId } = useParams<{ catId?: string }>();
    const [catDetails, setCatDetails] = useState<Cat | null>(null);
    const [breedId, setBreedId] = useState<string>('');

    useEffect(() => {
        if (catId) {
            const fetchDetails = async () => {
                try {
                    const data = await fetchCatDetails(catId);
                    setCatDetails(data);
                    if (data.breeds && data.breeds.length > 0) {
                        setBreedId(data.breeds[0].id);
                    }
                } catch (error) {
                    console.error('Error fetching cat details:', error);
                }
            };
    
            fetchDetails();
        }
    }, [catId]);

    return (
        <div className='my-3'>
            {catDetails ? (
                <>  
                    {catDetails.breeds && catDetails.breeds.length > 0 && (
                        <>
                            <Breadcrumb>
                                <Breadcrumb.Item href={`/?breed=${breedId}`}>Cat Gallery</Breadcrumb.Item>
                                <Breadcrumb.Item active>Cat Details</Breadcrumb.Item>
                            </Breadcrumb>
                    
                            <Card>
                                <Row>
                                    <Col md={8}>
                                        <Card.Body>
                                            <Card.Title>{catDetails.breeds[0].name}</Card.Title>
                                            <Card.Text>
                                                <strong>Origin:</strong> {catDetails.breeds[0].origin}
                                                <br />
                                                <strong>Temperament:</strong> {catDetails.breeds[0].temperament}
                                                <br />
                                                <strong>Description:</strong> {catDetails.breeds[0].description}
                                            </Card.Text>
                                            <Link to={`/?breed=${breedId}`}>
                                                <Button variant="primary">Back to Cat Gallery</Button>
                                            </Link>
                                        </Card.Body>
                                    </Col>
                                    <Col md={4}>
                                        <Card.Img variant="top" src={catDetails.url} alt="Cat" />
                                    </Col>
                                </Row>
                            </Card>
                        </>
                     )}
                </>                            
            ) : (
                <Spinner animation="border" role="status">
                    <span className="visually-hidden">Loading...</span>
                </Spinner>
            )}
        </div>
    );
};

export default CatDetails;
