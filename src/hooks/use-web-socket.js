import { useEffect, useState } from "react";

const useWebSocket = (userId) => {
    const [ws, setWs] = useState(null);
    const [messages, setMessages] = useState([]);

    useEffect(() => {
        const socket = new WebSocket(`ws://localhost:5003?userId=${userId}`);

        socket.onopen = () => {
            console.log("Connected to WebSocket");
        };

        socket.onmessage = (event) => {
            try {
                const message = JSON.parse(event.data);

                // Ensure messages state updates properly
                setMessages((prevMessages) => [...prevMessages, message]);
            } catch (error) {
                console.error("Error parsing message:", error);
            }
        };

        socket.onclose = () => {
            console.log("WebSocket disconnected");
        };

        setWs(socket);

        return () => {
            socket.close();
        };
    }, [userId]);

    const sendMessage = (data) => {
        if (ws && ws.readyState === WebSocket.OPEN) {
            ws.send(JSON.stringify({ type: "MESSAGE", ...data }));
        } else {
            console.error("WebSocket is not open.");
        }
    };

    return { messages, sendMessage };
};

export default useWebSocket;
