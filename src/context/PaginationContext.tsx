import React, { createContext, useContext, useState, ReactNode } from 'react';

// This interface describes what the PaginationContext will provide.
interface PaginationContextType {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    resetPage: () => void;
}

// Creating a context for pagination with an initial value of undefined.
const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

// Props definition for the PaginationProvider component. Expects children React nodes.
interface PaginationProviderProps {
    children: ReactNode;
}

// Provider component for pagination. This wraps parts of the app that need pagination.
export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
    const [page, setPage] = useState(1);
    const resetPage = () => setPage(1);

    return (
        <PaginationContext.Provider value={{ page, setPage, resetPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

// Custom hook for accessing pagination context.
export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};
