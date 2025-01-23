'use client';

import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import IconButton from '@mui/material/IconButton';
import OutlinedInput from '@mui/material/OutlinedInput';
import InputAdornment from '@mui/material/InputAdornment';
import Stack from '@mui/material/Stack';
import Tooltip from '@mui/material/Tooltip';
import { Camera as CameraIcon } from '@phosphor-icons/react/dist/ssr/Camera';
import { Paperclip as PaperclipIcon } from '@phosphor-icons/react/dist/ssr/Paperclip';
import { PaperPlaneTilt as PaperPlaneTiltIcon } from '@phosphor-icons/react/dist/ssr/PaperPlaneTilt';
import EmojiEmotionsIcon from '@mui/icons-material/EmojiEmotions';
import dynamic from 'next/dynamic';
import{Cancel as CancelIcon} from '@mui/icons-material/Cancel';
// import 
const EmojiPicker = dynamic(() => import('emoji-picker-react'), { ssr: false });

export function MessageAdd({ disabled = false, onSend, editingMessage = null, onCancelEdit   }) {
  const [content, setContent] = React.useState( editingMessage ? editingMessage.content : '');
  const [showEmojiPicker, setShowEmojiPicker] = React.useState(false);
  const pickerRef = React.useRef(null);
  const inputRef = React.useRef(null);
  

  const fileInputRef = React.useRef(null);
  const [file, setFile] = React.useState(null);

  React.useEffect(() => {
    setContent(editingMessage?.content || ''); // Update content when editingMessage changes
  }, [editingMessage]);
  const handleAttach = React.useCallback(() => {
    fileInputRef.current?.click();
  }, []);

  const handleFileChange = React.useCallback((event) => {
    if (event.target.files && event.target.files.length > 0) {
      setFile(event.target.files[0]);
    }
  }, []);

  const handleChange = React.useCallback((event) => {
    setContent(event.target.value);
  }, []);

  const handleSend = React.useCallback(() => {
    if (!content && !fileInputRef.current?.files[0]) {
      return;
    }

    const file = fileInputRef.current?.files[0] || null;

    onSend?.(file ? 'FILE' : 'TEXT', content, file);
    setContent('');
    if (fileInputRef.current) fileInputRef.current.value = ''; // Clear file input
  }, [content, onSend]);

  const handleKeyUp = React.useCallback(
    (event) => {
      if (event.code === 'Enter') {
        handleSend();
      }
    },
    [handleSend]
  );

  const handleEmojiClick = React.useCallback((emojiData) => {
    setContent((prevContent) => prevContent + emojiData.emoji);
  }, []);

  const toggleEmojiPicker = React.useCallback(() => {
    setShowEmojiPicker((prev) => !prev);
  }, []);

  React.useEffect(() => {
    const handleClickOutside = (event) => {
      if (pickerRef.current && !pickerRef.current.contains(event.target)) {
        setShowEmojiPicker(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const getEmojiPickerPosition = () => {
    if (inputRef.current) {
      const rect = inputRef.current.getBoundingClientRect();
      const bottomOffset = window.innerHeight - rect.bottom + 10; 
      const leftOffset = rect.left;

      return {
        bottom: bottomOffset,
        left: leftOffset,
      };
    }
    return { bottom: '10vh', left: '10rem' };
  };

  const emojiPickerPosition = getEmojiPickerPosition();

  return (
    <Stack
      direction="row"
      spacing={2}
      sx={{ alignItems: 'center', flex: '0 0 auto', px: 3, py: 1 }}
      ref={inputRef}
    >
      <OutlinedInput
        disabled={disabled}
        onChange={handleChange}
        onKeyUp={handleKeyUp}
        placeholder={editingMessage ? 'Edit your message...' : 'Type a message...'}
        sx={{ flex: '1 1 auto', borderRadius: 4 }}
        value={content}
        endAdornment={
          <InputAdornment position="end">
            {editingMessage && (
              <Tooltip title="Cancel Edit">
                <IconButton onClick={onCancelEdit}>
                  <CancelIcon />
                </IconButton>
              </Tooltip>
            )}
            <Tooltip title="Add emoji">
              <span>
                <IconButton disabled={disabled} onClick={toggleEmojiPicker}>
                  <EmojiEmotionsIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Attach file">
              <span>
                <IconButton disabled={disabled} onClick={handleAttach} value={file}>
                  <PaperclipIcon />
                </IconButton>
              </span>
            </Tooltip>
            <Tooltip title="Send">
              <span>
                <IconButton
                  color="primary"
                  disabled={!content || disabled}
                  onClick={handleSend}
                  sx={{
                    bgcolor: 'var(--mui-palette-primary-main)',
                    color: 'var(--mui-palette-primary-contrastText)',
                    '&:hover': { bgcolor: 'var(--mui-palette-primary-dark)' },
                    borderRadius: 50,
                  }}
                >
                  <PaperPlaneTiltIcon />
                </IconButton>
              </span>
            </Tooltip>
          </InputAdornment>
        }
      />
      <input hidden ref={fileInputRef} type="file" onChange={handleFileChange} />

      {showEmojiPicker && (
        <div
          ref={pickerRef}
          style={{
            position: 'absolute',
            bottom: `${emojiPickerPosition.bottom}px`,
            left: `${emojiPickerPosition.left}px`,
            zIndex: 1000,
            border: '1px solid #ddd',
            borderRadius: '10px',
            background: '#fff',
            boxShadow: '0 4px 8px rgba(0, 0, 0, 0.1)',
          }}
        >
          <EmojiPicker onEmojiClick={handleEmojiClick} />
        </div>
      )}
    </Stack>
  );
}
