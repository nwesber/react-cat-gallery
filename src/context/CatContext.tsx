import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Cat } from '../models/catModels';

// Default value for when no breed is selected.
const DEFAULT_BREED = 'breed=';

// Creating a context for cats. This lets us share cat data across components.
const CatContext = createContext<CatContextType | undefined>(undefined);

// Describing what type of data and functions will be in the context.
interface CatContextType {
    selectedBreed: string;
    setSelectedBreed: (breed: string) => void;
    images: any[];
    setImages: (images: any[]) => void;
}

// Props for the CatProvider component. It expects to receive children elements.
interface CatProviderProps {
    children: ReactNode;
}

// This component provides the CatContext to its child components.
export const CatProvider: React.FC<CatProviderProps> = ({ children }) => {
    const location = useLocation();

    const initialBreed = new URLSearchParams(location.search).get('breed') || DEFAULT_BREED;

    const [selectedBreed, setSelectedBreed] = useState<string>(initialBreed);
    const [images, setImages] = useState<Cat[]>([]);

    useEffect(() => {
        const searchParams = new URLSearchParams(location.search);
        const breedFromQuery = searchParams.get('breed') || DEFAULT_BREED;
        setSelectedBreed(breedFromQuery);
    }, [location.search]);

    return (
        <CatContext.Provider value={{ selectedBreed, setSelectedBreed, images, setImages }}>
            {children}
        </CatContext.Provider>
    );
};

// Custom hook to use the CatContext easily in any component.
export const useCatContext = () => {
    const context = useContext(CatContext);
    if (!context) throw new Error('useCatContext must be used within a CatProvider');
    return context;
};
