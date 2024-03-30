import { useState, useEffect, useRef } from 'react';
import { fetchCatsByBreed } from '../api/CatApi'; 
import { Cat } from '../models/catModels'; 

interface FetchImagesReturn {
    images: Cat[];
    isLoading: boolean;
    error: string | null;
    hasMoreItems: boolean; 
}

export const useFetchImages = (selectedBreed: string | null, page: number, limit: number): FetchImagesReturn => {
    const [images, setImages] = useState<Cat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true); 

    const imagesRef = useRef<Cat[]>(images);
    const selectedBreedRef = useRef<string | null>(selectedBreed);

    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    useEffect(() => {
        selectedBreedRef.current = selectedBreed;
    }, [selectedBreed]);

    useEffect(() => {
        setIsLoading(true);
        setError(null);
        setImages([]); 
        setHasMoreItems(true); 

        const fetchImagesForNewBreed = async () => {
            try {
                if (selectedBreed) {
                    const fetchedImages = await fetchCatsByBreed(selectedBreed, limit, 1);
                    setImages(fetchedImages);
                    setHasMoreItems(fetchedImages.length > 0);
                }
            } catch (error) {
                setError("Failed to load images. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (selectedBreed) {
            fetchImagesForNewBreed();
        }
    }, [selectedBreed, limit]);

    useEffect(() => {
        const fetchImagesForPage = async () => {
            setIsLoading(true);
            setError(null);
            try {
                if (selectedBreedRef.current) {
                    const fetchedImages = await fetchCatsByBreed(selectedBreedRef.current, limit, page);
                    const newImages = fetchedImages.filter((fetchedImage: Cat) =>
                        !imagesRef.current.some(image => image.id === fetchedImage.id)
                    );

                    setImages(prevImages => [...prevImages, ...newImages]);
                    setHasMoreItems(newImages.length === limit); 
                }
            } catch (error) {
                setError("Failed to load images. Please try again.");
            } finally {
                setIsLoading(false);
            }
        };

        if (page > 1 && selectedBreedRef.current) { 
            fetchImagesForPage();
        }
    }, [page, limit]);


    return { images, isLoading, error, hasMoreItems };
};
