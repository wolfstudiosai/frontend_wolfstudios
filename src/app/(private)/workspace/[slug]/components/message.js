import { Fragment, useContext, useRef, useState } from 'react';
import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  ClickAwayListener,
  IconButton,
  Paper,
  Popover,
  Popper,
  Stack,
  Typography,
} from '@mui/material';
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';

import { ChatContext } from '/src/contexts/chat';
import useAuth from '/src/hooks/useAuth';
import { AvatarWithActiveStatus } from '/src/components/core/avatar-with-active-status';
import { Iconify } from '/src/components/iconify/iconify';

dayjs.extend(relativeTime);

const reactionOptions = ['👍', '❤️', '😂', '🎉', '😮'];

export const Message = ({ message, sidebar }) => {
  const {
    setActiveChannelThread,
    setActiveDirectThread,
    activeTab,
    createChannelReaction,
    removeChannelReaction,
    handleEditMessage,
  } = useContext(ChatContext);

  console.log('message: ', message);

  const { userInfo } = useAuth();

  const [anchorEl, setAnchorEl] = useState(null);
  const popperRef = useRef(null);
  const [openConfirmDialog, setOpenConfirmDialog] = useState(false);
  const confirmDialogRef = useRef(null);

  const handleDelete = () => {
    console.log('delete the message', message?.id);
    setOpenConfirmDialog(false);
  };

  const toggleReactionBar = (event) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const handleReactionSelect = (emoji) => {
    setAnchorEl(null);
    createChannelReaction(message?.id, emoji);
  };

  const handleRemoveReaction = (emoji) => {
    removeChannelReaction(message?.id, emoji);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  const emojis = message?.Reactions?.reduce((acc, { emoji, userId }) => {
    const existingEmoji = acc.find((item) => item.emoji === emoji);
    if (existingEmoji) {
      existingEmoji.count += 1;
    } else {
      acc.push({ emoji, count: 1, isYou: userId === userInfo?.id });
    }
    return acc;
  }, []);

  return (
    <Stack
      direction="row"
      gap={1}
      sx={{
        position: 'relative',
        '&:hover .hover-action': { opacity: 1 },
      }}
    >
      <AvatarWithActiveStatus
        src={activeTab?.type === 'channel' ? message?.User?.profileImage : message?.Sender?.profileImage}
        alt={activeTab?.type === 'channel' ? message?.User?.profileImage : message?.Sender?.profileImage}
        sx={{
          ...(sidebar && { width: '28px', height: '28px' }),
        }}
      />
      <Stack direction="column" gap={0.5}>
        <Stack direction="row" alignItems="center" gap={1}>
          <Typography fontWeight={600}>
            {activeTab?.type === 'channel'
              ? `${message?.User?.firstName} ${message?.User?.lastName}`
              : `${message?.Sender?.firstName} ${message?.Sender?.lastName}`}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {dayjs(message?.createdAt).fromNow()}
          </Typography>
        </Stack>

        <Typography variant="body2">{message?.content}</Typography>

        {/* File Attachments */}
        <Stack direction="row" flexWrap="wrap" gap={1} sx={{ my: 1 }}>
          {[
            {
              url: 'https://cdn.wolfstudios.ai/portfolios/attpPqOYQr5N7dOY8.jpg',
              type: 'image/jpeg',
              name: 'image.jpg',
            },
            {
              url: 'https://drive.google.com/open?id=1NTlmVVs46yzyETMjfHg9xPOLAFiZ4CFR',
              type: 'application/pdf',
              name: 'sample.pdf',
            },
            {
              url: 'https://yourdomain.com/uploads/sample.pdf',
              type: 'docx',
              name: 'Document.docx',
            },
          ].map((file, index) => (
            <Fragment key={index}>
              {file.type.startsWith('image/') ? (
                <Box
                  component="img"
                  src={file.url}
                  alt={file.name}
                  sx={{ maxWidth: sidebar ? '120px' : '280px', borderRadius: 0.5 }}
                />
              ) : (
                <Stack
                  direction="row"
                  alignItems="center"
                  justifyContent="space-between"
                  gap={2}
                  sx={{ border: '1px solid', borderColor: 'divider', width: '100%', p: 1, borderRadius: 0.5 }}
                >
                  <Stack direction="row" alignItems="center" gap={1}>
                    <Iconify
                      icon="bx:file"
                      sx={{ width: sidebar ? '30px' : '50px', height: sidebar ? '30px' : '50px' }}
                    />
                    <Stack>
                      <Typography variant="h6" color="text.primary" sx={{ fontSize: sidebar ? '14px' : '16px' }}>
                        {file.name}
                      </Typography>
                      <Typography variant="body2" color="text.secondary">
                        {new URL(file.url).hostname}
                      </Typography>
                    </Stack>
                  </Stack>
                  <IconButton
                    size="small"
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    sx={{ border: '1px solid', borderColor: 'divider', borderRadius: '50%' }}
                  >
                    ↗
                  </IconButton>
                </Stack>
              )}
            </Fragment>
          ))}
        </Stack>

        {/* Reactions */}
        <Stack direction="row" alignItems="center" spacing={0.5}>
          {emojis?.length > 0 &&
            emojis.map(({ emoji, count, isYou }) => (
              <Chip
                onClick={() => (isYou ? handleRemoveReaction(emoji) : handleReactionSelect(emoji))}
                key={emoji}
                label={`${emoji} ${count > 0 ? count : ''}`}
                color="inherit"
                size="small"
              />
            ))}
          <IconButton size="small" aria-label="react" onClick={toggleReactionBar} ref={popperRef}>
            <Iconify icon="material-symbols:add-reaction-outline" />
          </IconButton>
          {message?.isThread && (
            <Button
              variant="text"
              onClick={() =>
                activeTab?.type === 'channel' ? setActiveChannelThread(message?.id) : setActiveDirectThread(message?.id)
              }
              color="primary"
            >
              Show {message?.Replies?.length} more repl{message?.Replies?.length > 1 ? 'ies' : 'y'}
            </Button>
          )}
        </Stack>
      </Stack>

      {/* Hover actions */}
      <ButtonGroup
        className="hover-action"
        sx={{
          backgroundColor: 'var(--mui-palette-background-level2)',
          position: 'absolute',
          top: 0,
          right: 10,
          opacity: 0,
          transition: 'opacity 0.2s ease-in-out',
        }}
      >
        <IconButton title="Edit" onClick={() => handleEditMessage(message || null)}>
          <Iconify icon="material-symbols:edit-outline-rounded" />
        </IconButton>

        <IconButton title="Delete" ref={confirmDialogRef} onClick={() => setOpenConfirmDialog(true)}>
          <Iconify icon="material-symbols:delete-outline-rounded" />
        </IconButton>
        <IconButton title="Reply in thread">
          <Iconify icon="mingcute:message-3-fill" />
        </IconButton>
        {/* Replace sidebar with pin logic */}
        <IconButton title="Pin Message">
          <Iconify icon={sidebar ? 'ri:unpin-line' : 'mingcute:pin-line'} />
        </IconButton>
      </ButtonGroup>

      {/* Reaction Popper */}
      <Popper open={open} anchorEl={anchorEl} placement="top-start">
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ p: 1, display: 'flex', gap: 1, borderRadius: 2 }}>
            {reactionOptions.map((emoji) => (
              <Button
                key={emoji}
                onClick={() => handleReactionSelect(emoji)}
                size="small"
                sx={{ minWidth: '30px', fontSize: '1.2rem' }}
              >
                {emoji}
              </Button>
            ))}
          </Paper>
        </ClickAwayListener>
      </Popper>

      {/* Delte confirmation popover */}
      <Popover
        open={openConfirmDialog}
        onClose={() => setOpenConfirmDialog(false)}
        anchorEl={confirmDialogRef.current}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
      >
        <Box sx={{ p: 2, width: 300 }}>
          <Typography variant="subtitle1" gutterBottom>
            Are you sure want to delete?
          </Typography>

          <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 1, mt: 2 }}>
            <Button size="small" variant="outlined" onClick={() => setOpenConfirmDialog(false)}>
              Cancel
            </Button>
            <Button size="small" variant="contained" color="error" onClick={handleDelete}>
              Delete
            </Button>
          </Box>
        </Box>
      </Popover>
    </Stack>
  );
};

