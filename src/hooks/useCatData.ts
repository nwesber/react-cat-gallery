import { useState, useEffect, useRef } from 'react';
import { fetchCatsByBreed } from '../api/CatApi'; 
import { Cat } from '../models/catModels'; 

// Describes the shape of the data and state indicators returned by the hook.
interface FetchImagesReturn {
    images: Cat[];
    isLoading: boolean;
    error: string | null;
    hasMoreItems: boolean; 
}

// Custom hook to fetch images based on the breed, page, and limit.
export const useFetchImages = (selectedBreed: string | null, page: number, limit: number): FetchImagesReturn => {
    // State to store the fetched images and status indicators.
    const [images, setImages] = useState<Cat[]>([]);
    const [isLoading, setIsLoading] = useState<boolean>(false);
    const [error, setError] = useState<string | null>(null);
    const [hasMoreItems, setHasMoreItems] = useState<boolean>(true); 

    // Refs to hold the current values of images and selectedBreed to use in effects.
    const imagesRef = useRef<Cat[]>(images);
    const selectedBreedRef = useRef<string | null>(selectedBreed);

    // Updates the refs when images or selectedBreed change.
    useEffect(() => {
        imagesRef.current = images;
    }, [images]);

    useEffect(() => {
        selectedBreedRef.current = selectedBreed;
    }, [selectedBreed]);

    // Fetches images whenever the selected breed or limit changes.
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

    // Fetches additional images when the page is increased.
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

                    // Appends new, unique images.
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

    // Returns the fetched images and status indicators.
    return { images, isLoading, error, hasMoreItems };
};
