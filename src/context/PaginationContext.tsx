import React, { createContext, useContext, useState, ReactNode } from 'react';

interface PaginationContextType {
    page: number;
    setPage: React.Dispatch<React.SetStateAction<number>>;
    resetPage: () => void;
}

const PaginationContext = createContext<PaginationContextType | undefined>(undefined);

interface PaginationProviderProps {
    children: ReactNode;
}

export const PaginationProvider: React.FC<PaginationProviderProps> = ({ children }) => {
    const [page, setPage] = useState(1);
    const resetPage = () => setPage(1);

    return (
        <PaginationContext.Provider value={{ page, setPage, resetPage }}>
            {children}
        </PaginationContext.Provider>
    );
};

export const usePagination = () => {
    const context = useContext(PaginationContext);
    if (!context) {
        throw new Error('usePagination must be used within a PaginationProvider');
    }
    return context;
};
