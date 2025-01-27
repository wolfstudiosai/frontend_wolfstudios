'use client';

import * as React from 'react';
import Box from '@mui/material/Box';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import Skeleton from '@mui/material/Skeleton';
import ArrowDownwardIcon from '@mui/icons-material/ArrowDownward';
import { ChatContext } from './chat-context';
import { MessageAdd } from './message-add';
import { MessageBox } from './message-box';
import { ThreadToolbar } from './thread-toolbar';
import { RightSidebar } from './right-sidebar';
import IconButton from '@mui/material/IconButton';
import CancelIcon from '@mui/icons-material/Cancel';

function useThread(threadId) {
  const { threads } = React.useContext(ChatContext);

  return threads.find((thread) => thread.id === threadId);
}

function useMessages(threadId) {
  const { messages } = React.useContext(ChatContext);

  return messages.get(threadId) ?? [];
}

export function ThreadView({ threadId }) {
  const { createMessage, markAsRead, editMessage, deleteMessage, replyMessage } = React.useContext(ChatContext);
  const [isProfileVisible, setIsProfileVisible] = React.useState(false);
  const [loading, setLoading] = React.useState(true);
  const [showScrollButton, setShowScrollButton] = React.useState(false);
  const [selectedFile, setSelectedFile] = React.useState(null);
  const [filePreview, setFilePreview] = React.useState(null);
  const thread = useThread(threadId);
  const messages = useMessages(threadId);
  // console.log("messages in thread view", messages);

  const messagesRef = React.useRef(null);

  // Track scroll position and show/hide scroll-to-bottom button
  React.useEffect(() => {
    const handleScroll = () => {
      if (messagesRef.current) {
        const { scrollTop, scrollHeight, clientHeight } = messagesRef.current;


        console.log('Scroll Position:', {
          scrollTop,
          clientHeight,
          scrollHeight,
          showScrollButton: scrollTop + clientHeight < scrollHeight - 5,
        });
        setShowScrollButton(scrollTop + clientHeight < scrollHeight - 5);
      }
    };

    const container = messagesRef.current;
    if (container) {
      container.addEventListener('scroll', handleScroll);
      console.log('Scroll event listener registered');
    }

    return () => {
      if (container) {
        container.removeEventListener('scroll', handleScroll);
      }
    };
  }, []);

  // Scroll to the bottom when the button is clicked
  const scrollToBottom = () => {
    if (messagesRef.current) {
      messagesRef.current.scrollTop = messagesRef.current.scrollHeight;
    }
  };


  // const togleProfile = React.useCallback(() => {
  //   setIsProfileVisible((prev) => !prev);
  // }, []);
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
      setSelectedFile(null);
      setFilePreview(null);
    },
    [threadId, createMessage]
  );

  const handleFileChange = (file) => {
    setSelectedFile(file);
    if (file?.type.startsWith('image/')) {
      setFilePreview(URL.createObjectURL(file));
    } else if (file?.type === 'text/plain') {
      const reader = new FileReader();
      reader.onload = (e) => setFilePreview(e.target.result);
      reader.readAsText(file);
    } else {
      setFilePreview(null);
    }
  }

  const handleCancelFile = () => {
    setSelectedFile(null);
    setFilePreview(null);
  }

  const handleReply = async (message) => {
    await replyMessage(message);
  };

  const handleDelete = async (message) => {
    const confirmed = confirm('Are you sure you want to delete this message?');
    if (confirmed) {
      await deleteMessage(message.id);
    }
  };

  const handleEdit = async (updatedMessage) => {
    await editMessage(updatedMessage);
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
    <Box sx={{
      display: 'flex', flex: '1 1 auto', flexDirection: 'column', minHeight: 0, ...(isProfileVisible ? { marginRight: '240px' } : {}),
      height: 'calc(100vh - 30vh)',
      position: 'relative',
      overflow: 'hidden',
      '&:hover': {
        overflow: 'auto',
      }
    }}>
      <ThreadToolbar thread={thread} />
      <Stack ref={messagesRef} spacing={2} sx={{ flex: '1 1 auto', overflowY: 'auto', p: 3, maxWidth: '100%' }}>
        {messages.map((message) => (
          <MessageBox key={message?.id} message={message}
            onDelete={
              () => handleDelete(message)
            }
            onEdit={handleEdit}
          />
        ))}

      </Stack>
      {filePreview && (


        <Box
          sx={{
            display: 'flex',
            alignItems: 'center',
            p: 2,
            borderTop: '1px solid #ddd',
            backgroundColor: '#f9f9f9',
            width: '40%',
            marginLeft: 6,
          }}
        >
          {selectedFile.type.startsWith('image/') && (
            <img
              src={filePreview}
              alt="Preview"
              style={{ width: 'auto', height: '50vh', marginRight: 4, borderRadius: 4, padding: 4 }}
            />
          )}
          {selectedFile.type === 'text/plain' && (
            <Typography
              sx={{
                flex: 1,
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {filePreview}

            </Typography>
          )}
          {selectedFile?.type?.startsWith('application/') && (
            <Typography
              sx={{
                flex: 1,
                maxWidth: '100%',

              }}
            >
              {selectedFile.name}
            </Typography>
          )}


          <Box sx={{ flex: 1 }}>
            <Typography
              sx={{
                fontWeight: 'bold',
                maxWidth: '100%',
                whiteSpace: 'nowrap',
                overflow: 'hidden',
                textOverflow: 'ellipsis',
              }}
            >
              {selectedFile.name}
            </Typography>
            <Typography
              sx={{
                color: 'gray',
                fontSize: '0.9rem',
              }}
            >
              {(selectedFile.size / 1024).toFixed(2)} KB
            </Typography>
          </Box>
          <IconButton onClick={handleCancelFile}>
            <CancelIcon />
          </IconButton>
        </Box>
      )}
      <MessageAdd onSend={handleSendMessage}
        onFileChange={handleFileChange}
      />
    </Box>
  );
}
