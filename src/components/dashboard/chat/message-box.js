import * as React from 'react';
import Avatar from '@mui/material/Avatar';
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import CardMedia from '@mui/material/CardMedia';
import Link from '@mui/material/Link';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ReplyIcon from '@mui/icons-material/Reply';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import useAuth from "/src/hooks/useAuth";
import { dayjs } from '/src/lib/dayjs';
import Modal from '@mui/material/Modal';
import EditMessage from './message-edit';


export function MessageBox({ message, onReply, onEdit, onDelete }) {
  const { userInfo } = useAuth();
  const position = message.author.id === userInfo.email ? 'right' : 'left';
  const [open, setOpen] = React.useState(false);
  const [selected, setSelected] = React.useState(false);
  const [editing, setEditing] = React.useState(false);
  const [editContent, setEditContent] = React.useState(message.content);

  const handleEditToggle = () => setEditing(!editing);
  const handleEditSubmit = () => {
    onEdit({ ...message, content: editContent });
    setEditing(false);
  };

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const handleSelect = () => setSelected(!selected);

  const ref = React.useRef(null);
  const handleClickOutside = React.useCallback((event) => {
    if (ref.current && !ref.current.contains(event.target)) {
      setSelected(false);
    }
  }, []);
  
  React.useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [handleClickOutside]);
  


  return (
    <Box
      ref={ref}
      sx={{ alignItems: position === 'right' ? 'flex-end' : 'flex-start', flex: '0 0 auto', display: 'flex' }}
      // on right click
      onContextMenu={(e) => {
        e.preventDefault();
        handleSelect();
      }}

    >
      <Stack
        direction={position === 'right' ? 'row-reverse' : 'row'}
        spacing={2}
        sx={{
          alignItems: 'flex-start',
          maxWidth: '500px',
          ml: position === 'right' ? 'auto' : 0,
          mr: position === 'left' ? 'auto' : 0,
          transition: 'border 0.2s ease',
          cursor: 'pointer',
        }}
      >
        <Avatar src={message?.author.avatar} sx={{ '--Avatar-size': '32px' }} />
        <Stack spacing={1} sx={{ flex: '1 1 auto' }}>
          <Card
            sx={{
              px: 2,
              py: 1,
              ...(position === 'right' && {
                bgcolor: 'var(--mui-palette-primary-main)',
                color: 'var(--mui-palette-primary-contrastText)',
              }),
            }}
          >
            <Stack spacing={1}>
              <div>
                <Link color="inherit" sx={{ cursor: 'pointer' }} variant="subtitle2">
                  {message.author.id !== userInfo.email ? message?.author.name : ''}
                </Link>
              </div>
              {message?.type.toLowerCase() === 'file' ? (
                <>
                  <CardMedia
                    image={message?.file_url}
                    onClick={handleOpen}
                    sx={{ height: '200px', width: '200px', cursor: 'pointer' }}
                  />
                  <Modal open={open} onClose={handleClose}>
                    <Box
                      sx={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        bgcolor: 'background.paper',
                        boxShadow: 24,
                        p: 4,
                      }}
                    >
                      <img src={message?.file_url} alt="file" style={{ width: '100%', height: 'auto' }} />
                    </Box>
                  </Modal>
                </>
              ) : null}

              {message?.type.toLowerCase() === 'text' || message?.type.toLowerCase() === 'file' ? (
                <Typography color="inherit" variant="body1">
                  {message.content ?? ''}


                </Typography>
              ) : null}


             {editing && (
        <Modal open={editing} onClose={() => setEditing(false)}>
          <Box
            sx={{
              position: 'absolute',
              top: '50%',
              left: '50%',
              transform: 'translate(-50%, -50%)',
              bgcolor: 'background.paper',
              boxShadow: 24,
              p: 4,
            }}
          >
            <Typography variant="h6">Edit Message</Typography>
            <input
              value={editContent}
              onChange={(e) => setEditContent(e.target.value)}
              style={{ width: '100%', padding: '8px' }}
            />
            <Stack direction="row" spacing={2} sx={{ mt: 2 }}>
              <button onClick={handleEditSubmit}>Save</button>
              <button onClick={handleEditToggle}>Cancel</button>
            </Stack>
          </Box>
        </Modal>
        // <EditMessage editing={editing} setEditing={setEditing} editContent={editContent} setEditContent={setEditContent} handleEditSubmit={handleEditSubmit} handleEditToggle={handleEditToggle} />
      )}

              {message.isEdited && (
                <Typography color="text.primary" variant="caption" align="right">
                  (edited)
                </Typography>
              )}
            </Stack>

            {selected && (
            <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, background : 'var(--mui-palette-primary-main)' }}>
              <IconButton onClick={() => { }}>
                <ReplyIcon />
              </IconButton>
              {message.author.id === userInfo.email && (
                <>
                  <IconButton onClick={handleEditToggle}>
                    <EditIcon />
                  </IconButton>
                  <IconButton onClick={() => onDelete(message)}>
                    <DeleteIcon />
                  </IconButton>
                </>
              )}
            </Box>
          )}
          </Card>
          <Box sx={{ display: 'flex', justifyContent: position === 'right' ? 'flex-end' : 'flex-start', px: 2 }}>
            <Typography color="text.secondary" noWrap variant="caption">
              {dayjs(message?.createdAt).fromNow()}
            </Typography>
          </Box>
          
        </Stack>
      </Stack>
      
    </Box>
  );
}