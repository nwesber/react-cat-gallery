import React, { useEffect, useState } from 'react';
import { Form } from 'react-bootstrap';
import { useCatContext } from '../../context/CatContext'; 
import { fetchBreeds } from '../../api/CatApi';
import { usePagination } from '../../context/PaginationContext';
import { useNavigate  } from 'react-router-dom';


const CatBreedSelector: React.FC = () => {
    const [breeds, setBreeds] = useState<any[]>([]);
    const { selectedBreed, setSelectedBreed } = useCatContext();
    const { resetPage } = usePagination();
    const navigate = useNavigate();

    useEffect(() => {
        fetchBreeds()
        .then(setBreeds)
        .catch(error => console.error("Error fetching breeds:", error));
    }, []);

    const handleBreedChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setSelectedBreed(e.target.value);
        resetPage();
        navigate(`?breed=${e.target.value}`);
    };

    return (
        <Form className='my-2'>
            <Form.Group controlId="breedSelector">
                <Form.Label className='fw-bold'>Select a Cat Breed:</Form.Label>
                <Form.Select aria-label="Select a cat breed" onChange={(e) => handleBreedChange(e)} defaultValue="" className='form-control'>
                    <option value="">Select Breed</option>
                    {breeds.map(breed => (
                        <option key={breed.id} value={breed.id} selected={breed.id === selectedBreed}>{breed.name}</option>
                    ))}
                </Form.Select>
            </Form.Group>
        </Form>
    );
};

export default CatBreedSelector;
