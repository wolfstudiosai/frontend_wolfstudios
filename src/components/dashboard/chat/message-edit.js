import React from 'react';
import { Modal, Box, Typography, Stack, Button, TextField, TextareaAutosize } from '@mui/material';

function EditMessage({ editing, setEditing, editContent, setEditContent, handleEditSubmit, handleEditToggle }) {
  return (
    <Modal open={editing} onClose={() => setEditing(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 4,
          width: '100%',
        }}
      >
        <Typography variant="h6" sx={{ mb: 2 }}>
          Edit Message
        </Typography>
        <TextareaAutosize
          fullWidth
          variant="outlined"
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Edit your message here"
        />
        <Stack direction="row" spacing={2} sx={{ mt: 3 }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleEditSubmit}
            fullWidth
          >
            Save
          </Button>
          <Button
            variant="outlined"
            color="secondary"
            onClick={handleEditToggle}
            fullWidth
          >
            Cancel
          </Button>
        </Stack>
      </Box>
    </Modal>
  );
}

export default EditMessage;
