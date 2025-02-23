import { createContext, useState } from "react";
import { DEMO_CONVERSATIONS, DEMO_USERS } from "../_lib/demo_data";

const loggedInUser = {
    userId: "u1",
    name: "Combina Key",
    profile_image: "https://i.pravatar.cc/150?img=4",
    last_message: {
        message: "The quick brown fox jumps over the lazy dog.",
        timestamp: "2025-02-23T21:11:00Z",
    },
    active: true,
    bookmark: false
}

export const ChatContext = createContext({});

export const ChatContextProvider = ({ children }) => {
    const [userData, setUserData] = useState(DEMO_USERS);
    const [activeConversation, setActiveConversation] = useState(DEMO_CONVERSATIONS[`u1-${DEMO_USERS[0].userId}`].messages);
    const [activeReceiver, setActiveReceiver] = useState(DEMO_USERS[0]);
    const [activeThread, setActiveThread] = useState(null);

    const findUser = (id) => {
        if (id === loggedInUser.userId) return loggedInUser;
        return userData.find((user) => user.userId === id);
    }

    const handleActiveConversation = (id) => {
        const user = userData.find((u) => u.userId === id);
        setActiveReceiver(user);
        setActiveConversation(DEMO_CONVERSATIONS[`u1-${id}`]?.messages);
    }

    const handleActiveThread = (messageId) => {
        if (!messageId) {
            setActiveThread(null);
            return;
        }
        const message = activeConversation.find((m) => m.messageId === messageId);
        if (message) {
            const thread = message?.thread_conversation
            if (thread) {
                setActiveThread(thread);
            } else {
                setActiveThread([message])
            }
        }
    }

    const handleSearchUser = (searchTerm) => {
        const result = DEMO_USERS.filter((user) =>
            user.name.toLowerCase().includes(searchTerm.toLowerCase())
        )
        setUserData(result)
    }

    const handleActiveUser = (active) => {
        if (active) {
            const result = DEMO_USERS.filter((user) =>
                user.active === active
            )
            setUserData(result)
        } else {
            setUserData(DEMO_USERS)
        }
    }

    const handleAddMessage = () => {
        console.log("add message handler");
    }

    const contextValue = {
        userData,
        activeConversation,
        findUser,
        activeReceiver,
        handleActiveConversation,
        activeThread,
        handleActiveThread,
        handleSearchUser,
        handleActiveUser,
        handleAddMessage,
        loggedInUser
    };

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}