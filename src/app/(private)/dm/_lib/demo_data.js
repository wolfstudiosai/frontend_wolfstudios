export const USER_DEMO_DATA = [
    {
        id: 1,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "10:05 PM"
    },
    {
        id: 2,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit. The quick brown fox jumps over the lazy dog.",
        timestamp: "09:11 PM"
    },
    {
        id: 3,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "12 Feb, 2025"
    },
    {
        id: 4,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "11 Jan, 2023"
    },
    {
        id: 5,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "19 Dec, 2023"
    },
    {
        id: 6,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit. The quick brown fox jumps over the lazy dog.",
        timestamp: "09:11 PM"
    },
    {
        id: 7,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "10:05 PM"
    },
    {
        id: 8,
        user: {
            name: 'Fazly Alahi'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit. The quick brown fox jumps over the lazy dog.",
        timestamp: "09:11 PM"
    },
    {
        id: 9,
        user: {
            name: 'Combina Key'
        },
        last_message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipisicing elit.",
        timestamp: "12 Feb, 2025"
    },
]


export const DEMO_USERS = [
    {
        userId: "u2",
        name: "Fazly Alahi",
        profile_image: "https://i.pravatar.cc/150?img=2",
        last_message: {
            message: "The quick brown fox jumps over the lazy dog.",
            timestamp: "2025-02-23T21:11:00Z",
        },
        active: true,
        bookmark: false
    },
    {
        userId: "u7",
        name: "Test User 3",
        profile_image: "https://i.pravatar.cc/150?img=9",
        last_message: {
            message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipiscing elit.",
            timestamp: "2025-02-23T22:05:00Z",
        },
        active: false,
        bookmark: false
    },
    {
        userId: "u3",
        name: "Riyazul Haque",
        profile_image: "https://i.pravatar.cc/150?img=3",
        last_message: {
            message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipiscing elit.",
            timestamp: "2025-02-12T19:00:00Z",
        },
        active: false,
        bookmark: false
    },
    {
        userId: "u4",
        name: "John Doe",
        profile_image: "https://i.pravatar.cc/150?img=1",
        last_message: {
            message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipiscing elit.",
            timestamp: "2025-01-11T17:30:00Z",
        },
        active: false,
        bookmark: false
    },
    {
        userId: "u5",
        name: "Test User",
        profile_image: "https://i.pravatar.cc/150?img=5",
        last_message: {
            message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipiscing elit.",
            timestamp: "2024-12-19T14:15:00Z",
        },
        active: true,
        bookmark: false
    },
    {
        userId: "u6",
        name: "Test User 2",
        profile_image: "https://i.pravatar.cc/150?img=4",
        last_message: {
            message: "This is the last message. Lorem ipsum, dolor sit amet consectetur adipiscing elit.",
            timestamp: "2025-02-23T22:05:00Z",
        },
        active: false,
        bookmark: false
    },
];

export const DEMO_CONVERSATIONS = {
    "u1-u2": {
        messages: [
            {
                messageId: "m1",
                senderId: "u1",
                content: "Hey Fazly, how are you?",
                timestamp: "2025-02-23T22:00:00Z",
                status: "sent",
                thread_conversation: [
                    {
                        messageId: "thread_m1",
                        senderId: "u1",
                        content: "Hey Fazly, how are you?",
                        timestamp: "2025-02-23T21:00:00Z",
                        status: "sent",
                    },
                    {
                        messageId: "thread_m2",
                        senderId: "u2",
                        content: "I'm fine, how about you?",
                        timestamp: "2025-02-23T21:00:00Z",
                        status: "sent",
                    },
                    {
                        messageId: "thread_m3",
                        senderId: "u1",
                        content: "I'm also fine.",
                        timestamp: "2025-02-23T21:00:00Z",
                        status: "sent",
                    },
                    {
                        messageId: "thread_m4",
                        senderId: "u2",
                        content: "Are you coming to the meeting?",
                        timestamp: "2025-02-23T21:00:00Z",
                        status: "sent",
                    },
                    {
                        messageId: "thread_m5",
                        senderId: "u1",
                        content: "Sure, I'll be there.",
                        timestamp: "2025-02-23T21:00:00Z",
                        status: "sent",
                    }
                ]
            },
            {
                messageId: "m2",
                senderId: "u2",
                content: "The quick brown fox jumps over the lazy dog.",
                timestamp: "2025-02-23T21:11:00Z",
                status: "seen"
            },
            {
                messageId: "m3",
                senderId: "u1",
                content: "The quick brown fox jumps over the lazy dog.",
                timestamp: "2025-02-23T21:11:00Z",
                status: "seen"
            },
            {
                messageId: "m4",
                senderId: "u2",
                content: "The quick brown fox jumps over the lazy dog.",
                timestamp: "2025-02-23T21:11:00Z",
                status: "seen"
            },
            {
                messageId: "m5",
                senderId: "u1",
                content: "The quick brown fox jumps over the lazy dog.",
                timestamp: "2025-02-23T21:11:00Z",
                status: "seen"
            }
        ]
    },
    "u1-u3": {
        messages: [
            {
                messageId: "m1",
                senderId: "u3",
                content: "Are you coming to the meeting?",
                timestamp: "2025-02-12T19:00:00Z",
                status: "delivered"
            }
        ]
    }
}