import { createContext, useEffect, useState } from "react";
import { DEMO_CONVERSATIONS, DEMO_USERS } from "/src/app/(private)/dms/_lib/demo_data";
import { api } from '/src/utils/api';

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
    const [userData, setUserData] = useState([]);
    const [activeConversation, setActiveConversation] = useState(DEMO_CONVERSATIONS[`u1-${DEMO_USERS[0].userId}`].messages);
    const [activeReceiver, setActiveReceiver] = useState(null);
    const [activeThread, setActiveThread] = useState(null);
    const [activeProfile, setActiveProfile] = useState(null);
    const [messages, setMessages] = useState([]);

    const findUser = (id) => {
        if (id === loggedInUser.userId) return loggedInUser;
        return userData.find((user) => user.userId === id);
    }

    const handleActiveConversation = (id) => {
        const user = userData.find((u) => u.id === id);
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
                setActiveProfile(null);
            } else {
                setActiveThread([message]);
                setActiveProfile(null)
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

    const handleActiveProfile = (userID) => {
        if (userID) {
            const profile = DEMO_USERS.find((user) => user.userId === userID) || (loggedInUser.userId === userID && loggedInUser);

            if (profile) {
                setActiveThread(null);
                setActiveProfile(profile);
            }
        } else {
            setActiveProfile(null);
        }
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
        loggedInUser,
        activeProfile,
        handleActiveProfile,
        messages
    };

    useEffect(() => {
        const fetchUserData = async () => {
            try {
                const response = await api.get(`/user/inbox`);
                if (response.data && response.data?.success) {
                    setUserData(response.data.data);
                    setActiveReceiver(response.data.data[0]);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }

        fetchUserData();
    }, []);

    useEffect(() => {
        const fetchMessages = async () => {
            try {
                const response = await api.get(`/message/${activeReceiver.id}`);
                if (response.data && response.data?.success) {
                    setMessages(response.data.data);
                }
            } catch (error) {
                console.error("Error fetching user data:", error);
            }
        }
        if (activeReceiver) {
            fetchMessages();
        }
    }, [activeReceiver])

    return (
        <ChatContext.Provider value={contextValue}>
            {children}
        </ChatContext.Provider>
    )
}