{
  /* <IconButton title="Copy">
          <Iconify icon="mingcute:copy-line" />
        </IconButton> */
}
{
  /* <IconButton title="Forward">
          <Iconify icon="flowbite:forward-outline" />
        </IconButton> */
}
{
  /* <IconButton title="Bookmark">
          <Iconify icon="material-symbols-light:bookmark-outline" />
        </IconButton> */
}

{
  /* <IconButton title="Like">
          <Iconify icon="solar:like-broken" />
        </IconButton> */
}
{
  /* <IconButton title="React" onClick={toggleReactionBar}>
          <Iconify icon="material-symbols:add-reaction-outline" />
        </IconButton> */
}

{
  /* Message */
}
{
  /* <Typography variant="body2">
          I have already prepared all styles and components according to our standards during the design phase, so the
          UI kit is 90% complete. All that remains is to add some states to the interactive elements and prepare the
          Lottie files for animations.{' '}
          <Link href="#" color="primary">
            @Emily D.
          </Link>
          , please take a look and let me know if you have any questions.
        </Typography> */
}

{
  /* Figma Link Card */
}
{
  /* <Card variant="outlined" sx={{ mt: 2, display: "flex", justifyContent: "space-between", alignItems: "center", p: 1.5 }}>
                        <Stack direction="row" spacing={1} alignItems="center">
                            <Box component="img" src="/figma-icon.svg" alt="figma" width={32} />
                            <Box>
                                <Typography fontWeight={500}>Conceptzilla website v.3.0</Typography>
                                <Typography variant="caption" color="text.secondary">www.figma.com</Typography>
                            </Box>
                        </Stack>
                        <Button size="small" variant="outlined" sx={{ textTransform: "none" }}>
                            Quick view
                        </Button>
                    </Card> */
}

{
  /* <Box
                  sx={{
                    p: 1,
                    border: '1px solid',
                    borderColor: 'divider',
                    borderRadius: 0.5,
                    bgcolor: 'background.paper',
                  }}
                >
                  <Typography variant="body2">{file.name}</Typography>
                  <Button
                    href={file.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    variant="outlined"
                    size="small"
                    sx={{ mt: 1 }}
                  >
                    Open File
                  </Button>
                </Box> */
}
