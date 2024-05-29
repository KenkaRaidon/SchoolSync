'use client'
import React, { createContext, useState, useEffect, FC } from 'react';
import { ColorRing } from 'react-loader-spinner';
import LoadingSpinner from '../componentes/loadingSpinner/LoadingSpinner';

export const LoadingContext = createContext({});

export const LoadingProvider = ({ children }) => {

    const [isLoading, setIsLoading] = useState(false);

    return (
        <LoadingContext.Provider value={{ setIsLoading }}>
            {children}
            {isLoading && <LoadingSpinner />}
        </LoadingContext.Provider>
    );
};