'use client';

import React, { createContext, useContext, useEffect, useMemo, useRef, useState } from 'react';
import { io } from 'socket.io-client';
import { toast } from 'sonner';

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
      toast.success('Chat connected');
      setConnected(true);
    });

    socketRef.current.on('disconnect', () => {
      toast.error('Chat disconnected');
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

      createChannel: ({ name, type, members, workspaceId }) => {
        socketRef.current.emit('create-channel', { name, type, members, workspaceId });
      },

      joinChannel: (channelId) => {
        socketRef.current.emit('join-channel', channelId);
      },
      joinDirectChannel: (channelId) => {
        socketRef.current.emit('join-direct-channel', channelId);
      },
      sendChannelMessage: ({ channelId, message, replyId, attachments }) => {
        socketRef.current.emit('send-channel-message', { channelId, message, replyId, attachments });
      },
      editChannelMessage: ({ channelId, messageId, content }) => {
        socketRef.current.emit('edit-channel-message', { channelId, messageId, content });
      },
      deleteChannelMessage: ({ channelId, messageId }) => {
        socketRef.current.emit('delete-channel-message', { channelId, messageId });
      },
      reactToChannelMessage: ({ channelId, messageId, emoji, replyId }) => {
        socketRef.current.emit('create-channel-reaction', { channelId, messageId, emoji, replyId });
      },
      removeChannelReaction: ({ channelId, messageId, emoji, replyId }) => {
        socketRef.current.emit('delete-channel-reaction', { channelId, messageId, emoji, replyId });
      },
      pinChannelMessage: ({ channelId, messageId, isPinned }) => {
        socketRef.current.emit('pin-channel-message', { channelId, messageId, isPinned });
      },
      startTyping: (channelId) => {
        socketRef.current.emit('start-typing', { channelId });
      },
      stopTyping: (channelId) => {
        socketRef.current.emit('stop-typing', { channelId });
      },
      sendDirectMessage: ({ directChannelId, message, replyId, attachments, options }) => {
        socketRef.current.emit('send-direct-message', { directChannelId, message, replyId, attachments, options });
      },
      editDirectMessage: ({ directChannelId, messageId, content, replyId }) => {
        socketRef.current.emit('edit-direct-message', { directChannelId, messageId, content, replyId });
      },
      deleteDirectMessage: ({ directChannelId, messageId }) => {
        socketRef.current.emit('delete-direct-message', { directChannelId, messageId });
      },

      createDirectChannel: ({ receiverId, workspaceId }) => {
        socketRef.current.emit('create-direct-channel', { receiverId, workspaceId });
      },

      reactToDirectMessage: ({ directChannelId, messageId, emoji, replyId }) => {
        socketRef.current.emit('create-direct-channel-reaction', { directChannelId, messageId, emoji, replyId });
      },
      removeDirectMessageReaction: ({ directChannelId, messageId, emoji, replyId }) => {
        socketRef.current.emit('delete-direct-channel-reaction', { directChannelId, messageId, emoji, replyId });
      },
      pinDirectMessage: ({ directChannelId, messageId, isPinned }) => {
        socketRef.current.emit('pin-direct-message', { directChannelId, messageId, isPinned });
      },
    };
  }, [connected]); // recalculate once connected

  return <SocketContext.Provider value={socketActions}>{children}</SocketContext.Provider>;
};

export const useSocket = () => useContext(SocketContext);
