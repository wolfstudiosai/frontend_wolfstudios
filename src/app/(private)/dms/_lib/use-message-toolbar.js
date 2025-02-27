import { useState } from "react";

export const useMessageToolbar = () => {
    const [showThreadConversation, setShowThreadConversation] = useState(false);

    const openThreadConversation = () => {
        setShowThreadConversation(true)
    };
    const closeThreadConversation = () => setShowThreadConversation(false);

    return {
        showThreadConversation,
        openThreadConversation,
        closeThreadConversation
    }
}