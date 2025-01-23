'use client';

import React, { useEffect, useCallback, useState } from 'react';
import useAuth from '@/hooks/useAuth';

import {api, } from '@/utils/api';
import { createClient } from '../../../lib/supabase/client';


function noop(){
  return undefined;
}
export const ChatContext = React.createContext({
  contacts: [],
  threads: [],
  messages: new Map(),
  createThread: noop,
  markAsRead: noop,
  createMessage: noop,
  editMessage: noop,
  deleteMessage: noop,
  openDesktopSidebar: true,
  setOpenDesktopSidebar: noop,
  openMobileSidebar: true,
  setOpenMobileSidebar:noop,
});

export function ChatProvider({ children
  ,contacts: initialContacts = []
  ,threads: initialThreads = []
  ,messages: initialMessages = new Map()

 }) {
  const [contacts, setContacts] = useState([]);
  const [threads, setThreads] = useState([]);
  const [messages, setMessages] = useState(new Map());
  const [openDesktopSidebar, setOpenDesktopSidebar] = useState(true);
  const [openMobileSidebar, setOpenMobileSidebar] = useState(false);

  // supabase 
  const supabase = createClient();

  const { userInfo } = useAuth(); 
  const userId = userInfo?.email;

  useEffect(() => {
    setContacts(initialContacts);
  }, [initialContacts]);

  useEffect(() => {
    setThreads(initialThreads);
    // console.log("initial threads:",initialThreads);
  }, [initialThreads]);

  useEffect(() => {
    
    setMessages(
      initialMessages.reduce((acc, curr) => {
        const byThread = acc.get(curr.threadId) ?? [];
        byThread.push(curr);
        acc.set(curr.threadId, byThread);
        return acc;
      }, new Map())
    );
  }, [initialMessages]);


  const handleCreateThread = useCallback(
    async (params) => {
      try {
        const response = await api.post('/threads/create', {
          type: params.type.toUpperCase(),
          participants: params.type === 'direct' ? [params.recipientId, userId] : params.recipientIds,
        });
        // console.log("params:",params)
        // console.log("response===",response.data.data)
        // Reformat the response data into the required thread format
        const newThread = {
          id: response.data.data.id,
          type: params.type.toLowerCase(), 
          participants: response.data.data.participants.map((participant) => ({
            id: participant.user_id,
            name: participant.name || 'Unknown',
            avatar: participant.avatar || '/assets/avatar.png', // Use participant's avatar or fallback
          })),
          unreadCount: 0,
          name: response.data.data.name,
          member_count: response.data.data.member_count,
        };
  
        // Update the state with the newly formatted thread
        // setThreads((prev) => [newThread, ...prev]);
  
        return newThread.id; 
      } catch (err) {
        console.error('Error creating thread:', err);
        throw err;
      }
    },
    [userId]
  );

  
  const handleCreateMessage = useCallback(
    async (params) => {
      try {
        const formData = new FormData();
        formData.append('threadId', params.threadId);
        formData.append('authorId', userId);
        formData.append('content', params.content || '');
        formData.append('type', params.type);
        if (params.file) {
          formData.append('file', params.file);
        }
        
  
        const response = await api.post('/threads/message', formData, {
          headers: { 'Content-Type': 'multipart/form-data' },
        });
  
        console.log('Message sent:', response.data);
      } catch (err) {
        console.error('Error creating message:', err);
        throw err;
      }
    },
    [userId]
  );
  
  
  

  const handleMarkAsRead = useCallback((threadId) => {
    setThreads((prev) =>
      prev.map((thread) =>
        thread.id === threadId ? { ...thread, unreadCount: 0 } : thread
      )
    );
    // Optionally call an API to mark as read on the server side
  }, []);

// Real time updates

useEffect(() => {
  if (!userId) return;

  // Subscribe to new messages
  const messageSubscription = supabase
    .channel('messages')
    .on(
      
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'messages' },
      (payload) => {
        console.log("Raw payload:", payload); 
        if (!payload.new) {
          console.error("Payload is missing the `new` field");
          return;
        }

        const newMessage = {
          id: payload.new.id,
          threadId: payload.new.thread_id,
          type: payload.new.type,
          content: payload.new.content,
          author: {
            id: payload.new.author_id,
            name: payload.new.author_name || 'new user',
            avatar: payload.new.author_avatar || '',
          },
          file_url: payload.new.file_url,
          createdAt: new Date(),
        };

        
        // Update messages state
        setMessages((prev) => {
          const updatedMessages = new Map(prev);
          const threadMessages = updatedMessages.get(payload.new.thread_id) || [];
          updatedMessages.set(payload.new.thread_id, [...threadMessages, newMessage]);
          return updatedMessages;
        });
        console.log("Real-time message added:", newMessage);

      }
    )
    .subscribe();

    const threadSubscription = supabase
    .channel('threads')
    .on(
      'postgres_changes',
      { event: 'INSERT', schema: 'public', table: 'threads' },
      async (payload) => {
        console.log("Thread Payload received:", payload);
  
        // Fetch participants for the new thread
        const { data: participants, error } = await supabase
          .from('thread_participants')
          .select(`
            user_id,
            user:users (
              first_name,
              last_name,
              profile_pic
            )
          `)
          .eq('thread_id', payload.new.id);
  
        if (error) {
          console.error('Error fetching participants:', error, 'Payload:', payload);
          return;
        }
  
        const newThread = {
          id: payload.new.id,
          type: payload.new.type,
          participants: participants.map((participant) => ({
            id: participant.user_id,
            name: `${participant.user.first_name} ${participant.user.last_name}` || 'Unknown',
            avatar: participant.user.profile_pic || '',
          })),
          name: payload.new.name,
          unreadCount: 0,
          member_count: participants.length,
        };
  
        setThreads((prev) => {
          const exists = prev.some((thread) => thread.id === newThread.id);
          if (exists) return prev;
          return [newThread, ...prev];
        });
      }
    )
    .subscribe();

  return () => {
    supabase.removeChannel(messageSubscription);
    supabase.removeChannel(threadSubscription);
  };
}, [userId]);

