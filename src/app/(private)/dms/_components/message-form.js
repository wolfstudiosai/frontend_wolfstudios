import { useContext, useEffect, useRef, useState } from 'react';
import {
  Avatar,
  Box,
  Divider,
  FormControl,
  IconButton,
  Input,
  InputAdornment,
  List,
  ListItem,
  Paper,
  Popper,
  Stack,
} from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';

import { MemberInfo, MemberName } from '../../workspace/[slug]/components/custom-component';

const allUsers = [
  { id: 1, name: 'John Doe', profile_pic: '' },
  { id: 2, name: 'Combina Key', profile_pic: '' },
  { id: 3, name: 'Mustafa Jawed', profile_pic: '' },
];

export const MessageForm = ({ sx = {} }) => {
  const [messageContent, setMessageContent] = useState('');
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mentionAnchor, setMentionAnchor] = useState(null);
  const [mentionQuery, setMentionQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);

  const { startTyping, stopTyping, createChannelMessage, createDirectMessage, activeTab } = useContext(ChatContext);
  const { userInfo } = useAuth();

  const attachmentRef = useRef(null);
  const inputRef = useRef(null);

  const handleFileSelect = (event) => {
    if (event.target.files?.length) {
      setSelectedFiles((prevFiles) => [...prevFiles, ...Array.from(event.target.files)]);
    }
  };

  const handleRemoveFile = (indexToRemove) => {
    setSelectedFiles((prevFiles) => prevFiles.filter((_, index) => index !== indexToRemove));
  };

  const handleSendMessage = () => {
    if (!messageContent.trim()) return;

    if (activeTab?.type === 'channel') {
      createChannelMessage(messageContent);
    } else {
      createDirectMessage(messageContent);
    }
    setMessageContent('');
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageContent(value);
    const cursor = e.target.selectionStart;
    setCursorPosition(cursor);

    // Find the last "@" before cursor
    const textUpToCursor = value.slice(0, cursor);
    const atIndex = textUpToCursor.lastIndexOf('@');

    if (atIndex >= 0) {
      const query = textUpToCursor.slice(atIndex + 1);
      if (/^[\w]*$/.test(query)) {
        setMentionQuery(query);
        const anchorEl = inputRef.current;
        setMentionAnchor(anchorEl);
        setFilteredUsers(allUsers.filter((user) => user.name.toLowerCase().includes(query.toLowerCase())));
        return;
      }
    }

    setMentionAnchor(null);
    setMentionQuery('');
    setFilteredUsers([]);
  };

  const handleMentionSelect = (user) => {
    const beforeCursor = messageContent.slice(0, cursorPosition);
    const afterCursor = messageContent.slice(cursorPosition);
    const atIndex = beforeCursor.lastIndexOf('@');

    const mentionText = `@${user.name}`;
    const newCursorPos = atIndex + mentionText.length + 1; // +1 for space

    const newText = beforeCursor.slice(0, atIndex) + mentionText + ' ' + afterCursor;
    setMessageContent(newText);
    setMentionAnchor(null);
    setMentionQuery('');
    setFilteredUsers([]);

    // Wait for state update, then place cursor
    requestAnimationFrame(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      setCursorPosition(newCursorPos);
    });
  };

  //message should send when enter key is pressed
  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      handleSendMessage();
    }
  };

  //should have debounce of 1 second
  useEffect(() => {
    let timeoutId;
    const TYPING_DELAY = 500; // One second delay before showing typing indicator

    if (messageContent.length === 1) {
      startTyping();
    }

    if (messageContent.length > 0) {
      // Set timeout for start typing
      timeoutId = setTimeout(() => {
        startTyping();

        // Set another timeout to stop typing after 1 second of no changes
        timeoutId = setTimeout(() => {
          stopTyping();
        }, 1000);
      }, TYPING_DELAY);
    } else {
      stopTyping();
    }

    // Cleanup timeout on unmount or when messageContent changes
    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [messageContent]); // Keep dependencies minimal

  return (
    <Stack sx={{ ...sx }}>
      {/* -- FILE PREVIEW (Same as before) -- */}
      {selectedFiles.length > 0 && (
        <>
          <Stack direction="row" gap={0.6} sx={{ flexWrap: 'wrap', p: 1 }}>
            {selectedFiles.map((file, index) => (
              <Box key={index} sx={{ width: '120px', height: '120px', position: 'relative' }}>
                <Box
                  component="img"
                  src={URL.createObjectURL(file)}
                  sx={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: 0.5 }}
                />
                <IconButton
                  size="small"
                  sx={{
                    position: 'absolute',
                    top: 3,
                    right: 3,
                    backgroundColor: 'rgba(0, 0, 0, 0.6)',
                    borderRadius: '50%',
                    '&:hover': { backgroundColor: 'rgba(0, 0, 0, 0.8)' },
                  }}
                  onClick={() => handleRemoveFile(index)}
                >
                  <Iconify icon="mingcute:close-fill" sx={{ color: '#fff', width: '16px', height: '16px' }} />
                </IconButton>
              </Box>
            ))}
          </Stack>
          <Divider sx={{ borderStyle: 'dashed', my: 1 }} />
        </>
      )}

      {/* -- INPUT FIELD -- */}
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <Input
          fullWidth
          placeholder="Type a message..."
          value={messageContent}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          inputRef={inputRef}
          id="input-with-icon-adornment"
          startAdornment={
            <InputAdornment position="start">
              <Avatar src={userInfo?.profile_pic} alt={userInfo?.name} sx={{ width: '30px', height: '30px' }} />
            </InputAdornment>
          }
          endAdornment={
            <InputAdornment position="end" sx={{ display: 'flex', gap: 0.2 }}>
              <IconButton size="small" sx={{ borderRadius: '50%' }} onClick={() => attachmentRef?.current?.click()}>
                <Iconify icon="mage:attachment" sx={{ color: 'grey.800' }} />
              </IconButton>
              <IconButton size="small" sx={{ borderRadius: '50%' }}>
                <Iconify icon="material-symbols-light:add-reaction-outline" sx={{ color: 'grey.800' }} />
              </IconButton>
              <IconButton
                size="small"
                sx={{
                  borderRadius: '50%',
                  ...((messageContent.length > 0 || selectedFiles.length > 0) && {
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.main' },
                  }),
                }}
                onClick={handleSendMessage}
              >
                <Iconify
                  icon="mingcute:arrow-up-fill"
                  sx={{ color: messageContent.length > 0 || selectedFiles.length > 0 ? '#fff' : 'grey.800' }}
                />
              </IconButton>
            </InputAdornment>
          }
          sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 0, pb: 1, borderRadius: 0 }}
        />
      </FormControl>

      <input
        ref={attachmentRef}
        type="file"
        style={{ display: 'none' }}
        id="file-upload"
        onChange={handleFileSelect}
        multiple
      />

      {/* -- MENTION DROPDOWN -- */}
      <Popper
        open={Boolean(mentionAnchor && filteredUsers.length)}
        anchorEl={mentionAnchor}
        placement="top-start"
        sx={{ zIndex: 9999 }}
      >
        <Paper sx={{ mt: 1, maxHeight: 200, overflow: 'auto', width: 200 }}>
          <List dense>
            {filteredUsers.map((user) => (
              <ListItem button key={user.id} onClick={() => handleMentionSelect(user)}>
                <Avatar src={user.profile_pic} alt={user.name} sx={{ width: 26, height: 26 }} />
                <MemberInfo>
                  <MemberName>{user.name}</MemberName>
                </MemberInfo>
                {/* <ListItemText primary={`@${user.name}`} /> */}
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>
    </Stack>
  );
};
