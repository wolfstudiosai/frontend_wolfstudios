'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton'; 

import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';
import { RightSidebar } from './right-sidebar';

function useThread(threadId) {
  const { threads } = React.useContext(ChatContext);

  return threads.find((thread) => thread.id === threadId);
}

function useMessages(threadId) {
  const { messages } = React.useContext(ChatContext);

  return messages.get(threadId) ?? [];
}

// const user = {
//   id: 'USR-000',
//   name: 'Sofia Rivers',
//   avatar: '/assets/avatar.png',
//   email: 'sofia@devias.io',
// };

export function ThreadView({ threadId }) {
  const { createMessage, markAsRead, editMessage, deleteMessage } = React.useContext(ChatContext);
  const [isProfileVisible, setIsProfileVisible] = React.useState(false);
  const [editingMessage, setEditingMessage] = React.useState(null); // Track editing state
  const [loading, setLoading] = React.useState(true); 
  const thread = useThread(threadId);
  const messages = useMessages(threadId);
  console.log("messages in thread view", messages);

  const messagesRef = React.useRef(null);
  
  const togleProfile = React.useCallback(() => {
    setIsProfileVisible((prev) => !prev);
  }, []);
  const handleThreadChange = React.useCallback(() => {
    markAsRead(threadId);
  }, [threadId, markAsRead]);

  React.useEffect(() => {
    setLoading(true); 
    const timeoutId = setTimeout(() => {
      handleThreadChange();
      setLoading(false); 
    }, 500); 
    return () => clearTimeout(timeoutId);
  }, [threadId]);


  const handleSendMessage = React.useCallback(
    async (type, content, file) => {
      const fileUrl = file
        ? URL.createObjectURL(file) 
        : null;
      await createMessage({ threadId, type, content, file_url: fileUrl, file });
    },
    [threadId, createMessage]
  );

  // const handleSendMessage = React.useCallback(
  //   async (content, file, editingMessageId) => {
  //     if (editingMessageId) {
  //       // Editing an existing message
  //       await editMessage(editingMessageId, content); // Call editMessage
  //       setEditingMessage(null); // Clear editing state
  //     } else {
  //       // Creating a new message
  //       const fileUrl = file ? URL.createObjectURL(file) : null;
  //       await createMessage({ threadId, type: file ? 'FILE' : 'TEXT', content, file_url: fileUrl, file });
  //     }
  //   },
  //   [threadId, createMessage, editMessage]
  // );
  

  const handleReply = (message) => {
    // Handle reply logic
  };

  const handleDelete = async (message) => {
    const confirmed = confirm('Are you sure you want to delete this message?');
    if (confirmed) {
      await deleteMessage(message.id);
    }
  };
  

  const handleEdit = (message) => {
    setEditingMessage(message); // Set the message to edit
  };

  const handleCancelEdit = () => {
    setEditingMessage(null); // Clear editing state
  };

  React.useEffect(() => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  }, [messages]);

  if (loading) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          flex: '1 1 auto',
          p: 3,
        }}
      >
        {/* Skeleton for the toolbar */}
        <Skeleton variant="rectangular" height={40} sx={{ mb: 2 }} />
        
        {/* Skeletons for messages */}
        <Stack spacing={2} sx={{ flex: '1 1 auto' }}>
          {Array.from({ length: 5 }).map((_, index) => (
            <Skeleton key={index} variant="rectangular" height={60} />
          ))}
        </Stack>

        {/* Skeleton for the message input */}
        <Skeleton variant="rectangular" height={50} sx={{ mt: 2 }} />
      </Box>
    );
  }

  if (!thread) {
    return (
      <Box sx={{ alignItems: 'center', display: 'flex', flex: '1 1 auto', justifyContent: 'center' }}>
        <Typography color="textSecondary" variant="h6">
          Thread not found
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0, ...(isProfileVisible ? { marginRight: '240px' } : {}),
  }}>
      <ThreadToolbar thread={thread} />
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3 }}>
        {messages.map((message) => (
          <MessageBox key={message?.id} message={message} onDelete={
            () => handleDelete(message)
          } onEdit={handleEdit} onReply={() => {}
          } />
        ))}
      </Stack>
      <MessageAdd onSend={handleSendMessage}   editingMessage={editingMessage}
        onCancelEdit={handleCancelEdit} 
        />
      {
        // isProfileVisible && <RightSidebar SelectedUser={user}  />
      }
    </Box>
  );
}
