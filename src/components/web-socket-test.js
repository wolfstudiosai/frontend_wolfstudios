"use client";

import { useState } from "react";
import useWebSocket from "../hooks/use-web-socket";

const WebSocketTest = ({ userId = '26a8b530-87d4-4ec1-8bfd-6fb177cc7412', receiverId = '3a95d6ee-18bd-462f-ab29-dcd141b09a67' }) => {
    const { messages, sendMessage } = useWebSocket(userId);

    console.log(messages);
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (!message.trim()) return;

        const newMessage = {
            senderId: userId,
            receiverId,
            content: message,
        };

        sendMessage(newMessage);
        setMessage("");
    };

    return (
        <div className="p-4 border rounded">
            <div className="h-60 overflow-y-auto mb-2 border p-2">
                {messages.length === 0 ? (
                    <p className="text-gray-500 text-center">No messages yet</p>
                ) : (
                    messages.map((msg, index) => (
                        <div key={index} className={`p-2 ${msg.sender_id === userId ? "text-right" : "text-left"}`}>
                            <strong>{msg.sender_id === userId ? "You" : "Them"}:</strong> {msg.content}
                        </div>
                    ))
                )}
            </div>
            <div className="flex gap-2">
                <input
                    type="text"
                    className="border p-2 flex-grow"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type a message..."
                />
                <button className="bg-blue-500 text-white p-2" onClick={handleSend}>
                    Send
                </button>
            </div>
        </div>
    );
};

export default WebSocketTest;
