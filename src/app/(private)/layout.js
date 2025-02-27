"use client"

import { ChatContextProvider } from '/src/contexts/chat';

export default function PrivateLayout({ children }) {
    return (
        <ChatContextProvider>
            {children}
        </ChatContextProvider>
    )
}