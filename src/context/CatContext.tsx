import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { useLocation } from 'react-router-dom';
import { Cat } from '../models/catModels';

const DEFAULT_BREED = 'breed=';
const CatContext = createContext<CatContextType | undefined>(undefined);

interface CatContextType {
    selectedBreed: string;
    setSelectedBreed: (breed: string) => void;
    images: any[];
    setImages: (images: any[]) => void;
}

interface CatProviderProps {
    children: ReactNode;
}

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

export const useCatContext = () => {
    const context = useContext(CatContext);
    if (!context) throw new Error('useCatContext must be used within a CatProvider');
    return context;
};
