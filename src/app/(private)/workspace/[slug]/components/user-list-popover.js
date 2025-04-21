import { useContext, useState } from 'react';
import { Autocomplete, Avatar, Box, Button, IconButton, Popover, Stack, TextField, Typography } from '@mui/material';

import { ChatContext } from '/src/contexts/chat';
import { Iconify } from '/src/components/iconify/iconify';

export const UserListPopover = ({ open, onClose, anchorRef, title }) => {
  const { workspaceInfo, createDirectChannel } = useContext(ChatContext);
  const [selectedUser, setSelectedUser] = useState(null);

  const handleSave = () => {
    createDirectChannel(selectedUser?.id);
    onClose();
  };

  return (
    <Popover
      open={open}
      onClose={onClose}
      anchorEl={anchorRef.current}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      transformOrigin={{
        vertical: 'bottom',
        horizontal: 'right',
      }}
    >
      <Box sx={{ p: 2, width: 300 }}>
        <Stack direction="row" alignItems="center" justifyContent="space-between" mb={2}>
          <Typography variant="subtitle1" gutterBottom>
            {title}
          </Typography>
          <IconButton onClick={onClose}>
            <Iconify icon="mingcute:close-line" />
          </IconButton>
        </Stack>

        <Autocomplete
          id="user-selection-field"
          fullWidth
          options={workspaceInfo?.members}
          autoHighlight
          getOptionLabel={(option) => `${option?.firstName} ${option?.lastName}`}
          onChange={(_, newValue) => setSelectedUser(newValue)}
          renderOption={(props, option) => {
            const { key, ...optionProps } = props;
            return (
              <Box key={key} component="li" sx={{ mb: 1, '& > img': { mr: 2, flexShrink: 0 } }} {...optionProps}>
                <Avatar src={option?.profileImage} alt={option?.firstName} sx={{ width: 30, height: 30, mr: 2 }} />
                {option?.firstName} {option?.lastName}
              </Box>
            );
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Choose User"
              slotProps={{
                htmlInput: {
                  ...params.inputProps,
                  autoComplete: 'select-user',
                },
              }}
            />
          )}
          sx={{ mb: 2 }}
        />

        <Stack direction="row" justifyContent="flex-end" gap={1} sx={{ mt: 2 }}>
          <Button size="small" variant="outlined" onClick={onClose}>
            Cancel
          </Button>
          <Button size="small" variant="contained" onClick={handleSave} disabled={!selectedUser}>
            Save
          </Button>
        </Stack>
      </Box>
    </Popover>
  );
};
