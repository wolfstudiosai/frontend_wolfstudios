import { useRef } from 'react';

export function useFilterDebounced(setState, delay = 500) {
    const debounceRef = useRef(null);

    const setDebounced = (value, cb) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setState(value);
            cb(value)
        }, delay);
    };

    return setDebounced;
}