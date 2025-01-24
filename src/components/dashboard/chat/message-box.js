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
import Button from '@mui/material/Button';
import { Download } from '@mui/icons-material';
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
              {/* {message?.type.toLowerCase() === 'file' ? (
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
              ) : null} */}
              {/* File Preview */}
              {message?.type.toLowerCase() === 'file' && (
                <>
                  {/* Check if the file is an image */}
                  {/\.(jpg|jpeg|png|gif)$/i.test(message?.file_url) ? (
                    <CardMedia
                      image={message?.file_url}
                      onClick={handleOpen}
                      sx={{
                        height: '200px',
                        width: '200px',
                        borderRadius: 2,
                        cursor: 'pointer',
                        boxShadow: 2,
                        transition: 'transform 0.2s',
                        '&:hover': {
                          transform: 'scale(1.05)',
                        },
                      }}
                    />
                  ) : (
                    // PDF Preview
                    /\.(pdf)$/i.test(message?.file_url) && (
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          border: '1px solid #ddd',
                          borderRadius: 2,
                          p: 2,
                          bgcolor: 'var(--mui-palette-background-paper)',
                        }}
                      >
                        <Typography variant="subtitle2" sx={{ mb: 1 }}>
                          PDF Preview
                        </Typography>
                        <iframe
                          src={message?.file_url}
                          style={{
                            width: '100%',
                            height: '200px',
                            border: 'none',
                            borderRadius: '4px',
                          }}
                          title="PDF Preview"
                        ></iframe>
                      </Box>
                    )
                  )}

                  {/* Download Button */}
                  <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 1 }}>
                    <Button
                      color="primary"
                      endIcon={<Download />}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        const link = document.createElement('a');
                        link.href = message?.file_url;
                        link.download = message?.file_url.split('/').pop();
                        link.click();
                      }}
                    >
                      Download
                    </Button>
                  </Box>

                </>
              )}

              {message?.type.toLowerCase() === 'text' || message?.type.toLowerCase() === 'file' ? (
                <Typography color="inherit" variant="body1">
                  {message.content ?? ''}
                </Typography>
              ) : null}
              {editing && (

                <EditMessage editing={editing} setEditing={setEditing} editContent={editContent} setEditContent={setEditContent} handleEditSubmit={handleEditSubmit} handleEditToggle={handleEditToggle} />
              )}

              {message.isEdited && (
                <Typography color="text.primary" variant="caption" align="right">
                  (edited)
                </Typography>
              )}
            </Stack>

            {selected && (
              <Box sx={{ display: 'flex', justifyContent: 'space-between', px: 2, background: 'var(--mui-palette-primary-main)' }}>
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