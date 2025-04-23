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
import ClickAwayListener from '@mui/material/ClickAwayListener';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { Iconify } from '/src/components/iconify/iconify';
import EmojiPicker from '/src/components/widgets/emoji-picker';

import { MemberInfo, MemberName } from '../../workspace/[slug]/components/custom-component';

const allUsers = [
  { id: 1, name: 'John Doe', profile_pic: '' },
  { id: 2, name: 'Combina Key', profile_pic: '' },
  { id: 3, name: 'Mustafa Jawed', profile_pic: '' },
];

export const MessageForm = ({ sx = {} }) => {
  const [selectedFiles, setSelectedFiles] = useState([]);
  const [mentionAnchor, setMentionAnchor] = useState(null);
  const [mentionQuery, setMentionQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [cursorPosition, setCursorPosition] = useState(0);
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [emojiAnchorEl, setEmojiAnchorEl] = useState(null);

  const {
    startTyping,
    stopTyping,
    createChannelMessage,
    createDirectMessage,
    activeTab,
    messageContent,
    setMessageContent,
    messageIdToEdit,
    handleEditMessage,
    editChannelMessage,
    editDirectMessage,
  } = useContext(ChatContext);
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

  const handleUpdateMessage = (id) => {
    if (activeTab?.type === 'channel') {
      editChannelMessage(id, messageContent);
    } else {
      editDirectMessage(id, messageContent);
    }
    handleEditMessage(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageContent(value);
    const cursor = e.target.selectionStart;
    setCursorPosition(cursor);

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
    const newCursorPos = atIndex + mentionText.length + 1;

    const newText = beforeCursor.slice(0, atIndex) + mentionText + ' ' + afterCursor;
    setMessageContent(newText);
    setMentionAnchor(null);
    setMentionQuery('');
    setFilteredUsers([]);

    requestAnimationFrame(() => {
      inputRef.current.focus();
      inputRef.current.setSelectionRange(newCursorPos, newCursorPos);
      setCursorPosition(newCursorPos);
    });
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter') {
      if (messageIdToEdit) {
        handleUpdateMessage(messageIdToEdit);
      } else {
        handleSendMessage();
      }
    }
  };

  useEffect(() => {
    let timeoutId;
    const TYPING_DELAY = 500;

    if (messageContent.length === 1) {
      startTyping();
    }

    if (messageContent.length > 0) {
      timeoutId = setTimeout(() => {
        startTyping();
        timeoutId = setTimeout(() => {
          stopTyping();
        }, 1000);
      }, TYPING_DELAY);
    } else {
      stopTyping();
    }

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [messageContent]);

  return (
    <Stack sx={{ ...sx }}>
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
              <IconButton
                size="small"
                sx={{ borderRadius: '50%' }}
                aria-label="add reaction"
                onClick={(e) => {
                  setEmojiAnchorEl(e.currentTarget);
                  setShowEmojiPicker((prev) => !prev);
                }}
              >
                <Iconify icon="material-symbols-light:add-reaction-outline" sx={{ color: 'grey.800' }} />
              </IconButton>
              {messageIdToEdit && (
                <IconButton
                  size="small"
                  color="error"
                  title="Cancel edit"
                  sx={{ borderRadius: '50%' }}
                  onClick={() => handleEditMessage(null)}
                >
                  <Iconify icon="mingcute:close-line" />
                </IconButton>
              )}
              <IconButton
                size="small"
                sx={{
                  borderRadius: '50%',
                  ...((messageContent.length > 0 || selectedFiles.length > 0) && {
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.main' },
                  }),
                }}
                onClick={() => (messageIdToEdit ? handleUpdateMessage(messageIdToEdit) : handleSendMessage())}
                disabled={messageContent.length === 0 && selectedFiles.length === 0}
              >
                <Iconify
                  icon={messageIdToEdit ? 'charm:tick' : 'mingcute:arrow-up-fill'}
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
              </ListItem>
            ))}
          </List>
        </Paper>
      </Popper>

      <EmojiPicker
        open={showEmojiPicker}
        anchorEl={emojiAnchorEl}
        onClose={() => setShowEmojiPicker(false)}
        onSelectEmoji={(emojiChar) => {
          const before = messageContent.slice(0, cursorPosition);
          const after = messageContent.slice(cursorPosition);
          const updated = before + emojiChar + after;

          setMessageContent(updated);

          requestAnimationFrame(() => {
            inputRef.current?.focus();
            const newPos = cursorPosition + emojiChar.length;
            inputRef.current?.setSelectionRange(newPos, newPos);
            setCursorPosition(newPos);
          });
        }}
      />
    </Stack>
  );
};
