import { useRef } from 'react';
import { validateFilters } from '/src/utils/helper';

export function useFilterDebounced(setState, updateView, delay = 500) {
    const debounceRef = useRef(null);

    const setDebounced = (value) => {
        if (debounceRef.current) {
            clearTimeout(debounceRef.current);
        }
        debounceRef.current = setTimeout(() => {
            setState(value);
            const validFilters = validateFilters(value);
            if (validFilters.valid) {
                updateView(value);
            }
        }, delay);
    };

    return setDebounced;
}
