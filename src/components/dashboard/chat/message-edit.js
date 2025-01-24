import React from 'react';
import { Modal, Box, Typography, IconButton, Tooltip } from '@mui/material';
import { CheckCircleRounded, ArrowBack, Done, CheckCircle } from '@mui/icons-material';
import { OutlinedInput, InputAdornment } from '@mui/material';

function EditMessage({
  editing,
  setEditing,
  editContent,
  setEditContent,
  handleEditSubmit,
}) {
  return (
    <Modal open={editing} onClose={() => setEditing(false)}>
      <Box
        sx={{
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
          bgcolor: 'background.paper',
          borderRadius: 3,
          boxShadow: 24,
          p: 3,
          width: '90%',
          maxWidth: '400px',
        }}
      >
        {/* Header Section */}
        <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
          <IconButton onClick={() => setEditing(false)} sx={{ mr: 1 }}>
            <ArrowBack />
          </IconButton>
          <Typography variant="h6" sx={{ fontWeight: 'bold' }}>
            Edit Message
          </Typography>
        </Box>

        {/* Input Field */}
        <OutlinedInput
          fullWidth
          value={editContent}
          onChange={(e) => setEditContent(e.target.value)}
          placeholder="Edit your message here"
          sx={{
            mb: 3,
            borderRadius: 3,
            '.MuiOutlinedInput-input': { padding: '12px 14px' },
          }}
          endAdornment={
            <InputAdornment position="end">
              <Tooltip title="Save">
                <span>
                  <IconButton
                    color="primary"
                    onClick={handleEditSubmit}
                    sx={{
                      bgcolor: 'primary.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'primary.dark' },
                      borderRadius: '50%',
                      boxShadow: 2,
                    }}
                  >
                    <Done fontSize="medium" />
                  </IconButton>
                </span>
              </Tooltip>
            </InputAdornment>
          }
        />
      </Box>
    </Modal>
  );
}

export default EditMessage;
