'use client';

import * as React from 'react';

export const CheckoutContext = React.createContext({});

export function CheckoutProvider({ children }) {
    const [selectedService, setSelectedService] = React.useState();
    const [selectedTier, setSelectedTier] = React.useState([]);

    React.useEffect(() => {
        const service = localStorage.getItem('selectedService');
        const tier = localStorage.getItem('selectedTier');
        if (service) {
            setSelectedService(JSON.parse(service));
        }
        if (tier) {
            setSelectedTier(JSON.parse(tier));
        }
    }, []);

    const addServiceToCart = (service) => {
        setSelectedService(service);
        setSelectedTier([]);
        localStorage.setItem('selectedService', JSON.stringify(service));
        localStorage.setItem('selectedTier', JSON.stringify([]));
    };

    const removeServiceFromCart = () => {
        setSelectedService(undefined);
        localStorage.removeItem('selectedService');
    };

    const addTierToCart = (tier) => {
        const updatedTier = selectedTier.some((item) => item.id === tier.id) ? selectedTier.filter((item) => item.id !== tier.id) : [...selectedTier, tier];
        setSelectedTier(updatedTier);
        localStorage.setItem('selectedTier', JSON.stringify(updatedTier));
    };

    const getTotalAmount = () => {
        const totalAmount = selectedTier.reduce((total, tier) => total + tier.amount, Number(selectedService?.price));
        return totalAmount;
    };

    return (
        <CheckoutContext.Provider value={{ selectedService, setSelectedService, selectedTier, setSelectedTier, addServiceToCart, removeServiceFromCart, addTierToCart, getTotalAmount }}>
            {children}
        </CheckoutContext.Provider>
    );
}

export function useCheckout() {
    return React.useContext(CheckoutContext);
}
