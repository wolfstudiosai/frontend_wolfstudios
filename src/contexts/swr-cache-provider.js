
'use client';
import React from "react";
import { SWRConfig } from "swr";
// 1. Create a localStorage cache provider
const localStorageProvider = () => {
    if (typeof window === 'undefined') return new Map(); // SSR support

    const cache = JSON.parse(localStorage.getItem('swr-cache') || '[]');
    const map = new Map(cache);

    // Save to localStorage before page unload
    window.addEventListener('beforeunload', () => {
        localStorage.setItem('swr-cache', JSON.stringify([...map]));
    });

    return map;
};

// 2. Wrap your app with SWRConfig
export const SWRCacheProvider = ({ children }) => (
    <SWRConfig value={{ provider: localStorageProvider }}>
        {children}
    </SWRConfig>
);