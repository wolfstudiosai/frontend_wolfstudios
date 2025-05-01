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

import { MemberInfo, MemberName } from './custom-component';

export const MessageReplyForm = ({ sx = {} }) => {
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
    messageReplyContent,
    setMessageReplyContent,
    replyMessageIdToEdit,
    handleEditReplyMessage,
    editChannelMessage,
    editDirectMessage,
    activeChannelThread,
    activeDirectThread,
  } = useContext(ChatContext);
  const { userInfo } = useAuth();

  const inputRef = useRef(null);

  const handleSendMessage = () => {
    if (!messageReplyContent.trim()) return;

    if (activeTab?.type === 'channel') {
      createChannelMessage(messageReplyContent, activeChannelThread);
    } else {
      createDirectMessage(messageReplyContent, activeDirectThread);
    }

    setMessageReplyContent('');
  };

  const handleUpdateMessage = (id) => {
    if (activeTab?.type === 'channel') {
      editChannelMessage(id, messageReplyContent);
    } else {
      editDirectMessage(id, messageReplyContent);
    }
    handleEditReplyMessage(null);
  };

  const handleInputChange = (e) => {
    const value = e.target.value;
    setMessageReplyContent(value);
  };

  const handleMentionSelect = (user) => {
    const beforeCursor = messageReplyContent.slice(0, cursorPosition);
    const afterCursor = messageReplyContent.slice(cursorPosition);
    const atIndex = beforeCursor.lastIndexOf('@');

    const mentionText = `@${user.name}`;
    const newCursorPos = atIndex + mentionText.length + 1;

    const newText = beforeCursor.slice(0, atIndex) + mentionText + ' ' + afterCursor;
    setMessageReplyContent(newText);
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
      if (replyMessageIdToEdit) {
        handleUpdateMessage(replyMessageIdToEdit);
      } else {
        handleSendMessage();
      }
    }
  };

  const handleCursorChange = () => {
    const position = inputRef.current?.selectionStart || 0;
    setCursorPosition(position);
  };

  useEffect(() => {
    let timeoutId;
    const TYPING_DELAY = 500;

    if (messageReplyContent.length === 1) {
      startTyping();
    }

    if (messageReplyContent.length > 0) {
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
  }, [messageReplyContent]);

  return (
    <Stack sx={{ ...sx }}>
      <FormControl variant="standard" sx={{ width: '100%' }}>
        <Input
          fullWidth
          placeholder="Type a message..."
          value={messageReplyContent}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          onClick={handleCursorChange}
          onKeyUp={handleCursorChange}
          onSelect={handleCursorChange}
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
              {replyMessageIdToEdit && (
                <IconButton
                  size="small"
                  color="error"
                  title="Cancel edit"
                  sx={{ borderRadius: '50%' }}
                  onClick={() => handleEditReplyMessage(null)}
                >
                  <Iconify icon="mingcute:close-line" />
                </IconButton>
              )}
              <IconButton
                size="small"
                sx={{
                  borderRadius: '50%',
                  ...(messageReplyContent.length > 0 && {
                    backgroundColor: 'primary.main',
                    '&:hover': { backgroundColor: 'primary.main' },
                  }),
                }}
                onClick={() => (replyMessageIdToEdit ? handleUpdateMessage(replyMessageIdToEdit) : handleSendMessage())}
                disabled={messageReplyContent.length === 0}
              >
                <Iconify
                  icon={replyMessageIdToEdit ? 'charm:tick' : 'mingcute:arrow-up-fill'}
                  sx={{ color: messageReplyContent.length > 0 ? '#fff' : 'grey.800' }}
                />
              </IconButton>
            </InputAdornment>
          }
          sx={{ borderBottom: '1px solid', borderColor: 'divider', px: 0, pb: 1, borderRadius: 0 }}
        />
      </FormControl>

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
          const before = messageReplyContent.slice(0, cursorPosition);
          const after = messageReplyContent.slice(cursorPosition);
          const updated = before + emojiChar + after;

          setMessageReplyContent(updated);

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