const handleEditMessage = useCallback(
  async (messageId, threadId, authorId, newContent) => {
    try {
      const response = await api.put(`/threads/message/edit`, { 
        messageId, 
        thread_id: threadId, 
        author_id: authorId, 
        content: newContent 
       });
      setMessages((prev) => {
        const updatedMessages = new Map(prev);
        const threadMessages = updatedMessages.get(response.data.threadId) || [];
        const updatedThreadMessages = threadMessages.map((msg) =>
          msg.id === messageId ? { ...msg, content: newContent, isEdited: true } : msg
        );
        updatedMessages.set(response.data.threadId, updatedThreadMessages);
        return updatedMessages;
      });
      console.log('Message edited:', response.data);
    } catch (err) {
      console.error('Error editing message:', err);
      throw err;
    }
  },
  []
);

// delete message
const handleDeleteMessage = useCallback(
  async (messageId) => {
    try {
      await api.delete(`/threads/message/delete`, { data: { messageId } });
      setMessages((prev) => {
        const updatedMessages = new Map(prev);
        for (const [threadId, msgs] of updatedMessages.entries()) {
          updatedMessages.set(
            threadId,
            msgs.filter((msg) => msg.id !== messageId)
          );
        }
        return updatedMessages;
      });
      console.log('Message deleted');
    } catch (err) {
      console.error('Error deleting message:', err);
      throw err;
    }
  },
  []
);


  return (
    <ChatContext.Provider
      value={{
        contacts,
        threads,
        messages,
        createThread: handleCreateThread,
        markAsRead: handleMarkAsRead,
        createMessage: handleCreateMessage,
        editMessage: handleEditMessage,
        deleteMessage: handleDeleteMessage,
        openDesktopSidebar,
        setOpenDesktopSidebar,
        openMobileSidebar,
        setOpenMobileSidebar,
      }}
    >
      {children}
    </ChatContext.Provider>
  );
}
