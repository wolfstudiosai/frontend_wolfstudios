import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const socketRef = useRef(null);
  const [connected, setConnected] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem('accessToken');
    if (!token || socketRef.current) return;

    socketRef.current = io(process.env.NEXT_PUBLIC_SOCKET_URL, {
      auth: { token },
    });

    socketRef.current.on('connect', () => {
      console.log('Socket connected');
      setConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      console.log('Socket disconnected');
      setConnected(false);
    });

    return () => {
      socketRef.current?.disconnect();
    };
  }, []);

  // Only expose functions once socket is ready
  const socketActions = useMemo(() => {
    if (!socketRef.current) return {};

    return {
      socket: socketRef.current,
      connected,
      joinChannel: (channelId) => {
        socketRef.current.emit('join-channel', channelId);
      },
      joinDirectChannel: (channelId) => {
        socketRef.current.emit('join-direct-channel', channelId);
      },
      sendChannelMessage: ({ channelId, message }) => {
        socketRef.current.emit('send-channel-message', { channelId, message });
      },
      editChannelMessage: ({ channelId, messageId, content }) => {
        socketRef.current.emit('edit-channel-message', { channelId, messageId, content });
      },
      deleteChannelMessage: ({ channelId, messageId }) => {
        socketRef.current.emit('delete-channel-message', { channelId, messageId });
      },
      sendDirectMessage: ({ directChannelId, message }) => {
        socketRef.current.emit('send-direct-message', { directChannelId, message });
      },

      startTyping: (channelId) => {
        socketRef.current.emit('start-typing', { channelId });
      },
      stopTyping: (channelId) => {
        socketRef.current.emit('stop-typing', { channelId });
      },
      reactToChannelMessage: ({ channelId, messageId, emoji }) => {
        socketRef.current.emit('create-channel-reaction', { channelId, messageId, emoji });
      },
      removeChannelReaction: ({ channelId, messageId, emoji }) => {
        socketRef.current.emit('delete-channel-reaction', { channelId, messageId, emoji });
      },
    };
  }, [connected]); // recalculate once connected

  return <SocketContext.Provider value={socketActions}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
