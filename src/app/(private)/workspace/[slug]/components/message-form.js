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

import { AttachmentView } from './attachment-view';
import { getImageType, imageUploader } from '/src/utils/upload-file';

export const MessageForm = ({ sx = {} }) => {
  const [loader, setLoader] = useState(false);
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
    attachmentRef.current.value = null;
  };

  const handleSendMessage = async () => {
    try {
      setLoader(true);
      if (!messageContent.trim() && selectedFiles.length === 0) return;
      const attachments = [];
      if (selectedFiles?.length > 0) {
        const res = await imageUploader(
          selectedFiles.map((f) => ({
            file: f,
            fileName: f.name.split('.').slice(0, -1).join('.'),
            fileType: f.type.split('/')[1],
          })),
          'chat'
        );

        attachments.push(
          ...res.map((item) => ({
            url: item,
            type: getImageType(item?.split('/chat/')?.join('')?.split('.')?.at(-1)),
          }))
        );
        setSelectedFiles([]);
      }
      if (activeTab?.type === 'channel') {
        createChannelMessage(messageContent, undefined, attachments);
      } else {
        createDirectMessage(messageContent, undefined, attachments);
      }

      setMessageContent('');
    } catch (err) {
      console.log(err);
    } finally {
      setLoader(false);
    }
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

  const handleCursorChange = () => {
    const position = inputRef.current?.selectionStart || 0;
    setCursorPosition(position);
  };

  const handleKeyDown = (e) => {
    if (e.key === 'Enter' && !loader) {
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
        <AttachmentView selectedFiles={selectedFiles} handleRemoveFile={handleRemoveFile} loader={loader} />
      )}

      <FormControl variant="standard" sx={{ width: '100%' }}>
        <Input
          disabled={loader}
          fullWidth
          placeholder="Type a message..."
          value={messageContent}
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
              {!messageIdToEdit && (
                <IconButton size="small" sx={{ borderRadius: '50%' }} onClick={() => attachmentRef?.current?.click()}>
                  <Iconify icon="mage:attachment" sx={{ color: 'grey.800' }} />
                </IconButton>
              )}
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
        accept=".jpg,.png,.pdf,.docx,.mp4,.mp3"
      />

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
