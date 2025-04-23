// components/EmojiPickerPopper.jsx or .tsx
import React from 'react';
import data from '@emoji-mart/data';
import Picker from '@emoji-mart/react';
import { Box, ClickAwayListener, Popper } from '@mui/material';

const EmojiPicker = ({ open, anchorEl, onClose, onSelectEmoji }) => {
  return (
    <Popper open={open} anchorEl={anchorEl} placement="top-end" sx={{ zIndex: 9999 }}>
      <ClickAwayListener onClickAway={onClose}>
        <Box>
          <Picker
            data={data}
            onEmojiSelect={(emoji) => {
              onSelectEmoji(emoji.native);
              onClose();
            }}
          />
        </Box>
      </ClickAwayListener>
    </Popper>
  );
};

export default EmojiPicker;
