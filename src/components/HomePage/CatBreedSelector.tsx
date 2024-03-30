import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useCatContext } from '../../context/CatContext'; 
import { fetchBreeds } from '../../api/CatApi';
import { usePagination } from '../../context/PaginationContext';
import { useNavigate  } from 'react-router-dom';

/**
 * This component lets users pick a cat breed from a dropdown.
 */
const CatBreedSelector: React.FC = () => {
    const [breeds, setBreeds] = useState<any[]>([]);
    const { selectedBreed, setSelectedBreed } = useCatContext();
    const { resetPage } = usePagination();
    const navigate = useNavigate();

    // Gets the list of cat breeds from the server when the component first shows up.
    useEffect(() => {
        fetchBreeds()
        .then(setBreeds)
        .catch(error => console.error("Error fetching breeds:", error));
    }, []);

    // This function runs when a user picks a breed from the dropdown.
    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(e.target.value);
        resetPage();
        navigate(`?breed=${e.target.value}`);
    };

    return (
        <Form className='my-2'>
            <Form.Group controlId="breedSelector">
                <Form.Label className='fw-bold'>Select a Cat Breed:</Form.Label>
                <Form.Select 
                    aria-label="Select a cat breed" 
                    onChange={(e) => handleBreedChange(e)} 
                    value={selectedBreed}
                    className='form-control'
                >
                    <option value="">Select Breed</option>
                    {breeds.map(breed => (
                        <option key={breed.id} value={breed.id}>{breed.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
};

export default CatBreedSelector;
